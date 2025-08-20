// ---------- Seat ----------
const Seat = ({ number, availability, onSelect, isSelected }) => {
    const isAvailable = availability === "AVAILABLE";
    const bg = isSelected ? "text-white bg-blue-600" : isAvailable ? "bg-blue-200 text-blue-600" : "text-white bg-gray-500";

    return (
        <div
            onClick={() => isAvailable && onSelect(number)}
            className={`m-auto flex aspect-square w-full items-center justify-center rounded-lg text-[0.75rem] transition ${
                isAvailable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed opacity-60"
            } ${bg}`}
        >
            {number}
        </div>
    );
};

// ---------- Facility ----------
const Facility = ({ code }) => (
    <div className="flex w-full items-center justify-center rounded-lg bg-yellow-200 py-2 text-[0.7rem] font-medium">{code}</div>
);

// ---------- Exit ----------
const Exit = () => (
    <div className="col-span-full flex justify-between text-[0.7rem] font-semibold text-white">
        <span className="rounded-lg bg-green-600 p-2">EXIT</span>
        <span className="rounded-lg bg-green-600 p-2">EXIT</span>
    </div>
);

// ---------- Deck ----------
const SeatMap = ({ deck, selectedSeats, setSelectedSeats, passengers }) => {
    const { width, length, exitRowsX } = deck.deckConfiguration;
    const seatList = deck.seats;
    const facilities = deck.facilities;

    const toggleSeat = (number) => {
        setSelectedSeats((prev) => {
            // If already selected → unselect it
            if (prev.includes(number)) {
                return prev.filter((s) => s !== number);
            }

            // If under limit → add new seat
            if (prev.length < passengers) {
                return [...prev, number];
            }

            // If at limit → ignore OR replace oldest
            // Option A: Ignore extra clicks (no change)
            return prev;

            // Option B: Replace oldest selection (uncomment below, comment "return prev;")
            // return [...prev.slice(1), number];
        });
    };

    const grid = [];
    for (let row = 0; row < length; row++) {
        // Exit row → add exit across full row
        if (exitRowsX.includes(row)) {
            grid.push(<Exit key={`exit-${row}`} />);
        }

        for (let col = 0; col < width; col++) {
            // Seat at this row/col
            const seat = seatList.find((s) => s.coordinates.x === row && s.coordinates.y === col);
            if (seat) {
                grid.push(
                    <Seat
                        key={`seat-${row}-${col}`}
                        number={seat.number}
                        availability={seat.travelerPricing[0].seatAvailabilityStatus}
                        onSelect={toggleSeat}
                        isSelected={selectedSeats.includes(seat.number)}
                    />,
                );
                continue;
            }

            // Facilities at this row/col (can be multiple!)
            const cellFacilities = facilities.filter((f) => f.coordinates.x === row && f.coordinates.y === col);
            if (cellFacilities.length > 0) {
                grid.push(
                    <div
                        key={`facility-${row}-${col}`}
                        className="flex flex-col items-center justify-center gap-1"
                    >
                        {cellFacilities.map((f, i) => (
                            <Facility
                                key={i}
                                code={f.code}
                            />
                        ))}
                    </div>,
                );
                continue;
            }

            // Empty space
            grid.push(<div key={`empty-${row}-${col}`} />);
        }
    }

    return (
        <div
            className="grid gap-1 rounded-lg border-2 border-gray-300 p-2 dark:border-gray-800"
            style={{
                gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
            }}
        >
            {grid}
        </div>
    );
};
export default SeatMap;
