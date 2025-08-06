import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, CreditCard, ShoppingCart, DollarSign, FileText, Link } from "lucide-react";

const transactions = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "Manual" : "Peach Payment",
    credits: 100 + i * 5,
    status: ["pending", "approved", "deleted"][i % 3],
    date: `2025-07-${(i % 30) + 1}`,
    note: `Transaction note #${i + 1}`,
}));

const badge = {
    pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/20 dark:text-yellow-400",
    approved: "bg-green-100 text-green-600 dark:bg-green-700/20 dark:text-green-400",
    deleted: "bg-red-100 text-red-600 dark:bg-red-700/20 dark:text-red-400",
};

export default function WalletPage() {
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return transactions.filter(
            (t) =>
                t.type.toLowerCase().includes(search.toLowerCase()) ||
                t.status.toLowerCase().includes(search.toLowerCase()) ||
                t.note.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Wallet</h2>
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
                        <li className="text-gray-800 dark:text-white/90">Wallet</li>
                    </ol>
                </nav>
            </div>

            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card
                    icon={<CreditCard size={20} />}
                    title="Total Credits"
                    value="7,500"
                    trend="↑"
                    trendColor="green"
                />
                <Card
                    icon={<ShoppingCart size={20} />}
                    title="Purchased Credits"
                    value="4,200"
                    trend="↑"
                    trendColor="green"
                />
                <Card
                    icon={<DollarSign size={20} />}
                    title="Spent Credits"
                    value="3,100"
                    trend="↓"
                    trendColor="red"
                />
                <Card
                    icon={<FileText size={20} />}
                    title="Manual Adjustments"
                    value="200"
                    trend="→"
                    trendColor="gray"
                />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-900">
                {/* Search */}
                <div className="mb-3">
                    <input
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Credits</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-3">{t.type}</td>
                                    <td className="px-4 py-3">{t.credits}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[t.status]}`}>{t.status}</span>
                                    </td>
                                    <td className="px-4 py-3">{t.date}</td>
                                    <td className="px-4 py-3">{t.note}</td>
                                </tr>
                            ))}
                            {paginated.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Show
                        <select
                            className="mx-2 rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            {[5, 10, 20].map((opt) => (
                                <option
                                    key={opt}
                                    value={opt}
                                >
                                    {opt}
                                </option>
                            ))}
                        </select>
                        per page
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        {total > 0 && (
                            <span>
                                {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}
                            </span>
                        )}
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="rounded border px-2 py-1 disabled:opacity-40"
                        >
                            ←
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`rounded px-2 py-1 ${i + 1 === page ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="rounded border px-2 py-1 disabled:opacity-40"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Card = ({ icon, title, value, trend, trendColor }) => {
    const trendIcon = {
        "↑": <TrendingUp size={18} />,
        "↓": <TrendingDown size={18} />,
        "→": null,
    }[trend];

    const trendStyle = {
        green: "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500",
        red: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500",
        gray: "bg-gray-100 text-gray-600 dark:bg-gray-700/20 dark:text-gray-400",
    }[trendColor];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">{icon}</div>
            <div className="mt-5 flex items-end justify-between">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
                    <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">{value}</h4>
                </div>
                {trend !== "→" && (
                    <span className={`flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium ${trendStyle}`}>
                        {trendIcon}
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
};
