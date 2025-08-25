import { useEffect, useRef, useState } from "react";
import FlightSearchForm from "./flight/util/search-form";
import HotelSearchForm from "./hotel/util/search-form";
import { Hotel, Plane, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
    const [currentTab, setCurrentTab] = useState("hotel");
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const scrollRef = useRef(null);

    const tabs = [
        { id: "hotel", title: "Hotels", icon: Hotel },
        { id: "flight", title: "Flights", icon: Plane },
    ];

    // --- Check scroll visibility ---
    const checkForScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth);
    };

    useEffect(() => {
        checkForScroll();
        window.addEventListener("resize", checkForScroll);
        return () => window.removeEventListener("resize", checkForScroll);
    }, []);

    const scrollLeftFn = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };

    const scrollRightFn = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };

    return (
        <div className="container relative mx-auto px-2 pt-20">
            {/* Scrollable Tabs Bar */}
            <div className="absolute left-0 right-0 -mt-9 flex translate-y-1/2 justify-center px-4">
                <div className="relative mx-auto inline-flex max-w-2xl rounded-full bg-white px-2 shadow-sm">
                    {showLeft && (
                        <button
                            onClick={scrollLeftFn}
                            className="dark:bg-dark/[0.03] absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-xl dark:border-gray-800 dark:text-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        onScroll={checkForScroll}
                        className="scrollbar-hide flex gap-2 overflow-x-auto whitespace-nowrap px-1 py-2"
                    >
                        {tabs.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                                        currentTab === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                                    onClick={() => setCurrentTab(item.id)}
                                >
                                    <Icon size={18} />
                                    {item.title}
                                </div>
                            );
                        })}
                    </div>

                    {showRight && (
                        <button
                            onClick={scrollRightFn}
                            className="dark:bg-dark/[0.03] absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-xl dark:border-gray-800 dark:text-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Forms */}
            <div className="mt-6">
                {currentTab.includes("flight") && <FlightSearchForm />}
                {currentTab.includes("hotel") && <HotelSearchForm />}
            </div>
        </div>
    );
}
