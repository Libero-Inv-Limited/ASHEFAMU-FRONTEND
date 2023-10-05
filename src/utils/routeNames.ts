const ROUTES = {
  REGISTER_ROUTE:"/register",
  LOGIN_ROUTE:"/login",
  FORGOT_PASSWORD_ROUTE: "/forgot-password",
  CHANGE_PASSWORD_ROUTE:(email: string) => `/change-password/${email}`,
  VERIFY_CONTACT_ROUTE:(email: string) => `/verify-contact/${email}`,
  SUCCESS_ROUTE:(type: string) => `/success/${type}`,
}

export default ROUTES