import { useState } from "react";
import { MapPin, Calendar, Users, Plane, ChevronRight, Plus, Minus, X, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { cn } from "../../../utils/cn";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const popularPlaces = [
    { city: "New York", country: "USA", code: "JFK", desc: "John F. Kennedy International Airport" },
    { city: "Paris", country: "France", code: "CDG", desc: "Charles de Gaulle Airport" },
    { city: "Tokyo", country: "Japan", code: "NRT", desc: "Narita International Airport" },
    { city: "London", country: "UK", code: "LHR", desc: "Heathrow Airport" },
    { city: "Dubai", country: "UAE", code: "DXB", desc: "Dubai International Airport" },
    { city: "Singapore", country: "Singapore", code: "SIN", desc: "Changi Airport" },
    { city: "Los Angeles", country: "USA", code: "LAX", desc: "Los Angeles International Airport" },
    { city: "Frankfurt", country: "Germany", code: "FRA", desc: "Frankfurt Airport" },
    { city: "Hong Kong", country: "China", code: "HKG", desc: "Hong Kong International Airport" },
    { city: "Istanbul", country: "Turkey", code: "IST", desc: "Istanbul Airport" },
    { city: "Seoul", country: "South Korea", code: "ICN", desc: "Incheon International Airport" },
    { city: "Sydney", country: "Australia", code: "SYD", desc: "Sydney Kingsford Smith Airport" },
    { city: "Toronto", country: "Canada", code: "YYZ", desc: "Toronto Pearson International Airport" },
    { city: "Bangkok", country: "Thailand", code: "BKK", desc: "Suvarnabhumi Airport" },
    { city: "Amsterdam", country: "Netherlands", code: "AMS", desc: "Schiphol Airport" },
    { city: "Rome", country: "Italy", code: "FCO", desc: "Leonardo da Vinci–Fiumicino Airport" },
    { city: "San Francisco", country: "USA", code: "SFO", desc: "San Francisco International Airport" },
    { city: "Barcelona", country: "Spain", code: "BCN", desc: "Barcelona–El Prat Airport" },
    { city: "Doha", country: "Qatar", code: "DOH", desc: "Hamad International Airport" },
    { city: "Mumbai", country: "India", code: "BOM", desc: "Chhatrapati Shivaji Maharaj International Airport" },
];

const seatClasses = [
    { label: "Economy", code: "economy", desc: "Basic seating with standard amenities" },
    { label: "Premium Economy", code: "premium-economy", desc: "Extra legroom and enhanced comfort" },
    { label: "Business Class", code: "business", desc: "Spacious seating & priority boarding" },
    { label: "First Class", code: "first", desc: "Luxury experience with exclusive services" },
];

export default function FlightSearchForm() {
    const [step, setStep] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [segmentIndex, setSegmentIndex] = useState(0);
    const [fieldType, setFieldType] = useState(""); // "from" | "to" | "date"

    const [form, setForm] = useState({
        tripType: "oneway", // round , multicity
        route: [{ from: null, to: null, date: "" }],
        passengers: { adult: 1, child: 0, infant: 0 },
        seatClass: "economy",
    });

    const filteredPlaces =
        searchTerm.length >= 3 ? popularPlaces.filter((p) => p.city.toLowerCase().includes(searchTerm.toLowerCase())) : popularPlaces;

    const updateSegmentField = (index, key, value) => {
        setForm((prev) => {
            const updated = [...prev.route];
            updated[index] = { ...updated[index], [key]: value };
            return { ...prev, route: updated };
        });
    };

    const addSegment = () => {
        if (form.route.length >= 6) return;
        setForm((prev) => ({
            ...prev,
            route: [...prev.route, { from: null, to: null, date: "" }],
        }));
    };

    const removeSegment = (index) => {
        if (form.route.length <= 1) return;
        setForm((prev) => {
            const updated = prev.route.filter((_, i) => i !== index);
            return { ...prev, route: updated };
        });
    };

    const openStep = (type, index) => {
        setSegmentIndex(index);
        setFieldType(type);
        setStep("select");
    };

    const setTab = (type) => {
        let newRoute = [{ from: null, to: null, date: "" }];
        if (type === "round") {
            newRoute = [
                { from: null, to: null, date: "" },
                { from: null, to: null, date: "" },
            ];
        }
        setForm({ ...form, tripType: type, route: newRoute });
    };
    const handlePlaceSelect = (place) => {
        updateSegmentField(segmentIndex, fieldType, place);

        if (form.tripType === "round") {
            fieldType === "from" ? updateSegmentField(segmentIndex + 1, "to", place) : updateSegmentField(segmentIndex + 1, "from", place);
        }

        setSearchTerm("");

        if (form.tripType === "round" && fieldType === "to" && segmentIndex === 0) {
            setFieldType("date");
        } else if (fieldType === "to") {
            setFieldType("date");
        } else if (fieldType === "from") {
            setFieldType("to");
        }
    };

    const handleDateSelect = (date) => {
        if (!date) return;
        const isoDate = date.toLocaleDateString("en-CA");
        updateSegmentField(segmentIndex, "date", isoDate);
    };

    const nextAfterDate = () => {
        if (form.tripType === "round") {
            if (segmentIndex === 0) {
                if (form.route.length < 2) {
                    setForm((prev) => ({
                        ...prev,
                        route: [prev.route[0], { from: prev.route[0].to, to: prev.route[0].from, date: "" }],
                    }));
                }
                setSegmentIndex(1);
                setFieldType("date");
            } else {
                setStep("passengers");
            }
        } else if (form.tripType === "multicity") {
            if (segmentIndex < form.route.length - 1) {
                setSegmentIndex(segmentIndex + 1);
                setFieldType("from");
            } else {
                setStep("passengers");
            }
        } else {
            setStep("passengers");
        }
    };
    const getPrefix = (type, idx) => {
        if (type === "multicity") {
            const segmentLabels = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
            return segmentLabels[idx] || `${idx + 1}th`;
        } else return "";
    };

    const totalPassengers = form.passengers.adult + form.passengers.child + form.passengers.infant;

    const renderModal = () => {
        if (step === "select") {
            if (fieldType === "date") {
                return (
                    <ModalWrapper
                        title={`Select ${getPrefix(form.tripType, segmentIndex)} Departure Date `}
                        onClose={() => setStep(null)}
                    >
                        <CustomDatePicker
                            selectedDate={form.route[segmentIndex].date}
                            onSelect={handleDateSelect}
                        />
                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={() => setStep(null)}
                                className="w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={nextAfterDate}
                                className="w-full rounded-lg bg-blue-600 p-2 text-white"
                            >
                                OK
                            </button>
                        </div>
                    </ModalWrapper>
                );
            }
            return (
                <ModalWrapper
                    title={`Select ${getPrefix(form.tripType, segmentIndex)} ${fieldType === "from" ? "Origin" : "Destination"} `}
                    onClose={() => setStep(null)}
                >
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search city or airport"
                        className="dark:bg-dark/[0.03] mb-4 w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                    />
                    <div className="max-h-[450px] overflow-y-auto">
                        {filteredPlaces.map((place) => (
                            <div
                                key={place.code}
                                onClick={() => handlePlaceSelect(place)}
                                className="flex cursor-pointer items-center justify-between border-b p-3 dark:border-gray-800 dark:text-white"
                            >
                                <div>
                                    <p className="font-medium">
                                        {place.city} - {place.country}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-white">
                                        {place.code} - {place.desc}
                                    </p>
                                </div>
                                <ChevronRight size={18} />
                            </div>
                        ))}
                    </div>
                </ModalWrapper>
            );
        }
        if (step === "passengers") {
            return (
                <ModalWrapper
                    title="Select Passengers"
                    onClose={() => setStep(null)}
                >
                    {["adult", "child", "infant"].map((type) => (
                        <div
                            key={type}
                            className="flex items-center justify-between py-2"
                        >
                            <p className="capitalize">{type}</p>
                            <select
                                value={form.passengers[type]}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        passengers: { ...form.passengers, [type]: +e.target.value },
                                    })
                                }
                                className="dark:bg-dark/[0.03] rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                            >
                                {[...Array(6).keys()].map((i) => (
                                    <option key={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setStep(null)}
                            className="w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setStep("class")}
                            className="w-full rounded-lg bg-blue-600 p-2 text-white"
                        >
                            OK
                        </button>
                    </div>
                </ModalWrapper>
            );
        }
        if (step === "class") {
            return (
                <ModalWrapper
                    title="Select Class"
                    onClose={() => setStep(null)}
                >
                    {seatClasses.map((cls) => (
                        <div
                            key={cls.code}
                            onClick={() => setForm({ ...form, seatClass: cls.code })}
                            className={cn("dark:bg-dark/[0.03] my-2 cursor-pointer rounded-lg border p-3 dark:border-gray-800 dark:text-white", {
                                "bg-blue-100": form.seatClass === cls.code,
                            })}
                        >
                            <div className="text-sm font-semibold">{cls.label}</div>
                            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{cls.desc}</div>
                        </div>
                    ))}
                    <div className="flex gap-2 pt-4">
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
                            OK
                        </button>
                    </div>
                </ModalWrapper>
            );
        }
    };

    return (
        <div className="">
            <div className="mx-auto space-y-6 rounded-xl bg-white p-4 shadow-xl">
                {/* Trip Type */}
                <div className="flex max-w-sm space-x-2">
                    {["oneway", "round", "multicity"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTab(type)}
                            className={cn(
                                "flex-1 rounded-lg border p-2 text-sm",
                                form.tripType === type
                                    ? "bg-blue-600 text-white"
                                    : "dark:bg-dark/[0.03] border-gray-300 text-gray-600 dark:border-gray-800 dark:text-white",
                            )}
                        >
                            {type === "oneway" ? "One-Way" : type === "round" ? "Round Trip" : "Multi-City"}
                        </button>
                    ))}
                </div>

                {/* Segments */}
                {form.tripType === "round" ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <FormField
                            label="Origin"
                            value={form.route[0].from ? `${form.route[0].from.city} (${form.route[0].from.code})` : "Select"}
                            icon={<PlaneTakeoff size={16} />}
                            onClick={() => openStep("from", 0)}
                        />
                        <FormField
                            label="Destination"
                            value={form.route[0].to ? `${form.route[0].to.city} (${form.route[0].to.code})` : "Select"}
                            icon={<PlaneLanding size={16} />}
                            onClick={() => openStep("to", 0)}
                        />
                        <FormField
                            label="Depart"
                            value={form.route[0].date || "Select"}
                            icon={<Calendar size={16} />}
                            onClick={() => openStep("date", 0)}
                        />
                        <FormField
                            label="Return"
                            value={form.route[1]?.date || "Select"}
                            icon={<Calendar size={16} />}
                            onClick={() => openStep("date", 1)}
                        />
                        {/* Passengers + Class */}
                        <FormField
                            label="Travelers & Class"
                            value={`${totalPassengers} Passengers, ${seatClasses.find((s) => s.code === form.seatClass)?.label}`}
                            icon={<Users size={16} />}
                            onClick={() => setStep("passengers")}
                        />
                    </div>
                ) : (
                    form.route.map((seg, idx) => {
                        return (
                            <div
                                key={idx}
                                className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            >
                                <FormField
                                    label={getPrefix(form.tripType, idx) + " Origin"}
                                    value={seg.from ? `${seg.from.city} (${seg.from.code})` : "Select"}
                                    icon={<PlaneTakeoff size={16} />}
                                    onClick={() => openStep("from", idx)}
                                />
                                <FormField
                                    label={getPrefix(form.tripType, idx) + " Destination"}
                                    value={seg.to ? `${seg.to.city} (${seg.to.code})` : "Select"}
                                    icon={<PlaneLanding size={16} />}
                                    onClick={() => openStep("to", idx)}
                                />
                                <FormField
                                    label="Date"
                                    value={seg.date || "Select"}
                                    icon={<Calendar size={16} />}
                                    onClick={() => openStep("date", idx)}
                                />

                                {(form.tripType === "oneway" || (form.tripType === "multicity" && idx === form.route.length - 1)) && (
                                    <FormField
                                        label="Travelers & Class"
                                        value={`${totalPassengers} Passengers, ${seatClasses.find((s) => s.code === form.seatClass)?.label}`}
                                        icon={<Users size={16} />}
                                        onClick={() => setStep("passengers")}
                                    />
                                )}

                                {form.tripType === "multicity" && idx !== form.route.length - 1 && (
                                    <div className="flex justify-end align-middle">
                                        <button
                                            onClick={() => removeSegment(idx)}
                                            className="rounded-lg border p-6 text-red-500"
                                        >
                                            <Minus size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}

                {form.tripType === "multicity" && (
                    <button
                        onClick={addSegment}
                        className="ml-auto flex items-center gap-1 rounded-lg border p-2 text-sm dark:border-gray-800 dark:text-white"
                    >
                        <Plus size={16} /> Add Flight
                    </button>
                )}

                {/* Search */}
                <div className="flex align-middle">
                    <button
                        onClick={() => console.log("🛫 Final Flight Form", form)}
                        className="mx-auto w-full max-w-sm rounded-lg bg-blue-600 p-3 text-white"
                    >
                        Search Flights
                    </button>
                </div>
            </div>
            {/* Modal */}
            {step && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
                    <div className="dark:bg-dark/[0.03] max-h-[90vh] w-full max-w-md rounded-t-2xl bg-white dark:border dark:border-gray-800 sm:rounded-b-2xl">
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
            {/* Close button on left */}
            <X
                size={20}
                className="absolute left-4 cursor-pointer"
                onClick={onClose}
            />

            {/* Centered title */}
            <span className="text-lg font-medium">{title}</span>
        </div>

        <div className="p-4">{children}</div>
    </div>
);

const CustomDatePicker = ({ selectedDate, onSelect }) => (
    <div className="dark:bg-dark/[0.03] flex w-full justify-center font-sans dark:text-white">
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
