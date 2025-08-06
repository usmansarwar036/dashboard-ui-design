import { useState, useMemo } from "react";
import { TrendingDown, Clock4, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState([
        {
            id: "H-3423",
            menu: "hotel",
            client: { name: "Ali", email: "ali@gmail.com", pic: "/src/assets/profile-image.jpg" },
            start_date: "2025-03-01",
            due_date: "2025-03-10",
            amount: 1200,
            status: "paid",
        },
        {
            id: "U-423",
            menu: "umrah",
            client: { name: "Sara", email: "sara@gmail.com", pic: "/src/assets/profile-image.jpg" },
            start_date: "2025-03-05",
            due_date: "2025-03-15",
            amount: 2100,
            status: "unpaid",
        },
        {
            id: "U-424",
            menu: "umrah",
            client: { name: "Ahsan", email: "ahsan@gmail.com", pic: "/src/assets/profile-image.jpg" },
            start_date: "2025-03-03",
            due_date: "2025-03-12",
            amount: 980,
            status: "pending",
        },
        {
            id: "H-999",
            menu: "hotel",
            client: { name: "Noor", email: "noor@gmail.com", pic: "/src/assets/profile-image.jpg" },
            start_date: "2025-03-01",
            due_date: "2025-03-04",
            amount: 500,
            status: "overdue",
        },
    ]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return invoices.filter((inv) =>
            Object.values(inv).some((val) =>
                typeof val === "object" ? Object.values(val).some((v) => String(v).toLowerCase().includes(q)) : String(val).toLowerCase().includes(q),
            ),
        );
    }, [invoices, search]);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const badge = {
        paid: "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300",
        unpaid: "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-300",
        pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300",
        overdue: "bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300",
    };

    const countByStatus = (status) => invoices.filter((inv) => inv.status === status).length;

    return (
        <div className="w-full">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Invoices</h2>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "paid", icon: <CheckCircle2 size={20} />, color: "green", key: "paid" },
                    { label: "unpaid", icon: <XCircle size={20} />, color: "red", key: "unpaid" },
                    { label: "pending", icon: <Clock4 size={20} />, color: "yellow", key: "pending" },
                    { label: "overdue", icon: <TrendingDown size={20} />, color: "orange", key: "overdue" },
                ].map(({ label, key }) => (
                    <div
                        key={key}
                        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900"
                    >
                        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[label]}`}>{label}</span>

                        <div className="mt-2">
                            <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">$54,600</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{countByStatus(key)} Invoices</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-4 flex items-center justify-between gap-2">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Search invoices..."
                />

                <Link to="/dashboard/invoices/create">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">+</button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">
                <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-3">Invoice ID</th>
                            <th className="px-4 py-3">Menu</th>
                            <th className="px-4 py-3">Client</th>
                            <th className="px-4 py-3">Start Date</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((inv) => (
                            <tr
                                key={inv.id}
                                className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                            >
                                <td className="px-4 py-3">{inv.id}</td>
                                <td className="px-4 py-3 capitalize">{inv.menu}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={inv.client.pic}
                                            alt=""
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <div>{inv.client.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{inv.client.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{inv.start_date}</td>
                                <td className="px-4 py-3">{inv.due_date}</td>
                                <td className="px-4 py-3 font-semibold">${inv.amount}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[inv.status]}`}>{inv.status}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <Link to="/dashboard/invoices/details">
                                        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                            <Eye size={18} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-3 text-center text-gray-500"
                                >
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
    );
}
