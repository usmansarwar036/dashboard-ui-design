import { useState } from "react";
import { MapPin, Calendar, Users, Plane, ChevronRight } from "lucide-react";
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
    {
        label: "Economy",
        code: "economy",
        desc: "Basic seating with standard amenities, ideal for budget travelers",
    },
    {
        label: "Premium Economy",
        code: "premium-economy",
        desc: "Extra legroom and enhanced comfort with additional services",
    },
    {
        label: "Business Class",
        code: "business",
        desc: "Spacious seating, gourmet meals, lounge access & priority boarding",
    },
    {
        label: "First Class",
        code: "first",
        desc: "Top-tier luxury experience with exclusive services and premium privacy",
    },
];

export default function FlightSearchForm() {
    const [step, setStep] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [form, setForm] = useState({
        tripType: "oneway",
        // TODO::
        // prompt:
        // remove fromcode,departDate, to,returnDate from , tocode feilds from form, set a new feilds of array inside array, do full functionality as well.
        // route: [
        //  [
        // from: [{ city: "San Francisco", country: "USA", code: "SFO", desc: "San Francisco International Airport" },date:'']
        // to: [ { city: "Mumbai", country: "India", code: "BOM", desc: "Chhatrapati Shivaji Maharaj International Airport" }, ,date:'']
        //  ],
        //  other arrays for multicity purpose
        // ]

        from: "",
        fromCode: "",
        to: "",
        toCode: "",
        departDate: "",
        returnDate: "",
        passengers: { adult: 1, child: 0, infant: 0 },
        seatClass: "economy",
    });

    const filteredPlaces =
        searchTerm.length >= 3 ? popularPlaces.filter((p) => p.city.toLowerCase().includes(searchTerm.toLowerCase())) : popularPlaces;

    const updateFormField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const openStep = (name) => {
        if (!form.from || !form.to) return setStep("from");
        setStep(name);
    };
    //
    const renderModal = () => {
        switch (step) {
            case "from":
            case "to":
                return (
                    <div className="">
                        <div className="rounded-t-2xl bg-blue-600 py-5 text-center text-lg text-white">
                            {step === "from" ? "Select Origin" : "Select Desctination"}
                        </div>
                        <div className="p-4">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search city or airport"
                                className="dark:bg-dark/[0.03] mb-4 w-full rounded-lg border p-2 dark:border-gray-800 dark:text-white"
                            />
                            <div className="max-h-[600px] overflow-y-auto sm:max-h-[500px]">
                                {filteredPlaces.map((place) => (
                                    <div
                                        key={place.code}
                                        onClick={() => {
                                            updateFormField(step, place.city);
                                            updateFormField(`${step}Code`, place.code);
                                            setSearchTerm("");
                                            setStep(step === "from" ? "to" : "dates");
                                        }}
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
                        </div>
                    </div>
                );

            case "dates":
                return (
                    <div className="dark:bg-dark/[0.03] flex flex-col overflow-hidden rounded-2xl bg-white dark:text-white">
                        {/* Header */}
                        <div className="rounded-t-2xl bg-blue-600 py-5 text-center text-lg text-white">
                            {form.tripType == "round" ? " Return Date" : " Departure Date"}
                        </div>

                        {/* Body (scrollable) */}
                        <div className="flex-1 p-4">
                            {/* Date buttons */}
                            <div className="mb-4 flex gap-2">
                                <button
                                    onClick={() => {
                                        updateFormField("returnDate", "");
                                        updateFormField("tripType", "oneway");
                                    }}
                                    className={`w-full rounded-lg p-2 ${
                                        form.departDate ? "bg-blue-600 text-white" : "border border-blue-200 dark:border-gray-800 dark:text-white"
                                    }`}
                                >
                                    {form.departDate || "Depart Date"}
                                </button>
                                <button
                                    onClick={() => updateFormField("tripType", "round")}
                                    className={`w-full rounded-lg p-2 ${
                                        form.returnDate ? "bg-blue-600 text-white" : "border border-blue-200 dark:border-gray-800 dark:text-white"
                                    }`}
                                >
                                    {form.returnDate || "+ Return Date"}
                                </button>
                            </div>

                            {/* Calendar container */}
                            <div className="max-h-[350px] overflow-y-auto">
                                <CustomDatePicker
                                    form={form}
                                    updateFormField={updateFormField}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="rounded-b-2xl border-t border-gray-200 p-4 dark:border-gray-800">
                            <button
                                onClick={() => setStep("passengers")}
                                className="w-full rounded-lg bg-blue-600 p-2 text-white"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                );

            case "passengers":
                return (
                    <div>
                        <div className="rounded-t-2xl bg-blue-600 py-5 text-center text-lg text-white">Select Passengers</div>
                        <div className="space-y-4 p-4 dark:text-white">
                            {["adult", "child", "infant"].map((type) => (
                                <div
                                    key={type}
                                    className="flex items-center justify-between"
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
                            <div className="flex gap-2">
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
                        </div>
                    </div>
                );

            case "class":
                return (
                    <div>
                        <div className="rounded-t-2xl bg-blue-600 py-5 text-center text-lg text-white">Select Class</div>
                        <div className="space-y-2 overflow-auto p-4 dark:text-white">
                            {seatClasses.map((cls) => (
                                <div
                                    key={cls.code}
                                    onClick={() => updateFormField("seatClass", cls.code)}
                                    className={cn("dark:bg-dark/[0.03] cursor-pointer rounded-lg border p-3 dark:border-gray-800 dark:text-white", {
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
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="mx-auto space-y-6 rounded-xl bg-white p-4 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-white">Good morning 👋</p>
                    <h2 className="font-bold dark:text-white">Andrew Ainsley</h2>
                </div>
                <div className="dark:bg-dark/[0.03] h-10 w-10 rounded-full bg-gray-200" />
            </div>

            {/* Trip Type */}
            <div className="flex max-w-sm space-x-2">
                {["oneway", "round"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setForm({ ...form, tripType: type, returnDate: "" })}
                        className={cn(
                            "flex-1 rounded-lg border p-2 text-sm",
                            form.tripType === type
                                ? "bg-blue-600 text-white"
                                : "dark:bg-dark/[0.03] border-gray-300 text-gray-600 dark:border-gray-800 dark:text-white",
                        )}
                    >
                        {type === "oneway" ? "One-Way" : "Round Trip"}
                    </button>
                ))}
            </div>

            {/* Search Form */}
            <div
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                onClick={() => openStep("from")}
            >
                <FormField
                    label="From"
                    value={form.from && form.fromCode ? `${form.from} (${form.fromCode})` : "Origin"}
                    icon={<MapPin size={16} />}
                />
                <FormField
                    label="To"
                    value={form.to && form.toCode ? `${form.to} (${form.toCode})` : "Destination"}
                    icon={<MapPin size={16} />}
                />
                <FormField
                    label="Departure"
                    value={form.departDate}
                    icon={<Calendar size={16} />}
                />
                {form.tripType === "round" && (
                    <FormField
                        label="Return"
                        value={form.returnDate}
                        icon={<Calendar size={16} />}
                    />
                )}

                <FormField
                    label="Passengers"
                    value={`${form.passengers.adult} Seat`}
                    icon={<Users size={16} />}
                />
                <FormField
                    label="Class"
                    value={form.seatClass}
                    icon={<Plane size={16} />}
                />
            </div>
            <div className="flex align-middle">
                <button
                    onClick={() => console.log("🛫 Final Flight Form", form)}
                    className="mx-auto w-full max-w-sm rounded-lg bg-blue-600 p-3 text-white"
                >
                    Search Flights
                </button>
            </div>
            {/* Modal */}
            {step && (
                <div className="fixed inset-0 z-50 !m-0 flex items-end justify-center bg-black/40 sm:items-center">
                    <div className="dark:bg-dark/[0.03] max-h-[90vh] w-full max-w-md rounded-t-2xl bg-white dark:border dark:border-gray-800 sm:rounded-b-2xl">
                        {renderModal()}
                    </div>
                </div>
            )}
        </div>
    );
}

const FormField = ({ label, value, icon }) => (
    <div className="dark:bg-dark/[0.03] flex w-full items-center justify-between rounded-lg border p-3 dark:border-gray-800 dark:text-white">
        <div>
            <p className="text-xs text-gray-500 dark:text-white">{label}</p>
            <p className="font-medium">{value || "Not selected"}</p>
        </div>
        <div>{icon}</div>
    </div>
);

const CustomDatePicker = ({ form, updateFormField }) => {
    const handleSelect = (date) => {
        const isoDate = date?.toLocaleDateString("en-CA");
        if (!isoDate) return;

        if (!form.departDate) {
            updateFormField("departDate", isoDate);
        } else if (form.tripType === "round") {
            const departDate = new Date(form.departDate);
            const selectedDate = new Date(isoDate);

            if (selectedDate >= departDate) {
                updateFormField("returnDate", isoDate);
            } else {
                // Optional: show alert or feedback here
                console.warn("Return date cannot be before departure date.");
            }
        } else {
            updateFormField("departDate", isoDate);
        }
    };

    // Restrict return date to not be before departDate
    const disabledDays =
        form.tripType === "round" && form.departDate
            ? {
                  before: new Date(form.departDate),
              }
            : undefined;

    return (
        <div className="dark:bg-dark/[0.03] flex w-full justify-center font-sans dark:text-white">
            <DayPicker
                animate
                mode="single"
                selected={form.returnDate ? new Date(form.returnDate) : form.departDate ? new Date(form.departDate) : undefined}
                onSelect={handleSelect}
                numberOfMonths={1}
                fromMonth={new Date()}
                disabled={disabledDays}
                className="dark:border-gray-800"
                styles={{
                    caption: { color: "inherit" },
                    nav_button_previous: { color: "inherit" },
                    nav_button_next: { color: "inherit" },
                    table: { width: "100%" },
                }}
            />
        </div>
    );
};
