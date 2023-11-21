const ROUTES = {
  REGISTER_ROUTE:"/register",
  LOGIN_ROUTE:"/login",
  EDIT_PROFILE:"/dashboard/profile",
  FORGOT_PASSWORD_ROUTE: "/forgot-password",
  CHANGE_PASSWORD_ROUTE:(email: string) => `/change-password/${email}`,
  VERIFY_CONTACT_ROUTE:(email: string) => `/verify-contact/${email}`,
  VERIFY_EMAIL_ROUTE: (email: string) => `/verify-email/${email}`,
  SUCCESS_ROUTE:(type: string) => `/success/${type}`,
  
  EDIT_FACILITY_ROUTE:(name: string) => `/dashboard/facilities/${name}/edit-facility/`,
  EDIT_USER_ROUTE: (name: string) => `/dashboard/users/${name}/edit-user`,
  EDIT_ROLE_ROUTE: (name: string) => `/dashboard/roles/${name}/edit-role`,
  VIEW_USER_FACILITIES_ROUTE: (name: string) => `/dashboard/users/${name.toLocaleLowerCase()}/facilities`,
  DASHBOARD_ROUTE: "/dashboard",
  CREATE_FACILITY_ROUTE: "/dashboard/facilities/register-facility",
  CREATE_ROLE_ROUTE: "/dashboard/roles/create-role",
  FACILITY_ROUTE: "/dashboard/facilities?tab=registration",
  CREATE_INTENT_ROUTE: "/dashboard/facilities/register-facility/intent",
  FILL_FORM_ROUTE: "/dashboard/facilities/register-facility/fill-form",
}

export default ROUTES

