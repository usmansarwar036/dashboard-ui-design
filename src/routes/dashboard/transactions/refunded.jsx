import { useState, useMemo } from "react";
import { Eye, Download, FileText, Link } from "lucide-react";
import CalendarView from "./calendar";
import CustomSelect from "./select";

// Sample transactions
const transactions = [
    {
        id: 1,
        order_id: "ORD001",
        customer: { name: "Alice", email: "alice@example.com" },
        total: 150,
        date: "2025-07-14",
        status: "refunded",
        type: "digital",
    },
    {
        id: 2,
        order_id: "ORD002",
        customer: { name: "Bob", email: "bob@example.com" },
        total: 299,
        date: "2025-07-10",
        status: "refunded",
        type: "packing",
    },
    {
        id: 3,
        order_id: "ORD003",
        customer: { name: "Charlie", email: "charlie@example.com" },
        total: 500,
        date: "2025-06-30",
        status: "refunded",
        type: "digital",
    },
    {
        id: 4,
        order_id: "ORD003",
        customer: { name: "Charlie", email: "charlie@example.com" },
        total: 500,
        date: "2025-06-30",
        status: "refunded",
        type: "digital",
    },
    // Add more as needed
];

const dateOptions = ["Today", "Yesterday", "Last 7 days", "Month to Date", "Year to Date", "All time"];

export default function TransactionsPage() {
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [dateFilter, setDateFilter] = useState("All time");

    const filtered = useMemo(() => {
        const today = new Date();
        const startDates = {
            Today: new Date(today),
            Yesterday: new Date(new Date().setDate(today.getDate() - 1)),
            "Last 7 days": new Date(new Date().setDate(today.getDate() - 6)),
            "Month to Date": new Date(today.getFullYear(), today.getMonth(), 1),
            "Year to Date": new Date(today.getFullYear(), 0, 1),
            "All time": null,
        };

        return transactions
            .filter((t) => {
                const q = search.toLowerCase();
                return (
                    t.order_id.toLowerCase().includes(q) || t.customer.name.toLowerCase().includes(q) || t.customer.email.toLowerCase().includes(q)
                );
            })
            .filter((t) => {
                if (!dateFilter) return true;
                const txDate = new Date(t.date);
                if (startDates[dateFilter]) return txDate >= startDates[dateFilter];
                if (!isNaN(Date.parse(dateFilter))) return txDate.toISOString().slice(0, 10) === dateFilter;
                return true;
            });
    }, [search, dateFilter]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="w-full overflow-x-auto">
            {/* Header */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Refunded</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li>
                            <Link
                                to="/dashboard/"
                                className="dark:bg-dark/[0.03] inline-flex items-center gap-1.5 text-gray-500 dark:border-gray-800 dark:text-white"
                            >
                                Home <span className="text-gray-400">/</span>
                            </Link>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Refunded</li>
                    </ol>
                </nav>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <div className="flex flex-col-reverse justify-between gap-1 lg:flex-row">
                    <div className="flex flex-wrap">
                        <input
                            type="text"
                            placeholder="Search"
                            className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-[200px] ${search ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                        <div className="w-1/2 pt-1 sm:w-auto sm:pl-1 sm:pt-0">
                            <CustomSelect
                                options={dateOptions}
                                value={dateFilter}
                                onChange={setDateFilter}
                            />
                        </div>

                        <div className="w-1/2 pl-1 pt-1 sm:w-auto sm:pt-0">
                            <button className="flex w-full items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                        <div className="w-full pt-1 sm:w-auto sm:pl-1 sm:pt-0">
                            <CalendarView
                                transactions={transactions}
                                onDateClick={(date) => {
                                    setDateFilter(date);
                                }}
                            />
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                        <FileText size={16} /> Generate Report
                    </button>
                </div>

                {/* Table */}
                <table className="mt-4 min-w-full table-auto text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-3 text-left">Order ID</th>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((t) => (
                            <tr
                                key={t.id}
                                className="border-t border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                            >
                                <td className="px-4 py-3">{t.order_id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col">
                                        <span>{t.customer.name}</span>
                                        <span className="text-xs text-gray-500">{t.customer.email}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">${t.total}</td>
                                <td className="px-4 py-3 text-center capitalize">{t.type}</td>
                                <td className="px-4 py-3 text-center">{t.date}</td>
                                <td className="px-4 py-3 capitalize">
                                    <div className="flex justify-center">
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                                t.status === "completed"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300"
                                                    : t.status === "refunded"
                                                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300"
                                                      : "bg-red-100 text-red-600 dark:bg-red-800/40 dark:text-red-300"
                                            }`}
                                        >
                                            {t.status}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center">
                                        <a
                                            href={`/profile/${t.customer.name}`}
                                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                        >
                                            <Eye size={18} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        Show
                        <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            className="rounded border px-2 py-1 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            {[5, 10, 20, 50].map((n) => (
                                <option
                                    key={n}
                                    value={n}
                                >
                                    {n}
                                </option>
                            ))}
                        </select>
                        per page
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                            {Math.min((page - 1) * perPage + 1, filtered.length)} - {Math.min(page * perPage, filtered.length)} of {filtered.length}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="rounded border px-2 py-1 disabled:opacity-50"
                        >
                            ←
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`rounded px-2 py-1 ${page === i + 1 ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="rounded border px-2 py-1 disabled:opacity-50"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
