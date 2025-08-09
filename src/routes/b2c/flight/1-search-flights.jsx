// SearchFlights.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    MoreHorizontal,
    Share2,
    Bell,
    Sliders,
    X,
    Plane,
    Calendar,
    ArrowLeft,
    Filter,
    ChevronDown,
    Copy,
    Facebook,
    MessageSquare,
} from "lucide-react";
import { Range, getTrackBackground } from "react-range";
import "react-day-picker/dist/style.css";

/**
 * -------------------------------
 * Data (default structure + flights)
 * -------------------------------
 */
const defaultForm = {
    tripType: "oneway",
    route: [
        {
            from: {
                city: "New York",
                country: "USA",
                code: "JFK",
                desc: "John F. Kennedy International Airport",
            },
            to: {
                city: "New York",
                country: "USA",
                code: "JFK",
                desc: "John F. Kennedy International Airport",
            },
            date: "2025-08-06",
        },
    ],
    passengers: { adult: 1, child: 0, infant: 0 },
    seatClass: "economy",
};

const flightsbookings = [
    {
        id: 1,
        airline: "Japan Airlines",
        logo: "https://placehold.co/32x32?text=JA",
        date: "2025-08-06",
        bookedOn: "2025-06-20",
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
        date: "2025-08-07",
        bookedOn: "2025-06-20",
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
        date: "2025-08-06",
        bookedOn: "2025-06-20",
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
        date: "2025-08-06",
        bookedOn: "2025-06-20",
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

/**
 * -------------------------------
 * Helper parsers & ed filter/sort functions
 * -------------------------------
 */
const parseDurationHours = (durStr) => {
    // "7h 20m" => 7.333...
    const m = durStr.match(/(\d+)h\s*(\d+)?m?/);
    const h = m ? Number(m[1]) : 0;
    const mm = m && m[2] ? Number(m[2]) : 0;
    return h + mm / 60;
};

const isTimeInRange = (timeStr, rangeLabel) => {
    const [fromStr, toStr] = rangeLabel.split(" - ");
    const [fromHour, fromMin] = fromStr.split(":").map(Number);
    const [toHour, toMin] = toStr.split(":").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);

    const current = hour * 60 + minute;
    const from = fromHour * 60 + fromMin;
    const to = toHour * 60 + toMin;

    if (from > to) return current >= from || current < to;
    return current >= from && current < to;
};

/**
 * applyFilters: ed so unit tests can import
 * filters param: {
 *  airlines: [], stops: [], priceRange: [min,max],
 *  durationRange: [min,max], departureTimes: [], arrivalTimes: [], dateFrom, dateTo
 * }
 */
function applyFiltersToList(list, filters) {
    let filtered = [...list];

    const {
        airlines = [],
        stops = [],
        priceRange = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        durationRange = [0, Number.MAX_SAFE_INTEGER],
        departureTimes = [],
        arrivalTimes = [],
        dateFrom,
        dateTo,
    } = filters || {};

    if (airlines.length) filtered = filtered.filter((f) => airlines.includes(f.airline));
    if (stops.length) filtered = filtered.filter((f) => stops.includes(f.type));
    filtered = filtered.filter((f) => f.price >= priceRange[0] && f.price <= priceRange[1]);

    filtered = filtered.filter((f) => {
        const dur = parseDurationHours(f.duration);
        return dur >= durationRange[0] && dur <= durationRange[1];
    });

    if (departureTimes.length) {
        filtered = filtered.filter((f) => departureTimes.some((r) => isTimeInRange(f.departureTime, r)));
    }
    if (arrivalTimes.length) {
        filtered = filtered.filter((f) => arrivalTimes.some((r) => isTimeInRange(f.arrivalTime, r)));
    }

    if (dateFrom && dateTo) {
        filtered = filtered.filter((f) => {
            const d = new Date(f.date);
            return d >= new Date(dateFrom) && d <= new Date(dateTo);
        });
    }

    return filtered;
}

/**
 * applySortToList: ed for unit tests
 * types: "Lowest Price", "Earliest Departure", "Latest Departure", "Shortest Duration"
 */
function applySortToList(list, type) {
    const copy = [...list];
    if (type === "Lowest Price") copy.sort((a, b) => a.price - b.price);
    if (type === "Earliest Departure") copy.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    if (type === "Latest Departure") copy.sort((a, b) => b.departureTime.localeCompare(a.departureTime));
    if (type === "Shortest Duration") copy.sort((a, b) => parseDurationHours(a.duration) - parseDurationHours(b.duration));
    return copy;
}

/**
 * -------------------------------
 * Presentational components
 * -------------------------------
 */
function OrigionDestinationArrowComponent({ flight }) {
    return (
        <div className="p-5">
            <div className="mb-3 flex items-center justify-between border-b pb-3 dark:border-gray-800">
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

            <div className="flex items-center justify-between">
                <div className="mr-3 text-center">
                    <div className="mb-1 text-sm text-[#6B7280]">{flight.from.city}</div>
                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.from.time}</div>
                    <div className="mt-1 text-sm text-[#6B7280]">{flight.from.code}</div>
                </div>

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

                    <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                    <div className="absolute left-1/2 top-[0%] -translate-x-1/2 rotate-45 text-[#1A6BFF]">
                        <Plane
                            size={28}
                            fill="#1A6BFF"
                            stroke="#1A6BFF"
                        />
                    </div>

                    <div className="absolute top-[35px] w-full text-center text-sm text-[#6B7280]">
                        <div>{flight.duration}</div>
                        <div>{flight.type}</div>
                    </div>
                </div>

                <div className="ml-3 text-center">
                    <div className="mb-1 text-sm text-[#6B7280]">{flight.to.city}</div>
                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.to.time}</div>
                    <div className="mt-1 text-sm text-[#6B7280]">{flight.to.code}</div>
                </div>
            </div>
        </div>
    );
}

