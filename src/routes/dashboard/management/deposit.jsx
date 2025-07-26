import React, { useState } from "react";
import axios from "axios";

const quickAmounts = [50, 100, 200, 500];

export default function DepositPage() {
    const [tab, setTab] = useState("card");
    const [amount, setAmount] = useState("");
    const [amount2, setAmount2] = useState("");
    const [form, setForm] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        bankName: "",
        accountNumber: "",
        transactionId: "",
        datetime: "",
        proofFile: null,
    });
    const [loading, setLoading] = useState(false);

    const postCardPayment = async () => {
        setLoading(true);
        try {
            // await axios.post("/api/pay/card", {
            //     amount,
            //     cardNumber: form.cardNumber,
            //     expiry: form.expiry,
            //     cvv: form.cvv,
            // });
            alert("Card payment successful");
        } catch (err) {
            alert("Payment failed");
        }
        setLoading(false);
    };

    const postBankRequest = async () => {
        setLoading(true);
        const data = new FormData();
        data.append("amount", amount2);
        data.append("bankName", form.bankName);
        data.append("accountNumber", form.accountNumber);
        data.append("transactionId", form.transactionId);
        data.append("datetime", form.datetime);
        data.append("proof", form.proofFile);
        try {
            // await axios.post("/api/pay/bank", data, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });
            alert("Bank request submitted");
        } catch (err) {
            alert("Request failed");
        }
        setLoading(false);
    };

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="">
                {/* Header */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Deposit</h2>
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
                            <li className="text-gray-800 dark:text-white/90">Deposit</li>
                        </ol>
                    </nav>
                </div>

                <div className="">
                    {/* Summary Cards */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <SummaryCard
                            title="Total Recharged"
                            amount="84,254.58"
                            badge="3 Transactions"
                            badgeColor="blue"
                        />
                        <SummaryCard
                            title="This Month"
                            amount="84,254.58"
                            badge="+10% since last month"
                            badgeColor="green"
                        />
                    </div>

                    {/* Payment Section */}
                    <div className="mt-2 rounded-lg border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex gap-2 border-b">
                            <Tab
                                label="Credit Card"
                                active={tab === "card"}
                                onClick={() => setTab("card")}
                            />
                            <Tab
                                label="Bank Transfer"
                                active={tab === "bank"}
                                onClick={() => setTab("bank")}
                            />
                        </div>

                        {tab === "card" && (
                            <div className="mt-4 space-y-4">
                                <QuickButtons
                                    values={quickAmounts}
                                    selected={amount}
                                    onSelect={setAmount}
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="input"
                                    value={form.cardNumber}
                                    onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="input"
                                        value={form.expiry}
                                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="input"
                                        value={form.cvv}
                                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                    />
                                </div>
                                <Notice />
                                <button
                                    disabled={loading}
                                    onClick={postCardPayment}
                                    className="btn w-full rounded-lg bg-blue-600 py-3 text-white"
                                >
                                    {loading ? "Processing..." : "Pay Now"}
                                </button>
                            </div>
                        )}

                        {tab === "bank" && (
                            <div className="mt-4 space-y-4">
                                <QuickButtons
                                    values={quickAmounts}
                                    selected={amount2}
                                    onSelect={setAmount2}
                                />
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={amount2}
                                        onChange={(e) => setAmount2(e.target.value)}
                                        className="input"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => setForm({ ...form, proofFile: e.target.files[0] })}
                                        className="input pt-1"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        className="input"
                                        value={form.bankName}
                                        onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        className="input"
                                        value={form.accountNumber}
                                        onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Transaction ID"
                                        className="input"
                                        value={form.transactionId}
                                        onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                                    />
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        value={form.datetime}
                                        onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                                    />
                                </div>
                                <Notice />

                                <button
                                    disabled={loading}
                                    onClick={postBankRequest}
                                    className="btn w-full rounded-lg bg-blue-600 py-3 text-white"
                                >
                                    {loading ? "loading" : "Request Credits"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const SummaryCard = ({ title, amount, badge, badgeColor }) => (
    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-bold dark:text-white">{amount}</p>
        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm text-white bg-${badgeColor}-500`}>{badge}</span>
    </div>
);

const Tab = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium ${active ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
    >
        {label}
    </button>
);

const QuickButtons = ({ values, selected, onSelect }) => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {values.map((val) => (
            <button
                key={val}
                onClick={() => onSelect(val)}
                className={`rounded-lg border border-blue-500 py-2 font-medium ${selected == val ? "bg-blue-50 text-blue-600" : "text-blue-600 hover:bg-blue-50"}`}
            >
                ${val}
            </button>
        ))}
    </div>
);

const Notice = () => (
    <div className="space-y-1 text-sm text-gray-500">
        <p>
            * <strong>+12.5%</strong> will be charged on every transaction as a recharge fee.
        </p>
        <p>
            * By clicking <strong>"Pay"</strong>, you agree to our{" "}
            <a
                href="#"
                className="text-blue-600 underline"
            >
                Terms &amp; Conditions
            </a>
            .
        </p>
    </div>
);
