import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Bookmark,
    Share2,
    X,
    Briefcase,
    Luggage,
    CheckCircle,
    Info,
    RockingChair,
    ChevronRight,
    PlaneTakeoff,
    User,
    PenLine,
    CircleDollarSign,
    Plus,
    Users,
    Calendar,
} from "lucide-react";
import OrigionDestinationArrowComponent from "./util/flight-component";
import SeatMap from "./util/seat-map";
import { seatMap } from "../../../data/seatmapdata";
import { useNavigate } from "react-router-dom";

// ---------- Modal ----------

// ---------- Seat ----------
function SeatSelectionModal({ open, onClose, passengers, onConfirm }) {
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        console.log(selectedSeats);
        // ['14A', '14B', '14C']
    }, [selectedSeats]);

    if (!open) return null;

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="dark:bg-dark/[0.03] w-full max-w-lg rounded-2xl bg-white shadow-xl">
                    {/* Header */}
                    <div className="relative rounded-t-2xl bg-blue-600 p-4 pb-2 text-white dark:border-gray-800">
                        <h2 className="text-center text-lg font-semibold">Select Seat</h2>
                        <button
                            className="absolute right-4 top-5"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    {/* Passengers + their seat */}
                    <div className="flex justify-around gap-3 overflow-x-auto bg-blue-600 p-4">
                        {passengers.map((p, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center gap-3 rounded-lg bg-white p-3"
                            >
                                <div>
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                                        <span className="text-sm">{i + 1}</span>
                                    </div>
                                </div>
                                <div className="text-nowrap text-blue-600">
                                    <p className="text-md font-bold">
                                        {p.fname} {p.lname}
                                    </p>
                                    <p className="text-sm font-thin">{selectedSeats[i] ? selectedSeats[i] : "No Selection"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center gap-6 py-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-4 rounded bg-blue-600"></div> Selected
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-4 rounded bg-gray-500"></div> Occupied
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-4 rounded bg-blue-200"></div> Available
                        </div>
                    </div>
                    {/* Seat Map */}
                    <div className="max-h-[50vh] overflow-y-auto px-4">
                        {seatMap.data[0].decks.map((deck, i) => (
                            <SeatMap
                                key={i}
                                deck={deck}
                                passengers={passengers.length}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                            />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col items-center gap-2 px-4 py-2 dark:border-gray-800">
                        <p className="text-sm">Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
                        <button
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
                            disabled={selectedSeats.length !== passengers.length}
                            onClick={() => {
                                console.log("Confirmed seats:", selectedSeats);
                                onConfirm(selectedSeats); // ✅ send back to parent
                                onClose();
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
// passengers modal
function PassengerSelectionModal({ open, onClose, onConfirm }) {
    const data = {
        fname: "",
        lname: "",
        title: "",
        dob: "",
        phone: "",
        email: "",
        identityCard: "",
        identityCountry: "",
        identityIssue: "",
        identityExpiry: "",
        passportNumber: "",
        passportCountry: "",
        passportExpiry: "",
        nationality: "",
        drivingNumber: "",
        drivingCountry: "",
        drivingIssue: "",
        drivingExpiry: "",
    };
    const [form, setForm] = useState(data);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="dark:bg-dark/[0.03] w-full max-w-lg rounded-2xl bg-white shadow-lg dark:border-gray-800 dark:text-white">
                {/* Header */}
                <div className="relative rounded-t-2xl bg-blue-600 p-4 text-white dark:border-gray-800">
                    <h2 className="text-center text-lg font-semibold">Add Passenger Details</h2>
                    <button
                        className="absolute right-4 top-5"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Form */}
                <div className="m-4 max-h-[90vh] space-y-4 overflow-y-auto">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={form.fname}
                            onChange={(e) => updateField("fname", e.target.value)}
                            className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={form.lname}
                            onChange={(e) => updateField("lname", e.target.value)}
                            className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        />
                    </div>

                    {/* Title & DOB */}
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={form.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        >
                            <option value="">Title</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Ms.</option>
                        </select>
                        <div className="relative">
                            <input
                                type="date"
                                value={form.dob}
                                onChange={(e) => updateField("dob", e.target.value)}
                                className="dark:bg-dark/[0.03] w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Phone */}
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="dark:bg-dark/[0.03] w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="dark:bg-dark/[0.03] w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                    />

                    {/* Identity Card */}
                    <div>
                        <p className="text-sm font-semibold">Identity Card</p>
                        <input
                            type="text"
                            placeholder="Identity Number"
                            value={form.identityCard}
                            onChange={(e) => updateField("identityCard", e.target.value)}
                            className="dark:bg-dark/[0.03] mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <input
                                type="date"
                                value={form.identityIssue}
                                onChange={(e) => updateField("identityIssue", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                            <input
                                type="date"
                                value={form.identityExpiry}
                                onChange={(e) => updateField("identityExpiry", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                        </div>
                    </div>

                    {/* Passport */}
                    <div>
                        <p className="text-sm font-semibold">Passport</p>
                        <input
                            type="text"
                            placeholder="Passport Number"
                            value={form.passportNumber}
                            onChange={(e) => updateField("passportNumber", e.target.value)}
                            className="dark:bg-dark/[0.03] mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Country"
                                value={form.passportCountry}
                                onChange={(e) => updateField("passportCountry", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                            <input
                                type="date"
                                value={form.passportExpiry}
                                onChange={(e) => updateField("passportExpiry", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                        </div>
                    </div>

                    {/* Driving License */}
                    <div>
                        <p className="text-sm font-semibold">Driving License</p>
                        <input
                            type="text"
                            placeholder="Driving License Number"
                            value={form.drivingNumber}
                            onChange={(e) => updateField("drivingNumber", e.target.value)}
                            className="dark:bg-dark/[0.03] mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                        />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <input
                                type="date"
                                value={form.drivingIssue}
                                onChange={(e) => updateField("drivingIssue", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                            <input
                                type="date"
                                value={form.drivingExpiry}
                                onChange={(e) => updateField("drivingExpiry", e.target.value)}
                                className="dark:bg-dark/[0.03] rounded-lg border px-3 py-2 text-sm dark:border-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="m-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm(form);
                            setForm(data);
                            onClose();
                        }}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------- Main Page ----------
export default function FlightDetailsPage() {
    const [seatModal, setSeatModal] = useState(false);
    const [passengerModal, setPassengerModal] = useState(false);
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
    const [passengers, setPaseengers] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const saveFlight = () => console.log("saved");
    const shareFlight = () => {
        navigator.clipboard.writeText(window.location.href);
        console.log("copied");
    };
    const navigate = useNavigate();

    const confirmPage = () => {
        console.log("Confirmed Flight");
        navigate("/flights/confirm-payment");
        // navigate("/flights/confirm-payment", { state: { flight, passengers, selectedSeats } });
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
            <div className="m-2 lg:flex">
                <div className="m-2 space-y-4 lg:w-[60%]">
                    <OrigionDestinationArrowComponent flight={flight} />
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        {/* Top Section: Airline + Price */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-2">
                                <PlaneTakeoff
                                    size={20}
                                    className=""
                                />
                                <span className="text-sm font-bold">Amenties</span>
                            </div>
                        </div>

                        {/* Amenities List */}
                        <div className="space-y-2 border-t pt-3 dark:border-gray-800">
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
                    </div>
                    <div className="mb-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                        <div className="flex cursor-pointer justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                                <User
                                    size={20}
                                    className=""
                                />
                                <span className="text-sm font-bold">Contact Details</span>
                            </div>
                            <div>
                                <PenLine
                                    size={20}
                                    className=""
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-base font-bold">Adrew Admrin</p>
                            <p className="text-sm">adrewadmrin@y.com - +9245657872</p>
                        </div>
                    </div>

                    <div className="mb-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                        <div
                            className="flex cursor-pointer justify-between"
                            onClick={() => setPassengerModal(true)}
                        >
                            <div className="flex items-center gap-2">
                                <Users
                                    size={20}
                                    className=""
                                />
                                <span className="text-sm font-bold">Passenger Details</span>
                            </div>
                            <div>
                                <Plus
                                    size={20}
                                    className=""
                                />
                            </div>
                        </div>

                        {passengers.length > 0 && (
                            <div className="mt-4">
                                {passengers.map((p, i) => (
                                    <div
                                        key={i}
                                        className="mt-2 flex justify-between rounded-lg bg-gray-200 px-4 py-3"
                                    >
                                        <p>
                                            {p.fname} {p.lname}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <PassengerSelectionModal
                            open={passengerModal} // true false
                            onClose={() => setPassengerModal(false)}
                            onConfirm={(passenger) => setPaseengers([...passengers, passenger])}
                        />
                    </div>
                    {passengers.length > 0 && (
                        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                            <div
                                className="flex cursor-pointer justify-between"
                                onClick={() => setSeatModal(true)}
                            >
                                <div className="flex items-center gap-2">
                                    <RockingChair
                                        size={20}
                                        className=""
                                    />
                                    <span className="text-sm font-bold">Seat Number</span>
                                </div>
                                <div>
                                    <ChevronRight
                                        size={20}
                                        className=""
                                    />
                                </div>
                            </div>
                            {selectedSeats.length > 0 && (
                                <div className="mt-4">
                                    {passengers.map((p, i) => (
                                        <div
                                            key={i}
                                            className="mt-2 flex justify-between rounded-lg bg-gray-200 px-4 py-3"
                                        >
                                            <p>
                                                {p.fname} {p.lname}
                                            </p>
                                            <p>{selectedSeats[i] ? selectedSeats[i] : "No Selection"}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <SeatSelectionModal
                                open={seatModal}
                                onClose={() => setSeatModal(false)}
                                passengers={passengers}
                                onConfirm={(seats) => setSelectedSeats(seats)}
                            />
                        </div>
                    )}
                </div>
                <div className="m-2 mt-4 space-y-4 lg:mt-2 lg:w-[40%]">
                    <div className="mb-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                        <div className="flex cursor-pointer justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                                <CircleDollarSign
                                    size={20}
                                    className=""
                                />
                                <span className="font-bold">Price Details</span>
                            </div>
                        </div>
                        <div className="mt-2 grid gap-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold">Emirates (Adult) x 1 </p>
                                <p className="text-base">$1999.00</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold">Travel Insurance </p>
                                <p className="text-base">$45.00</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold">Tax </p>
                                <p className="text-base">$4.00</p>
                            </div>
                            <div className="flex items-center justify-between border-t pt-3">
                                <p className="text-sm font-bold">Total </p>
                                <p className="text-base">$4000.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <button
                            onClick={confirmPage}
                            className="w-full rounded-lg bg-blue-600 py-3 text-center text-white"
                        >
                            {" "}
                            Continue
                        </button>
                    </div>

                    {/* Modal */}
                </div>
            </div>
        </div>
    );
}
