import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

export default function InvitePage() {
    const code = "klsdfe34";
    const inviteLink = `${window.location.origin}/register?invite=${code}`;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mx-auto max-w-screen-2xl">
            {/* Header */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Invite & Earn</h2>
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
                        <li className="text-gray-800 dark:text-white/90">Invite</li>
                    </ol>
                </nav>
            </div>

            {/* Content */}
            <div className="relative flex flex-col-reverse items-center justify-between gap-10 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] lg:flex-row lg:p-10">
                {/* Text Section */}
                <div className="lg:w-1/2">
                    <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Invite Friends & Earn Booking Rewards!</h1>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        Share your unique invite link and earn rewards every time your friend books with us. Whether it's a hotel, flight, or tour –
                        you get a bonus when they complete their first booking. The more you refer, the more you earn!
                    </p>

                    <div className="flex w-full max-w-xl items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-700 dark:bg-white/5">
                        <input
                            value={inviteLink}
                            readOnly
                            className="flex-1 bg-transparent text-sm text-gray-700 outline-none dark:text-white"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                            <ClipboardCopy className="h-5 w-5" />
                        </button>
                        {copied && <span className="ml-2 text-xs text-green-600">Copied!</span>}
                    </div>
                </div>

                {/* Image */}
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src="/src/assets/invite.png"
                        alt="Invite & Earn"
                        className="h-auto w-full dark:invert"
                    />
                </div>
            </div>
        </div>
    );
}
