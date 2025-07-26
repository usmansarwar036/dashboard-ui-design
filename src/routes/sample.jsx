export default function Page() {
    return (
        <div className="mx-auto max-w-screen-2xl">
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                {/* Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Profile</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}
