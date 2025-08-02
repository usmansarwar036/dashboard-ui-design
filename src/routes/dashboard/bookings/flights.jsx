import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { isAfter, isBefore } from "date-fns";
import { Range } from "react-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plane, Filter, X, LayoutGrid, List } from "lucide-react";

export default function FlightBookingsPage() {
    const flights = [
        {
            id: 1,
            airline: "Japan Airlines",
            logo: "https://placehold.co/32x32?text=JA",
            date: "2023-12-21",
            bookedOn: "2023-12-20",
            from: { city: "New York", time: "09:40", code: "LGA" },
            to: { city: "Tokyo", time: "17:00", code: "HND" },
            duration: "7h 20m",
            type: "Direct",
            price: 320,
            stopDuration: 0,
            amenities: ["Wi-Fi", "In-flight Meal"],
            refundable: true,
            reschedulable: true,
            cabinClass: "Economy",
            preferences: [],
            departureTime: "09:40",
            arrivalTime: "17:00",
        },
        {
            id: 2,
            airline: "Qatar Airways",
            logo: "https://placehold.co/32x32?text=QA",
            date: "2024-05-21",
            bookedOn: "2023-12-20",
            from: { city: "Lahore", time: "02:30", code: "LHE" },
            to: { city: "Doha", time: "05:00", code: "DOH" },
            duration: "3h 30m",
            type: "1 Stop",
            price: 280,
            stopDuration: 2,
            amenities: ["Power & USB Port", "In-flight Entertainment"],
            refundable: false,
            reschedulable: true,
            cabinClass: "Business Class",
            preferences: ["Exclude overnight stop(s)"],
            departureTime: "02:30",
            arrivalTime: "05:00",
        },
        {
            id: 3,
            airline: "Emirates",
            logo: "https://placehold.co/32x32?text=EK",
            date: "2024-02-21",
            bookedOn: "2023-12-20",
            from: { city: "Dubai", time: "06:45", code: "DXB" },
            to: { city: "London", time: "11:20", code: "LHR" },
            duration: "7h 35m",
            type: "2+ Stops",
            price: 450,
            stopDuration: 6,
            amenities: ["Wi-Fi", "In-flight Meal", "In-flight Entertainment"],
            refundable: true,
            reschedulable: false,
            cabinClass: "Premium Economy",
            preferences: ["Exclude late-night flights"],
            departureTime: "06:45",
            arrivalTime: "11:20",
        },
        {
            id: 4,
            airline: "United Airlines",
            logo: "https://placehold.co/32x32?text=UA",
            date: "2024-02-10",
            bookedOn: "2023-12-20",
            from: { city: "Dubai", time: "10:00", code: "DXB" },
            to: { city: "London", time: "18:00", code: "LHR" },
            duration: "8h 00m",
            type: "Direct",
            price: 390,
            stopDuration: 0,
            amenities: ["Baggage", "In-flight Meal"],
            refundable: false,
            reschedulable: false,
            cabinClass: "First Class",
            preferences: ["Exclude code-share flights"],
            departureTime: "10:00",
            arrivalTime: "18:00",
        },
    ];

    const [filteredFlights, setFilteredFlights] = useState(flights);
    const [lgGridView, setLgGridView] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        setPage(1);
    }, [filteredFlights]);

    const totalPages = Math.ceil(filteredFlights.length / perPage);
    const paginatedFlights = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return filteredFlights.slice(start, end);
    }, [filteredFlights, page, perPage]);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Flight Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to="/">Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <FlightFilter
                    flights={flights}
                    onApply={setFilteredFlights}
                />
                <div className="hidden items-center gap-4 lg:flex">
                    <button
                        onClick={() => setLgGridView(true)}
                        className={`flex items-center gap-1 border-b-2 px-2 py-2 transition ${
                            lgGridView ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <LayoutGrid size={18} />
                        {/* <span className="text-sm">Grid</span> */}
                    </button>
                    <button
                        onClick={() => setLgGridView(false)}
                        className={`flex items-center gap-1 border-b-2 px-2 py-2 transition ${
                            !lgGridView ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <List size={18} />
                        {/* <span className="text-sm">List</span> */}
                    </button>
                </div>
            </div>

            {/* Flight Cards */}
            <div className={`grid grid-cols-1 gap-6 ${lgGridView && "lg:grid-cols-2"}`}>
                {paginatedFlights.map((flight) => (
                    <div
                        key={flight.id}
                        className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                    >
                        <div className="p-5">
                            {/* Top Info */}
                            <div className="mb-3 flex items-center justify-between border-b pb-3">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={flight.logo}
                                        alt="logo"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <span className="text-base font-semibold text-black dark:text-white">{flight.airline}</span>
                                </div>
                                <span className="text-sm text-[#6B7280]">{flight.date}</span>
                            </div>

                            {/* Flight Info */}
                            <div className="flex items-center justify-between">
                                {/* From */}
                                <div className="mr-3 text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">{flight.from.city}</div>
                                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.from.time}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{flight.from.code}</div>
                                </div>

                                {/* Arc with Plane */}
                                <div className="relative mx-auto mt-[-30px] h-[56px] w-full">
                                    <svg
                                        className="absolute inset-0 mx-auto h-full w-[calc(100%-10px)]"
                                        viewBox="0 0 100 30"
                                        preserveAspectRatio="none"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 30C20 0 80 0 100 30"
                                            stroke="url(#paint0_linear)"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear"
                                                x1="0"
                                                y1="30"
                                                x2="100"
                                                y2="30"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop
                                                    stopColor="#4D8CFE"
                                                    stopOpacity="0.2"
                                                />
                                                <stop
                                                    offset="0.5"
                                                    stopColor="#1A6BFF"
                                                />
                                                <stop
                                                    offset="1"
                                                    stopColor="#4D8CFE"
                                                    stopOpacity="0.2"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Endpoints */}
                                    <div className="sm:bottom absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                                    {/* Plane Icon */}
                                    <div className="absolute left-1/2 top-[0%] -translate-x-1/2 rotate-45 text-[#1A6BFF]">
                                        <Plane
                                            size={28}
                                            fill="#1A6BFF"
                                            stroke="#1A6BFF"
                                        />
                                    </div>

                                    {/* Duration Info */}
                                    <div className="absolute top-[35px] w-full text-center text-sm text-[#6B7280]">
                                        <div>{flight.duration}</div>
                                        <div>{flight.type}</div>
                                    </div>
                                </div>

                                {/* To */}
                                <div className="ml-3 text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">{flight.to.city}</div>
                                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.to.time}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{flight.to.code}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap border-t border-gray-300 pb-3 pt-3 dark:border-gray-700">
                            <div className="flex-1 text-center">
                                <Link
                                    to="/bookings/flights/453g"
                                    className="inline-block text-sm font-medium text-blue-600 hover:underline dark:text-white"
                                >
                                    View Details
                                </Link>
                            </div>
                            <div className="flex-1 text-center">
                                <h6 className="m-0 inline-block text-sm font-medium">Customer Invoice</h6>
                            </div>
                            <div className="flex-1 text-center">
                                <h6 className="m-0 inline-block text-sm font-medium">Web Check-In</h6>
                            </div>
                            <div className="flex-1 text-center">
                                <h6 className="m-0 inline-block text-sm font-medium">Print E-Ticket</h6>
                            </div>
                            <div className="flex-1 text-center">
                                <h6 className="m-0 inline-block text-sm font-medium">Email E-Ticket</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {paginatedFlights.length == 0 && (
                <div className="rounded-lg border-t border-gray-200 bg-white px-4 py-3 text-center text-sm dark:border-gray-800">
                    No Results Found
                </div>
            )}
            <div className="mt-4 flex items-center justify-between rounded-lg border-t border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-800">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1 disabled:opacity-50 dark:border-gray-700 dark:bg-white/5"
                >
                    Previous
                </button>
                <span className="text-gray-500 dark:text-gray-400">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1 disabled:opacity-50 dark:border-gray-700 dark:bg-white/5"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
function FlightFilter({ flights, onApply }) {
    const STEP = 1;

    const airlinesList = [...new Set(flights.map((f) => f.airline))];
    const amenitiesList = [...new Set(flights.flatMap((f) => f.amenities || []))];
    const cabinClasses = [...new Set(flights.map((f) => f.cabinClass))];
    const preferences = [...new Set(flights.flatMap((f) => f.preferences || []))];

    const refundOptions = [
        flights.some((f) => f.refundable) && "Refundable",
        flights.some((f) => f.reschedulable) && "Reschedulable Available",
    ].filter(Boolean);

    const stopOptions = [...new Set(flights.map((f) => f.type))];
    const timeOptions = ["00:00 - 06:00", "06:00 - 12:00", "12:00 - 18:00", "18:00 - 00:00"];
    const isTimeInRange = (timeStr, rangeLabel) => {
        const [fromStr, toStr] = rangeLabel.split(" - ");
        const [fromHour, fromMin] = fromStr.split(":").map(Number);
        const [toHour, toMin] = toStr.split(":").map(Number);
        const [hour, minute] = timeStr.split(":").map(Number);

        const current = hour * 60 + minute;
        const from = fromHour * 60 + fromMin;
        const to = toHour * 60 + toMin;

        if (from > to) {
            // Time range spans midnight, e.g., 18:00 - 00:00
            return current >= from || current < to;
        }
        return current >= from && current < to;
    };

    const prices = flights.map((f) => f.price);
    const PRICE_MIN = Math.floor(Math.min(...prices));
    const PRICE_MAX = Math.ceil(Math.max(...prices));

    const durations = flights.map((f) => {
        const match = f.duration.match(/(\d+)h\s*(\d+)?m?/);
        const hours = match ? parseInt(match[1]) : 0;
        const minutes = match && match[2] ? parseInt(match[2]) : 0;
        return hours + minutes / 60;
    });
    const DURATION_MIN = Math.floor(Math.min(...durations));
    const DURATION_MAX = Math.ceil(Math.max(...durations));

    const flightDates = flights.map((f) => new Date(f.date));
    const bookedDates = flights.map((f) => new Date(f.bookedOn));
    const MIN_FLIGHT_DATE = new Date(Math.min(...flightDates));
    const MAX_DATE = new Date();
    const MIN_BOOKED_DATE = new Date(Math.min(...bookedDates));

    const [open, setOpen] = useState(false);

    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedCabins, setSelectedCabins] = useState([]);
    const [selectedPrefs, setSelectedPrefs] = useState([]);
    const [selectedRefunds, setSelectedRefunds] = useState([]);
    const [stops, setStops] = useState([]);
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [flightDuration, setFlightDuration] = useState([DURATION_MIN, DURATION_MAX]);
    const [arrivalTime, setArrivalTime] = useState([]);
    const [departureTime, setDepartureTime] = useState([]);
    const [flightDateFrom, setFlightDateFrom] = useState(MIN_FLIGHT_DATE);
    const [flightDateTo, setFlightDateTo] = useState(MAX_DATE);
    const [bookedDateFrom, setBookedDateFrom] = useState(MIN_BOOKED_DATE);
    const [bookedDateTo, setBookedDateTo] = useState(MAX_DATE);

    const toggleSelection = (item, setter) => {
        setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    };

    const hasActiveFilters = useMemo(() => {
        return (
            [selectedAirlines, selectedAmenities, selectedCabins, selectedPrefs, selectedRefunds, stops, arrivalTime, departureTime].reduce(
                (acc, curr) => acc + curr.length,
                0,
            ) + (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX ? 1 : 0)
        );
    }, [selectedAirlines, selectedAmenities, selectedCabins, selectedPrefs, selectedRefunds, stops, priceRange, arrivalTime, departureTime]);

    const applyFilters = () => {
        let filtered = [...flights];

        if (selectedAirlines.length) filtered = filtered.filter((f) => selectedAirlines.includes(f.airline));
        if (stops.length) filtered = filtered.filter((f) => stops.includes(f.type));

        filtered = filtered.filter((f) => {
            const d = new Date(f.date);
            return !isBefore(d, flightDateFrom) && !isAfter(d, flightDateTo);
        });

        filtered = filtered.filter((f) => {
            const d = new Date(f.bookedOn);
            return !isBefore(d, bookedDateFrom) && !isAfter(d, bookedDateTo);
        });

        filtered = filtered.filter((f) => f.price >= priceRange[0] && f.price <= priceRange[1]);

        const getDuration = (f) => {
            const m = f.duration.match(/(\d+)h\s*(\d+)?m?/);
            return (parseInt(m[1]) || 0) + (parseInt(m[2]) || 0) / 60;
        };

        filtered = filtered.filter((f) => {
            const dur = getDuration(f);
            return dur >= flightDuration[0] && dur <= flightDuration[1];
        });
        if (arrivalTime.length) {
            filtered = filtered.filter((f) => arrivalTime.some((label) => isTimeInRange(f.arrivalTime, label)));
        }
        if (departureTime.length) {
            filtered = filtered.filter((f) => departureTime.some((label) => isTimeInRange(f.departureTime, label)));
        }

        if (onApply) onApply(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [
        selectedAirlines,
        selectedAmenities,
        selectedCabins,
        selectedPrefs,
        selectedRefunds,
        stops,
        priceRange,
        flightDuration,
        arrivalTime,
        departureTime,
        flightDateFrom,
        flightDateTo,
        bookedDateFrom,
        bookedDateTo,
    ]);

    const handleReset = () => {
        setSelectedAirlines([]);
        setSelectedAmenities([]);
        setSelectedCabins([]);
        setSelectedPrefs([]);
        setSelectedRefunds([]);
        setStops([]);
        setPriceRange([PRICE_MIN, PRICE_MAX]);
        setFlightDuration([DURATION_MIN, DURATION_MAX]);
        setArrivalTime([]);
        setDepartureTime([]);
        setFlightDateFrom(MIN_FLIGHT_DATE);
        setFlightDateTo(MAX_DATE);
        setBookedDateFrom(MIN_BOOKED_DATE);
        setBookedDateTo(MAX_DATE);
    };

    const renderDateRange = (label, from, to, setFrom, setTo, min, max) => (
        <div>
            <label className="block py-3 text-base font-extrabold text-gray-700">{label}</label>
            <div className="flex items-center gap-4">
                <DatePicker
                    selected={from}
                    onChange={(date) => setFrom(date)}
                    selectsStart
                    startDate={from}
                    endDate={to}
                    minDate={min}
                    maxDate={max}
                    className="w-full rounded border px-2 py-1 text-sm"
                    dateFormat="yyyy-MM-dd"
                />
                <span className="text-gray-500">to</span>
                <DatePicker
                    selected={to}
                    onChange={(date) => setTo(date)}
                    selectsEnd
                    startDate={from}
                    endDate={to}
                    minDate={min}
                    maxDate={max}
                    className="w-full rounded border px-2 py-1 text-sm"
                    dateFormat="yyyy-MM-dd"
                />
            </div>
        </div>
    );

    const renderCheckboxList = (label, items, selected, setter) => (
        <div>
            <div className="mb-2 flex items-center justify-between border-b py-3 text-base">
                <span className="font-extrabold text-gray-700">{label}</span>
                <label className="flex items-center gap-1 text-xs font-medium text-blue-600">
                    <span className="mr-3 cursor-pointer"> Select All</span>
                    <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={selected.length === items.length}
                        onChange={(e) => setter(e.target.checked ? items : [])}
                    />
                </label>
            </div>
            <div className="space-y-2">
                {items.map((item) => (
                    <label
                        key={item}
                        className="flex items-center justify-between py-2"
                    >
                        <span className="text-gray-700">{item}</span>
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={selected.includes(item)}
                            onChange={() => toggleSelection(item, setter)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );

    const renderRangeSlider = (label, range, setRange, min, max, unit = "") => (
        <div>
            <label className="block py-3 text-base font-extrabold text-gray-700">{label}</label>
            <div className="mb-1 flex justify-between text-gray-500">
                <span>
                    {unit}
                    {range[0]}
                </span>
                <span>
                    {unit}
                    {range[1]}
                </span>
            </div>
            <div className="p-2">
                <Range
                    step={STEP}
                    min={min}
                    max={max}
                    values={range}
                    onChange={setRange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="h-2 w-full rounded-full bg-gray-200"
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            className="h-5 w-5 rounded-full bg-blue-600"
                        />
                    )}
                />
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`relative flex items-center gap-2 rounded-lg border px-4 py-2 ${hasActiveFilters ? "border-blue-600" : "border-gray-300"} bg-white text-sm text-gray-700 hover:bg-gray-100`}
            >
                <Filter size={16} /> Filters
                {hasActiveFilters > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {hasActiveFilters}
                    </span>
                )}
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur">
                    <div className="max-h-[95%] w-full max-w-md overflow-auto rounded-2xl bg-white shadow-xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                            <h2 className="text-lg font-semibold">Apply filters</h2>
                            <X
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <div className="space-y-6 px-6 py-4 text-sm">
                            {renderRangeSlider("Price Range", priceRange, setPriceRange, PRICE_MIN, PRICE_MAX, "$")}
                            {renderDateRange(
                                "Flight Date",
                                flightDateFrom,
                                flightDateTo,
                                setFlightDateFrom,
                                setFlightDateTo,
                                MIN_FLIGHT_DATE,
                                MAX_DATE,
                            )}
                            {renderDateRange(
                                "Booked Date",
                                bookedDateFrom,
                                bookedDateTo,
                                setBookedDateFrom,
                                setBookedDateTo,
                                MIN_BOOKED_DATE,
                                MAX_DATE,
                            )}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Number of Stops</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {stopOptions.map((stop) => (
                                        <button
                                            key={stop}
                                            onClick={() => toggleSelection(stop, setStops)}
                                            className={`w-full rounded-full border px-3 py-2 text-sm ${stops.includes(stop) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"}`}
                                        >
                                            {stop}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {renderRangeSlider("Flight Duration (hrs)", flightDuration, setFlightDuration, DURATION_MIN, DURATION_MAX)}
                            {renderCheckboxList("Airlines", airlinesList, selectedAirlines, setSelectedAirlines)}
                            {renderCheckboxList("Amenities", amenitiesList, selectedAmenities, setSelectedAmenities)}
                            {renderCheckboxList("Refund & Reschedule", refundOptions, selectedRefunds, setSelectedRefunds)}
                            {renderCheckboxList("Flight Preferences", preferences, selectedPrefs, setSelectedPrefs)}
                            {renderCheckboxList("Cabin Class", cabinClasses, selectedCabins, setSelectedCabins)}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Arrival Time</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection(opt, setArrivalTime)}
                                            className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                                arrivalTime.includes(opt) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Departure Time</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection(opt, setDepartureTime)}
                                            className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                                departureTime.includes(opt) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="sticky bottom-0 flex justify-between border-t bg-white px-6 py-4">
                            <button
                                onClick={handleReset}
                                className="text-sm text-blue-600"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
