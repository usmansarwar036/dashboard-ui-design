import { Eye, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";

export default function RoleMembersTable({ users = [], editable = false, onRemove }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const filtered = useMemo(
        () => users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())),
        [users, search],
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="mt-2 w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
            {!editable && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Members</h3>
                    <input
                        type="text"
                        placeholder="Search users"
                        className="w-60 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            )}

            <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-3 font-semibold">Member</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map(({ id, name, email, pic, status }) => (
                        <tr
                            key={id}
                            className="border-t border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                        >
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={pic}
                                        alt={name}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 dark:text-white">{name}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                        status
                                            ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300"
                                            : "bg-gray-100 text-gray-500 dark:bg-gray-700/40 dark:text-gray-400"
                                    }`}
                                >
                                    {status ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                {editable && (
                                    <button
                                        onClick={() => onRemove?.(id)}
                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                                <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {paginated.length == 0 && (
                        <tr className="border-t border-gray-100 dark:border-gray-800">
                            <td
                                className="px-4 py-3 text-center"
                                colSpan={3}
                            >
                                No Data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

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
    );
}
