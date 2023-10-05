import { Navigate } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SuccessPage from "./pages/SuccessPage";
import VerifyEmailAndPhone from "./pages/VerifyEmailAndPhone";

export default [
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
  {
    path: "*",
    element: <Navigate to={"/login"} replace />,
    name: "Notfound"
  },
]