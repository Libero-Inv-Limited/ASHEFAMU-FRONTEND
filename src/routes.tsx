import { Navigate } from "react-router-dom";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import SuccessPage from "./pages/auth/SuccessPage";
import VerifyEmailAndPhone from "./pages/auth/VerifyEmailAndPhone";
import Dashboard from "./pages/dashboard/Dashboard";
import Facilities from "./pages/dashboard/FacilityDashboard";
import FacilityDashboard from "./pages/dashboard/FacilityDashboard";

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
  {
    path: "/facilities",
    element: <Facilities />,
    name: "Facilities"
  },
  {
    path: "/facilities/:name",
    element: <FacilityDashboard />,
    name: "Facilities"
  },
  {
    path: "*",
    element: <Navigate to={"/login"} replace />,
    name: "Notfound"
  },


]