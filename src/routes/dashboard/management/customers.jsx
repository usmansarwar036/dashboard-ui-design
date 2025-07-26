import { useState, useMemo } from "react";
import { Eye } from "lucide-react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "Aisha Khan",
            email: "aisha.k@example.com",
            phone: "+971123456789",
            passport: "P1234567",
            country: "UAE",
            city: "Dubai",
            totalBookings: 5,
            lastBooked: "Umrah Package",
            lastBookingOn: "2025-06-20",
            totalSpend: "$4,000",
            lastPayment: "$800",
            lastPaymentStatus: "Paid",
            note: "Prefers window seat",
            status: 1,
            pic: "/src/assets/profile-image.jpg",
        },
        {
            id: 2,
            name: "Omar Farooq",
            email: "omar.f@example.com",
            phone: "+966512345678",
            passport: "P9876543",
            country: "KSA",
            city: "Riyadh",
            totalBookings: 3,
            lastBooked: "Hajj 2025",
            lastBookingOn: "2025-07-01",
            totalSpend: "$7,500",
            lastPayment: "$1,200",
            lastPaymentStatus: "Pending",
            note: "VIP package",
            status: 1,
            pic: "/src/assets/profile-image.jpg",
        },
        {
            id: 3,
            name: "Fatima Noor",
            email: "fatima.n@example.com",
            phone: "+92-3210000000",
            passport: "P2468101",
            country: "Pakistan",
            city: "Lahore",
            totalBookings: 2,
            lastBooked: "Holiday Turkey",
            lastBookingOn: "2025-05-10",
            totalSpend: "$2,100",
            lastPayment: "$1,100",
            lastPaymentStatus: "Paid",
            note: "",
            status: 0,
            pic: "/src/assets/profile-image.jpg",
        },
    ]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return customers.filter((c) => Object.values(c).some((val) => String(val).toLowerCase().includes(q)));
    }, [customers, search]);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="">
                {/* Header */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Customers</h2>
                </div>

                <div className="mt-2 w-full rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customers</h3>
                        <input
                            type="text"
                            placeholder="Search any field"
                            className="w-60 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="px-4 py-3 font-semibold">Customer</th>
                                    <th className="px-4 py-3 font-semibold">Phone</th>
                                    <th className="px-4 py-3 font-semibold">Passport No.</th>
                                    <th className="px-4 py-3 font-semibold">Country</th>
                                    <th className="px-4 py-3 font-semibold">City</th>
                                    <th className="px-4 py-3 font-semibold">Total Bookings</th>
                                    <th className="px-4 py-3 font-semibold">Last Booked</th>
                                    <th className="px-4 py-3 font-semibold">Last Booking On</th>
                                    <th className="px-4 py-3 font-semibold">Total Spend</th>
                                    <th className="px-4 py-3 font-semibold">Last Payment</th>
                                    <th className="px-4 py-3 font-semibold">Last Payment Status</th>
                                    <th className="px-4 py-3 font-semibold">Note</th>
                                    <th className="px-4 py-3 font-semibold">Status</th>
                                    <th className="px-4 py-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-t border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={c.pic}
                                                    alt={c.name}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800 dark:text-white">{c.name}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{c.phone}</td>
                                        <td className="px-4 py-3">{c.passport}</td>
                                        <td className="px-4 py-3">{c.country}</td>
                                        <td className="px-4 py-3">{c.city}</td>
                                        <td className="px-4 py-3">{c.totalBookings}</td>
                                        <td className="px-4 py-3">{c.lastBooked}</td>
                                        <td className="px-4 py-3">{c.lastBookingOn}</td>
                                        <td className="px-4 py-3">{c.totalSpend}</td>
                                        <td className="px-4 py-3">{c.lastPayment}</td>
                                        <td className="px-4 py-3">{c.lastPaymentStatus}</td>
                                        <td className="px-4 py-3">{c.note || "-"}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${c.status ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300" : "bg-gray-100 text-gray-500 dark:bg-gray-700/40 dark:text-gray-400"}`}
                                            >
                                                {c.status ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {paginated.length === 0 && (
                                    <tr className="border-t border-gray-100 dark:border-gray-800">
                                        <td
                                            className="px-4 py-3 text-center"
                                            colSpan={14}
                                        >
                                            No customers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            Show
                            <select
                                className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
                                    setPage(1);
                                }}
                            >
                                {[5, 10, 20, 30, 50].map((opt) => (
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
                                    {Math.min((page - 1) * perPage + 1, total)}-{Math.min(page * perPage, total)} of {total}
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
        </div>
    );
}
