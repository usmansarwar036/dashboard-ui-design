import { useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Bell, ChevronsLeft, Link, Moon, Search, Sun } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import PropTypes from "prop-types";
import { UserCog, Settings, LifeBuoy, LogOut } from "lucide-react";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifydropdownOpen, setNotifyDropdownOpen] = useState(false);
    const buttonRef = useRef();
    const notifyButtonRef = useRef();
    const dropdownRef = useRef();
    const notifydropdownRef = useRef();
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
    ];

    useClickOutside([buttonRef, dropdownRef], () => setDropdownOpen(false));
    useClickOutside([notifyButtonRef, notifydropdownRef], () => setNotifyDropdownOpen(false));

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>

            <div className="relative flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>

                {/* Notify Dropdown */}
                <div className="relative">
                    <button
                        ref={notifyButtonRef}
                        className="btn-ghost size-10"
                        onClick={() => setNotifyDropdownOpen(!notifydropdownOpen)}
                    >
                        <Bell size={20} />
                    </button>

                    {notifydropdownOpen && (
                        <div
                            ref={notifydropdownRef}
                            className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-slate-900 sm:w-[361px] lg:right-0"
                        >
                            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">Notification</h5>
                                <button
                                    onClick={() => setNotifyDropdownOpen(false)}
                                    className="text-gray-500 dark:text-gray-400"
                                >
                                    <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <ul className="custom-scrollbar flex h-auto flex-col overflow-y-auto">
                                {notifications.map((n, i) => (
                                    <li key={i}>
                                        <a
                                            href={n.link}
                                            className="px-4.5 flex gap-3 rounded-lg border-b border-gray-100 p-3 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                        >
                                            <span className="z-1 relative block h-10 w-full max-w-10 rounded-full">
                                                <img
                                                    src={n.user.pic}
                                                    alt="User"
                                                    className="size-full overflow-hidden rounded-full object-cover"
                                                />
                                                <span
                                                    className={`absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900 ${n.status ? "bg-error-500" : "bg-success-500"}`}
                                                ></span>
                                            </span>
                                            <span className="block">
                                                <span className="text-theme-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                    <span className="font-medium text-gray-800 dark:text-white/90">{n.description}</span>
                                                </span>
                                                <span className="text-theme-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <span>{n.title}</span>
                                                    <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                                                    <span>{n.time}</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#"
                                className="text-theme-sm shadow-theme-xs mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                            >
                                View All Notification
                            </a>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        ref={buttonRef}
                        className="size-10 overflow-hidden rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img
                            src={profileImg}
                            alt="profile"
                            className="size-full object-cover"
                        />
                    </button>

                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div className="mb-3">
                                <span className="block font-medium text-gray-700 dark:text-gray-400">Musharof Chowdhury</span>
                                <span className="block text-sm text-gray-500 dark:text-gray-400">randomuser@pimjo.com</span>
                            </div>
                            <ul className="border-b border-gray-200 pb-3 dark:border-gray-800">
                                <li className="my-2">
                                    <Link
                                        to="/dashboard/profile/"
                                        className="dark:bg-dark/[0.03] flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:text-white"
                                    >
                                        <UserCog className="size-5" />
                                        <span>Edit profile</span>
                                    </Link>
                                </li>
                                <li className="my-2">
                                    <Link
                                        to="/dashboard/chat/"
                                        className="dark:bg-dark/[0.03] flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:text-white"
                                    >
                                        <Settings className="size-5" />
                                        <span>Account settings</span>
                                    </Link>
                                </li>
                                <li className="my-2">
                                    <Link
                                        to="/dashboard/support/"
                                        className="dark:bg-dark/[0.03] flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:text-white"
                                    >
                                        <LifeBuoy className="size-5" />
                                        <span>Support</span>
                                    </Link>
                                </li>
                            </ul>

                            <button className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-white/5">
                                <LogOut className="size-5" />
                                <span>Sign out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
