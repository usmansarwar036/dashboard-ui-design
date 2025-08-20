import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Share2, X, Briefcase, Luggage, CheckCircle, Info, RockingChair, ChevronRight, PlaneTakeoff } from "lucide-react";
import OrigionDestinationArrowComponent from "./util/flight-component";
import SeatMap from "./util/seat-map";
import { seatMap } from "../../../data/seatmapdata";

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
                                passengers={3}
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

// ---------- Main Page ----------
export default function FlightDetailsPage() {
    const [seatModal, setSeatModal] = useState(false);
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
    const passengers = [
        { fname: "John", lname: "Doe" },
        { fname: "Jane", lname: "Smith" },
        { fname: "Alice", lname: "Johnson" },
    ];
    const [selectedSeats, setSelectedSeats] = useState([]);

    const saveFlight = () => console.log("saved");
    const shareFlight = () => {
        navigator.clipboard.writeText(window.location.href);
        console.log("copied");
    };

    return (
        <div className="dark:bg-dark/[0.03] flex min-h-screen max-w-sm flex-col border">
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
            <div className="m-2">
                <OrigionDestinationArrowComponent flight={flight} />
                <div className="my-2 rounded-lg bg-white px-2 py-4 shadow-md">
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
                <div className="rounded-lg bg-white px-2 py-3 shadow-md dark:bg-gray-800">
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
                                    className="mt-2 flex justify-between bg-gray-200 px-3 py-3"
                                >
                                    <p>
                                        {p.fname} {p.lname}
                                    </p>
                                    <p>{selectedSeats[i] ? selectedSeats[i] : "No Selection"}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <SeatSelectionModal
                    open={seatModal}
                    onClose={() => setSeatModal(false)}
                    passengers={passengers}
                    onConfirm={(seats) => setSelectedSeats(seats)}
                />
            </div>

            {/* Modal */}
        </div>
    );
}
