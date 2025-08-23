// PaymentConfirmation.jsx
// Senior React + Tailwind implementation — API-ready, pixel-conscious, dark-mode ready
// Note: uses <Link> from react-router-dom (as requested). Lucide icons included.
// Everything is in ONE file for speed. Drop into your project and wire /api endpoints.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Wallet, CreditCard, Gift, Check, CircleDollarSign, X } from "lucide-react";
import OrigionDestinationArrowComponent from "./util/flight-component";

// -----------------------------------------------------------
// Payment Method Modal
function PaymentMethodModal({ open, value, onChange, onConfirm }) {
    if (!open) return null;

    const options = [
        { key: "wallet", label: "My Wallet", trailing: "$29,846.50", icon: <Wallet size={18} /> },
        { key: "paypal", label: "PayPal", icon: <Gift size={18} /> },
        { key: "gpay", label: "Google Pay", icon: <CreditCard size={18} /> },
        { key: "apple", label: "Apple Pay", icon: <CreditCard size={18} /> },
        { key: "mc4679", label: "•••• •••• •••• 4679", icon: <CreditCard size={18} /> },
        { key: "visa5567", label: "VISA •••• •••• •••• 5567", icon: <CreditCard size={18} /> },
    ];

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="dark:bg-dark/[0.03] w-full max-w-lg rounded-2xl bg-white shadow-lg dark:border-gray-800 dark:text-white">
                    {/* Header */}
                    <div className="relative rounded-t-2xl bg-blue-600 p-4 text-white dark:border-gray-800">
                        <h2 className="text-center text-lg font-semibold">Select Payment Method</h2>
                        <button
                            className="absolute right-4 top-5"
                            onClick={onConfirm}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Form */}

                    <div className="m-4 max-h-[90vh] space-y-3 overflow-y-auto">
                        {options.map((opt) => {
                            const selected = value === opt.key;
                            return (
                                <button
                                    type="button"
                                    key={opt.key}
                                    onClick={() => onChange(opt)}
                                    className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left shadow-sm transition-all hover:shadow ${
                                        selected ? "border-blue-600" : "border-gray-100 dark:border-gray-800"
                                    } dark:bg-dark/[0.03]`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="dark:bg-dark/[0.03] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800">
                                            {opt.icon}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-medium">{opt.label}</p>
                                            {opt.trailing && <p className="text-xs text-gray-500">{opt.trailing}</p>}
                                        </div>
                                    </div>
                                    {selected ? <Check className="text-blue-600" /> : <ChevronRight className="text-gray-400" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="m-4">
                        <button
                            onClick={onConfirm}
                            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------
// Discounts / Vouchers Modal (multi-select)
function DiscountsModal({ open, value, onToggle, onConfirm }) {
    if (!open) return null;

    const isSelected = (code) => value.some((v) => v.code === code);

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="dark:bg-dark/[0.03] w-full max-w-lg rounded-2xl bg-white shadow-lg dark:border-gray-800 dark:text-white">
                    {/* Header */}
                    <div className="relative rounded-t-2xl bg-blue-600 p-4 text-white dark:border-gray-800">
                        <h2 className="text-center text-lg font-semibold">Discounts / Vouchers</h2>
                        <button
                            className="absolute right-4 top-5"
                            onClick={onConfirm}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Form */}

                    <div className="m-4 max-h-[70vh] space-y-3 overflow-y-auto">
                        {DISCOUNTS.map((v) => {
                            const selected = isSelected(v.code);
                            const disabled = v.used === true;
                            return (
                                <div
                                    key={v.code}
                                    className={`dark:bg-dark/[0.03] rounded-2xl border p-3 shadow-sm dark:border-gray-800 ${
                                        selected ? "border-blue-600" : "border-gray-100"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-[15px] font-semibold">{v.title}</h4>
                                            <p className="mt-0.5 text-xs text-gray-500">{v.desc}</p>
                                        </div>
                                        <div className="ml-2 flex items-center">
                                            {selected && (
                                                <Check
                                                    className="text-blue-600"
                                                    size={18}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                                        <span>Valid till {v.valid}</span>
                                        <span>Min spend {v.minSpendDisplay}</span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-[11px] text-gray-500">
                                            {v.type === "percent" ? `${v.value}% off` : `$${v.value} off`}
                                        </div>
                                        <button
                                            disabled={disabled}
                                            onClick={() => onToggle(v)}
                                            className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                                                disabled
                                                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                                                    : selected
                                                      ? "border border-blue-600 bg-white text-blue-600"
                                                      : "bg-blue-600 text-white"
                                            }`}
                                        >
                                            {disabled ? "Used" : selected ? "Remove" : "Use"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------
// Constants: sample discounts from screenshot
const DISCOUNTS = [
    {
        code: "EXCL25",
        title: "Exclusive 25% Off Your Next Flight!",
        desc: "Unlock a world of savings and adventure with Airfly.",
        valid: "Dec 31, 2023",
        type: "percent",
        value: 25,
        minSpend: 1000,
        minSpendDisplay: "$1,000",
        used: false, // mark true to gray-out (as screenshot shows a 'Used' one)
    },
    {
        code: "FAM15",
        title: "Family Adventure Discount",
        desc: "Travel with family and save 15% on booking over $500.",
        valid: "Dec 31, 2023",
        type: "percent",
        value: 15,
        minSpend: 500,
        minSpendDisplay: "$500",
        used: false,
    },
    {
        code: "STUD10",
        title: "Student Explorer Discount",
        desc: "Students get 10% off on bookings over $200.",
        valid: "Dec 31, 2023",
        type: "percent",
        value: 10,
        minSpend: 200,
        minSpendDisplay: "$200",
        used: false,
    },
    {
        code: "BIZ20",
        title: "Business Traveler Bonus",
        desc: "Save 20% on bookings over $400.",
        valid: "Dec 31, 2023",
        type: "percent",
        value: 20,
        minSpend: 400,
        minSpendDisplay: "$400",
        used: false,
    },
    {
        code: "UPGRADE",
        title: "Business Class Upgrade",
        desc: "Special offer for business upgrade.",
        valid: "Dec 31, 2023",
        type: "flat",
        value: 150,
        minSpend: 600,
        minSpendDisplay: "$600",
        used: false,
    },
];

// -----------------------------------------------------------
// Price calculation hook (handles multi-discount logic)
function usePriceCalc({ baseFare, insurance, tax, pointsToRedeem, appliedDiscounts }) {
    // Convert points to currency (example: 100 points == $1.00)
    const pointsRatio = 0.01; // change easily for API rules
    return useMemo(() => {
        const subtotal = baseFare + insurance + tax;

        // eligible discounts (min spend check against subtotal BEFORE points)
        const eligible = appliedDiscounts.filter((d) => subtotal >= d.minSpend);

        // combine percent discounts first (multiplicative or additive?) — UI implies additive on subtotal
        const percentOff = eligible.filter((d) => d.type === "percent").reduce((acc, d) => acc + d.value, 0);
        const flatOff = eligible.filter((d) => d.type === "flat").reduce((acc, d) => acc + d.value, 0);

        const discountAmount = (subtotal * percentOff) / 100 + flatOff;

        // points value
        const pointsValue = Math.min(pointsToRedeem * pointsRatio, subtotal - discountAmount);

        const total = Math.max(0, subtotal - discountAmount - pointsValue);

        return {
            subtotal,
            percentOff,
            flatOff,
            discountAmount,
            pointsValue,
            total,
        };
    }, [baseFare, insurance, tax, pointsToRedeem, appliedDiscounts]);
}

// -----------------------------------------------------------
// Main Page
export default function PaymentConfirmation() {
    // --- UI timers (for header chip like "Complete payment in 01:59:46")
    const [secondsLeft, setSecondsLeft] = useState(7196); // ~ 01:59:56
    useEffect(() => {
        const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, []);
    const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
    const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");

    // --- Page state
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);

    const [payment, setPayment] = useState({
        key: "wallet",
        label: "My Wallet",
        trailing: "$29,846.50",
    });

    const [appliedDiscounts, setAppliedDiscounts] = useState([]); // [{code, ...}]

    // change this to your live flight object
    const flight = {
        logo: "https://picsum.photos/64",
        airline: "Emirates",
        cabinClass: "Economy",
        price: 199.99,
        from: { city: "New York", time: "09:00", code: "JFK" },
        to: { city: "Paris", time: "16:30", code: "CDG" },
        duration: "7h 30m",
        type: "Direct",
    };

    // --- Pricing (as seen in screenshot)
    const baseFare = 1599.0;
    const insurance = 45.0;
    const tax = 25.0;
    const pointsToRedeem = 6450; // example: shows a chip in UI (100 pts = $1 => $64.50)

    const calc = usePriceCalc({
        baseFare,
        insurance,
        tax,
        pointsToRedeem,
        appliedDiscounts,
    });

    // --- API: Pay action
    const [submitting, setSubmitting] = useState(false);
    const onPay = async () => {
        const payload = {
            flight,
            paymentMethod: payment,
            discounts: appliedDiscounts.map(({ code }) => code),
            price: {
                baseFare,
                insurance,
                tax,
                discounts: calc.discountAmount,
                pointsValue: calc.pointsValue,
                total: calc.total,
            },
            meta: {
                secondsLeft,
            },
        };

        try {
            setSubmitting(true);
            const res = await fetch("/api/payments/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Payment confirmation failed");
            // navigate or show success (replace with your router)
            alert("Payment confirmed! (mock) — payload posted to /api/payments/confirm");
        } catch (e) {
            console.error(e);
            alert("Failed to confirm payment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // helpers
    const removeDiscount = (code) => setAppliedDiscounts((prev) => prev.filter((d) => d.code !== code));

    const discountChips =
        appliedDiscounts.length === 0 ? (
            <span className="text-sm text-gray-500">None selected</span>
        ) : (
            <div className="flex flex-wrap gap-2">
                {appliedDiscounts.map((d) => (
                    <span
                        key={d.code}
                        className="dark:bg-dark/[0.03] inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-gray-800 dark:text-white"
                    >
                        {d.title}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeDiscount(d.code);
                            }}
                            className="rounded-full border border-blue-300/60 px-1 text-[10px] text-blue-600 hover:bg-blue-100 dark:border-gray-800"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        );

    return (
        <div className="dark:bg-dark/[0.03] bg-gray-50 text-gray-900 dark:text-white">
            {/* Header + Stepper */}
            <div className="overflow-hidden bg-blue-600 p-4 text-white">
                <div className="mx-auto flex items-center justify-between px-4">
                    <Link
                        to="/search"
                        className="rounded-full p-1"
                    >
                        <ArrowLeft />
                    </Link>
                    <h2 className="text-base font-semibold">Payment Confirmation</h2>
                    <div className="w-6" />
                </div>

                {/* Stepper */}
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px]">
                    <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">1</span>
                        <span>Book</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">2</span>
                        <span>Pay</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/40 text-xs font-bold text-blue-900/70">
                            3
                        </span>
                        <span>E-Ticket</span>
                    </div>
                </div>

                <p className="mt-3 text-center text-[11px]">
                    Complete payment in{" "}
                    <span className="font-semibold">
                        {hh} : {mm} : {ss}
                    </span>
                </p>
            </div>

            <div className="mx-auto space-y-4 p-4">
                {/* Flight Card */}
                <OrigionDestinationArrowComponent flight={flight} />

                {/* Payment Method Row */}
                <button
                    onClick={() => setShowPaymentModal(true)}
                    className="dark:bg-dark/[0.03] flex w-full items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-left shadow-sm hover:shadow dark:border-gray-800"
                >
                    <div className="flex items-center gap-2">
                        <div className="dark:bg-dark/[0.03] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800">
                            <Wallet size={18} />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold">Payment Method</p>
                            <p className="text-xs text-gray-500">{payment.label}</p>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </button>

                {/* Points notice */}
                <div className="dark:bg-dark/[0.03] flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800">
                    <div className="flex items-start gap-3">
                        <div className="dark:bg-dark/[0.03] mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800">
                            <Gift size={18} />
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">You Have 6,450 Points</p>
                            <p className="mt-0.5 text-xs text-gray-500">100 points equals $1.00. You will get 4,000 points for this booking.</p>
                        </div>
                    </div>
                    <Check className="text-blue-600" />
                </div>

                {/* Discounts Row */}
                <button
                    onClick={() => setShowDiscountModal(true)}
                    className="dark:bg-dark/[0.03] flex w-full items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-left shadow-sm hover:shadow dark:border-gray-800"
                >
                    <div className="flex items-center gap-2">
                        <div className="dark:bg-dark/[0.03] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800">
                            <Gift size={18} />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold">Discounts / Vouchers</p>
                            <div className="mt-1">{discountChips}</div>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </button>

                {/* Price Details */}
                <div className="dark:bg-dark/[0.03] rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800">
                    <div className="flex items-center justify-between border-b pb-3 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <CircleDollarSign size={18} />
                            <span className="text-[15px] font-bold">Price Details</span>
                        </div>
                    </div>

                    <div className="mt-3 space-y-2 text-sm">
                        <Row
                            label="Emirates (Adult) × 1"
                            value={`$${baseFare.toFixed(2)}`}
                            bold
                        />
                        <Row
                            label="Travel Insurance"
                            value={`$${insurance.toFixed(2)}`}
                            bold
                        />
                        <Row
                            label="Tax"
                            value={`$${tax.toFixed(2)}`}
                            bold
                        />

                        {/* Applied points & discounts (shown only when > 0) */}
                        {calc.pointsValue > 0 && (
                            <Row
                                label="Points Used"
                                value={`- $${calc.pointsValue.toFixed(2)}`}
                                negative
                            />
                        )}
                        {calc.discountAmount > 0 && (
                            <Row
                                label={`Discount${calc.percentOff ? ` (${calc.percentOff}%)` : ""}${
                                    calc.flatOff ? ` & -$${calc.flatOff.toFixed(2)}` : ""
                                }`}
                                value={`- $${calc.discountAmount.toFixed(2)}`}
                                negative
                            />
                        )}

                        <div className="mt-3 border-t pt-3 dark:border-gray-800">
                            <Row
                                label="Total Price"
                                value={`$${calc.total.toFixed(2)}`}
                                boldLarge
                            />
                        </div>
                    </div>
                </div>

                {/* Pay Now */}
                <div className="pb-6">
                    <button
                        disabled={submitting}
                        onClick={onPay}
                        className="w-full rounded-lg bg-blue-600 py-3 text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </div>

            {/* ----- Modals (2nd & 3rd screens) ----- */}
            <PaymentMethodModal
                open={showPaymentModal}
                value={payment.key}
                onChange={(opt) => setPayment({ key: opt.key, label: opt.label, trailing: opt.trailing })}
                onConfirm={() => setShowPaymentModal(false)}
            />

            <DiscountsModal
                open={showDiscountModal}
                value={appliedDiscounts}
                onToggle={(voucher) => {
                    setAppliedDiscounts((prev) => {
                        const exists = prev.some((v) => v.code === voucher.code);
                        if (exists) return prev.filter((v) => v.code !== voucher.code);
                        return [...prev, voucher];
                    });
                }}
                onConfirm={() => setShowDiscountModal(false)}
            />
        </div>
    );
}

// Small row component for Price Details
function Row({ label, value, bold = false, boldLarge = false, negative = false }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <p className={`truncate ${bold || boldLarge ? "font-semibold" : "font-medium"}`}>{label}</p>
            <p className={`${boldLarge ? "text-base font-bold" : "font-semibold"} ${negative ? "text-rose-600" : ""}`}>{value}</p>
        </div>
    );
}
