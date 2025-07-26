import RoleMembersTable from "./table";
import { useState } from "react";

export default function MembersPage() {
    const [members, setMembers] = useState([
        { id: 1, name: "Alice", email: "alice@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
        { id: 2, name: "Bob", email: "bob@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
        { id: 3, name: "Charlie", email: "charlie@example.com", pic: "/src/assets/profile-image.jpg", status: 1 },
    ]);

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="">
                {/* Header */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Members</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Members</li>
                        </ol>
                    </nav>
                </div>

                <RoleMembersTable users={members} />
            </div>
        </div>
    );
}
