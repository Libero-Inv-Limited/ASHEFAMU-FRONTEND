const BASE_URL = "https://ashefamu.onrender.com"


// AUTH ENDPOINTS
export const REGISTER_ENDPOINT = BASE_URL + "/auth/sign-up"
export const LOGIN_ENDPOINT = BASE_URL + "/auth/sign-in"
export const PROFILE_ENDPOINT = BASE_URL + "/profile"
export const UPDATE_PASSWORD_ENDPOINT = BASE_URL + "/update-profile"
export const LOGOUT_ENDPOINT = BASE_URL + "/auth/logout"
export const VERIFY_CONTACTS_ENDPOINT = BASE_URL + "/verify-contacts"
export const FORGOT_PASSWORD_ENDPOINT = BASE_URL + "/forgot-password"
export const CHANGE_PASSWORD_ENDPOINT = BASE_URL + "/reset-password"
export const RESEND_OTP_ENDPOINT = BASE_URL + "/resend-verification-otp"

// FACILITY ENDPOINTS
export const LETTER_OF_INTENT_ENDPOINT = BASE_URL + "/letter-of-intent"
export const ADD_FACILITY_ENDPOINT = BASE_URL + "/document-facility"
export const UPDATE_FACILITY_STATUS_ENDPOINT = BASE_URL + "/update-facility-status"
export const GET_ALL_FACILITIES_ENDPOINT = BASE_URL + "/all-facilities"
export const UPGRADE_FACILITY_ENDPOINT = BASE_URL + "/send-upgrade-request"
export const GET_ALL_FACILITY_CATEGORIES = BASE_URL + "/all-facility-categories"

export const DELETE_FACILITY_DOCUMENT_ENDPOINT = BASE_URL + "/remove-document"
export const DELETE_FACILITY_ENDPOINT = BASE_URL + "/remove-facility"
export const DELETE_PROPRIETOR_ENDPOINT = BASE_URL + "/remove-proprietor"
export const UPDATE_FACILITY_SERVICE_ENDPOINT = BASE_URL + "/update-facility-service"
export const ADD_PROFESSIONAL_INCHARGE_ENDPOINT = BASE_URL + "/add-professional-incharge"
export const ADD_PROF_STAFF_ENDPOINT = BASE_URL + "/add-prof-staff-complement"
export const ADD_NON_PROF_STAFF_ENDPOINT = BASE_URL + "/facility-non-prof-staff-compl"
export const FILTER_FACILITY_ENDPOINT = BASE_URL + "/filter-facility"
export const ADD_DOCUMENT_ENDPOINT = BASE_URL + "/add-document"

export const ADD_PROF_MEMBER_ENDPOINT = BASE_URL + "/professional-staff"
export const ADD_NON_PROF_MEMBER_ENDPOINT = BASE_URL + "/non-professional-staff"

export const DELETE_PROFFESSIONAL_STAFF_ENDPOINT = (id: number) => BASE_URL + "/professional-staff/" + id
export const DELETE_NON_PROFFESSIONAL_STAFF_ENDPOINT = (id: number) => BASE_URL + "/non-professional-staff/" + id

export const GET_PROFFESSIONAL_STAFF_ENDPOINT = (facilityID: number, page: number = 1, perPage: number = 15) => BASE_URL + `/professional-staff/${facilityID}/${page}/${perPage}`
export const GET_NON_PROFFESSIONAL_STAFF_ENDPOINT = (facilityID: number, page: number = 1, perPage: number = 15) => BASE_URL + `/non-professional-staff/${facilityID}/${page}/${perPage}`
export const GET_ONE_FACILITY_ENDPOINT = (id: number) => BASE_URL + "/facility-detail/" + id
export const GET_FACILITY_DOCS_ENDPOINT = (name: string) => BASE_URL + "/facility-document/" + name


// DASHBOARD CARD ENDPOINTS
export const CREATE_CARD_ENDPOINT = BASE_URL + "/create-card"
export const DELETE_CARD_ENDPOINT = BASE_URL + "/delete-card"
export const UPDATE_CARD_ENDPOINT = BASE_URL + "/update-card"
export const TOGGLE_CARD_VISIBILITY_ENDPOINT = BASE_URL + "/toggle-card-visibility"


// FACILITY DATA ENDPOINTS
export const REQUIRED_DOCS_ENDPOINT = BASE_URL + "/all-required-doc"
export const FACILITY_SECTOR_ENDPOINT = BASE_URL + "/facility-sectors"
export const FACILITY_CATEGORY_ENDPOINT = BASE_URL + "/all-facility-categories"
export const SERVICE_SCOPE_ENDPOINT = BASE_URL + "/service-scopes"
export const GET_PROTECTIVE_ITEM = BASE_URL + "/protective-items"
export const WASTE_DISPOSAL_ENDPOINTS = BASE_URL + "/waste-disposal-methods"
export const NON_COMP_LIST_ENDPOINT = BASE_URL + "/non-prof-staff-complements"

