import { Plane } from "lucide-react";

export default function OrigionDestinationArrowComponent({ flight }) {
    return (
        <div className="rounded-lg bg-white p-2 shadow-md dark:bg-gray-900">
            <div className="mb-3 flex items-center justify-between border-b pb-3 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                    <img
                        src={flight.logo}
                        alt="logo"
                        className="h-8 w-8 rounded-full"
                    />
                    <span className="text-base font-semibold text-black dark:text-white">{flight.airline}</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <div className="text-sm text-gray-600">{flight.cabinClass}</div>
                    <div className="text-lg font-semibold">${flight.price}</div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="mr-3 text-center">
                    <div className="mb-1 text-sm text-gray-500">{flight.from.city}</div>
                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.from.time}</div>
                    <div className="mt-1 text-sm text-gray-500">{flight.from.code}</div>
                </div>

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

                    <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A6BFF] bg-white"></div>

                    <div className="absolute left-1/2 top-[0%] -translate-x-1/2 rotate-45 text-[#1A6BFF]">
                        <Plane
                            size={28}
                            fill="#1A6BFF"
                            stroke="#1A6BFF"
                        />
                    </div>

                    <div className="absolute top-[35px] w-full text-center text-sm text-gray-500">
                        <div>{flight.duration}</div>
                        <div>{flight.type}</div>
                    </div>
                </div>

                <div className="ml-3 text-center">
                    <div className="mb-1 text-sm text-gray-500">{flight.to.city}</div>
                    <div className="text-2xl font-semibold leading-none text-black dark:text-white">{flight.to.time}</div>
                    <div className="mt-1 text-sm text-gray-500">{flight.to.code}</div>
                </div>
            </div>
        </div>
    );
}
