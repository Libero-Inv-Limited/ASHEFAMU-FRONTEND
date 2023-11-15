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
import Analytics from "./pages/dashboard/analytics";
import Notifications from "./pages/dashboard/Notifications";
import CreateFacility from "./pages/facility-registration/CreateFacility";
import CreateIntent from "./pages/facility-registration/CreateIntent";
import FacilityForm from "./pages/facility-registration/FacilityForm";
import Landing from "./pages/home/Landing";
import ProfilePage from "./pages/dashboard/ProfilePage";
import Users from "./pages/dashboard/users";
import Roles from "./pages/dashboard/roles";
import Permissions from "./pages/dashboard/permissions";
import UserFacilities from "./pages/dashboard/users/UserFacilities";
import UserFormEdit from "./pages/dashboard/users/edit";
import RoleFormEdit from "./pages/dashboard/roles/EditRole";
import FacilityFormEdit from "./pages/facility-registration/FacilityFormEdit";
import CreateRole from "./pages/dashboard/roles/CreateRole";
import CreatePermission from "./pages/dashboard/permissions/CreatePermission";
import UnAuthorized from "./pages/auth/UnAuthorized";

export default [
  // HOME PAGE
  {
    path: "/",
    element: <Landing />,
    name: "Landing",
    // permissions: ["admin", "super admin", "user"]
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
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
    name: "Unauthorized",
  },
  // DASHBOARD
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Dashboard",
    permissions: ["super admin, admin"]
  },

  // FACILITIES ROUTES
  {
    path: "/dashboard/facilities",
    exact: true,
    element: <Facilities />,
    name: "Facilities",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:name/",
    element: <FacilityDashboard />,
    name: "Facilities Dashboard",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:name/documents",
    element: <FacilityDocument />,
    name: "Facilities Document",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:name/members",
    element: <FacilityMember />,
    name: "Facilities Member",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:name/profile",
    element: <FacilityProfile />,
    name: "Facilities",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:name/analytics",
    element: <FacilityAnalytics />,
    name: "Facilities Analytics",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/facilities/:name/notifications",
    element: <FacilityNotification />,
    name: "Facilities Notification",
    permissions: ["admin", "super admin"]
  },

  // FACILITY FORMS
  {
    path: "/dashboard/facilities/register-facility",
    element: <CreateFacility />,
    name: "Create Facility",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/register-facility/intent",
    element: <CreateIntent />,
    name: "Submit Intent",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/register-facility/fill-form",
    element: <FacilityForm />,
    name: "Facility Form",
    permissions: ["admin", "super admin"]
  },
  {
    path: "/dashboard/facilities/:facility/edit-facility/",
    element: <FacilityFormEdit />,
    name: "Facility Edit Form",
    permissions: ["admin", "super admin"]
  },

  // PAYMENT
  {
    path: "/dashboard/payments",
    element: <Payments />,
    name: "Payments",
    permissions: ["admin", "super admin"]
  },

  // ANALYTICS
  {
    path: "/dashboard/analytics",
    element: <Analytics />,
    name: "Analytics",
    permissions: ["super admin"]
  },

  // Notifications
  {
    path: "/dashboard/notifications",
    element: <Notifications />,
    name: "Notifications",
    permissions: ["super admin"]
  },

  // Profile
  {
    path: "/dashboard/profile",
    element: <ProfilePage />,
    name: "Profile",
    permissions: ["admin", "super admin"]
  },
  {
    path: "*",
    element: <Navigate to={"/login"} replace />,
    name: "Notfound",
    permissions: ["admin", "super admin", "user"]

  },

  // USER MANAGEMENT
  {
    path: "/dashboard/users",
    element: <Users />,
    name: "Users",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/users/:user/facilities",
    element: <UserFacilities />,
    name: "USER FACILITIES",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/users/:user/edit-user/",
    element: <UserFormEdit />,
    name: "Facility Edit Form",
    permissions: ["super admin"]
  },

  // ROLE MANAGEMENT
  {
    path: "/dashboard/roles",
    element: <Roles />,
    name: "Roles",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/roles/create-role",
    element: <CreateRole />,
    name: "Create Role",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/roles/:role/edit-role/",
    element: <RoleFormEdit />,
    name: "Facility Edit Form",
    permissions: ["super admin"]
  },

  // PERMISSION MANAGEMENT
  {
    path: "/dashboard/permissions",
    element: <Permissions />,
    name: "Permissions",
    permissions: ["super admin"]
  },
  {
    path: "/dashboard/permissions/create-permission",
    element: <CreatePermission />,
    name: "Create Permission",
    permissions: ["super admin"]
  },
];
