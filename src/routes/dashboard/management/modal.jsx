import { useState, useEffect, useRef } from "react";
import { X, Search, Eye, Trash2, Check, ShieldCheck, StickyNote } from "lucide-react";
import RoleMembersTable from "./table";
import Permissions from "./permissions";

const RoleModal = ({ title, onClose, onSave, role = {}, members = [], allPermissions, condition }) => {
    const [form, setForm] = useState(role);
    const [search, setSearch] = useState("");
    const [suggested, setSuggested] = useState([]);
    const [selected, setSelected] = useState(role.users || []);
    const [localMembers, setLocalMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchBox = useRef();

    const fetchMoreMembers = async (q) => {
        setIsLoading(true);
        console.log("Fetching more members for query:", q);
        const newMembers = Array.from({ length: 5 }, (_, i) => ({
            id: i + 100,
            name: `User ${i + 100}`,
            email: `user${i + 100}@gmail.com`,
            status: 1,
            pic: "/src/assets/profile-image.jpg",
        }));
        await new Promise((res) => setTimeout(res, 2000));
        setSuggested(newMembers);
        setIsLoading(false);
    };

    useEffect(() => {
        const combined = [...members, ...localMembers];
        const filtered = combined.filter(
            (m) =>
                !selected.some((u) => u.id === m.id) &&
                (m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())),
        );
        setSuggested(filtered);
    }, [search, selected, members, localMembers]);

    useEffect(() => {
        if (search.length >= 3 && suggested.length === 0 && !isLoading) {
            fetchMoreMembers(search);
        }
    }, [search]);

    const handleAddMember = (member) => {
        setSelected((prev) => [...prev, member]);
        setSearch("");
    };

    const handleRemove = (id) => {
        setSelected((prev) => prev.filter((u) => u.id !== id));
    };

    const handleClickOutside = (e) => {
        if (!searchBox.current?.contains(e.target)) setSearch("");
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-5 backdrop-blur">
            <div className="flex max-h-[80%] w-full max-w-xl flex-col rounded-3xl bg-white p-0 dark:bg-gray-900">
                {/* Header */}
                <div className="sticky top-0 z-10 rounded-t-3xl border-b border-gray-200 bg-white px-6 pb-4 pt-6 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage Role Members and Permissions</p>
                </div>

                {/* Body */}
                <div className="overflow-auto px-6 py-4">
                    {condition === "add" && (
                        <>
                            <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                                <ShieldCheck
                                    size={18}
                                    className="text-gray-400"
                                />
                                <input
                                    onChange={(e) => console.log(e.target.value)}
                                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 dark:text-white"
                                    placeholder="Role Name"
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                                <StickyNote
                                    size={18}
                                    className="text-gray-400"
                                />
                                <input
                                    onChange={(e) => console.log(e.target.value)}
                                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 dark:text-white"
                                    placeholder="Role Description"
                                />
                            </div>
                        </>
                    )}

                    {/* Search */}
                    <div
                        ref={searchBox}
                        className="relative mb-5"
                    >
                        <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                            <Search
                                size={18}
                                className="text-gray-400"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 dark:text-white"
                                placeholder={isLoading ? "Searching..." : "Search Members"}
                            />
                        </div>
                        {search && (
                            <div className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900">
                                {suggested.length > 0 ? (
                                    suggested.map((m) => (
                                        <div
                                            key={m.id}
                                            onClick={() => handleAddMember(m)}
                                            className="flex cursor-pointer items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <img
                                                src={m.pic}
                                                alt=""
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-800 dark:text-white">{m.name}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{m.email}</span>
                                            </div>
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                                        {isLoading ? "Searching..." : search.length >= 3 ? "No results found" : "No matches"}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Member Table */}
                    <RoleMembersTable
                        users={selected}
                        editable={true}
                        onRemove={handleRemove}
                    />

                    {/* Permissions */}
                    <Permissions
                        selectedPermissions={form.permissions || []}
                        {...(allPermissions.length > 0 && { allPermissions })}
                        onSelect={(checkedPermissions) => setForm({ ...form, permissions: checkedPermissions })}
                    />
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-b-3xl border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave({ ...form, users: selected })}
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleModal;
