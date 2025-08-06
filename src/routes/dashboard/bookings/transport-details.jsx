import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    User,
    PlaneTakeoff,
    UserRound,
    CircleDollarSign,
    BookText,
    FileX,
    BookmarkPlus,
    BookCheck,
    CarFront,
    Users,
    Briefcase,
    CircleDot,
    Fuel,
    Star,
    Car,
    MessageCircleMore,
    ShieldCheck,
    CircleCheck,
    Notebook,
} from "lucide-react";

export default function TranportBookingDetials() {
    const { bookingId } = useParams();

    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Transport Bookings</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li className="text-gray-800 dark:text-white/90">
                            <Link to={"/dashboard/"}>Home</Link>
                            <span className="text-gray-400"> /</span>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Bookings</li>
                    </ol>
                </nav>
            </div>

            {/* Content Start */}
            <div className="flex w-full flex-wrap">
                <div className="w-full space-y-2 pe-2 lg:max-w-[70%]">
                    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] dark:text-white">
                        {/* Top: Title and logo */}
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-800 dark:text-white">Toyota Corolla</div>
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://i.ibb.co/QjHzhDqN/image-removebg-preview.png"
                                    alt="Toyota"
                                    className="h-5"
                                />
                                <span className="text-sm text-gray-600 dark:text-white">Toyota</span>
                                <div className="flex items-center text-sm text-yellow-500">
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    <span className="ml-1 font-semibold">4.6</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex pt-5">
                            {/* Image */}
                            <div className="w-[30%] p-1">
                                <img
                                    src="https://i.ibb.co/QjHzhDqN/image-removebg-preview.png"
                                    alt="Toyota Corolla"
                                    className="w-full object-contain"
                                />
                            </div>

                            <div className="w-[70%]">
                                <div className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-2 px-3 text-sm text-gray-600 dark:text-white md:gap-x-5 md:gap-y-2 md:px-5 lg:gap-x-7 lg:gap-y-3 lg:px-7 xl:gap-x-10 xl:gap-y-5 xl:px-10">
                                    <div className="flex items-center gap-1">
                                        <CarFront className="h-4 w-4" /> Sedan
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" /> 5 People
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" /> 2 Bags
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CircleDot className="h-4 w-4" /> 4 Doors
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Fuel className="h-4 w-4" /> Petrol
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Fuel className="h-4 w-4" />
                                        <span className="text-sm font-medium">Automatic</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            {/* Divider */}
                            <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>

                            {/* Date Info */}
                            <div className="flex items-center justify-between">
                                {/* Pick-up */}
                                <div className="mr-3 text-nowrap text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">Pick-up date</div>
                                    <div className="text-base font-semibold leading-none text-black dark:text-white">Aug 12, 2025</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">10:00 AM</div>
                                </div>

                                <div className="relative mx-auto h-[56px] w-full">
                                    <svg
                                        className="absolute left-3 right-3 top-1/2 h-[5px] w-[calc(100%-24px)] -translate-y-1/2"
                                        viewBox="0 0 100 5"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="lineGradient"
                                                x1="0"
                                                y1="2.5"
                                                x2="100"
                                                y2="2.5"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop
                                                    offset="0"
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
                                        <line
                                            x1="0"
                                            y1="2.5"
                                            x2="100"
                                            y2="2.5"
                                            stroke="url(#lineGradient)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                    <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1A6BFF]">
                                        <Car
                                            size={28}
                                            fill="#1A6BFF"
                                            stroke="#1A6BFF"
                                        />
                                    </div>
                                    <div className="absolute -top-1 w-full text-center text-sm text-[#6B7280]">2 Days</div>
                                </div>

                                {/* Drop-off */}
                                <div className="ml-3 text-nowrap text-center">
                                    <div className="mb-1 text-sm text-[#6B7280]">Drop-off Date</div>
                                    <div className="text-base font-semibold leading-none text-black dark:text-white">Aug 14, 2025</div>
                                    <div className="mt-1 text-sm text-[#6B7280]">10:00 AM</div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>

                            {/* Pickup / Drop-off */}
                            <div className="mt-4 flex flex-wrap justify-between">
                                <div className="text-sm text-gray-700 dark:text-white">
                                    <p>
                                        <span className="font-semibold">Pick-up :</span> Islamabad Airport
                                    </p>
                                    <p>
                                        <span className="font-semibold">Drop-off :</span> Lahore Cantt
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-white">Note : All times are in local time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Transport Amenities */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <Car size={20} />
                            <p className="text-base font-semibold text-black dark:text-white"> Amenities</p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Cabin baggage 1 × 7 kg</li>
                            <li>Baggage 1 × 20 kg</li>
                            <li>Meals/snacks available</li>
                            <li>Refundable</li>
                            <li>Travel insurance included</li>
                        </ul>
                    </div>

                    {/* Passenger(s) */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Passenger(s)</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                            <User size={16} />
                            Mr. Andrew Ainsley
                        </div>
                        <div className="mt-4 flex flex-wrap justify-between gap-4 text-sm">
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Booking ID:</span>
                                <span> TRN123456</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Vehicle Type:</span>
                                <span> AC Bus</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Seat No:</span>
                                <span> A12</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Boarding Point:</span>
                                <span> City Terminal</span>
                            </div>
                        </div>
                    </div>

                    {/* Add-on(s) */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <BookmarkPlus size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Add-on(s)</p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Wi-Fi access</li>
                            <li>Power outlets</li>
                            <li>Blankets and pillows</li>
                            <li>Refreshments/snacks</li>
                            <li>Extra legroom seat</li>
                            <li>Window seat selection</li>
                            <li>Travel insurance</li>
                            <li>Flexible rescheduling</li>
                            <li>Pet travel support</li>
                        </ul>
                    </div>

                    {/* Additional Note */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <Notebook size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Additional Note</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/80">Kindly bring a baby car seat for my 2 years old child.</p>
                    </div>
                    {/* Transport Policy */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <BookCheck size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Transport Policy</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/80">
                            Passengers are allowed one medium-sized bag (up to 20 kg) and one small hand carry. Add-ons such as blankets and meals may
                            be pre-booked or purchased during the trip, subject to availability. Please arrive at the boarding point at least 30
                            minutes before departure. Changes or cancellations must be made 24 hours in advance.
                        </p>
                    </div>
                </div>
                <div className="w-full space-y-2 lg:w-[30%]">
                    {/* Driver Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Driver Details</p>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-white/80">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/src/assets/profile-image.jpg"
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <div className="flex w-full items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-black dark:text-white">Ali</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Male - 40 years old - 7+ years exp.</div>
                                    </div>
                                    <div className="cursor-pointer text-green-600">
                                        <MessageCircleMore size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <span>Amount (x4 days)</span>
                                <span>$1,099.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Insurance</span>
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
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <ShieldCheck size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Insurance</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-white dark:text-black">
                                <CircleCheck
                                    size={20}
                                    className="fill-blue-600 dark:fill-white"
                                />
                            </p>

                            <p className="text-sm text-gray-600 dark:text-white/80">
                                Basic Insurance package that covers demage to the rental vehical
                            </p>
                            <div className="flex flex-col">
                                <span className="text-blue-600">$100.00</span>
                                <span className="text-right text-sm text-gray-400 dark:text-white/60"> / 4 days</span>
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
                        {/* <p className="text-sm text-red-600">Not Cancelable</p> */}
                        <p className="text-sm text-green-500">
                            Cancelable until <span className="font-bold"> Wed, 23 Dec 2023</span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <button className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">Show E-Ticket</button>
                        <button className="w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:bg-white/[0.06]">
                            Reschedule Trip
                        </button>
                        <button className="w-full rounded-lg border border-red-500 bg-white py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-500 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10">
                            Cancel Booking
                        </button>
                    </div>
                </div>
            </div>
            {/* Content Ends */}
        </div>
    );
}