/* Reusable modal wrapper */
function Modal({ open, onClose, title, children, footer, centerOnDesktop = true }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur">
            <div
                className={`max-h-screen w-full ${centerOnDesktop ? "max-w-md" : "max-w-3xl"} dark:bg-dark/[0.03] overflow-y-auto rounded-2xl bg-white text-black shadow-xl dark:text-white`}
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <div className="dark:bg-dark/[0.03] sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 dark:border-gray-800">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <X
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                <div className="p-4">{children}</div>

                {footer && <div className="dark:bg-dark/[0.03] sticky bottom-0 border-t bg-white px-4 py-3 dark:border-gray-800">{footer}</div>}
            </div>
        </div>
    );
}

/**
 * ShareModal: deep links for WhatsApp / Facebook / Telegram + Copy Link
 */
function ShareModal({ open, onClose }) {
    const items = [
        { label: "WhatsApp", id: "whatsapp", url: (text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}` },
        { label: "Facebook", id: "facebook", url: (text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}` },
        { label: "Telegram", id: "telegram", url: (text) => `https://t.me/share/url?url=${encodeURIComponent(text)}` },
        { label: "Copy Link", id: "copy" },
    ];

    const handleShare = (id) => {
        const pageUrl = window.location.href;
        if (id === "copy") {
            navigator.clipboard?.writeText(pageUrl);
            onClose();
            return;
        }
        const target = items.find((i) => i.id === id);
        if (target && target.url) {
            window.open(target.url(pageUrl), "_blank", "noopener");
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Share Results"
            footer={
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        Close
                    </button>
                </div>
            }
        >
            <div className="flex gap-4 overflow-x-auto py-2">
                {items.map((it) => (
                    <button
                        key={it.id}
                        onClick={() => handleShare(it.id)}
                        className="dark:bg-dark/[0.03] flex min-w-[88px] flex-col items-center gap-2 rounded-lg border p-3 dark:border-gray-800"
                    >
                        <div className="rounded-md p-2">
                            {it.id === "whatsapp" && <MessageSquare />}
                            {it.id === "facebook" && <Facebook />}
                            {it.id === "telegram" && <MessageSquare />}
                            {it.id === "copy" && <Copy />}
                        </div>
                        <div className="text-sm">{it.label}</div>
                    </button>
                ))}
            </div>
        </Modal>
    );
}

/**
 * PriceAlertModal: shows flight preview & posts to /api/price-alerts
 */
function PriceAlertModal({ open, onClose, flight }) {
    const [minTarget, setMinTarget] = useState("");
    const [maxTarget, setMaxTarget] = useState("");
    const [onlyDirect, setOnlyDirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const createPriceAlert = async () => {
        // simple validation
        const payload = {
            flightId: flight?.id,
            minTarget: minTarget ? Number(minTarget) : null,
            maxTarget: maxTarget ? Number(maxTarget) : null,
            onlyDirect,
            createdAt: new Date().toISOString(),
        };

        try {
            setLoading(true);
            // stub endpoint - replace with your real endpoint
            const res = await fetch("/api/price-alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            // treat success generically
            if (!res.ok) {
                console.warn("price alert endpoint returned non-ok", res.status);
            }
            console.log("createPriceAlert -> payload", payload);
        } catch (err) {
            console.error("price alert error", err);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    const footer = (
        <div className="flex items-center justify-between">
            <button
                onClick={onClose}
                className="text-sm text-blue-600"
            >
                Cancel
            </button>
            <button
                onClick={createPriceAlert}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create"}
            </button>
        </div>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create Price Alert"
            footer={footer}
        >
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                        <Bell />
                    </div>
                    <div className="text-sm text-gray-700">
                        Get notified when prices drop for this route. We'll send an email or push notification.
                    </div>
                </div>

                <div className="dark:bg-dark/[0.03] rounded-lg border p-2 dark:border-gray-800">
                    {flight ? <OrigionDestinationArrowComponent flight={flight} /> : <div className="text-sm text-gray-500">No flight selected</div>}
                </div>

                <div>
                    <label className="text-sm font-semibold">Target price range</label>
                    <div className="mt-2 flex gap-2">
                        <input
                            value={minTarget}
                            onChange={(e) => setMinTarget(e.target.value)}
                            placeholder="Min"
                            className="dark:bg-dark/[0.03] w-1/2 rounded border px-3 py-2 text-sm dark:border-gray-800"
                        />
                        <input
                            value={maxTarget}
                            onChange={(e) => setMaxTarget(e.target.value)}
                            placeholder="Max"
                            className="dark:bg-dark/[0.03] w-1/2 rounded border px-3 py-2 text-sm dark:border-gray-800"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={onlyDirect}
                        onChange={(e) => setOnlyDirect(e.target.checked)}
                    />
                    Only direct flights
                </label>
            </div>
        </Modal>
    );
}

/**
 * FiltersModal: dual-thumb sliders (react-range), checkbox lists, auto-apply
 */
function FiltersModal({ open, onClose, flights, onApply }) {
    // derived options
    const airlinesList = useMemo(() => [...new Set(flights.map((f) => f.airline))], [flights]);
    const stopsOptions = useMemo(() => [...new Set(flights.map((f) => f.type))], [flights]);
    const durations = flights.map((f) => parseDurationHours(f.duration));
    const DURATION_MIN = Math.floor(Math.min(...durations));
    const DURATION_MAX = Math.ceil(Math.max(...durations));
    const prices = flights.map((f) => f.price);
    const PRICE_MIN = Math.floor(Math.min(...prices));
    const PRICE_MAX = Math.ceil(Math.max(...prices));
    const timeOptions = ["00:00 - 06:00", "06:00 - 12:00", "12:00 - 18:00", "18:00 - 00:00"];

    // state
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedStops, setSelectedStops] = useState([]);
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [durationRange, setDurationRange] = useState([DURATION_MIN, DURATION_MAX]);
    const [departureTimes, setDepartureTimes] = useState([]);
    const [arrivalTimes, setArrivalTimes] = useState([]);

    useEffect(() => {
        // auto apply when filters change
        const filters = {
            airlines: selectedAirlines,
            stops: selectedStops,
            priceRange,
            durationRange,
            departureTimes,
            arrivalTimes,
        };
        const result = applyFiltersToList(flights, filters);
        onApply(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAirlines, selectedStops, priceRange, durationRange, departureTimes, arrivalTimes]);

    const toggle = (item, setter) => setter((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));

    const resetAll = () => {
        setSelectedAirlines([]);
        setSelectedStops([]);
        setPriceRange([PRICE_MIN, PRICE_MAX]);
        setDurationRange([DURATION_MIN, DURATION_MAX]);
        setDepartureTimes([]);
        setArrivalTimes([]);
        onApply(flights);
    };

    const footer = (
        <div className="flex items-center justify-between">
            <button
                onClick={resetAll}
                className="text-sm text-blue-600"
            >
                Reset
            </button>
            <div>
                <button
                    onClick={onClose}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    Done
                </button>
            </div>
        </div>
    );

    // Range rendering helper (dual thumb)
    const RangeSlider = ({ values, min, max, step = 1, onChange, unit = "$", ticks = 5 }) => {
        const stepWidth = (max - min) / (ticks - 1);
        const ticksArr = Array.from({ length: ticks }, (_, i) => Math.round(min + i * stepWidth));
        return (
            <div>
                <div className="mb-1 flex justify-between text-sm text-gray-600">
                    <div>
                        {unit}
                        {values[0]}
                    </div>
                    <div>
                        {unit}
                        {values[1]}
                    </div>
                </div>

                <Range
                    values={values}
                    step={step}
                    min={min}
                    max={max}
                    onChange={onChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    height: "6px",
                                    width: "100%",
                                    borderRadius: "6px",
                                    alignSelf: "center",
                                    background: getTrackBackground({
                                        values,
                                        colors: ["#E5E7EB", "#1A6BFF", "#E5E7EB"],
                                        min,
                                        max,
                                    }),
                                }}
                                className="rounded"
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, index }) => (
                        <div
                            {...props}
                            className="dark:bg-dark/[0.03] flex h-5 w-5 items-center justify-center rounded-full border bg-white dark:border-gray-800"
                        >
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                        </div>
                    )}
                />

                <div className="mt-2 flex justify-between text-xs text-gray-400">
                    {ticksArr.map((t) => (
                        <span key={t}>
                            {unit}
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Filter"
            footer={footer}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Price Range</label>
                    <div className="mt-2">
                        <RangeSlider
                            values={priceRange}
                            min={PRICE_MIN}
                            max={PRICE_MAX}
                            onChange={(v) => setPriceRange(v)}
                            unit="$"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Duration (hrs)</label>
                    <div className="mt-2">
                        <RangeSlider
                            values={durationRange}
                            min={DURATION_MIN}
                            max={DURATION_MAX}
                            onChange={(v) => setDurationRange(v)}
                            unit=""
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Airlines</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {airlinesList.map((a) => (
                            <button
                                key={a}
                                onClick={() => toggle(a, setSelectedAirlines)}
                                className={`rounded-full border px-3 py-1 text-sm ${selectedAirlines.includes(a) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"} dark:border-gray-800`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Stops</label>
                    <div className="mt-2 flex gap-2">
                        {stopsOptions.map((s) => (
                            <button
                                key={s}
                                onClick={() => toggle(s, setSelectedStops)}
                                className={`rounded-lg border px-3 py-2 text-sm ${selectedStops.includes(s) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"} dark:border-gray-800`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Departure Time</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {timeOptions.map((t) => (
                            <button
                                key={t}
                                onClick={() => toggle(t, setDepartureTimes)}
                                className={`rounded-lg border px-3 py-2 text-sm ${departureTimes.includes(t) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"} dark:border-gray-800`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Arrival Time</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {timeOptions.map((t) => (
                            <button
                                key={t}
                                onClick={() => toggle(t, setArrivalTimes)}
                                className={`rounded-lg border px-3 py-2 text-sm ${arrivalTimes.includes(t) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"} dark:border-gray-800`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

/**
 * SortModal
 */
function SortModal({ open, onClose, onApply }) {
    const opts = ["Lowest Price", "Earliest Departure", "Latest Departure", "Shortest Duration"];
    const [selected, setSelected] = useState(opts[0]);
    const footer = (
        <div className="flex items-center justify-between">
            <div />
            <button
                onClick={() => {
                    onApply(selected);
                    onClose();
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Apply
            </button>
        </div>
    );
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Sort"
            footer={footer}
        >
            <div className="space-y-2">
                {opts.map((o) => (
                    <label
                        key={o}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <input
                            type="radio"
                            name="sort"
                            checked={selected === o}
                            onChange={() => setSelected(o)}
                        />
                        <span className="text-sm">{o}</span>
                    </label>
                ))}
            </div>
        </Modal>
    );
}

/**
 * -------------------------------
 * Main page component
 * -------------------------------
 */
export default function SearchFlights() {
    const [flights, setFlights] = useState(flightsbookings);
    const [filtered, setFiltered] = useState(flightsbookings);

    // modal state
    const [modals, setModals] = useState({ filter: false, sort: false, share: false, priceAlert: false });

    const [selectedFlightForAlert, setSelectedFlightForAlert] = useState(flightsbookings[0]);

    const openModal = (name) => setModals((s) => ({ ...s, [name]: true }));
    const closeModal = (name) => setModals((s) => ({ ...s, [name]: false }));

    const handleApplyFilters = (arr) => setFiltered(arr);

    const handleApplySort = (type) => {
        const sorted = applySortToList(filtered, type);
        setFiltered(sorted);
    };

    useEffect(() => {
        setFiltered(flights);
    }, [flights]);

    return (
        <div className="dark:bg-dark/[0.03] min-h-screen bg-white dark:text-white">
            {/* Blue header */}
            <div className="bg-gradient-to-b from-[#1A6BFF] to-[#4D8CFE] p-4 text-white">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <ArrowLeft />
                        <span className="font-semibold">Search Flights</span>
                    </Link>

                    <div className="hidden items-center gap-3 md:flex">
                        <button
                            onClick={() => openModal("share")}
                            title="Share results"
                            className="flex items-center gap-2"
                        >
                            <Share2 />
                        </button>
                        <button
                            onClick={() => openModal("priceAlert")}
                            title="Price alerts"
                            className="flex items-center gap-2"
                        >
                            <Bell />
                        </button>
                        <button
                            onClick={() => openModal("sort")}
                            title="Sort"
                            className="flex items-center gap-2"
                        >
                            <Sliders />
                        </button>
                        <button
                            onClick={() => openModal("filter")}
                            title="Filter"
                            className="flex items-center gap-2"
                        >
                            <Filter />
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            className="rounded-full bg-white/10 p-2"
                            title="Open menu"
                            onClick={() => openModal("share")}
                        >
                            <MoreHorizontal />
                        </button>
                    </div>
                </div>

                <div className="mt-4 rounded-xl bg-white/10 p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-white/20 p-2">
                                <Plane />
                            </div>
                            <div>
                                <div className="text-sm">JFK</div>
                                <div className="text-xs">New York → Tokyo</div>
                            </div>
                        </div>

                        <button
                            onClick={() => openModal("filter")}
                            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm"
                        >
                            <Calendar />
                            Dates
                            <ChevronDown />
                        </button>
                    </div>

                    {/* horizontal date row (scrollable) */}
                    <div className="mt-3 flex gap-3 overflow-x-auto py-2">
                        {Array.from({ length: 10 }).map((_, i) => {
                            const d = new Date();
                            d.setDate(d.getDate() + i);
                            const label = d.toISOString().slice(0, 10);
                            return (
                                <button
                                    key={label}
                                    className="min-w-[72px] rounded-lg bg-white/20 px-3 py-2 text-center text-sm"
                                >
                                    <div className="text-xs">Mon</div>
                                    <div className="font-semibold">{d.getDate()}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Filter />
                        <span className="font-semibold">Flights</span>
                    </div>
                    <div className="text-sm text-gray-600">{filtered.length} results</div>
                </div>

                <div className="space-y-4">
                    {filtered.map((flight) => (
                        <div
                            key={flight.id}
                            className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="p-5">
                                <OrigionDestinationArrowComponent flight={flight} />
                                <div className="mt-2 flex items-center justify-between px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="text-lg font-semibold">${flight.price}</div>
                                        <div className="text-sm text-gray-600">{flight.cabinClass}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedFlightForAlert(flight);
                                                openModal("priceAlert");
                                            }}
                                            className="text-sm"
                                        >
                                            Price Alert
                                        </button>
                                        <button
                                            onClick={() => {
                                                openModal("share");
                                            }}
                                            className="text-sm"
                                        >
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <FiltersModal
                open={modals.filter}
                onClose={() => closeModal("filter")}
                flights={flights}
                onApply={handleApplyFilters}
            />
            <SortModal
                open={modals.sort}
                onClose={() => closeModal("sort")}
                onApply={(type) => handleApplySort(type)}
            />
            <ShareModal
                open={modals.share}
                onClose={() => closeModal("share")}
            />
            <PriceAlertModal
                open={modals.priceAlert}
                onClose={() => closeModal("priceAlert")}
                flight={selectedFlightForAlert}
            />
        </div>
    );
}
