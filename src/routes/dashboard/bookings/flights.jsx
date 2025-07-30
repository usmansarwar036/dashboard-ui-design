import { Link } from "react-router-dom";
import { Plane, Filter, X } from "lucide-react";
import { Range } from "react-range";
import { useState, useMemo } from "react";

export default function FlightBookingsPage() {
    const flights = [
        {
            id: 1,
            airline: "Japan Airlines",
            logo: "https://placehold.co/32x32?text=JA",
            date: "Thu, Dec 21 2023",
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
            date: "Fri, Jan 05 2024",
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
            date: "Mon, Feb 12 2024",
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
            date: "Mon, Feb 12 2024",
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
            </div>

            {/* Flight Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredFlights.map((flight) => (
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
                                <h6 className="m-0 inline-block text-sm font-medium">ATO Invoice</h6>
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

    const toggleSelection = (item, setter) => {
        setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    };

    const hasActiveFilters = useMemo(() => {
        return (
            [selectedAirlines, selectedAmenities, selectedCabins, selectedPrefs, selectedRefunds, stops, arrivalTime, departureTime].some(
                (arr) => arr.length,
            ) ||
            priceRange[0] > PRICE_MIN ||
            priceRange[1] < PRICE_MAX
        );
    }, [selectedAirlines, selectedAmenities, selectedCabins, selectedPrefs, selectedRefunds, stops, priceRange, arrivalTime, departureTime]);

    const handleApply = () => {
        let filtered = [...flights];
        if (selectedAirlines.length) filtered = filtered.filter((f) => selectedAirlines.includes(f.airline));
        if (stops.length) filtered = filtered.filter((f) => stops.includes(f.type));
        setOpen(false);
        if (onApply) onApply(filtered);
    };

    const renderCheckboxList = (label, items, selected, setter) => (
        <div>
            <div className="mb-2 flex justify-between">
                <span className="font-medium text-gray-700">{label}</span>
                <div className="flex gap-2 text-xs text-blue-600">
                    <button onClick={() => setter(items)}>Select All</button>
                    <button onClick={() => setter([])}>Deselect All</button>
                </div>
            </div>
            <div className="space-y-2">
                {items.map((item) => (
                    <label
                        key={item}
                        className="flex items-center justify-between rounded-lg border px-3 py-2"
                    >
                        <span className="text-gray-700">{item}</span>
                        <input
                            type="checkbox"
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
            <label className="mb-2 block text-gray-700">{label}</label>
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
    );

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${hasActiveFilters ? "border-blue-600" : "border-gray-300"} bg-white text-sm text-gray-700 hover:bg-gray-100`}
            >
                <Filter size={16} /> Filters
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur">
                    <div className="max-h-[95%] w-full max-w-md overflow-auto rounded-2xl bg-white shadow-xl">
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                            <h2 className="text-lg font-semibold">Apply filters</h2>
                            <X
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        {/* Body */}
                        <div className="space-y-6 px-6 py-4 text-sm">
                            {renderRangeSlider("Price Range", priceRange, setPriceRange, PRICE_MIN, PRICE_MAX, "$")}
                            <div>
                                <label className="mb-2 block text-gray-700">Number of Stops</label>
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

                            {/* Arrival & Departure Time */}
                            <div>
                                <label className="mb-2 block text-gray-700">Arrival Time</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection(opt, setArrivalTime)}
                                            className={`w-full rounded-lg border px-3 py-2 text-sm ${arrivalTime.includes(opt) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-gray-700">Departure Time</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection(opt, setDepartureTime)}
                                            className={`w-full rounded-lg border px-3 py-2 text-sm ${departureTime.includes(opt) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 flex justify-between border-t bg-white px-6 py-4">
                            <button
                                onClick={() => {
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
                                }}
                                className="text-sm text-gray-500"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleApply}
                                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
