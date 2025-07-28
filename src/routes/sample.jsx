import { Link } from "react-router-dom";

export default function CreateInvoicePage() {
    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Flight Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to={"/"}>Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>

                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            {/* Content */}
            <div className="mb-2 flex flex-wrap items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"></div>
        </div>
    );
}
