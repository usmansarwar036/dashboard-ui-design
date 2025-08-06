import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { isAfter, isBefore } from "date-fns";
import { Range } from "react-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CarFront, Users, Briefcase, Fuel, CircleDot, Star, Filter, X, LayoutGrid, List, Car, ArrowRight } from "lucide-react";

export default function TransportBookingsPage() {
    const transports = [
        {
            title: "Audi A5",
            company: "Sixt",
            logo: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            image: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            rating: 4.5,
            distance: 1.2, // in km
            energySource: "Gasoline",
            providerPolicy: ["Refundable", "Free Cancellation", "Instant Confirmation"],
            price: 1250,
            details: {
                type: "Medium",
                capacity: 4,
                bags: "2–3",
                doors: 2,
                fuel: "Gasoline",
                transmission: "Automatic",
            },
            pickup: {
                city: "Dubai",
                date: "Mon, Dec 16",
                time: "09:00 AM",
                location: "DXB - Dubai International Airport",
            },
            dropoff: {
                city: "Dubai",
                date: "Fri, Dec 20",
                time: "23:00 PM",
                location: "DWC - Dubai World Central Airport",
            },
            duration: "5 Days",
        },
        {
            title: "Toyota Camry",
            company: "Avis",
            logo: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            image: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            rating: 4.2,
            distance: 2.3,
            energySource: "Gasoline",
            providerPolicy: ["Free Cancellation"],
            price: 850,
            details: {
                type: "Sedan",
                capacity: 5,
                bags: "2–3",
                doors: 4,
                fuel: "Gasoline",
                transmission: "Automatic",
            },
            pickup: {
                city: "Abu Dhabi",
                date: "Tue, Dec 17",
                time: "10:00 AM",
                location: "AUH - Abu Dhabi Intl Airport",
            },
            dropoff: {
                city: "Abu Dhabi",
                date: "Sat, Dec 21",
                time: "22:00 PM",
                location: "AUH - Abu Dhabi Intl Airport",
            },
            duration: "4 Days",
        },
        {
            title: "Tesla Model 3",
            company: "Budget",
            logo: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            image: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            rating: 4.8,
            distance: 0.5,
            energySource: "Electric",
            providerPolicy: ["Refundable", "Instant Confirmation"],
            price: 1600,
            details: {
                type: "Electric",
                capacity: 5,
                bags: "2",
                doors: 4,
                fuel: "Electric",
                transmission: "Automatic",
            },
            pickup: {
                city: "Dubai",
                date: "Wed, Dec 18",
                time: "08:30 AM",
                location: "DXB - Dubai Intl Airport",
            },
            dropoff: {
                city: "Dubai",
                date: "Mon, Dec 23",
                time: "19:30 PM",
                location: "DXB - Dubai Intl Airport",
            },
            duration: "5 Days",
        },
        {
            title: "Hyundai H1 Van",
            company: "Dollar",
            logo: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            image: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            rating: 3.9,
            distance: 4.8,
            energySource: "Gasoline",
            providerPolicy: ["Instant Confirmation"],
            price: 1100,
            details: {
                type: "Van",
                capacity: 8,
                bags: "4–5",
                doors: 4,
                fuel: "Gasoline",
                transmission: "Manual",
            },
            pickup: {
                city: "Sharjah",
                date: "Thu, Dec 19",
                time: "11:00 AM",
                location: "SHJ - Sharjah Airport",
            },
            dropoff: {
                city: "Sharjah",
                date: "Mon, Dec 23",
                time: "21:00 PM",
                location: "SHJ - Sharjah Airport",
            },
            duration: "4 Days",
        },
        {
            title: "Chevrolet Spark",
            company: "Thrifty",
            logo: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            image: "https://i.ibb.co/QjHzhDqN/image-removebg-preview.png",
            rating: 3.2,
            distance: 9.5,
            energySource: "Gasoline",
            providerPolicy: [],
            price: 600,
            details: {
                type: "Hatchback",
                capacity: 4,
                bags: "1–2",
                doors: 4,
                fuel: "Gasoline",
                transmission: "Automatic",
            },
            pickup: {
                city: "Dubai",
                date: "Fri, Dec 20",
                time: "13:00 PM",
                location: "DXB - Dubai Intl Airport",
            },
            dropoff: {
                city: "Dubai",
                date: "Sun, Dec 22",
                time: "21:00 PM",
                location: "DXB - Dubai Intl Airport",
            },
            duration: "2 Days",
        },
    ];

    const [filteredTransports, setFilteredTransports] = useState(transports);
    const [lgGridView, setLgGridView] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        setPage(1);
    }, [filteredTransports]);

    const totalPages = Math.ceil(filteredTransports.length / perPage);
    const paginatedTransports = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return filteredTransports.slice(start, end);
    }, [filteredTransports, page, perPage]);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Transport Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to="/dashboard/">Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <TransportFilter
                    transports={transports}
                    onApply={setFilteredTransports}
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
                {/* content start here */}
                {filteredTransports.map((item, index) => {
                    const PickupDropSection = () => (
                        <>
                            {/* Divider */}
                            <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
                            {/* Date Info */}
                            <div className="flex items-center justify-between">
                                {/* Pick-up */}
                                <div className="mr-3 text-nowrap text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">Pick-up date</div>
                                    <div className="text-base font-semibold leading-none text-black dark:text-white">{item.pickup.date}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{item.pickup.time}</div>
                                </div>

                                <div className="relative mx-auto h-[56px] w-full">
                                    {/* Gradient Line using SVG */}
                                    <svg
                                        className="absolute left-3 right-3 top-1/2 h-[5px] w-[calc(100%-24px)] -translate-y-1/2"
                                        viewBox="0 0 100 5"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="lineGradient"
                                                x1="0"
                                                y1="2.5"
                                                x2="100"
                                                y2="2.5"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop
                                                    offset="0"
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
                                        <line
                                            x1="0"
                                            y1="2.5"
                                            x2="100"
                                            y2="2.5"
                                            stroke="url(#lineGradient)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    {/* Endpoints */}
                                    <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                    <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                                    {/* Icon in Center */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1A6BFF]">
                                        <Car
                                            size={28}
                                            fill="#1A6BFF"
                                            stroke="#1A6BFF"
                                        />
                                    </div>

                                    {/* Duration Above Line */}
                                    <div className="absolute -top-1 w-full text-center text-sm text-[#6B7280]">
                                        <div>{item.duration}</div>
                                    </div>
                                </div>
                                {/* Drop-off */}
                                <div className="ml-3 text-nowrap text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">Drop-off Date</div>
                                    <div className="text-base font-semibold leading-none text-black dark:text-white">{item.dropoff.date}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{item.dropoff.time}</div>
                                </div>
                            </div>
                            {/* Divider */}
                            <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
                            {/* Pickup / Drop-off */}
                            <div className="mt-4 flex flex-wrap items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-white">
                                    <p>
                                        <span className="font-semibold">Pick-up :</span> {item.pickup.location}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Drop-off :</span> {item.dropoff.location}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-white">Note : All times are in local time</p>
                                </div>
                                <div>
                                    <Link
                                        to="/dashboard/bookings/transports/234"
                                        className="inline-flex items-center rounded-lg bg-blue-600 p-2 text-sm font-medium text-white"
                                    >
                                        View Booking
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </>
                    );
                    return (
                        <div
                            key={index}
                            className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] dark:text-white"
                        >
                            {/* Top: Title and logo */}
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-bold text-gray-800 dark:text-white">{item.title}</div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={item.logo}
                                        alt={item.company}
                                        className="h-5"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-white">{item.company}</span>
                                    <div className="flex items-center text-sm text-yellow-500">
                                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        <span className="ml-1 font-semibold">{item.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex pt-5">
                                {/* Image */}
                                <div className="flex w-[30%] items-center p-2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full object-contain"
                                    />
                                </div>
                                <div className="w-[70%]">
                                    {/* Details Row */}
                                    <div className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-2 px-3 text-sm text-gray-600 dark:text-white md:gap-x-5 md:gap-y-2 md:px-5 lg:gap-x-7 lg:gap-y-3 lg:px-7 xl:gap-x-10 xl:gap-y-5 xl:px-10">
                                        <div className="flex items-center gap-1">
                                            <CarFront className="h-4 w-4" />
                                            {item.details.type}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {item.details.capacity}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Briefcase className="h-4 w-4" />
                                            {item.details.bags}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CircleDot className="h-4 w-4" />
                                            {item.details.doors}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Fuel className="h-4 w-4" />
                                            {item.details.fuel}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Fuel className="h-4 w-4" />
                                            <span className="text-sm font-medium">{item.details.transmission}</span>
                                        </div>
                                    </div>
                                    {!lgGridView && <div className="ml-3 p-5 pb-0">{PickupDropSection()}</div>}
                                </div>
                            </div>

                            {lgGridView && <div className="pt-2">{PickupDropSection()}</div>}
                        </div>
                    );
                })}
                {/* content ends here */}
            </div>
            {paginatedTransports.length == 0 && (
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

function TransportFilter({ transports, onApply }) {
    const STEP = 50;

    const prices = transports.map((t) => t.price);
    const PRICE_MIN = Math.floor(Math.min(...prices));
    const PRICE_MAX = Math.ceil(Math.max(...prices));

    const providersList = [...new Set(transports.map((t) => t.company))];
    const energyTypes = ["Gasoline", "Electric"];
    const providerPolicies = ["Instant Confirmation", "Free Cancellation", "Refundable"];
    const distanceOptions = [1, 2.5, 5, 10]; // in km
    const ratingOptions = [4.5, 4, 3.5, 3];
    const seatOptions = ["2", "3-4", "5-6", ">6"];

    const [open, setOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [seats, setSeats] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [energy, setEnergy] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [distance, setDistance] = useState([]);
    const [ratings, setRatings] = useState([]);

    const toggle = (value, setFn) => {
        setFn((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    };

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (seats.length) count++;
        if (selectedProviders.length) count++;
        if (energy.length) count++;
        if (policies.length) count++;
        if (distance.length) count++;
        if (ratings.length) count++;
        if (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX) count++;
        return count;
    }, [seats, selectedProviders, energy, policies, distance, ratings, priceRange]);

    const applyFilters = () => {
        let filtered = [...transports];

        if (seats.length) {
            filtered = filtered.filter((t) => {
                const c = t.details.capacity;
                return seats.some((s) => {
                    if (s === "2") return c === 2;
                    if (s === "3-4") return c >= 3 && c <= 4;
                    if (s === "5-6") return c >= 5 && c <= 6;
                    if (s === ">6") return c > 6;
                });
            });
        }

        if (selectedProviders.length) {
            filtered = filtered.filter((t) => selectedProviders.includes(t.company));
        }

        if (energy.length) {
            filtered = filtered.filter((t) => energy.includes(t.energySource));
        }

        if (policies.length) {
            filtered = filtered.filter((t) => policies.every((p) => t.providerPolicy?.includes(p)));
        }

        if (distance.length) {
            const maxDistance = Math.min(...distance);
            filtered = filtered.filter((t) => t.distance <= maxDistance);
        }

        if (ratings.length) {
            const minRating = Math.min(...ratings);
            filtered = filtered.filter((t) => t.rating >= minRating);
        }

        filtered = filtered.filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1]);

        if (onApply) onApply(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [seats, selectedProviders, energy, policies, distance, ratings, priceRange]);

    const handleReset = () => {
        setSeats([]);
        setSelectedProviders([]);
        setEnergy([]);
        setPolicies([]);
        setDistance([]);
        setRatings([]);
        setPriceRange([PRICE_MIN, PRICE_MAX]);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`relative flex items-center gap-2 rounded-lg border ${activeFilterCount ? "border-blue-600" : "border-gray-300"} bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
            >
                <Filter size={16} /> Filters
                {activeFilterCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur">
                    <div className="max-h-[95%] w-full max-w-md overflow-auto rounded-2xl bg-white shadow-xl dark:bg-white/[0.03] dark:text-white">
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03]">
                            <h2 className="text-base font-semibold">Appply Filters</h2>
                            <X
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        {/* Body */}
                        <div className="space-y-6 px-6 py-4 text-sm">
                            {/* Price */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Price Range</label>
                                <div className="flex justify-between text-gray-500 dark:text-white/70">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                                <div className="p-2">
                                    <Range
                                        step={STEP}
                                        min={PRICE_MIN}
                                        max={PRICE_MAX}
                                        values={priceRange}
                                        onChange={setPriceRange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/20"
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

                            {/* Seat Capacity */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Seats Capacity</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {seatOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggle(opt, setSeats)}
                                            className={`rounded-full border px-2 py-1 text-xs ${
                                                seats.includes(opt)
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-gray-300 text-gray-700 dark:border-gray-800 dark:text-white"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Providers */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Rental Providers</label>
                                <div className="space-y-1">
                                    {providersList.map((prov) => (
                                        <label
                                            key={prov}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span>{prov}</span>
                                            <input
                                                type="checkbox"
                                                checked={selectedProviders.includes(prov)}
                                                onChange={() => toggle(prov, setSelectedProviders)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Energy */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Energy Source</label>
                                <div className="flex gap-2">
                                    {energyTypes.map((e) => (
                                        <button
                                            key={e}
                                            onClick={() => toggle(e, setEnergy)}
                                            className={`rounded-full border px-3 py-1 text-xs ${
                                                energy.includes(e)
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-gray-300 text-gray-700 dark:border-gray-800 dark:text-white"
                                            }`}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Provider Policy */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Provider Policy</label>
                                <div className="flex flex-wrap gap-2">
                                    {providerPolicies.map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => toggle(p, setPolicies)}
                                            className={`rounded-full border px-3 py-1 text-xs ${
                                                policies.includes(p)
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-gray-300 text-gray-700 dark:border-gray-800 dark:text-white"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Distance */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Distance</label>
                                <div className="flex flex-wrap gap-2">
                                    {distanceOptions.map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => toggle(d, setDistance)}
                                            className={`rounded-full border px-3 py-1 text-xs ${
                                                distance.includes(d)
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-gray-300 text-gray-700 dark:border-gray-800 dark:text-white"
                                            }`}
                                        >
                                            Within {d} km
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block py-3 text-base font-extrabold text-gray-700">Rating</label>
                                <div className="flex flex-wrap gap-2">
                                    {ratingOptions.map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => toggle(r, setRatings)}
                                            className={`rounded-full border px-3 py-1 text-xs ${
                                                ratings.includes(r)
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-gray-300 text-gray-700 dark:border-gray-800 dark:text-white"
                                            }`}
                                        >
                                            {r} or Higher
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 flex justify-between border-t bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03]">
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
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
