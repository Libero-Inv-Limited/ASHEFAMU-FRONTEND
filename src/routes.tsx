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
import CreateFacility from "./pages/facility-registration/CreateFacility";
import CreateIntent from "./pages/facility-registration/CreateIntent";
import FacilityForm from "./pages/facility-registration/FacilityForm";
import Landing from "./pages/home/Landing";
import ProfilePage from "./pages/dashboard/ProfilePage";
import Users from "./pages/dashboard/users";
import UserFacilities from "./pages/dashboard/users/UserFacilities";
import UserFormEdit from "./pages/dashboard/users/edit";
import FacilityFormEdit from "./pages/facility-registration/FacilityFormEdit";

export default [
  // HOME PAGE
  {
    path: "/",
    element: <Landing />,
    name: "Landing",
  },

  // AUTH PAGES
  {
    path: "/register",
    element: <Registration />,
    name: "Register",
  },
  {
    path: "/login",
    element: <Login />,
    name: "Register",
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    name: "ForgotPassword",
  },
  {
    path: "/change-password/:email",
    element: <ChangePassword />,
    name: "ChangePassword",
  },
  {
    path: "/verify-contact/:email",
    element: <VerifyEmailAndPhone />,
    name: "VerifyEmailAndPhone",
  },
  {
    path: "/success/:type",
    element: <SuccessPage />,
    name: "SuccessPage",
  },
  // DASHBOARD
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Dashboard",
  },

  // FACILITIES ROUTES
  {
    path: "/dashboard/facilities",
    exact: true,
    element: <Facilities />,
    name: "Facilities",
  },
  {
    path: "/dashboard/facilities/:name/",
    element: <FacilityDashboard />,
    name: "Facilities Dashboard",
  },
  {
    path: "/dashboard/facilities/:name/documents",
    element: <FacilityDocument />,
    name: "Facilities Document",
  },
  {
    path: "/dashboard/facilities/:name/members",
    element: <FacilityMember />,
    name: "Facilities Member",
  },
  {
    path: "/dashboard/facilities/:name/profile",
    element: <FacilityProfile />,
    name: "Facilities",
  },
  {
    path: "/dashboard/facilities/:name/analytics",
    element: <FacilityAnalytics />,
    name: "Facilities Analytics",
  },
  {
    path: "/dashboard/facilities/:name/notifications",
    element: <FacilityNotification />,
    name: "Facilities Notification",
  },

  // FACILITY FORMS
  {
    path: "/dashboard/facilities/register-facility",
    element: <CreateFacility />,
    name: "Create Facility",
  },
  {
    path: "/dashboard/facilities/register-facility/intent",
    element: <CreateIntent />,
    name: "Submit Intent",
  },
  {
    path: "/dashboard/facilities/register-facility/fill-form",
    element: <FacilityForm />,
    name: "Facility Form",
  },
  {
    path: "/dashboard/facilities/:facility/edit-facility/",
    element: <FacilityFormEdit />,
    name: "Facility Edit Form",
  },

  // PAYMENT
  {
    path: "/dashboard/payments",
    element: <Payments />,
    name: "Payments",
  },

  // ANALYTICS
  {
    path: "/dashboard/analytics",
    element: <Analytics />,
    name: "Analytics",
  },

  // Notifications
  {
    path: "/dashboard/notifications",
    element: <Notifications />,
    name: "Notifications",
  },

  // Profile
  {
    path: "/dashboard/profile",
    element: <ProfilePage />,
    name: "Profile",
  },
  {
    path: "*",
    element: <Navigate to={"/login"} replace />,
    name: "Notfound",
  },

  // USER MANAGEMENT
  {
    path: "/dashboard/users",
    element: <Users />,
    name: "Users",
  },
  {
    path: "/dashboard/facilities/create-user",
    element: <CreateFacility />,
    name: "Create Facility",
  },
  {
    path: "/dashboard/users/:user/facilities",
    element: <UserFacilities />,
    name: "USER FACILITIES",
  },
  {
    path: "/dashboard/users/:user/edit-user/",
    element: <UserFormEdit />,
    name: "Facility Edit Form",
  },
];
