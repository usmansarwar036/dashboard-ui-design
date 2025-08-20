import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// dashboard Pages
import Layout from "@/routes/dashboard/layout";
import DashboardPage from "@/routes/dashboard/page";
import ProfilePage from "@/routes/dashboard/profile/page";
import NotificationPage from "@/routes/dashboard/notification/page";
import ActivityLogPage from "@/routes/dashboard/notification/logs";
import TicketsPage from "@/routes/dashboard/support/tickets";
import TicketDetailPage from "@/routes/dashboard/support/details";
import RolesPage from "@/routes/dashboard/management/roles";
import TransactionsPage from "@/routes/dashboard/transactions/page";
import RefundedPage from "@/routes/dashboard/transactions/refunded";
import MembersPage from "./routes/dashboard/management/members";
import CustomersPage from "./routes/dashboard/management/customers";
import WalletPage from "./routes/dashboard/management/wallet";
import ManageCreditsPage from "./routes/dashboard/management/manage-credits";
import DepositPage from "./routes/dashboard/management/deposit";
import InvitePage from "./routes/dashboard/earn/invite";
import InvoicesPage from "./routes/dashboard/invoice/invoices";
import CreateInvoicePage from "./routes/dashboard/invoice/create";
import FlightBookingsPage from "./routes/dashboard/bookings/flights";
import InvoiceDetailsPage from "./routes/dashboard/invoice/details";
import TransportBookingsPage from "./routes/dashboard/bookings/transport";
import FlightBookingDetials from "./routes/dashboard/bookings/flight-details";
import TranportBookingDetials from "./routes/dashboard/bookings/transport-details";
import HotelsBookingsPage from "./routes/dashboard/bookings/hotels";
import HotelBookingDetials from "./routes/dashboard/bookings/hotel-details";
import TourBookingDetials from "./routes/dashboard/bookings/tour-details";
import ToursBookingsPage from "./routes/dashboard/bookings/tours";
import UmrahsBookingsPage from "./routes/dashboard/bookings/umrahs";
import UmrahBookingDetials from "./routes/dashboard/bookings/umrah-details";

// Auth pages
import AuthLayout from "@/routes/auth/layout";
import Login from "@/routes/auth/login";
import Register from "@/routes/auth/register";
import ForgotPassword from "@/routes/auth/forgot-password";
import VerifyEmail from "@/routes/auth/verify-email";
import ProfileLock from "@/routes/auth/profile-lock";
import PublicLayout from "./routes/b2c/layout";
import HomePage from "./routes/b2c/page";
import SearchFlights from "./routes/b2c/flight/1-search-flights";
import FlightDetailsPage from "./routes/b2c/flight/2-flight-details";

// public pages

function App() {
    const router = createBrowserRouter([
        {
            path: "/dashboard/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                { path: "profile", element: <ProfilePage /> },
                { path: "notification", element: <NotificationPage /> },
                { path: "logs", element: <ActivityLogPage /> },
                { path: "tickets", element: <TicketsPage /> },
                { path: "tickets/details", element: <TicketDetailPage /> },
                { path: "wallet", element: <WalletPage /> },
                { path: "deposit", element: <DepositPage /> },
                { path: "manage-credits", element: <ManageCreditsPage /> },
                { path: "invite", element: <InvitePage /> },
                { path: "invoices", element: <InvoicesPage /> },
                { path: "invoices/create", element: <CreateInvoicePage /> },
                { path: "invoices/details", element: <InvoiceDetailsPage /> },
                { path: "bookings/flights", element: <FlightBookingsPage /> },
                { path: "bookings/flights/:bookingId", element: <FlightBookingDetials /> },
                { path: "bookings/transports", element: <TransportBookingsPage /> },
                { path: "bookings/transports/:bookingId", element: <TranportBookingDetials /> },
                { path: "bookings/hotels", element: <HotelsBookingsPage /> },
                { path: "bookings/hotels/:bookingId", element: <HotelBookingDetials /> },
                { path: "bookings/tours", element: <ToursBookingsPage /> },
                { path: "bookings/tours/:bookingId", element: <TourBookingDetials /> },
                { path: "bookings/umrahs", element: <UmrahsBookingsPage /> },
                { path: "bookings/umrahs/:bookingId", element: <UmrahBookingDetials /> },

                {
                    path: "roles",
                    element: <RolesPage />,
                },
                {
                    path: "transactions",
                    element: <TransactionsPage />,
                },
                {
                    path: "refunded",
                    element: <RefundedPage />,
                },
                {
                    path: "members",
                    element: <MembersPage />,
                },
                {
                    path: "customers",
                    element: <CustomersPage />,
                },
            ],
        },
        // Auth Routes
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "forgot-password", element: <ForgotPassword /> },
                { path: "verify-email", element: <VerifyEmail /> },
                { path: "profile-lock", element: <ProfileLock /> },
            ],
        },
        // Auth Routes
        {
            path: "/",
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                { path: "flights/search", element: <SearchFlights /> },
                { path: "flights/fill-details", element: <FlightDetailsPage /> },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
