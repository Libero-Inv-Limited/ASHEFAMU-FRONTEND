const ROUTES = {
  REGISTER_ROUTE:"/register",
  LOGIN_ROUTE:"/login",
  EDIT_PROFILE:"/dashboard/profile",
  FORGOT_PASSWORD_ROUTE: "/forgot-password",
  CHANGE_PASSWORD_ROUTE:(email: string) => `/change-password/${email}`,
  VERIFY_CONTACT_ROUTE:(email: string) => `/verify-contact/${email}`,
  SUCCESS_ROUTE:(type: string) => `/success/${type}`,
  
  EDIT_FACILITY_ROUTE:(name: string) => `/dashboard/facilities/${name}/edit-facility/`,
  EDIT_USER_ROUTE: (name: string) => `/dashboard/users/${name}/edit-user`,
  DASHBOARD_ROUTE: "/dashboard",
  CREATE_FACILITY_ROUTE: "/dashboard/facilities/register-facility",
  FACILITY_ROUTE: "/dashboard/facilities?tab=registration",
  CREATE_INTENT_ROUTE: "/dashboard/facilities/register-facility/intent",
  FILL_FORM_ROUTE: "/dashboard/facilities/register-facility/fill-form",
}

export default ROUTES

