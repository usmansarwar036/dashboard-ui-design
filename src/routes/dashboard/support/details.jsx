import { Star } from "lucide-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ticket = {
    id: 1,
    ticket_no: "#1846325",
    requested_by: {
        name: "Ali",
        profile_pic: "/src/assets/profile-image.jpg",
        email: "timkana@gmail.com",
    },
    title: "Help with my purchase",
    desc: "I need urgent help regarding the purchase I made on March 1st. It's not reflecting in my orders page and I also haven't received a confirmation email. Kindly assist ASAP.",
    priority: "high",
    agent: {
        name: "John",
        profile_pic: "/src/assets/profile-image.jpg",
        email: "john@example.com",
    },
    replies: [
        {
            reply_by: "agent",
            user: {
                name: "John",
                email: "john@example.com",
                created_at: "2 min ago",
                desc: "What is your issue? Can you provide order number?",
            },
        },
        {
            reply_by: "user",
            user: {
                name: "Ali",
                email: "timkana@gmail.com",
                created_at: "1 min ago",
                desc: "Order number is #ORD3948393",
            },
        },
    ],
    created_at: "03 Mar 2025",
    status: "pending",
};
const badge = {
    high: "bg-red-100 text-red-600 dark:bg-red-700/30 dark:text-red-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/30 dark:text-yellow-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
    low: "bg-gray-100 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
    pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/30 dark:text-yellow-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
    solved: "bg-green-100 text-green-600 dark:bg-green-700/30 dark:text-green-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
    deleted: "bg-red-100 text-red-600 dark:bg-red-700/30 dark:text-red-400 rounded-full px-3 py-1 text-xs font-medium capitalize",
};

export default function TicketDetailPage() {
    const [starred, setStarred] = useState(false);
    const [replyText, setReplyText] = useState("");

    return (
        <div className="">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                <div className="flex gap-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Ticket {ticket.ticket_no}</h2>
                    <div>
                        <span className={`${badge[ticket.priority]}`}>{ticket.priority}</span>
                    </div>
                    <div>
                        <span className={`${badge[ticket.status]}`}>{ticket.status}</span>
                    </div>
                    <button onClick={() => setStarred(!starred)}>
                        <Star
                            className={starred ? "fill-yellow-400 text-yellow-400" : ""}
                            size={20}
                        />
                    </button>
                </div>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li>
                            <a
                                href="/"
                                className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400"
                            >
                                Home <span className="text-gray-400">/</span>
                            </a>
                            <a
                                href="/tickets"
                                className="ms-1.5 inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400"
                            >
                                Tickets <span className="text-gray-400">/</span>
                            </a>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Details</li>
                    </ol>
                </nav>
            </div>

            {/* Original Ticket */}
            <div className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center gap-4">
                    <img
                        src={ticket.requested_by.profile_pic}
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <div className="font-semibold text-gray-800 dark:text-white/90">{ticket.requested_by.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{ticket.created_at}</div>
                    </div>
                </div>
                <h1 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">{ticket.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.desc}</p>
            </div>

            {/* Replies */}
            {ticket.replies.map((r, i) => (
                <div
                    key={i}
                    className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                    <div className="mb-3 flex items-center gap-4">
                        <img
                            src={ticket.agent.profile_pic}
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <div className="font-semibold text-gray-800 dark:text-white/90">{r.user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{r.user.created_at}</div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{r.user.desc}</p>
                </div>
            ))}

            {/* Reply Box */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <ReactQuill
                    theme="snow"
                    value={replyText}
                    onChange={setReplyText}
                    placeholder="Type your reply..."
                    className="mb-14 h-32 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
                />
                <div className="mt-3 flex justify-end">
                    <button
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        onClick={() => {
                            console.log("Reply Sent:", replyText);
                            setReplyText("");
                        }}
                    >
                        Send Reply
                    </button>
                </div>
            </div>
        </div>
    );
}
