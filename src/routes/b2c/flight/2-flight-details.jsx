import { useState } from "react";
import {
    ArrowLeft,
    Bookmark,
    Share2,
    X,
    Briefcase,
    Luggage,
    CheckCircle,
    Info,
    CircleCheck,
    Plane,
    Repeat,
    RotateCcw,
    Shield,
    Utensils,
    Film,
    Battery,
    Layout,
} from "lucide-react";
import OrigionDestinationArrowComponent from "./util/flight-component";

// ---------- Modal ----------
function PackageDetailsModal({ open, onClose }) {
    const [activeTab, setActiveTab] = useState("flights");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="dark:bg-dark/[0.03] w-full max-w-md rounded-2xl bg-gray-100 shadow-lg dark:bg-gray-900">
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
                <div className="max-h-[70vh] space-x-3 overflow-auto p-4 pt-0 text-sm text-gray-700 dark:text-white">
                    {activeTab === "flights" && <FlightsTab />}

                    {activeTab === "refund" && <RefundsTab />}

                    {activeTab === "reschedule" && <RescheduleTab />}
                </div>
            </div>
        </div>
    );
}

// ------------Flgiht Tab----------
const FlightsTab = () => (
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
                    <div className="mb-3 border-b pb-2 text-xs text-gray-700 dark:border-gray-800 dark:text-white">EK 202 · Economy</div>

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
);
// ------------Refund Tab----------
const RefundsTab = () => (
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
                    Notification: Passengers must notify the airline in advance. They must provide relevant documentation to support their refund
                    request.
                </li>
                <li>Timing: Refund requests should be made before the scheduled departure time of the flight.</li>
                <li>Refund Method: Refunds will be issued via the original payment method.</li>
                <li>Fare Type: Refund amount depends on the airline’s refund policy for the fare type and extra optional services purchased.</li>
            </ul>
        </div>
    </div>
);

// ------------Reshedule Tab----------
const RescheduleTab = () => (
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
                <li>Notification: Passengers should notify the airline in advance, typically before the original flight departure time.</li>
                <li>Fare Difference: Passengers may be required to pay the fare difference if the new flight has a higher fare.</li>
                <li>Change Fee: Airlines often charge a change fee for rescheduling flights. The fee varies by airline and fare type.</li>
                <li>Validity Period: Rescheduled flights must fall within the validity period of the original ticket.</li>
                <li>Seat Availability: Rescheduling is subject to seat availability on the new flight.</li>
                <li>Multiple Changes: Airlines may limit the number of times a booking can be rescheduled. Each change may incur additional fees.</li>
            </ul>
        </div>
    </div>
);

// ---------- Main Page ----------
export default function FlightDetailsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [flight] = useState({
        logo: "https://picsum.photos/500/500",
        airline: "Airline Name",
        cabinClass: "Economy",
        price: 199.99,
        from: { city: "New York", time: "09:00", code: "JFK" },
        to: { city: "Paris", time: "16:30", code: "CDG" },
        duration: "7h 30m",
        type: "Direct",
    });

    const saveFlight = () => console.log("saved");
    const shareFlight = () => {
        navigator.clipboard.writeText(window.location.href);
        console.log("copied");
    };

    return (
        <div className="dark:bg-dark/[0.03] flex min-h-screen flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-blue-600 p-5 text-white dark:border-gray-800">
                <button>
                    <ArrowLeft />
                </button>
                <h1 className="text-lg font-semibold">Flight Details</h1>
                <div className="flex items-center gap-3">
                    <button onClick={saveFlight}>
                        <Bookmark />
                    </button>
                    <button onClick={shareFlight}>
                        <Share2 />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="m-2 grid gap-3 sm:m-3 xl:grid-cols-4">
                <div className="col-span-1 hidden xl:block">
                    <FlightsTab />
                </div>
                <div className="col-span-1 hidden xl:block">
                    <RefundsTab />
                </div>
                <div className="col-span-1 hidden xl:block">
                    <RescheduleTab />
                </div>

                <div className="flex min-h-screen flex-col gap-3 xl:min-h-fit">
                    <OrigionDestinationArrowComponent flight={flight} />
                    <div className="dark:bg-dark/[0.03] rounded-lg bg-white p-3 shadow-md dark:border dark:border-gray-800">
                        {/* Top Section: Airline + Price */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://picsum.photos/500/500"
                                    alt="airline logo"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-base font-semibold text-black dark:text-white">Original</span>
                            </div>
                            <div className="text-base font-semibold text-black dark:text-white">$199.99 / pex</div>
                        </div>

                        {/* Amenities List */}
                        <div className="space-y-2 border-y py-3 dark:border-gray-800 lg:border-b-0">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
                                <Briefcase
                                    size={18}
                                    className=""
                                />
                                <span>Cabin Baggage 1 × 7 kg</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
                                <Luggage
                                    size={18}
                                    className=""
                                />
                                <span>Baggage 1 × 20 kg</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
                                <CheckCircle
                                    size={18}
                                    className=""
                                />
                                <span>Reschedule Available</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
                                <CheckCircle
                                    size={18}
                                    className=""
                                />
                                <span>Refundable</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
                                <Info
                                    size={18}
                                    className=""
                                />
                                <span>Travel Insurance Included</span>
                            </div>
                        </div>

                        {/* Details Button (with 4 icons left) */}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="mt-3 flex w-full items-center justify-between text-sm font-medium xl:hidden"
                        >
                            {/* Left: Four icons */}
                            <div className="flex items-center gap-3">
                                <Briefcase size={18} />
                                <Luggage size={18} />
                                <CheckCircle size={18} />
                                <Info size={18} />
                            </div>
                            {/* Right: Text */}
                            <span className="text-blue-600">Details</span>
                        </button>
                    </div>
                    <div className="dark:bg-dark/[0.03] hidden items-center justify-between rounded-lg border-t bg-white p-3 shadow-lg dark:border-gray-800 lg:flex">
                        <div>
                            <div className="text-xs text-gray-500">Total price / person</div>
                            <div className="text-lg font-semibold text-black dark:text-white">${flight.price}</div>
                        </div>
                        <button className="rounded-xl bg-blue-600 px-6 py-2 text-white shadow">Continue</button>
                    </div>
                </div>
            </div>

            {/* Bottom fixed */}
            <div className="sticky bottom-0 lg:hidden">
                <div className="dark:bg-dark/[0.03] flex items-center justify-between border-t bg-white p-3 dark:border-gray-800">
                    <div>
                        <div className="text-xs text-gray-500">Total price / person</div>
                        <div className="text-lg font-semibold text-black dark:text-white">${flight.price}</div>
                    </div>
                    <button className="rounded-xl bg-blue-600 px-6 py-2 text-white shadow">Continue</button>
                </div>
            </div>

            {/* Modal */}
            <PackageDetailsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
