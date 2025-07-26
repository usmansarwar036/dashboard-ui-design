import { UserCog, ShieldCheck, Plus } from "lucide-react";
import { useState } from "react";
import RoleModal from "./modal";

export default function RolesPage() {
    const [activeRole, setActiveRole] = useState(null);
    const [addRole, setAddRole] = useState(false);
    const [members, setMembers] = useState([
        { id: 1, name: "Alice", email: "alice@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
        { id: 2, name: "Bob", email: "bob@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
        { id: 3, name: "Charlie", email: "charlie@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
    ]);
    const allPermissions = [
        { id: 1, name: "user.create", status: 1 },
        { id: 2, name: "post.publish", status: 1 },
        { id: 3, name: "post.delete", status: 1 },
        { id: 4, name: "dashboard.view", status: 1 },
    ];
    const roles = [
        {
            id: 1,
            name: "Administrator",
            default: 1,
            details: "Full access to all system features.",
            users: [
                { id: 1, name: "Alice", email: "alice@example.com", pic: "/src/assets/profile-image.jpg" },
                { id: 2, name: "Bob", email: "bob@example.com", pic: "/src/assets/profile-image.jpg" },
            ],
            permissions: [
                { id: 1, name: "user.create", status: 1 },
                { id: 2, name: "post.publish", status: 1 },
                { id: 3, name: "post.delete", status: 1 },
            ],
        },
        {
            id: 2,
            name: "Editor",
            default: 0,
            details: "Can edit and publish content.",
            users: [{ id: 3, name: "Charlie", email: "charlie@example.com", pic: "/src/assets/profile-image.jpg" }],
            permissions: [
                { id: 2, name: "post.publish", status: 1 },
                { id: 3, name: "post.delete", status: 1 },
            ],
        },
        {
            id: 3,
            name: "Viewer",
            default: 0,
            details: "Read-only access.",
            users: [],
            permissions: [{ id: 4, name: "dashboard.view" }],
        },
    ];

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="">
                {/* Header */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Roles</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Roles</li>
                        </ol>
                    </nav>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => setActiveRole(role)}
                            className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6"
                        >
                            {/* Icon + Name */}
                            <div className="flex gap-x-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                                    {role.default ? <UserCog size={20} /> : <ShieldCheck size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white/90">{role.name}</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-300">{role.default ? "Default Role" : "Custom Role"}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{role.details}</p>

                            {/* Users */}
                            {role.users.length > 0 && (
                                <>
                                    <div className="mt-4 flex -space-x-2 overflow-hidden">
                                        {role.users.slice(0, 5).map((user) => (
                                            <img
                                                key={user.id}
                                                src={user.pic}
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                                                title={user.name}
                                                alt={user.name}
                                            />
                                        ))}
                                        {role.users.length > 5 && (
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 ring-2 ring-white dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-800">
                                                +{role.users.length - 5}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {role.users.length} {role.users.length === 1 ? "Person" : "Persons"}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}

                    <div
                        onClick={() => setAddRole(true)}
                        className="flex cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-slate-900 md:p-6"
                    >
                        <div className="h-100 flex flex-col items-center gap-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                                <Plus size={20} />
                            </div>
                            <div>
                                <p className="text-center font-bold text-gray-800 dark:text-white/90">Add New Role</p>
                                <p className="text-center text-sm text-gray-400 dark:text-gray-300">Ignite Professional Aventures</p>
                            </div>
                        </div>
                    </div>
                    {addRole && (
                        <RoleModal
                            title="Add Role"
                            onClose={() => setAddRole(false)}
                            condition="add"
                            onSave={(updated) => {
                                console.log(updated);
                                setAddRole(false);
                            }}
                            members={members}
                            allPermissions={allPermissions}
                        />
                    )}
                    {activeRole && (
                        <RoleModal
                            title="Edit Role"
                            onClose={() => setActiveRole(null)}
                            condition="edit"
                            onSave={(updated) => {
                                console.log(updated);
                                setActiveRole(null);
                            }}
                            role={activeRole}
                            members={members}
                            allPermissions={allPermissions}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
