import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const flights = [
    {
        id: 1,
        airline: "Japan Airlines",
        logo: "https://placehold.co/32x32?text=JA",
        date: "Thu, Dec 21 2023",
        from: { city: "New York", time: "09:40", code: "LGA" },
        to: { city: "Tokyo", time: "17:00", code: "HND" },
        duration: "7h 20m",
        type: "Direct",
    },
    {
        id: 2,
        airline: "Qatar Airways",
        logo: "https://placehold.co/32x32?text=QA",
        date: "Fri, Jan 05 2024",
        from: { city: "Lahore", time: "02:30", code: "LHE" },
        to: { city: "Doha", time: "05:00", code: "DOH" },
        duration: "3h 30m",
        type: "Non-stop",
    },
    {
        id: 3,
        airline: "Emirates",
        logo: "https://placehold.co/32x32?text=EK",
        date: "Mon, Feb 12 2024",
        from: { city: "Dubai", time: "06:45", code: "DXB" },
        to: { city: "London", time: "11:20", code: "LHR" },
        duration: "7h 35m",
        type: "Direct",
    },
    {
        id: 4,
        airline: "Emirates",
        logo: "https://placehold.co/32x32?text=EK",
        date: "Mon, Feb 12 2024",
        from: { city: "Dubai", time: "06:45", code: "DXB" },
        to: { city: "London", time: "11:20", code: "LHR" },
        duration: "7h 35m",
        type: "Direct",
    },
];

export default function CreateInvoicePage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Flight Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to="/">Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            {/* Flight Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {flights.map((flight) => (
                    <div
                        key={flight.id}
                        className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                    >
                        <div className="p-5">
                            {/* Top Info */}
                            <div className="mb-3 flex items-center justify-between border-b pb-3">
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

                            {/* Flight Info */}
                            <div className="flex items-center justify-between">
                                {/* From */}
                                <div className="mr-3 text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">{flight.from.city}</div>
                                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.from.time}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{flight.from.code}</div>
                                </div>

                                {/* Arc with Plane */}
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

                                    {/* Endpoints */}
                                    <div className="sm:bottom absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                                    {/* Plane Icon */}
                                    <div className="absolute left-1/2 top-[0%] -translate-x-1/2 rotate-45 text-[#1A6BFF]">
                                        <Plane
                                            size={28}
                                            fill="#1A6BFF"
                                            stroke="#1A6BFF"
                                        />
                                    </div>

                                    {/* Duration Info */}
                                    <div className="absolute top-[35px] w-full text-center text-sm text-[#6B7280]">
                                        <div>{flight.duration}</div>
                                        <div>{flight.type}</div>
                                    </div>
                                </div>

                                {/* To */}
                                <div className="ml-3 text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">{flight.to.city}</div>
                                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.to.time}</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">{flight.to.code}</div>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-b-lg bg-blue-700 py-4 text-center text-white">Show Details</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
