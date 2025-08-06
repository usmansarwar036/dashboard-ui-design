import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    User,
    UserRound,
    CircleDollarSign,
    BookText,
    FileX,
    BookmarkPlus,
    BookCheck,
    ShieldCheck,
    CircleCheck,
    Notebook,
    Globe,
    Plane,
    MessageCircleMore,
    CalendarDays,
    Bed,
    Activity,
} from "lucide-react";

export default function TourBookingDetials() {
    const { bookingId } = useParams();

    return (
        <div className="w-full">
            {/* Header and Breadcrumb */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Tour Booking</h2>
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
                    {/* tour Section */}
                    <div className="dark:bg-dark/[0.03] rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="gap-4 sm:flex">
                            <div className="aspect-[1.5] sm:w-[40%]">
                                <img
                                    src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Tokyo Experience"
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            </div>

                            <div className="sm:w-[60%]">
                                <h2 className="my-3 text-lg font-semibold leading-tight sm:mt-0">
                                    Tokyo & Unique Experience Where Modernity Meets Tradition (5D4N)
                                </h2>
                                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Plane size={16} />
                                        <span>New York / Tokyo</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Plane size={16} />
                                        <span>2 Flights</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16} />
                                        <span>Dec 6 - Dec 10, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bed size={16} />
                                        <span>2 Accommodation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>4 Adults</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity size={16} />
                                        <span>1 Activity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Flight Details */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <span className="absolute -top-2 left-3 z-10 rounded-md bg-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:text-blue-200">
                            Depart
                        </span>
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
                    {/* Flight Details */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <span className="absolute -top-2 left-3 z-10 rounded-md bg-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:text-blue-200">
                            Return
                        </span>
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
                    {/* Main Tour Card */}
                    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] dark:text-white">
                        <span className="absolute -top-2 left-3 z-10 rounded-md bg-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:text-blue-200">
                            Accomodation
                        </span>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-800 dark:text-white">Tour Paradise</div>
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                                    alt="Paradise Co."
                                    className="h-5 rounded-md"
                                />
                                <span className="text-sm text-gray-600 dark:text-white">Paradise Co.</span>
                                <div className="flex items-center text-sm text-yellow-500">
                                    <svg
                                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z" />
                                    </svg>
                                    <span className="ml-1 font-semibold">4.5</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="pt-5 sm:flex">
                            {/* Tour Image */}
                            <div className="flex items-center p-2 sm:w-[30%]">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                                    alt="Tour Paradise"
                                    className="w-full rounded-md object-contain"
                                />
                            </div>

                            {/* Amenities */}
                            <div className="sm:w-[70%]">
                                <div className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-2 px-3 text-sm text-gray-600 dark:text-white md:gap-x-5 md:gap-y-4 md:px-4 lg:gap-x-6 lg:gap-y-6 lg:px-6">
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                                            className="h-4 w-4"
                                        />
                                        <span>Free Wi-Fi</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                                            className="h-4 w-4"
                                        />
                                        <span>Free Parking</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/1046/1046871.png"
                                            className="h-4 w-4"
                                        />
                                        <span>Swimming Pool</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
                                            className="h-4 w-4"
                                        />
                                        <span>Fitness Center</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                                            className="h-4 w-4"
                                        />
                                        <span>24/7 Room Service</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
                                            className="h-4 w-4"
                                        />
                                        <span>Air Conditioning</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Check-in/Out Timeline */}
                        <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
                        <div className="flex items-center justify-between">
                            <div className="mr-3 text-nowrap text-center">
                                <div className="mb-1 text-sm text-[#6B7280]">Check-in</div>
                                <div className="text-base font-semibold text-black dark:text-white">2025-08-10</div>
                                <div className="mt-1 text-sm text-[#6B7280]">2:00 PM</div>
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
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#1A6BFF]">
                                    <Globe size={28} />
                                </div>
                                <div className="absolute -top-2 w-full text-center text-sm text-[#6B7280]">1 Night</div>
                            </div>
                            <div className="ml-3 text-nowrap text-center">
                                <div className="mb-1 text-sm text-[#6B7280]">Check-out</div>
                                <div className="text-base font-semibold text-black dark:text-white">2025-08-11</div>
                                <div className="mt-1 text-sm text-[#6B7280]">11:00 AM</div>
                            </div>
                        </div>

                        <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-700"></div>

                        {/* Address & CTA */}
                        <div className="mt-4 flex flex-wrap items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-white">
                                <p>
                                    <span className="font-semibold">Address :</span> Street 23, High Way Road, Main Istanbul
                                </p>
                                <p className="mt-2 text-xs text-gray-500 dark:text-white">Note : All times are in local time</p>
                            </div>
                        </div>
                    </div>
                    {/* Activities Section */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <span className="absolute -top-2 left-3 z-10 rounded-md bg-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:text-blue-200">
                            Activities
                        </span>
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <p className="text-base font-semibold text-black dark:text-white">
                                {" "}
                                Tokyo 5D4N Trip Package: Tokyo City, Mt. Fuji & Hakone, & Moden Tokyo Ex...
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* Large Left Image */}
                            <div className="aspect-square w-[50%]">
                                <img
                                    src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Skytree"
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            </div>

                            {/* Right Grid */}
                            <div className="aaspect-square grid w-[50%] grid-cols-2 gap-2">
                                <img
                                    src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                    alt="1"
                                    className="aspect-square rounded-xl object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                    alt="2"
                                    className="aspect-square rounded-xl object-cover"
                                />

                                <img
                                    src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                    alt="3"
                                    className="aspect-square rounded-xl object-cover"
                                />

                                {/* See all overlay */}
                                <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1718567074329-ae4d92befb66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYWN0aXZpdGllc3xlbnwwfHwwfHx8MA%3D%3D"
                                        alt="4"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 text-sm font-medium text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mb-1 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        See all
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2">5D4N package for 2-3 people</p>
                    </div>
                    {/* Amenities Section */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <p className="text-base font-semibold text-black dark:text-white"> Sat Dec 6 2025 - wed, Dec 9 2025 (SD)</p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Complimentary breakfast</li>
                            <li>Private bathroom</li>
                            <li>Flat-screen TV</li>
                            <li>Mini refrigerator</li>
                            <li>Daily housekeeping</li>
                        </ul>
                    </div>

                    {/* Guests Section */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Guest Information</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                            <User size={16} />
                            Mr. Andrew Ainsley
                        </div>
                        <div className="mt-4 flex flex-wrap justify-between gap-4 text-sm">
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Booking ID:</span>
                                <span> HTL123456</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Room Type:</span>
                                <span> Deluxe Double</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Room No:</span>
                                <span> 302</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-white/80">Floor:</span>
                                <span> 3rd</span>
                            </div>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <BookmarkPlus size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Add-on(s)</p>
                        </div>
                        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-white/80">
                            <li>Late checkout</li>
                            <li>Breakfast in room</li>
                            <li>Airport pickup</li>
                            <li>Spa access</li>
                            <li>Extra towels</li>
                            <li>Balcony view</li>
                            <li>Mini bar access</li>
                            <li>Daily newspaper</li>
                            <li>Pet-friendly room</li>
                        </ul>
                    </div>

                    {/* Notes */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <Notebook size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Special Request</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/80">Please arrange for a baby crib in the room.</p>
                    </div>

                    {/* Policy */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white sm:p-3 md:p-4 lg:p-5">
                        <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-2 dark:border-gray-800">
                            <BookCheck size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Tour Policy</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/80">
                            Check-in after 2:00 PM and check-out before 12:00 PM. Pets are allowed on request. Extra beds are subject to availability.
                            No smoking inside rooms.
                        </p>
                    </div>
                </div>

                <div className="w-full space-y-2 lg:w-[30%]">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-3 flex items-center gap-3 border-b pb-2">
                            <UserRound size={20} />
                            <p className="text-base font-semibold text-black dark:text-white">Tour Guide</p>
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
                            Reschedule Booking
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
