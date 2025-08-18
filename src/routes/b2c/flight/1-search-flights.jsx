// SearchFlights.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import OrigionDestinationArrowComponent from "./util/flight-component";

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
import { Range } from "react-range";
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
            date: "2025-08-13",
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

/* Reusable modal wrapper */
function Modal({ open, onClose, title, children, footer, centerOnDesktop = true }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur sm:items-center">
            <div
                className={`max-h-[90vh] w-full ${centerOnDesktop ? "max-w-md" : "max-w-3xl"} dark:bg-dark/[0.03] overflow-y-auto rounded-2xl bg-white text-black shadow-xl dark:text-white`}
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
    const DURATION_MIN = 0;
    const DURATION_MAX = 1000; // arbitrary max for duration slider
    const [durationRange, setDurationRange] = useState([DURATION_MIN, DURATION_MAX]);
    const [onlyDirect, setOnlyDirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const createPriceAlert = async () => {
        // simple validation
        const payload = {
            flightId: flight?.id,
            durationRange,
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

                {flight ? <OrigionDestinationArrowComponent flight={flight} /> : <div className="text-sm text-gray-500">No flight selected</div>}
                <div>{RangeSlider("Target price range", durationRange, setDurationRange, DURATION_MIN, DURATION_MAX, "$")}</div>

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

const STEP = 1; // step for range sliders
// RangeSlider (kept same as your code)
const RangeSlider = (label, range, setRange, min, max, unit = "") => (
    <div>
        <label className="block py-2 text-sm font-semibold">{label}</label>

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
function FiltersModal({
    open,
    onClose,
    flights,
    onApply,
    isModal = true, // 👈 new prop
}) {
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

    // filters content (shared between modal and inline)
    const content = (
        <div className="space-y-4">
            <div>
                <div className="mt-2">{RangeSlider("Price Range", priceRange, setPriceRange, PRICE_MIN, PRICE_MAX, "$")}</div>
            </div>

            <div>{RangeSlider("Duration (hrs)", durationRange, setDurationRange, DURATION_MIN, DURATION_MAX)}</div>

            <div>
                <label className="block text-sm font-semibold">Airlines</label>
                <div className="mt-2 flex flex-wrap gap-2">
                    {airlinesList.map((a) => (
                        <button
                            key={a}
                            onClick={() => toggle(a, setSelectedAirlines)}
                            className={`rounded-lg border px-3 py-2 text-sm ${
                                selectedAirlines.includes(a) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                            } dark:border-gray-800`}
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
                            className={`rounded-lg border px-3 py-2 text-sm ${
                                selectedStops.includes(s) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                            } dark:border-gray-800`}
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
                            className={`rounded-lg border px-3 py-2 text-sm ${
                                departureTimes.includes(t) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                            } dark:border-gray-800`}
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
                            className={`rounded-lg border px-3 py-2 text-sm ${
                                arrivalTimes.includes(t) ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-700"
                            } dark:border-gray-800`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // if isModal → wrap inside Modal, otherwise show plain
    return isModal ? (
        <Modal
            open={open}
            onClose={onClose}
            title="Filter"
            footer={footer}
        >
            {content}
        </Modal>
    ) : (
        <div>
            <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-1">
                    <Filter size={18} />
                    <span className="font-semibold">Filters</span>
                </div>
                <div className="text-sm text-gray-600">
                    <button
                        onClick={resetAll}
                        className="text-sm text-blue-600"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">{content}</div>
        </div>
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

function MenuButtons({ openModal }) {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-3">
            {/* Desktop */}
            <div className="mr-2 hidden items-center gap-3 md:flex">
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
            </div>

            {/* Mobile */}
            <div
                className="relative md:hidden"
                ref={menuRef}
            >
                <button
                    className="rounded-full bg-white/10 p-2"
                    title="Open menu"
                    onClick={() => setMenu((prev) => !prev)}
                >
                    <MoreHorizontal />
                </button>
                {menu && (
                    <div className="dark:bg-dark/[0.03] absolute right-0 z-10 mt-2 w-40 rounded-xl border bg-white p-2 text-black shadow-lg dark:border-gray-800 dark:text-white">
                        <button
                            onClick={() => openModal("share")}
                            className="dark:hover:bg-dark/30 flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            <Share2 size={16} /> Share
                        </button>
                        <button
                            onClick={() => openModal("priceAlert")}
                            className="dark:hover:bg-dark/30 flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            <Bell size={16} /> Price Alerts
                        </button>
                        <button
                            onClick={() => openModal("sort")}
                            className="dark:hover:bg-dark/30 flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            <Sliders size={16} /> Sort
                        </button>
                        <button
                            onClick={() => openModal("filter")}
                            className="dark:hover:bg-dark/30 flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function HorizontalCalendar({ date }) {
    const selectedDate = new Date(date);

    // Generate 20 days → 9 before, 1 selected, 10 after
    const dates = Array.from({ length: 20 }, (_, i) => {
        const d = new Date(selectedDate);
        d.setDate(selectedDate.getDate() - 9 + i);
        return d;
    });

    const [current, setCurrent] = useState(selectedDate.toDateString());

    return (
        <div className="relative mt-3 flex items-center">
            {/* Fixed left button */}
            <div className="sticky left-0 z-10 mr-2 flex h-full items-center">
                <button className="dark:bg-dark/[0.03] items-center rounded-lg bg-white/20 px-3 py-2 text-center text-sm transition dark:border-gray-800 dark:text-white">
                    <Calendar />
                </button>
            </div>

            {/* Dates row (exact 20, no overflow) */}
            <div className="flex flex-1 snap-x snap-mandatory justify-center gap-2 overflow-hidden">
                {dates.map((d) => {
                    const label = d.toISOString().slice(0, 10);
                    const isSelected = current === d.toDateString();
                    return (
                        <button
                            key={label}
                            onClick={() => {
                                if (!isSelected) {
                                    console.log("Clicked:", label);
                                }
                            }}
                            className={`min-w-[72px] rounded-lg px-3 py-2 text-center text-sm transition ${
                                isSelected ? "bg-white text-blue-500" : "dark:bg-dark/[0.03] bg-white/20 dark:border-gray-800 dark:text-white"
                            }`}
                        >
                            <div className="text-xs">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                            <div className="font-semibold">{d.getDate()}</div>
                        </button>
                    );
                })}
            </div>
        </div>
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
    const navigate = useNavigate();
    const selectedFlight = (flight) => {
        console.log("Selected flight:", flight);
        navigate("/flights/details");
    };
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
        <div className="dark:bg-dark/[0.03]">
            {/* Blue header */}
            <div className="bg-blue-600 p-1 text-white sm:p-2">
                <div className="p-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link
                                to="/"
                                className="flex items-center gap-3"
                            >
                                <ArrowLeft />
                            </Link>
                            <div className="rounded-full bg-white/20 p-2">
                                <Plane />
                            </div>
                            <div>
                                <div className="text-sm">JFK</div>
                                <div className="text-xs">New York → Tokyo</div>
                            </div>
                        </div>

                        <MenuButtons openModal={openModal} />
                    </div>
                    <div className="sm:p-2">
                        {/* horizontal date row (scrollable) */}
                        <HorizontalCalendar date={defaultForm.route[0].date} />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="flex">
                <div className="hidden h-[stretch] p-4 pr-0 md:block md:w-[35%] lg:w-[30%]">
                    <div className="overflow-y-auto">
                        <FiltersModal
                            isModal={false}
                            flights={flights}
                            onApply={handleApplyFilters}
                        />
                    </div>
                </div>
                <div className="w-full p-4 md:w-[65%] lg:w-[70%]">
                    <div className="mb-3 flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold">Flights</span>
                        </div>
                        <div className="text-sm text-gray-600">{filtered.length} results</div>
                    </div>

                    <div className="space-y-4">
                        {filtered.map((flight) => (
                            <div
                                key={flight.id}
                                onClick={() => {
                                    selectedFlight(flight);
                                }}
                                className="r cursor-pointer"
                            >
                                <OrigionDestinationArrowComponent flight={flight} />
                            </div>
                        ))}
                    </div>
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
