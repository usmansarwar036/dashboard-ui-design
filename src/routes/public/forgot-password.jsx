import { Link } from "react-router-dom";

export default function ForgotPassword() {
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
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        Forgot your password?
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No worries. Enter your email and we'll send you a link to reset your password.
                    </p>

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
                                placeholder="name@company.com"
                                required
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Send Reset Link
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
