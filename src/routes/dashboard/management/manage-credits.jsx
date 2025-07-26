import { useState, useMemo } from "react";
import { Eye, Trash, Check } from "lucide-react";
import SearchUsers from "../../../components/searchUsers";

const transactions = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "Manual" : "Peach Payment",
    credits: 100 + i * 5,
    status: ["pending", "approved", "deleted"][i % 3],
    date: `2025-07-${(i % 30) + 1}`,
    note: `Transaction note #${i + 1}`,
    proof: "https://via.placeholder.com/400",
    user: { id: 1, name: "Alice", email: "alice@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
}));
const users = [
    {
        id: 1,
        name: "Ali",
        email: "ali@gmail.com",
        pic: "/src/assets/profile-image.jpg",
    },
    {
        id: 2,
        name: "John",
        email: "john@gmail.com",
        pic: "/src/assets/profile-image.jpg",
    },
    {
        id: 3,
        name: "Sara",
        email: "sara@gmail.com",
        pic: "/src/assets/profile-image.jpg",
    },
];

const badge = {
    pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/20 dark:text-yellow-400",
    approved: "bg-green-100 text-green-600 dark:bg-green-700/20 dark:text-green-400",
    deleted: "bg-red-100 text-red-600 dark:bg-red-700/20 dark:text-red-400",
};

export default function WalletPage() {
    const [search, setSearch] = useState(""),
        [perPage, setPerPage] = useState(10),
        [page, setPage] = useState(1);
    const [showAdd, setShowAdd] = useState(false),
        [showProof, setShowProof] = useState(false),
        [proofImg, setProofImg] = useState("");
    const filtered = useMemo(
        () => transactions.filter((t) => [t.type, t.status, t.note].some((v) => v.toLowerCase().includes(search.toLowerCase()))),
        [search],
    );
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Manage Wallet</h2>
            </div>

            {/* Table Section */}
            <div className="rounded-xl border bg-white p-4 dark:border-gray-700 dark:bg-slate-900">
                <div className="flex gap-2">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => (setSearch(e.target.value), setPage(1))}
                        className="mb-3 w-full rounded border px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                        onClick={() => setShowAdd(true)}
                        className="mb-3 text-nowrap rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        + Add Credits
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Credits</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Note</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length ? (
                                paginated.map((t) => (
                                    <tr
                                        key={t.id}
                                        className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={t.user.pic}
                                                    alt={t.user.name}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800 dark:text-white">{t.user.name}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{t.user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{t.type}</td>
                                        <td className="px-4 py-3">{t.credits}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[t.status]}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{t.date}</td>
                                        <td className="px-4 py-3">{t.note}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex justify-center">
                                                    <a
                                                        onClick={() => (setProofImg(t.proof), setShowProof(true))}
                                                        className="cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                    >
                                                        <Eye size={18} />
                                                    </a>

                                                    {t.type === "Manual" && t.status === "pending" && (
                                                        <>
                                                            <a className="cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                                                <Check size={18} />
                                                            </a>
                                                            <a className="cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                                                <Trash size={18} />
                                                            </a>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        No transactions
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
                            className="mx-2 rounded border px-2 py-1 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            value={perPage}
                            onChange={(e) => (setPerPage(+e.target.value), setPage(1))}
                        >
                            {[5, 10, 20].map((n) => (
                                <option key={n}>{n}</option>
                            ))}
                        </select>
                        per page
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                            {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="rounded border px-2 py-1 disabled:opacity-40"
                        >
                            ←
                        </button>
                        {[...Array(Math.ceil(filtered.length / perPage))].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`rounded px-2 py-1 ${page === i + 1 ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(filtered.length / perPage)))}
                            disabled={page === Math.ceil(filtered.length / perPage)}
                            className="rounded border px-2 py-1 disabled:opacity-40"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Credits Modal */}
            {showAdd && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold">Add Credits</h2>
                        <form className="space-y-3">
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Select User</label>
                                <SearchUsers
                                    users={users}
                                    url="requester"
                                    returnVal={(user) => console.log("Requester selected", user)}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Enter Credits</label>
                                <input
                                    type="number"
                                    placeholder="Credits"
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Note</label>
                                <input
                                    type="text"
                                    placeholder="Note"
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Proof</label>
                                <input
                                    type="file"
                                    placeholder="Proof"
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setShowAdd(false)}
                                    type="button"
                                    className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Proof Modal */}
            {showProof && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative max-w-lg rounded-xl bg-white p-4 dark:bg-gray-900">
                        <button
                            onClick={() => setShowProof(false)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-white"
                        >
                            ✕
                        </button>
                        <img
                            src={proofImg}
                            alt="Proof"
                            className="max-h-[75vh] w-full rounded object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
