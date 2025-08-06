import { useState } from "react";
import { Bell, Link } from "lucide-react";

const notifications = [
    {
        user: { name: "Alice", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Alice' requests permission to change Project - Nganter App",
        status: 0,
        link: "/project/nganter-app",
        time: "5 min ago",
    },
    {
        user: { name: "Bob", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Bob' updated Settings - Main Panel",
        status: 1,
        link: "/settings/main-panel",
        time: "15 min ago",
    },
    {
        user: { name: "Charlie", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Charlie' added new milestone to Project - UI Redesign",
        status: 0,
        link: "/project/ui-redesign",
        time: "25 min ago",
    },
    {
        user: { name: "Dave", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Dave' changed permissions in Settings - Admin Roles",
        status: 1,
        link: "/settings/admin-roles",
        time: "40 min ago",
    },
    {
        user: { name: "Eva", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Eva' requests access to Project - Mobile App",
        status: 0,
        link: "/project/mobile-app",
        time: "1 hr ago",
    },
    {
        user: { name: "Frank", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Frank' removed access from Settings - User Roles",
        status: 1,
        link: "/settings/user-roles",
        time: "2 hr ago",
    },
    {
        user: { name: "Grace", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Grace' completed task in Project - Dashboard Update",
        status: 1,
        link: "/project/dashboard-update",
        time: "3 hr ago",
    },
];

export default function NotificationPage() {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const totalPages = Math.ceil(notifications.length / perPage);
    const paginated = notifications.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="max-w-screen mx-auto">
            <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white/90">Notification</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Notification</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <ul className="custom-scrollbar max-h-[75vh] divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
                    {paginated.map((n, i) => (
                        <li key={i}>
                            <a
                                href={n.link}
                                className="flex items-center gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                <img
                                    src={n.user.pic}
                                    alt={n.user.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">{n.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{n.description}</p>
                                </div>
                                <div className="flex flex-col items-end text-xs text-gray-400">
                                    <span>{n.time}</span>
                                    {n.status === 0 && <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500" />}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm dark:border-gray-800">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1 disabled:opacity-50 dark:border-gray-700 dark:bg-white/5"
                    >
                        Previous
                    </button>
                    <span className="text-gray-500 dark:text-gray-400">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1 disabled:opacity-50 dark:border-gray-700 dark:bg-white/5"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
