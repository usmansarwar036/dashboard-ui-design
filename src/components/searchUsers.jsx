import { useState, useEffect, useRef } from "react";
import { Search, Check, X } from "lucide-react";

const searchUsers = ({ users = [], returnVal, notUsers = [], maxSelected = "1", url = "" }) => {
    maxSelected = parseInt(maxSelected);
    const [search, setSearch] = useState("");
    const [suggested, setSuggested] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const newUsers = Array.from({ length: 5 }, (_, i) => ({
                id: i + 100,
                name: `User ${i + 100}`,
                email: `user${i + 100}@gmail.com`,
                status: 1,
                pic: "/src/assets/profile-image.jpg",
            }));
            await new Promise((res) => setTimeout(res, 500));
            setSuggested(newUsers);
            setIsLoading(false);
        };

        if (url != "" && search.length >= 3) {
            fetchUsers();
        } else {
            setSuggested(
                users.filter(
                    (u) =>
                        ![...notUsers, ...selected].some((nu) => nu.id === u.id) &&
                        (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())),
                ),
            );
        }
    }, [search]);

    const addUser = (u) => {
        const updated = [u];
        setSelected(updated);
        returnVal(updated);
        setSearch("");
        setSuggested([]);
    };

    const removeUser = (id) => {
        const updated = selected.filter((u) => u.id !== id);
        setSelected(updated);
        returnVal(updated);
    };

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setSearch("");
                setSuggested([]);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative"
        >
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
                {selected.map((u) => (
                    <div
                        key={u.id}
                        className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700"
                    >
                        {u.name}
                        <X
                            size={14}
                            className="cursor-pointer text-gray-500 hover:text-red-500"
                            onClick={() => removeUser(u.id)}
                        />
                    </div>
                ))}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={selected.length >= maxSelected || isLoading}
                    placeholder={selected.length >= maxSelected ? "" : "Search"}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 dark:text-white"
                />
                <Search
                    size={18}
                    className="text-gray-400"
                />
            </div>

            {search && (
                <div className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900">
                    {suggested.length === 0 || isLoading ? (
                        <div className="p-3 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
                    ) : suggested.length === 0 && search.length >= 3 ? (
                        <div className="p-3 text-sm text-gray-500 dark:text-gray-400">No results found</div>
                    ) : (
                        suggested.map((u) => (
                            <div
                                key={u.id}
                                onClick={() => addUser(u)}
                                className="flex cursor-pointer items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <img
                                    src={u.pic}
                                    alt=""
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800 dark:text-white">{u.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{u.email}</span>
                                </div>
                                <Check className="ml-auto h-4 w-4 text-green-500" />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default searchUsers;
