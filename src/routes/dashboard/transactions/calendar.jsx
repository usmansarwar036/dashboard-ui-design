import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarDays, X } from "lucide-react";

export default function CalendarModalView({ transactions = [], onDateClick }) {
    const [open, setOpen] = useState(false);

    const events = useMemo(() => {
        const grouped = {};
        transactions.forEach(({ date, status }) => {
            if (!grouped[date]) grouped[date] = {};
            grouped[date][status] = (grouped[date][status] || 0) + 1;
        });
        return Object.entries(grouped).map(([date, statuses]) => ({
            date,
            allDay: true,
            extendedProps: { statuses },
        }));
    }, [transactions]);

    const getStatusClass = (status) =>
        status === "completed"
            ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300"
            : status === "refunded"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300"
              : "bg-red-100 text-red-600 dark:bg-red-800/40 dark:text-red-300";

    const handleClick = (dateStr) => {
        setOpen(false);
        onDateClick?.(dateStr);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm dark:border-gray-700 dark:text-white sm:w-full"
            >
                <CalendarDays size={16} />
                Calendar
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    ></div>

                    <div className="relative z-10 h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-10 mb-2 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold dark:text-white">Calendar</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-red-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Calendar Scrollable Container */}
                        <div className="h-full overflow-auto px-4 pb-6">
                            <div className="min-w-[500px] cursor-pointer overflow-x-auto dark:text-white">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    height="auto"
                                    events={events}
                                    dateClick={(info) => handleClick(info.dateStr)}
                                    eventClick={(info) => handleClick(info.event.startStr)}
                                    eventContent={({ event }) => {
                                        const statuses = event.extendedProps.statuses;
                                        return (
                                            <div className="space-y-0.5">
                                                {Object.entries(statuses).map(([status, count]) => (
                                                    <div
                                                        key={status}
                                                        className={`m-1 rounded-lg px-2 py-0.5 text-[11px] font-medium ${getStatusClass(status)}`}
                                                    >
                                                        <span className="pr-1 font-semibold">{count}</span> {status}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }}
                                    eventClassNames={() => "bg-transparent border-0 p-0 m-0 shadow-none"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
