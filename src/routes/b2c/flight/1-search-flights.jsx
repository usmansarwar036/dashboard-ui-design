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
    Copy,
    Facebook,
    MessageSquare,
    Luggage,
    CircleCheck,
    Repeat,
    RotateCcw,
    Shield,
    Utensils,
    Film,
    Battery,
    Layout,
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
const flightslist = [
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
        refundOptions: ["Refundable", "Reschedule Available"],
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
        refundOptions: ["Reschedule Available"], // not refundable
        cabinClass: "Business Class",
        preferences: ["Exclude overnight stopover"],
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
        refundOptions: ["Refundable"], // not reschedulable
        cabinClass: "Premium Economy",
        preferences: ["Exclude red-eye flights"],
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
        refundOptions: [], // neither refundable nor reschedulable
        cabinClass: "First Class",
        preferences: ["Exclude codeshare flights"],
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
// package details modal
function PackageDetailsModal({ open, onClose, flight }) {
    const [activeTab, setActiveTab] = useState("flights");
    const navigate = useNavigate();

    const selectedFlight = (flight) => {
        console.log("Selected flight:", flight);
        navigate("/flights/fill-details");
    };
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="dark:bg-dark/[0.03] w-full max-w-lg rounded-2xl bg-gray-100 shadow-lg dark:bg-gray-900">
                <div className="relative mb-4 rounded-t-2xl bg-blue-600 p-4 text-center text-white">
                    <span> Details</span>
                    {/* Close button */}
                    <button
                        className="absolute right-3 top-3 rounded-full p-2"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="mb-4 flex justify-center">
                    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800">
                        {["flights", "refund", "reschedule"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-28 px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-700 dark:text-white"} first:rounded-l-lg last:rounded-r-lg`}
                            >
                                {tab === "flights" ? "Flights" : tab === "refund" ? "Refund Info" : "Reschedule"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-h-[70vh] space-x-3 overflow-auto px-4 pt-0 text-sm text-gray-700 dark:text-white">
                    {activeTab === "flights" && (
                        <div className="dark:bg-dark/[0.03] h-full rounded-lg bg-white p-3 shadow-md dark:border dark:border-gray-800">
                            <div className="flex items-center gap-2 border-b pb-3 dark:border-gray-800">
                                <p className="text-white dark:text-black">
                                    <CircleCheck
                                        size={20}
                                        className="fill-blue-600 dark:fill-white"
                                    />
                                </p>

                                <p className="text-base font-bold text-blue-600">Flight</p>
                            </div>
                            <div className="mt-3 grid grid-cols-[60px_28px_1fr] gap-3">
                                {/* LEFT: times + dates */}
                                <div className="flex flex-col justify-between text-center">
                                    <div>
                                        <div className="text-base font-semibold text-black dark:text-white">09:00</div>
                                        <div className="text-xs text-gray-500">Dec 27</div>
                                    </div>
                                    <div>
                                        <div className="text-base font-semibold text-black dark:text-white">16:30</div>
                                        <div className="text-xs text-gray-500">Dec 27</div>
                                    </div>
                                </div>

                                {/* MIDDLE: vertical rail + plane + duration */}
                                <div className="relative mx-auto h-full w-[2px] bg-blue-600">
                                    {/* top & bottom nodes */}
                                    <span className="absolute -left-[5px] top-0 h-3 w-3 rounded-full border-2 border-blue-600 bg-white"></span>
                                    <span className="absolute -left-[5px] bottom-0 h-3 w-3 rounded-full bg-blue-600"></span>

                                    {/* plane icon (downward) */}
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[135deg] text-blue-600">
                                        <Plane
                                            size={20}
                                            fill="#1A6BFF"
                                            stroke="#1A6BFF"
                                        />
                                    </span>

                                    {/* duration on LEFT */}
                                    <span className="absolute -left-16 top-1/2 -translate-y-1/2 text-xs text-gray-500">7h 30m</span>
                                </div>

                                {/* RIGHT: segments + airline card */}
                                <div className="space-y-3">
                                    {/* ORIGIN */}
                                    <div>
                                        <div className="text-sm font-semibold text-black dark:text-white">New York (JFK), USA</div>
                                        <p className="text-xs text-gray-500">John F. Kennedy International Airport · Terminal 4</p>
                                    </div>

                                    {/* AIRLINE CARD */}
                                    <div className="rounded-lg border p-3 dark:border-gray-800">
                                        {/* airline header */}
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                                            <span className="text-sm font-semibold text-black dark:text-white">Emirates</span>
                                        </div>
                                        <div className="mb-3 border-b pb-2 text-xs text-gray-700 dark:border-gray-800 dark:text-white">
                                            EK 202 · Economy
                                        </div>

                                        {/* amenities with icons */}
                                        <ul className="space-y-3 text-sm text-gray-700 dark:text-white">
                                            <li className="flex items-center gap-2">
                                                <Luggage
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Cabin Baggage 1 × 7 kg
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Luggage
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Baggage 1 × 20 kg
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Repeat
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Reschedule Available
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <RotateCcw
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Refundable
                                            </li>
                                            <li className="flex items-center gap-2 border-b pb-2 dark:border-gray-800 dark:text-white">
                                                <Shield
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Travel Insurance Included
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Utensils
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Meal Available
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Film
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Entertainment Available
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Battery
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Power/USB Port Available
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Layout
                                                    size={14}
                                                    className="text-gray-500"
                                                />{" "}
                                                Seat Pitch 30–32 inch
                                            </li>
                                        </ul>
                                    </div>

                                    {/* DESTINATION */}
                                    <div>
                                        <div className="text-sm font-semibold text-black dark:text-white">Paris (CDG), France</div>
                                        <p className="text-xs text-gray-500">Paris Charles de Gaulle Airport</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "refund" && (
                        <div className="dark:bg-dark/[0.03] h-full rounded-lg bg-white p-3 shadow-md dark:border dark:border-gray-800">
                            <div className="flex items-center gap-2 border-b pb-3 dark:border-gray-800">
                                <p className="text-white dark:text-black">
                                    <CircleCheck
                                        size={20}
                                        className="fill-blue-600 dark:fill-white"
                                    />
                                </p>

                                <p className="text-base font-bold text-blue-600">Refundable</p>
                            </div>

                            {/* Acceptable Reasons */}
                            <div className="border-b py-3 dark:border-gray-800">
                                <h3 className="mb-2 text-sm font-semibold text-black">Acceptable Reasons for Refund</h3>
                                <ul className="list-decimal space-y-1 pl-5 text-sm text-gray-700 dark:text-white">
                                    <li>Medical emergency (illness, serious injury, etc.)</li>
                                    <li>Self-cancellation (change of plan)</li>
                                    <li>Flight significantly rescheduled by airline</li>
                                    <li>Double booking the same flights</li>
                                    <li>Pregnancy</li>
                                    <li>Passenger’s death</li>
                                </ul>
                            </div>

                            {/* Terms */}
                            <div className="rounded-lg py-3">
                                <h3 className="mb-2 text-sm font-semibold text-black">Terms and Conditions for Refund</h3>
                                <ul className="list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-white">
                                    <li>
                                        Notification: Passengers must notify the airline in advance. They must provide relevant documentation to
                                        support their refund request.
                                    </li>
                                    <li>Timing: Refund requests should be made before the scheduled departure time of the flight.</li>
                                    <li>Refund Method: Refunds will be issued via the original payment method.</li>
                                    <li>
                                        Fare Type: Refund amount depends on the airline’s refund policy for the fare type and extra optional services
                                        purchased.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === "reschedule" && (
                        <div className="dark:bg-dark/[0.03] h-full rounded-lg bg-white p-3 shadow-md dark:border dark:border-gray-800">
                            <div className="flex items-center gap-2 border-b pb-3 dark:border-gray-800">
                                <p className="text-white dark:text-black">
                                    <CircleCheck
                                        size={20}
                                        className="fill-blue-600 dark:fill-white"
                                    />
                                </p>
                                <p className="text-base font-bold text-blue-600">Reschedule Available</p>
                            </div>

                            {/* Acceptable Reasons */}
                            <div className="border-b py-3 dark:border-gray-800">
                                <h3 className="mb-2 text-sm font-semibold text-black">Acceptable Reasons for Rescheduling</h3>
                                <ul className="list-decimal space-y-1 pl-5 text-sm text-gray-700 dark:text-white">
                                    <li>Change in travel plans</li>
                                    <li>Personal reasons (terms apply)</li>
                                </ul>
                            </div>

                            {/* Terms */}
                            <div className="rounded-lg py-3">
                                <h3 className="mb-2 text-sm font-semibold text-black">Terms and Conditions for Rescheduling</h3>
                                <ul className="list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-white">
                                    <li>
                                        Notification: Passengers should notify the airline in advance, typically before the original flight departure
                                        time.
                                    </li>
                                    <li>
                                        Fare Difference: Passengers may be required to pay the fare difference if the new flight has a higher fare.
                                    </li>
                                    <li>
                                        Change Fee: Airlines often charge a change fee for rescheduling flights. The fee varies by airline and fare
                                        type.
                                    </li>
                                    <li>Validity Period: Rescheduled flights must fall within the validity period of the original ticket.</li>
                                    <li>Seat Availability: Rescheduling is subject to seat availability on the new flight.</li>
                                    <li>
                                        Multiple Changes: Airlines may limit the number of times a booking can be rescheduled. Each change may incur
                                        additional fees.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="dark:bg-dark/[0.03] mt-4 flex items-center justify-between rounded-b-xl border-t bg-white p-3 shadow-lg dark:border-gray-800">
                    <div>
                        <div className="text-xs text-gray-500">Total price / person</div>
                        <div className="text-lg font-semibold text-black dark:text-white">$240</div>
                    </div>
                    <button
                        onClick={() => selectedFlight(flight)}
                        className="rounded-xl bg-blue-600 px-6 py-2 text-white shadow"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
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

function FiltersModal({ open, onClose, flights, onApply, isModal = true }) {
    // derived options
    const airlinesList = useMemo(() => [...new Set(flights.map((f) => f.airline))], [flights]);
    const stopsOptions = ["Direct", "1 Stop", "2+ Stops"];
    const durations = flights.map((f) => parseDurationHours(f.duration));
    const DURATION_MIN = Math.floor(Math.min(...durations));
    const DURATION_MAX = Math.ceil(Math.max(...durations));
    const prices = flights.map((f) => f.price);
    const PRICE_MIN = Math.floor(Math.min(...prices));
    const PRICE_MAX = Math.ceil(Math.max(...prices));
    const timeOptions = ["00:00 - 06:00", "06:00 - 12:00", "12:00 - 18:00", "18:00 - 00:00"];

    const stopDurations = flights.map((f) => f.stopDuration || 0);
    const STOP_DURATION_MIN = Math.floor(Math.min(...stopDurations));
    const STOP_DURATION_MAX = Math.ceil(Math.max(...stopDurations));

    // state
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedStops, setSelectedStops] = useState([]);
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [durationRange, setDurationRange] = useState([DURATION_MIN, DURATION_MAX]);
    const [stopDuration, setStopDuration] = useState([STOP_DURATION_MIN, STOP_DURATION_MAX]);

    const [departureTimes, setDepartureTimes] = useState([]);
    const [arrivalTimes, setArrivalTimes] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [refundOptions, setRefundOptions] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [cabinClasses, setCabinClasses] = useState([]);

    // ✅ Dynamic option groups from flights
    const amenitiesOptions = useMemo(() => [...new Set(flights.flatMap((f) => f.amenities || []))], [flights]);

    const refundOptionsList = useMemo(() => [...new Set(flights.flatMap((f) => f.refundOptions || []))], [flights]);

    const preferencesOptions = useMemo(() => [...new Set(flights.flatMap((f) => f.preferences || []))], [flights]);

    const cabinOptions = useMemo(() => [...new Set(flights.map((f) => f.cabin || "Economy"))], [flights]);

    // auto-apply filters
    useEffect(() => {
        const filters = {
            airlines: selectedAirlines,
            stops: selectedStops,
            priceRange,
            durationRange,
            stopDuration,
            departureTimes,
            arrivalTimes,
            amenities,
            refundOptions,
            preferences,
            cabinClasses,
        };
        const result = applyFiltersToList(flights, filters);
        onApply(result);
    }, [
        selectedAirlines,
        selectedStops,
        priceRange,
        durationRange,
        stopDuration,
        departureTimes,
        arrivalTimes,
        amenities,
        refundOptions,
        preferences,
        cabinClasses,
    ]);

    const toggle = (item, setter) => setter((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));

    const resetAll = () => {
        setSelectedAirlines([]);
        setSelectedStops([]);
        setPriceRange([PRICE_MIN, PRICE_MAX]);
        setDurationRange([DURATION_MIN, DURATION_MAX]);
        setStopDuration([STOP_DURATION_MIN, STOP_DURATION_MAX]);
        setDepartureTimes([]);
        setArrivalTimes([]);
        setAmenities([]);
        setRefundOptions([]);
        setPreferences([]);
        setCabinClasses([]);
        onApply(flights);
    };
    function applyFiltersToList(list, filters) {
        let filtered = [...list];

        const {
            airlines = [],
            stops = [],
            priceRange = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
            durationRange = [0, Number.MAX_SAFE_INTEGER],
            stopDuration = [0, Number.MAX_SAFE_INTEGER],
            departureTimes = [],
            arrivalTimes = [],
            amenities = [],
            refundOptions = [],
            preferences = [],
            cabinClasses = [],
            dateFrom,
            dateTo,
        } = filters || {};

        // Airlines
        if (airlines.length) {
            filtered = filtered.filter((f) => airlines.includes(f.airline));
        }

        // Stops
        if (stops.length) {
            filtered = filtered.filter((f) => stops.includes(f.type));
        }

        // Price
        filtered = filtered.filter((f) => f.price >= priceRange[0] && f.price <= priceRange[1]);

        // Flight Duration
        filtered = filtered.filter((f) => {
            const dur = parseDurationHours(f.duration);
            return dur >= durationRange[0] && dur <= durationRange[1];
        });

        // Stop Duration
        filtered = filtered.filter((f) => f.stopDuration >= stopDuration[0] && f.stopDuration <= stopDuration[1]);

        // Departure Time
        if (departureTimes.length) {
            filtered = filtered.filter((f) => departureTimes.some((r) => isTimeInRange(f.departureTime, r)));
        }

        // Arrival Time
        if (arrivalTimes.length) {
            filtered = filtered.filter((f) => arrivalTimes.some((r) => isTimeInRange(f.arrivalTime, r)));
        }

        // Amenities (safe check)
        if (amenities.length) {
            filtered = filtered.filter((f) => amenities.some((a) => (f.amenities || []).includes(a)));
        }

        // Refund Options (safe check)
        if (refundOptions.length) {
            filtered = filtered.filter((f) => refundOptions.some((r) => (f.refundOptions || []).includes(r)));
        }

        // Preferences (safe check)
        if (preferences.length) {
            filtered = filtered.filter((f) => preferences.some((p) => (f.preferences || []).includes(p)));
        }

        // Cabin Class
        if (cabinClasses.length) {
            filtered = filtered.filter((f) => cabinClasses.includes(f.cabinClass));
        }

        // Date Range
        if (dateFrom && dateTo) {
            filtered = filtered.filter((f) => {
                const d = new Date(f.date);
                return d >= new Date(dateFrom) && d <= new Date(dateTo);
            });
        }

        return filtered;
    }

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
                    Apply
                </button>
            </div>
        </div>
    );
    {
        /* Reusable Checkbox Group */
    }
    function CheckboxGroup({ label, options, selected, setSelected }) {
        const allSelected = options.length > 0 && selected.length === options.length;

        const toggleOption = (opt) => {
            setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
        };

        const toggleAll = () => {
            if (allSelected) {
                setSelected([]); // unselect all
            } else {
                setSelected([...options]); // select all
            }
        };

        return (
            <div>
                <div className="flex items-center justify-between">
                    <label className="block font-bold">{label}</label>
                    <button
                        onClick={toggleAll}
                        className="text-xs text-blue-600"
                    >
                        {allSelected ? "Unselect All" : "Select All"}
                    </button>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                    {options.map((opt) => (
                        <label
                            key={opt}
                            className="flex items-center justify-between border-gray-300 text-sm dark:border-gray-800"
                        >
                            <span>{opt}</span>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => toggleOption(opt)}
                                className="form-checkbox h-4 w-4 cursor-pointer rounded text-blue-600"
                            />
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    // filters content
    const content = (
        <div className="space-y-4">
            {/* Price */}
            {RangeSlider("Price Range", priceRange, setPriceRange, PRICE_MIN, PRICE_MAX, "$")}

            {/* Stops */}
            <div>
                <label className="block text-sm font-semibold">Number of Stops</label>
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

            {/* Stop Duration */}
            {RangeSlider("Stop Duration (hrs)", stopDuration, setStopDuration, STOP_DURATION_MIN, STOP_DURATION_MAX)}

            {/* Flight Duration */}
            {RangeSlider("Flight Duration (hrs)", durationRange, setDurationRange, DURATION_MIN, DURATION_MAX)}

            {/* Airlines */}
            <CheckboxGroup
                label="Airlines"
                options={airlinesList}
                selected={selectedAirlines}
                setSelected={setSelectedAirlines}
            />

            {/* Amenities */}
            <CheckboxGroup
                label="Amenities"
                options={amenitiesOptions}
                selected={amenities}
                setSelected={setAmenities}
            />

            {/* Arrival Time */}
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

            {/* Departure Time */}
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
            {/* Refund & Reschedule */}
            <CheckboxGroup
                label="Refund & Reschedule"
                options={refundOptionsList}
                selected={refundOptions}
                setSelected={setRefundOptions}
            />

            {/* Flight Preferences */}
            <CheckboxGroup
                label="Flight Preferences"
                options={preferencesOptions}
                selected={preferences}
                setSelected={setPreferences}
            />

            {/* Cabin Class */}
            <CheckboxGroup
                label="Cabin Class"
                options={cabinOptions}
                selected={cabinClasses}
                setSelected={setCabinClasses}
            />
        </div>
    );

    // modal or inline
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
            <div className="dark:bg-dark/[0.03] rounded-lg bg-white p-4 shadow-md dark:border-gray-800 dark:text-white">{content}</div>
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
    const [flights, setFlights] = useState(flightslist);
    const [filtered, setFiltered] = useState(flightslist);
    const [detailflight, setDetailflight] = useState({});
    // modal state
    const [modals, setModals] = useState({ filter: false, sort: false, share: false, priceAlert: false });

    const [selectedFlightForAlert, setSelectedFlightForAlert] = useState(flightslist[0]);

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
                                    openModal("details");
                                    setDetailflight(flight);
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
            <PackageDetailsModal
                flight={detailflight}
                open={modals.details}
                onClose={() => {
                    closeModal("details");
                    setDetailflight({});
                }}
            />
        </div>
    );
}
