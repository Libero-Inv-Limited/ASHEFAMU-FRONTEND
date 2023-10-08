const BASE_URL = ""


// AUTH ENDPOINTS
export const REGISTER_ENDPOINT = BASE_URL + "/auth/sign-up"
export const LOGIN_ENDPOINT = BASE_URL + "/auth/sign-in"
export const LOGOUT_ENDPOINT = BASE_URL + "/auth/logout"
export const VERIFY_CONTACTS_ENDPOINT = BASE_URL + "/verify-contacts"
export const FORGOT_PASSWORD_ENDPOINT = BASE_URL + "/forgot-password"
export const CHANGE_PASSWORD_ENDPOINT = BASE_URL + "/reset-password"
export const RESEND_OTP_ENDPOINT = BASE_URL + "/resend-verification-otp"


// FACILITY ENDPOINTS
export const ADD_FACILITY_ENDPOINT = BASE_URL + "/document-facility"
export const UPDATE_FACILITY_STATUS_ENDPOINT = BASE_URL + "/update-facility-status"
export const GET_ALL_FACILITIES_ENDPOINT = BASE_URL + "/all-facilities"
export const DELETE_FACILITY_DOCUMENT_ENDPOINT = BASE_URL + "/remove-document"
export const DELETE_PROPRIETOR_ENDPOINT = BASE_URL + "/remove-proprietor"
export const UPDATE_FACILITY_SERVICE_ENDPOINT = BASE_URL + "/update-facility-service"
export const ADD_PROFESSIONAL_INCHARGE_ENDPOINT = BASE_URL + "/add-professional-incharge"
export const ADD_STAFF_CSV_ENDPOINT = BASE_URL + "/add-staff-csv"
export const ADD_PROF_STAFF_ENDPOINT = BASE_URL + "/add-prof-staff-complement"
export const FILTER_FACILITY_ENDPOINT = BASE_URL + "/filter-facility"
export const ADD_DOCUMENT_ENDPOINT = BASE_URL + "/add-document"
export const GET_ONE_FACILITY_ENDPOINT = (id: number) => BASE_URL + "/facility-detail/" + id
export const GET_FACILITY_DOCS_ENDPOINT = (name: string) => BASE_URL + "/facility-document/" + name
export const GET_FACILITY_CSV_ENDPOINT = (name: string) => BASE_URL + "/facility-csv/" + name


// DASHBOARD CARD ENDPOINTS
export const CREATE_CARD_ENDPOINT = BASE_URL + "/create-card"
export const DELETE_CARD_ENDPOINT = BASE_URL + "/delete-card"
export const UPDATE_CARD_ENDPOINT = BASE_URL + "/update-card"
export const TOGGLE_CARD_VISIBILITY_ENDPOINT = BASE_URL + "/toggle-card-visibility"

// FACILITY-CATEGORY ENDPOINTS
export const CREATE_CATEGORY_ENDPOINT = BASE_URL + "/create-facility-category"