// STATISTICS ENDPOINT
export const GET_FACILITY_REGISTRATION = BASE_URL + "/facility-registration"
export const GET_STATS_METRICS = BASE_URL + "/static-metric"

// OTHERS
export const GET_NOTIFICATIONS_ENDPOINT = BASE_URL + "/get-notifications"
export const GET_USERS_ENDPOINT = (page: number, perPage: number) =>  BASE_URL + `/all-users/${page}/${perPage}`
export const GET_USER_FACILITIES_ENDPOINT = (id: number, page:number, perPage:number) => BASE_URL + `/user-facilities/${id}/${page}/${perPage}`
export const CREATE_USER_ENDPOINT = BASE_URL + "/create-user"
export const CREATE_ROLE_ENDPOINT = BASE_URL + "/create-role"
export const UPDATE_ROLE_ENDPOINT = BASE_URL + "/update-role"
export const DELETE_ROLE_ENDPOINT = BASE_URL + "/delete-role"
export const GET_USER_PROFILE_ENDPOINT = (id:number) =>BASE_URL + `/user-profile/${id}` 
export const DELETE_USER_ACCOUNT = (id: number) => BASE_URL + `/user/${id}`
export const GET_ROLES_ENDPOINT =(page:number, perPage: number) =>  BASE_URL + `/all-roles/${page}/${perPage}`
export const GET_ONE_ROLE_ENDPOINT = (id: number) => BASE_URL + "/role-detail/" + id
export const TOGGLE_ROLE_ENDPOINT = (id: number, status: boolean) => BASE_URL + `/toggle-status/${id}/${status}`
export const GET_PERMISSIONS_ENDPOINT = BASE_URL + "/all-permissions"
export const CREATE_PERMISSION_ENDPOINT = BASE_URL + "/create-permission"
export const DELETE_PERMISSION_ENDPOINT = BASE_URL + "/delete-permissions"
export const SCHEDULE_INSPECTION_ENDPOINT = BASE_URL + "/document-inspection"
export const DOCUMENT_INSPECTION_ENDPOINT = BASE_URL + "/schedule-inspection"
export const GET_ALL_USER_ACTIVITIES = (page: number =1, perPage: number=15) => BASE_URL + `/history/${page}/${perPage}`
export const GET_ALL_LOGS = (page: number =1, perPage: number=15) => BASE_URL + `/logs/${page}/${perPage}`
export const GET_ALL_SCHEDULED_INSPECTIONS = (page: number =1, perPage: number=15, status: string) => BASE_URL + `/inspection-schedules?page=${page}&perPage=${perPage}&status=${status}`
export const GET_ONE_PERMISSION_ENDPOINT = (id: number) => BASE_URL + "/permission-detail/" + id
export const UPDATE_USER_PASSWORD_ENDPOINT = BASE_URL + "/update-user-password"
export const UPDATE_DASHBOARD_CARD_ENDPOINT = BASE_URL + "/update-card-setting"
export const READ_NOTIFICATIONS_ENDPOINT = (id: number) => BASE_URL + "/read-notification/" + id
export const GET_ALL_INVOICES = BASE_URL + `/invoices`
export const GENERATE_BULK_INVOICES = BASE_URL + `/create-bulk-invoices`
export const GET_ALL_FEES = BASE_URL + "/fees"
export const GET_INVOICE_STAFF_ENDPOINT = (facilityID: number, page: number = 1, perPage: number = 15) => BASE_URL + `/invoices/${facilityID}/${page}/${perPage}`
export const PAY_INVOICE_ENDPOINT = BASE_URL + "/pay-invoice"
export const DOWNLOAD_INVOICE_ENDPOINT = (invoiceId: number) =>  BASE_URL + "/download-invoice/" + invoiceId
export const GET_CONDUCTED_ENDPOINT = (facilityID: number, page: number = 1, perPage: number = 15) => BASE_URL + `/inspection-records/${facilityID}/${page}/${perPage}`
export const GET_SCHEDULE_ENDPOINT = (facilityID: number, page: number = 1, perPage: number = 15) => BASE_URL + `/inspection-schedules/${facilityID}/${page}/${perPage}`
export const DASHBOARD_CARD_ENDPOINT = BASE_URL + `/dashboard-cards`
export const DASHBOARD_FACILITY_CARD_ENDPOINT = (id: number) => BASE_URL + `/dashboard-cards/` + id