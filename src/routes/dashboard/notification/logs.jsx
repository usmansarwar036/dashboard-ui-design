import { Link } from "lucide-react";
import { useState } from "react";

const logs = [
    {
        user: { name: "Alice", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Alice' added priority 'Important' to Project - Nganter App",
        link: "/project/nganter-app",
        time: "5 min ago",
    },
    {
        user: { name: "Bob", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Bob' updated user roles in Settings - Main Panel",
        link: "/settings/main-panel",
        time: "10 min ago",
    },
    {
        user: { name: "Charlie", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Charlie' removed tag 'urgent' from Project - UI Redesign",
        link: "/project/ui-redesign",
        time: "15 min ago",
    },
    {
        user: { name: "Dave", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Dave' enabled 2FA in Settings - Admin Panel",
        link: "/settings/admin-panel",
        time: "20 min ago",
    },
    {
        user: { name: "Eva", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Eva' moved task to Done in Project - Mobile App",
        link: "/project/mobile-app",
        time: "25 min ago",
    },
    {
        user: { name: "Frank", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Frank' added new comment to Project - Backend API",
        link: "/project/backend-api",
        time: "30 min ago",
    },
    {
        user: { name: "Grace", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Grace' changed theme to dark mode in Settings",
        link: "/settings/preferences",
        time: "35 min ago",
    },
    {
        user: { name: "Hank", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Hank' assigned new developer to Project - CRM Integration",
        link: "/project/crm-integration",
        time: "40 min ago",
    },
    {
        user: { name: "Ivy", pic: "/src/assets/profile-image.jpg" },
        title: "Settings",
        description: "User 'Ivy' changed password in Settings - Security",
        link: "/settings/security",
        time: "45 min ago",
    },
    {
        user: { name: "Jack", pic: "/src/assets/profile-image.jpg" },
        title: "Project",
        description: "User 'Jack' archived Project - Legacy System",
        link: "/project/legacy-system",
        time: "50 min ago",
    },
];

export default function ActivityLogPage() {
    const [page, setPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.ceil(logs.length / perPage);
    const paginatedLogs = logs.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white/90">Activity Log</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Activity Log</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="">
                    {paginatedLogs.map((log, i) => (
                        <a
                            href={log.link}
                            key={i}
                            className="flex gap-4 rounded-lg border-b border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                            <img
                                src={log.user.pic}
                                alt={log.user.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800 dark:text-white">{log.user.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{log.description}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500">{log.time}</div>
                            </div>
                        </a>
                    ))}
                </div>

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
