import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Outlet />
        </div>
    );
}
