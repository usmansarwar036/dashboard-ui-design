import { Link } from "react-router-dom";
import { User, CalendarDays, CreditCard, Wallet, CheckCircle, Clock } from "lucide-react";
// updated

export default function InvoiceDetailsPage() {
    const products = [
        {
            name: "Flowbite Developer Edition",
            desc: "HTML, Figma, JS",
            quantity: 2,
            price: 120,
            discount: 10,
        },
        {
            name: "Flowbite Pro UI Kit",
            desc: "Tailwind CSS, JS",
            quantity: 1,
            price: 150,
            discount: 0,
        },
    ];
    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Flight Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to="/">Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to="/invoices">Invoices</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Details</li>
                    </ol>
                </nav>
            </div>

            {/* Content */}
            <div className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center gap-x-3 border-b pb-5 pt-2">
                    <img
                        src="/src/assets/logo-light.svg"
                        alt="Logoipsum"
                        className="dark:hidden"
                    />
                    <img
                        src="/src/assets/logo-dark.svg"
                        alt="Logoipsum"
                        className="hidden dark:block"
                    />
                    <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">Travel</p>
                </div>
                <div className="flex items-center justify-between border-b py-5">
                    <div className="text-xl">Invoice #1846325</div>
                    <div className="text-gray-600">Date: 05/07/2025</div>
                </div>
                <div className="flex items-center justify-between py-5">
                    <div className="max-w-sm">
                        <div className="text-md mb-3">Pay To:</div>
                        <div>
                            Flowbite LLC ,
                            <span className="text-gray-500">
                                LOUISVILLE, Selby 3864 Johnson Street, United States of America, VAT Code: AA-1234567890
                            </span>
                        </div>
                    </div>
                    <div className="max-w-sm">
                        <div className="text-md mb-3">Invoice To:</div>
                        <div>
                            Flowbite LLC ,
                            <span className="text-gray-500">
                                LOUISVILLE, Selby 3864 Johnson Street, United States of America, VAT Code: AA-1234567890
                            </span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">
                    <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-4 py-3">Product</th>
                                <th className="px-4 py-3">Qty</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Discount</th>
                                <th className="px-4 py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr
                                    key={i}
                                    className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-3">
                                        <div className="mb-2 font-bold"> {p.name}</div>
                                        <div className="text-gray-500"> {p.desc}</div>
                                    </td>
                                    <td className="px-4 py-3">{p.quantity}</td>
                                    <td className="px-4 py-3">${p.price}</td>
                                    <td className="px-4 py-3">{p.discount}%</td>
                                    <td className="px-4 py-3 font-semibold">${((p.price * p.quantity * (100 - p.discount)) / 100).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <div className="w-full max-w-sm">
                        <div className="text-md my-3">Order Summary</div>
                        <div className="my-3 flex justify-between">
                            <div className="text-gray-500">Subtotal</div>
                            <div>$600</div>
                        </div>
                        <div className="my-3 flex justify-between">
                            <div className="text-gray-500">Shipping Estimate</div>
                            <div>$60</div>
                        </div>
                        <div className="my-3 flex justify-between text-lg">
                            <div>Order Total</div>
                            <div>$660</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="rounded-lg bg-green-100 p-3 text-green-800">Invoice Paid</div>

                <div className="border-b py-5 text-lg text-gray-500">Details:</div>
                <div className="flex items-center justify-between border-b py-5">
                    <div className="py-5 text-lg">$2,999</div>
                    <div className="w-full max-w-sm">
                        <select className="w-full rounded-lg border px-3 py-3">
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="pending">Pending</option>
                            <option value="overtue">Overtue</option>
                        </select>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-1 gap-6 text-sm text-gray-700">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <span>
                                    <span className="font-semibold">Created by:</span> Jese Leos
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                <span>
                                    <span className="font-semibold">Due date:</span> 08 July 2025
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CreditCard className="h-4 w-4 text-gray-500" />
                                <span>Pay by Bank Transfer</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Wallet className="h-4 w-4 text-gray-500" />
                                <span>
                                    <span className="font-semibold">Currency:</span> American Dollar
                                </span>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3 border-t py-5">
                            <div className="flex items-center justify-between pb-1">
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Invoice created:</span>
                                </div>
                                <span className="text-gray-500">05/07/2025</span>
                            </div>

                            <div className="flex items-center justify-between pb-1">
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Invoice sent:</span>
                                </div>
                                <span className="text-gray-500">06/07/2025</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Clock className="h-4 w-4" />
                                    <span>Invoice paid:</span>
                                </div>
                                <span className="text-gray-500">08/07/2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
