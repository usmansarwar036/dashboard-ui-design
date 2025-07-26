import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <Link
                to="/"
                className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img
                    className="mr-2 h-8 w-8"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                />
                Spiro
            </Link>

            <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:max-w-lg xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Welcome Back</h1>

                    <div className="flex flex-col md:flex-row">
                        <button className="mb-2 flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-900 dark:text-white md:mb-0 md:me-1">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5 w-5"
                                alt="Google"
                            />
                            Login with Google
                        </button>
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-900 dark:text-white md:ms-1">
                            <img
                                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                                className="h-5 w-5"
                                alt="Facebook"
                            />
                            Login with Facebook
                        </button>
                    </div>

                    <div className="my-4 flex items-center">
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                    </div>

                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                required
                            />
                        </div>

                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
