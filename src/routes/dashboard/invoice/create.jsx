import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";

export default function CreateInvoicePage() {
    const [form, setForm] = useState({
        invoiceNumber: "",
        customerName: "",
        customerEmail: "",
        paymentCondition: "",
        currency: "usd",
        issueDate: "",
        dueDate: "",
        deliveryDate: "",
        object: "",
        additionalNote: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/api/invoices", form);
            alert("Invoice Created");
        } catch (err) {
            console.error(err);
            alert("Failed to create invoice");
        }
    };

    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Create Invoices</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to={"/"}>Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to={"/invoices"}>Invoices</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Create</li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="mb-2 flex flex-wrap items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                {[
                    { name: "invoiceNumber", label: "Invoice Number", type: "text", placeholder: "Invoice Number" },
                    { name: "customerName", label: "Customer Name", type: "text", placeholder: "Customer Name" },
                    { name: "customerEmail", label: "Customer Email", type: "email", placeholder: "Customer Email" },
                    { name: "issueDate", label: "Issue Date", type: "date" },
                    { name: "dueDate", label: "Due Date", type: "date" },
                    { name: "deliveryDate", label: "Delivery Date", type: "date" },
                    { name: "object", label: "Object", type: "text", placeholder: "Object" },
                ].map((f) => (
                    <div
                        key={f.name}
                        className="my-2 w-full px-2 lg:w-1/2"
                    >
                        <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">{f.label}</label>
                        <input
                            type={f.type}
                            name={f.name}
                            value={form[f.name]}
                            onChange={handleChange}
                            placeholder={f.placeholder || ""}
                            className="w-full rounded-lg border p-2 dark:bg-gray-800"
                        />
                    </div>
                ))}

                {/* Payment Condition */}
                <div className="my-2 w-full px-2 lg:w-1/2">
                    <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Payment Condition</label>
                    <select
                        name="paymentCondition"
                        value={form.paymentCondition}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-2 dark:bg-gray-800"
                    >
                        <option value="">Select Condition</option>
                        <option value="cia">Cash In Advance</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="ap">Advance Payment</option>
                        <option value="cd">Credit</option>
                    </select>
                </div>

                {/* Currency */}
                <div className="my-2 w-full px-2 lg:w-1/2">
                    <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Currency</label>
                    <select
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-2 dark:bg-gray-800"
                    >
                        <option value="usd">USD</option>
                        <option value="pkr">PKR</option>
                    </select>
                </div>

                {/* Rich Text */}
                <div className="my-2 w-full px-2">
                    <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">Additional Note</label>
                    <ReactQuill
                        theme="snow"
                        value={form.additionalNote}
                        onChange={(value) => setForm({ ...form, additionalNote: value })}
                        placeholder="Additional Info..."
                        className="mb-14 h-32 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
                    />
                </div>

                {/* Submit */}
                <div className="w-full">
                    <button
                        onClick={handleSubmit}
                        className="w-full rounded-lg bg-blue-700 py-3 text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
