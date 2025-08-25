import { useState } from "react";
import { Calendar, Users, ChevronRight, Plus, Minus, X, MapPin } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const hotelDestinations = [
    { city: "New York", country: "USA", code: "NYC" },
    { city: "Paris", country: "France", code: "NYC" },
    { city: "Tokyo", country: "Japan", code: "NYC" },
    { city: "London", country: "UK", code: "NYC" },
    { city: "Dubai", country: "UAE", code: "NYC" },
    { city: "Singapore", country: "Singapore", code: "NYC" },
    { city: "Istanbul", country: "Turkey", code: "NYC" },
];

export default function HotelSearchForm() {
    const [step, setStep] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const formatDate = (date, format = "YYYY-MM-DD") => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        if (format === "DD/MM/YYYY") return `${day}/${month}/${year}`;
        return `${year}-${month}-${day}`; // default YYYY-MM-DD
    };
    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const [form, setForm] = useState({
        destination: { city: "New York", country: "USA", code: "NYC" },
        checkIn: today,
        checkOut: tomorrow,
        rooms: [{ adults: 2, children: 0 }],
    });

    // guests summary
    const totalAdults = form.rooms.reduce((sum, r) => sum + r.adults, 0);
    const totalChildren = form.rooms.reduce((sum, r) => sum + r.children, 0);
    const guestsSummary = `${totalAdults + totalChildren} Guests in ${form.rooms.length} Room${form.rooms.length > 1 ? "s" : ""}`;

    const filteredPlaces =
        searchTerm.length >= 2 ? hotelDestinations.filter((p) => p.city.toLowerCase().includes(searchTerm.toLowerCase())) : hotelDestinations;

    // modal step switch with transition
    const goToStep = (nextStep) => {
        setStep(null);
        setTimeout(() => setStep(nextStep), 200); // delay for transition
    };

    const handleDateSelect = (date, type) => {
        if (!date) return;
        const iso = date.toLocaleDateString("en-CA");
        setForm({ ...form, [type]: iso });
    };

    const updateRoom = (index, key, value) => {
        setForm((prev) => {
            const updated = [...prev.rooms];
            updated[index][key] = value;
            return { ...prev, rooms: updated };
        });
    };

    const addRoom = () => {
        setForm((prev) => ({
            ...prev,
            rooms: [...prev.rooms, { adults: 1, children: 0 }],
        }));
    };

    const removeRoom = (idx) => {
        if (form.rooms.length === 1) return;
        setForm((prev) => ({
            ...prev,
            rooms: prev.rooms.filter((_, i) => i !== idx),
        }));
    };

    const handleSearch = () => {
        console.log("🏨 Final Hotel Search Form", form);
        // do navigation or API call
    };

    const renderModal = () => {
        if (step === "destination") {
            return (
                <ModalWrapper
                    title="Destination"
                    onClose={() => setStep(null)}
                >
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search destination"
                        className="dark:bg-dark/[0.03] mb-4 w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                    />
                    <div className="max-h-[400px] overflow-y-auto">
                        {filteredPlaces.map((place) => (
                            <div
                                key={place.city}
                                onClick={() => {
                                    setForm({ ...form, destination: place });
                                    goToStep("checkin");
                                }}
                                className="flex cursor-pointer items-center justify-between border-b p-3 dark:border-gray-800 dark:text-white"
                            >
                                <div>
                                    <p className="font-medium">
                                        {place.city}, {place.country}
                                    </p>
                                </div>
                                <ChevronRight size={18} />
                            </div>
                        ))}
                    </div>
                </ModalWrapper>
            );
        }

        if (step === "checkin") {
            return (
                <ModalWrapper
                    title="Check-In Date"
                    onClose={() => setStep(null)}
                >
                    <CustomDatePicker
                        selectedDate={form.checkIn}
                        onSelect={(d) => handleDateSelect(d, "checkIn")}
                    />
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setStep(null)}
                            className="w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => goToStep("checkout")}
                            className="w-full rounded-lg bg-blue-600 p-2 text-white"
                        >
                            OK
                        </button>
                    </div>
                </ModalWrapper>
            );
        }

        if (step === "checkout") {
            return (
                <ModalWrapper
                    title="Check-Out Date"
                    onClose={() => setStep(null)}
                >
                    <CustomDatePicker
                        selectedDate={form.checkOut}
                        onSelect={(d) => handleDateSelect(d, "checkOut")}
                    />
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setStep(null)}
                            className="w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => goToStep("guests")}
                            className="w-full rounded-lg bg-blue-600 p-2 text-white"
                        >
                            OK
                        </button>
                    </div>
                </ModalWrapper>
            );
        }

        if (step === "guests") {
            return (
                <ModalWrapper
                    title="Guests & Rooms"
                    onClose={() => setStep(null)}
                >
                    <div className="max-h-[400px] overflow-y-auto">
                        {form.rooms.map((room, idx) => (
                            <div
                                key={idx}
                                className="mb-4 rounded-lg border p-3 dark:border-gray-800"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="font-medium">Room {idx + 1}</p>
                                    {idx > 0 && (
                                        <button
                                            onClick={() => removeRoom(idx)}
                                            className="text-sm text-red-500"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {/* Adults */}
                                <div className="flex items-center justify-between py-2">
                                    <p>
                                        Adults <span className="text-xs text-gray-500">(≥17 yrs)</span>
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateRoom(idx, "adults", Math.max(1, room.adults - 1))}
                                            className="rounded border p-1"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span>{room.adults}</span>
                                        <button
                                            onClick={() => updateRoom(idx, "adults", room.adults + 1)}
                                            className="rounded border p-1"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                {/* Children */}
                                <div className="flex items-center justify-between py-2">
                                    <p>
                                        Children <span className="text-xs text-gray-500">(≤17 yrs)</span>
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateRoom(idx, "children", Math.max(0, room.children - 1))}
                                            className="rounded border p-1"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span>{room.children}</span>
                                        <button
                                            onClick={() => updateRoom(idx, "children", room.children + 1)}
                                            className="rounded border p-1"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addRoom}
                        className="mb-4 flex items-center gap-1 text-green-600"
                    >
                        <Plus size={16} /> Add Room
                    </button>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => setStep(null)}
                            className="w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setStep(null)}
                            className="w-full rounded-lg bg-blue-600 p-2 text-white"
                        >
                            Apply
                        </button>
                    </div>
                </ModalWrapper>
            );
        }
    };

    return (
        <div className="">
            <div className="dark:bg-dark/[0.03] mx-auto space-y-4 rounded-xl bg-white p-4 pt-10 shadow-xl dark:border dark:border-gray-800">
                {/* Destination */}
                <h1>Where do you want to stay?</h1>
                <div className="gird-cols-1 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    <FormField
                        label="Destination"
                        value={form.destination ? `${form.destination.city}, ${form.destination.country}` : "Where do you want to stay?"}
                        icon={<MapPin size={16} />}
                        onClick={() => goToStep("destination")}
                    />

                    <FormField
                        label="Check In"
                        value={form.checkIn || "Select date"}
                        icon={<Calendar size={16} />}
                        onClick={() => goToStep("checkin")}
                    />
                    <FormField
                        label="Check Out"
                        value={form.checkOut || "Select date"}
                        icon={<Calendar size={16} />}
                        onClick={() => goToStep("checkout")}
                    />
                    <FormField
                        label="Guests & Rooms"
                        value={guestsSummary}
                        icon={<Users size={16} />}
                        onClick={() => goToStep("guests")}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSearch}
                        className="mx-auto w-full max-w-sm rounded-lg bg-blue-600 p-3 text-white"
                    >
                        Search Hotels
                    </button>
                </div>
            </div>

            {/* Modal */}
            {step && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-opacity duration-200 sm:items-center">
                    <div className="dark:bg-dark/[0.03] animate-fadeInUp max-h-[90vh] w-full max-w-md rounded-t-2xl bg-white dark:border dark:border-gray-800 sm:rounded-2xl">
                        {renderModal()}
                    </div>
                </div>
            )}
        </div>
    );
}

const FormField = ({ label, value, icon, onClick }) => (
    <div
        onClick={onClick}
        className="dark:bg-dark/[0.03] flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 dark:border-gray-800 dark:text-white"
    >
        <div>
            <p className="text-xs text-gray-500 dark:text-white">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
        <div>{icon}</div>
    </div>
);

const ModalWrapper = ({ title, onClose, children }) => (
    <div className="dark:bg-dark/[0.03] flex flex-col overflow-hidden rounded-2xl bg-white dark:text-white">
        <div className="relative flex items-center justify-center rounded-t-2xl bg-blue-600 px-4 py-5 text-white">
            <X
                size={20}
                className="absolute left-4 cursor-pointer"
                onClick={onClose}
            />
            <span className="text-lg font-medium">{title}</span>
        </div>
        <div className="p-4">{children}</div>
    </div>
);

const CustomDatePicker = ({ selectedDate, onSelect }) => (
    <div className="flex w-full justify-center font-sans dark:text-white">
        <DayPicker
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={onSelect}
            numberOfMonths={1}
            fromMonth={new Date()}
            className="dark:border-gray-800"
        />
    </div>
);
