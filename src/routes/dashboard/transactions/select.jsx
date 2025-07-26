import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
export default function CustomSelect({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={ref}
            className="relative inline-block w-full text-left"
        >
            <button
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${value != "All time" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
            >
                {value}

                {value != "All time" && (
                    <X
                        onClick={(e) => {
                            e.stopPropagation(); // prevent parent button toggle
                            onChange("All time");
                        }}
                        className="ml-2 h-4 w-4"
                    />
                )}
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-40 rounded-md border bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
