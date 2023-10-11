import { Navigate } from "react-router-dom";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import SuccessPage from "./pages/auth/SuccessPage";
import VerifyEmailAndPhone from "./pages/auth/VerifyEmailAndPhone";
import Dashboard from "./pages/dashboard/Dashboard";
import Facilities from "./pages/dashboard/Facilities";
import FacilityDashboard from "./pages/dashboard/FacilityDashboard";
import FacilityDocument from "./pages/dashboard/FacilityDocument";
import FacilityMember from "./pages/dashboard/FacilityMember";
import FacilityProfile from "./pages/dashboard/FacilityProfile";
import FacilityAnalytics from "./pages/dashboard/FacilityAnalytics";
import FacilityNotification from "./pages/dashboard/FacilityNotification";
import Payments from "./pages/dashboard/Payments";
import Analytics from "./pages/dashboard/Analytics";
import Notifications from "./pages/dashboard/Notifications";

export default [
  // AUTH PAGES
  {
    path: "/register",
    element: <Registration />,
    name: "Register"
  },
  {
    path: "/login",
    element: <Login />,
    name: "Register"
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    name: "ForgotPassword"
  },
  {
    path: "/change-password/:email",
    element: <ChangePassword />,
    name: "ChangePassword"
  },
  {
    path: "/verify-contact/:email",
    element: <VerifyEmailAndPhone />,
    name: "VerifyEmailAndPhone"
  },
  {
    path: "/success/:type",
    element: <SuccessPage />,
    name: "SuccessPage"
  },
  // DASHBOARD
  {
    path: "/",
    element: <Dashboard />,
    name: "Dashboard"
  },

  // FACILITIES ROUTES
  {
    path: "/facilities",
    exact: true,
    element: <Facilities />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/",
    element: <FacilityDashboard />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/documents",
    element: <FacilityDocument />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/members",
    element: <FacilityMember />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/profile",
    element: <FacilityProfile />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/analytics",
    element: <FacilityAnalytics />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name/notifications",
    element: <FacilityNotification />,
    name: "Facilities"
  },

  // PAYMENT
  {
    path: "/payments",
    element: <Payments />,
    name: "Payments"
  },

  // ANALYTICS
  {
    path: "/analytics",
    element: <Analytics />,
    name: "Analytics"
  },

  // Notifications
  {
    path: "/notifications",
    element: <Notifications />,
    name: "Notifications"
  },
  {
    path: "*",
    element: <Navigate to={"/login"} replace />,
    name: "Notfound"
  },


]