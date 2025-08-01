import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    Barcode,
    Calendar,
    Clock,
    MapPin,
    User,
    Wallet,
    CheckCircle,
    XCircle,
    Plane,
    PlaneTakeoff,
    UserRound,
    CircleDollarSign,
    BookText,
    FileX,
    BookmarkPlus,
    BookCheck,
} from "lucide-react";

export default function FlightBookingDetials() {
    const { bookingId } = useParams();

    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Flight Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to={"/"}>Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            {/* Content Start */}
            <div className="flex w-full flex-wrap">
                <div className="w-full space-y-2 pe-2 lg:max-w-[70%]">
                    {/* Booking ID + Barcode */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-white">Booking ID</p>
                            <p className="text-lg font-bold text-black dark:text-white">{bookingId}</p>
                        </div>
                        <img
                            src="https://t4.ftcdn.net/jpg/02/28/23/91/360_F_228239110_4eEmhcqbUpZG8y1x1aazFBQMVmbGjoce.jpg"
                            alt="barcode"
                            className="mx-auto my-3 h-16"
                        />
                        <p className="text-center text-xs text-gray-500 dark:text-white/70">
                            You are obligated to present your booking ID when asked at the counter
                        </p>
                    </div>

                    {/* Flight Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center justify-between border-b pb-3">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://placehold.co/32x32?text=JA"
                                    alt="logo"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-base font-semibold text-black dark:text-white">Emirates</span>
                            </div>
                            <span className="text-sm text-[#6B7280]">Wed, Dec 27 2024 </span>
                        </div>
                        <div className="flex items-center justify-between">
                            {/* From */}
                            <div className="mr-3 text-center">
                                <div className="mb-1 text-sm text-[#6B7280]">New York</div>
                                <div className="text-2xl font-semibold leading-none text-black dark:text-white">09:00</div>
                                <div className="mt-1 text-sm text-[#6B7280]">JFK</div>
                            </div>

                            {/* Arc with Plane */}
                            <div className="relative mx-auto mt-[-30px] h-[56px] w-full">
                                <svg
                                    className="absolute inset-0 mx-auto h-full w-[calc(100%-10px)]"
                                    viewBox="0 0 100 30"
                                    preserveAspectRatio="none"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 30C20 0 80 0 100 30"
                                        stroke="url(#paint0_linear)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="0"
                                            y1="30"
                                            x2="100"
                                            y2="30"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                stopColor="#4D8CFE"
                                                stopOpacity="0.2"
                                            />
                                            <stop
                                                offset="0.5"
                                                stopColor="#1A6BFF"
                                            />
                                            <stop
                                                offset="1"
                                                stopColor="#4D8CFE"
                                                stopOpacity="0.2"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Endpoints */}
                                <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                                {/* Plane Icon */}
                                <div className="absolute left-1/2 top-[0%] -translate-x-1/2 rotate-45 text-[#1A6BFF]">
                                    <Plane
                                        size={28}
                                        fill="#1A6BFF"
                                        stroke="#1A6BFF"
                                    />
                                </div>

                                {/* Duration Info */}
                                <div className="absolute top-[35px] w-full text-center text-sm text-[#6B7280]">
                                    <div>7h 30m</div>
                                    <div>Non-stop</div>
                                </div>
                            </div>

                            {/* To */}
                            <div className="ml-3 text-center">
                                <div className="mb-1 text-sm text-[#6B7280]">Paris</div>
                                <div className="text-2xl font-semibold leading-none text-black dark:text-white">16:30</div>
                                <div className="mt-1 text-sm text-[#6B7280]">CDG</div>
                            </div>
                        </div>
                    </div>

                    {/* Flight Amenities */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <PlaneTakeoff size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Flight Amenities</p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Cabin baggage 1 × 7 kg</li>
                            <li>Baggage 1 × 20 kg</li>
                            <li>Meals/snacks available</li>
                            <li>Refundable</li>
                            <li>Travel insurance included</li>
                        </ul>
                    </div>
                    {/* Passengers */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Passenger(s) </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                            <User size={16} />
                            Mr. Andrew Ainsley
                        </div>
                        <div className="mt-4 flex flex-wrap justify-between gap-4 text-sm">
                            <div>
                                <span className="text-gray-600 dark:text-white/80"> Flight Number:</span>
                                <span> Wke32</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80"> Class:</span>
                                <span> Economy</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80"> Gate:</span>
                                <span> 24</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80"> Seat Number:</span>
                                <span> B2</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <BookmarkPlus size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Add on(s) </p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Travel insurance included</li>
                            <li>Seat selection (extra legroom, window, aisle)</li>
                            <li>Priority boarding</li>
                            <li>Extra checked baggage</li>
                            <li>Extra in-flight meal</li>
                            <li>Wi-Fi access</li>
                            <li>Access to airport lounge</li>
                            <li>Fast-track security</li>
                            <li>Pet in cabin</li>
                            <li>Carbon offset contribution</li>
                            <li>Infant amenities (bassinet, baby food)</li>
                            <li>Upgrade to business/premium economy</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <BookCheck size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Flight Policy </p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/80">
                            Passengers are entitled to one piece of cabin baggage up to 7 kg and one checked-in bag up to 20 kg as part of the economy
                            fare. Excess baggage will incur additional charges per kilogram, subject to airline rules. Online check-in opens 48 hours
                            before departure and closes 2 hours prior, while airport check-in counters close 60 minutes before flight time.{" "}
                        </p>
                    </div>
                </div>
                <div className="w-full space-y-2 lg:w-[30%]">
                    {/* Contact Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Contact Details</p>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-white/80">
                            <p className="font-medium">Andrew Ainsley</p>
                            <p>andrew.ainsley@email.com</p>
                            <p>+1 437 379 3894</p>
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <CircleDollarSign size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Price Details</p>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-white/80">
                            <div className="flex justify-between">
                                <span>Emirates (Adult x1)</span>
                                <span>$1,099.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Travel Insurance</span>
                                <span>$45.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>$26.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Points Used</span>
                                <span>- $44.50</span>
                            </div>
                            <div className="flex justify-between text-green-600 dark:text-green-400">
                                <span>Discount (25%)</span>
                                <span>- $299.75</span>
                            </div>
                            <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-black dark:text-white">
                                <span>Total Price</span>
                                <span>$1,024.75</span>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <BookText size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Transaction Details</p>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-white/80">
                            <div className="flex justify-between">
                                <span>Payment Method</span>
                                <span>Airfly Wallet</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="font-medium text-green-500">Paid</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Booking ID</span>
                                <span>{bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Transaction ID</span>
                                <span>TRN74000995</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Reference ID</span>
                                <span>REF72738434</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <FileX size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Cancelation Policy </p>
                        </div>
                        <p className="text-sm text-red-600">Not Cancelable</p>
                        {/* <p className="text-sm text-green-500">
                            Cancelable until <span className="font-bold"> Wed, 23 Dec 2023</span>
                        </p> */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <button className="w-full rounded-xl bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">Show E-Ticket</button>
                        <button className="w-full rounded-xl border border-gray-300 bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:bg-white/[0.06]">
                            Reschedule Trip
                        </button>
                        <button className="w-full rounded-xl border border-red-500 bg-white py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-500 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10">
                            Cancel Booking
                        </button>
                    </div>
                </div>
            </div>
            {/* Content Ends */}
        </div>
    );
}
