import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

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

// Public pages
import PublicLayout from "@/routes/public/layout";
import Login from "@/routes/public/login";
import Register from "@/routes/public/register";
import ForgotPassword from "@/routes/public/forgot-password";
import VerifyEmail from "@/routes/public/verify-email";
import ProfileLock from "@/routes/public/profile-lock";
import WalletPage from "./routes/dashboard/management/wallet";
import ManageCreditsPage from "./routes/dashboard/management/manage-credits";
import DepositPage from "./routes/dashboard/management/deposit";
import InvitePage from "./routes/dashboard/earn/invite";
import InvoicesPage from "./routes/dashboard/invoice/invoices";
import CreateInvoicePage from "./routes/dashboard/invoice/create";
import FlightBookingsPage from "./routes/dashboard/bookings/flights";
import InvoiceDetailsPage from "./routes/dashboard/invoice/details";
import TransportBookingsPage from "./routes/dashboard/bookings/transport";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
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
                { path: "bookings/transport", element: <TransportBookingsPage /> },

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
        // Auth/Public Routes
        {
            path: "/",
            element: <PublicLayout />,
            children: [
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "forgot-password", element: <ForgotPassword /> },
                { path: "verify-email", element: <VerifyEmail /> },
                { path: "profile-lock", element: <ProfileLock /> },
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
