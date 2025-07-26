import { useState, useEffect } from "react";

const groupByModule = (permissions) => {
    return permissions.reduce((acc, curr) => {
        const [module, action] = curr.name.split(".");
        if (!acc[module]) acc[module] = [];
        acc[module].push({ ...curr, action });
        return acc;
    }, {});
};

const Permissions = ({ selectedPermissions = [], allPermissions = null, onSelect }) => {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected(selectedPermissions.map((p) => p.name));
    }, [selectedPermissions]);

    const handleToggle = (permName) => {
        const updated = selected.includes(permName) ? selected.filter((name) => name !== permName) : [...selected, permName];

        setSelected(updated);
        if (onSelect) {
            onSelect(allPermissions.filter((p) => updated.includes(p.name)));
        }
    };

    const grouped = groupByModule(allPermissions || selectedPermissions);

    return (
        <div>
            <h4 className="mt-5 font-semibold capitalize text-gray-700 dark:text-white">Permissions</h4>
            <div className="mt-5 grid w-full gap-10 overflow-x-auto rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                {Object.entries(grouped).map(([module, perms]) => (
                    <div
                        key={module}
                        className="grid grid-cols-12 gap-4"
                    >
                        <h4 className="col-span-4 text-sm font-semibold capitalize text-gray-700 dark:text-white">{module}</h4>
                        <div className="col-span-8 flex flex-wrap gap-4 pl-2">
                            {perms.map(({ id, name, action }) => (
                                <label
                                    key={id}
                                    className={`inline-flex select-none items-center gap-2 text-sm capitalize ${allPermissions ? "cursor-pointer" : "cursor-default"}`}
                                >
                                    {allPermissions ? (
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(name)}
                                            onChange={() => handleToggle(name)}
                                            className="cursor-pointer accent-blue-600"
                                        />
                                    ) : (
                                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                                    )}
                                    <span className="text-gray-700 dark:text-gray-300">{action}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Permissions;
