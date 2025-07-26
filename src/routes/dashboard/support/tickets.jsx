import { useState, useMemo } from "react";
import { X, Package, TrendingUp, TrendingDown, ClipboardCheck, Trash, Eye, Hourglass } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SearchUsers from "../../../components/searchUsers";

export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            ticket_no: "#1846325",
            requested_by: { name: "Ali", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            title: "Help with my purchase",
            desc: "Very long description about issue",
            priority: "high",
            agent: { name: "John", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            created_at: "03 Mar 2025",
            status: "pending",
        },
        {
            id: 2,
            ticket_no: "#1846326",
            requested_by: { name: "Sara", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            title: "Refund not received",
            desc: "Detailed issue with refund timeline",
            priority: "medium",
            agent: { name: "Nina", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            created_at: "01 Mar 2025",
            status: "solved",
        },
        {
            id: 3,
            ticket_no: "#1846327",
            requested_by: { name: "Ahsan", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            title: "Can't access account",
            desc: "Forgot password doesn't work",
            priority: "high",
            agent: { name: "Imran", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            created_at: "27 Feb 2025",
            status: "pending",
        },
        {
            id: 4,
            ticket_no: "#1846328",
            requested_by: { name: "Noor", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            title: "Change delivery address",
            desc: "Wrong address saved",
            priority: "low",
            agent: { name: "Usman", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            created_at: "26 Feb 2025",
            status: "deleted",
        },
        {
            id: 5,
            ticket_no: "#1846329",
            requested_by: { name: "Hassan", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            title: "Feature request",
            desc: "Add dark mode",
            priority: "low",
            agent: { name: "Hira", profile_pic: "/src/assets/profile-image.jpg", email: "timkana@gmail.com" },
            created_at: "25 Feb 2025",
            status: "solved",
        },
    ]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return tickets.filter((t) =>
            Object.values(t).some((val) =>
                typeof val === "object" ? Object.values(val).some((v) => String(v).toLowerCase().includes(q)) : String(val).toLowerCase().includes(q),
            ),
        );
    }, [tickets, search]);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const badge = {
        high: "bg-red-100 text-red-600 dark:bg-red-700/30 dark:text-red-400",
        medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/30 dark:text-yellow-400",
        low: "bg-gray-100 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400",
        pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/30 dark:text-yellow-400",
        solved: "bg-green-100 text-green-600 dark:bg-green-700/30 dark:text-green-400",
        deleted: "bg-red-100 text-red-600 dark:bg-red-700/30 dark:text-red-400",
    };

    return (
        <div className="w-full">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Tickets</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li>
                            <a
                                href="/"
                                className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400"
                            >
                                Home <span className="text-gray-400">/</span>
                            </a>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Tickets</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Total Products */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <Package size={20} />
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total Tickets</span>
                            <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">3,782</h4>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-green-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
                            <TrendingUp size={18} />
                            11.01%
                        </span>
                    </div>
                </div>

                {/* Pending Tickets */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <Hourglass
                            size={20}
                            className="animate-pulse"
                        />
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Pending Tickets</span>
                            <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">1,600</h4>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-green-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
                            <TrendingUp size={18} />
                            12%
                        </span>
                    </div>
                </div>

                {/* Solved tickets */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <ClipboardCheck size={20} />
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Solved Tickets</span>
                            <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">1,540</h4>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-red-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-red-600 dark:bg-red-500/15 dark:text-red-500">
                            <TrendingDown size={18} />
                            15%
                        </span>
                    </div>
                </div>

                {/* Deleted Tickets */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <Trash size={20} />
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Deleted Tickets</span>
                            <h4 className="mt-2 text-[30px] font-bold text-gray-800 dark:text-white/90">2,340</h4>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-red-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-red-600 dark:bg-red-500/15 dark:text-red-500">
                            <TrendingDown size={18} />
                            19%
                        </span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">
                <div className="my-2 flex gap-4 rounded-lg border p-2">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <div>
                        <CreateTicketButton />
                    </div>
                </div>
                <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-3">Ticket #</th>
                            <th className="px-4 py-3">Requested By</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Priority</th>
                            <th className="px-4 py-3">Assigned Agent</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((t) => (
                            <tr
                                key={t.id}
                                className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                            >
                                <td className="px-4 py-3">{t.ticket_no}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={t.requested_by.profile_pic}
                                            alt=""
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <div>{t.requested_by.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{t.requested_by.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{t.title}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[t.priority]}`}>{t.priority}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={t.agent.profile_pic}
                                            alt=""
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <div>{t.agent.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{t.agent.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{t.created_at}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[t.status]}`}>{t.status}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <a href="/tickets/details">
                                        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                            <Eye size={18} />
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="px-4 py-3 text-center text-gray-500"
                                >
                                    No tickets found.
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
    );
}

function CreateTicketButton() {
    const users = [
        { id: 1, name: "Ali", email: "ali@gmail.com", pic: "/src/assets/profile-image.jpg" },
        { id: 2, name: "John", email: "john@gmail.com", pic: "/src/assets/profile-image.jpg" },
        { id: 3, name: "Sara", email: "sara@gmail.com", pic: "/src/assets/profile-image.jpg" },
    ];
    const notUsers = [{ id: 3, name: "Sara", email: "sara@gmail.com", pic: "/src/assets/profile-image.jpg" }];
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        requester: "",
        agent: "",
        followers: [],
        tags: [],
        tagInput: "",
        title: "",
        priority: "medium",
        reply: "",
    });

    const handleSubmit = () => {
        console.log(form);
        setOpen(false);
    };

    const handleChange = (field, value) => setForm({ ...form, [field]: value });

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Create Ticket
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-5 backdrop-blur">
                    <div className="flex max-h-[80%] w-full max-w-xl flex-col rounded-3xl bg-white p-0 dark:bg-gray-900">
                        {/* Header */}
                        <div className="sticky top-0 z-10 rounded-t-3xl border-b border-gray-200 bg-white px-6 pb-4 pt-6 dark:border-gray-700 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                {" "}
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Create Ticket</h2>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 overflow-auto px-6 py-4">
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Select Requester</label>
                                <SearchUsers
                                    users={users}
                                    url="requester"
                                    returnVal={(user) => console.log("Requester selected", user)}
                                    notUsers={notUsers}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Select Agent</label>
                                <SearchUsers
                                    users={users}
                                    url="agents"
                                    returnVal={(user) => console.log("Agent selected", user)}
                                    notUsers={notUsers}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Enter Tags</label>
                                <SearchUsers
                                    users={users}
                                    returnVal={(user) => console.log("Agent selected", user)}
                                    notUsers={notUsers}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Enter Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border px-3 py-2"
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Select Priority</label>
                                <select
                                    className="w-full rounded-lg border px-3 py-2"
                                    onChange={(e) => handleChange("priority", e.target.value)}
                                    value={form.priority}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Enter Desciption</label>

                                <ReactQuill
                                    theme="snow"
                                    value={form.reply}
                                    onChange={(e) => handleChange("reply", e.target.value)}
                                    placeholder="Type your reply..."
                                    className="mb-14 h-32 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-b-3xl border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
