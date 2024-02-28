/* eslint-disable @typescript-eslint/no-explicit-any */
type RegisterData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  username?: string;
};

type LoginData = {
  username: string;
  password: string;
};

type VerifyContactData = {
  email: string;
  emailotp: string;
  mobileotp: string;
};

type VerifyEmailData = {
  email: string;
  emailotp: string;
};

type ChangePasswordData = {
  email: string;
  token: string;
  password: string;
};

type AddFacilityData = {
  name: string;
  cac_number: string;
  multiple_branch: boolean;
  facility_phone: string;
  address: string;
  closest_landmark: string;
  local_gov_area: string;
  local_council_dev_area: string;
  building_type: string;
  gps_cordinates: string;
  category: number;
  any_other_use_of_premises: string;
  proprietor: {
    name: string;
    address: string;
    occupation: string;
    nationality: string;
  }[];
  operationDetails: {
    opening_time: string;
    closing_time: string;
    date_of_establishment: string;
    provides_ambulance_services: false;
    provides_emergency_services: false;
  };
  scopeOfService: { service_scope: string }[];
};

type UpdateFacilityStatus = {
  facility_id: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
};

type ServiceData = {
  facility_id: number;
  number_of_couches: number;
  number_of_observation_beds: number;
  number_of_admission_beds: number;
  waterSources: { id: number; water_source: string }[];
  powerSources: { id: number; power_source: string }[];
  wasteDisposalMethods: string;
  protectiveItems: string;
};

type IntentResultType = {
  name: string;
  letter_of_intent: string;
  user_id: number;
  cac_number: string;
  created_at: string;
  updated_at: string;
  id: number;
};

type MedicalProfessional = {
  facility_id: number;
  fullname: string;
  nationality: string;
  address: string;
  qualification: string;
  institution: string;
  registration_number: string;
  year_of_qualification: number;
  year_of_registration: number;
  approving_authority: string;
};

type UpdateProfile = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  id: number;
};

type ResponseDataType = {
  status: "success" | "error";
  message: string;
  data?: any;
  code?: number;
};

type SettingUpdatePayload = {
  slug: string;
  value: string
}

type NotificationRequest = {
  source: "user" | "facility" | "all";
  facility_id?: number;
  page: number;
  perPage: number;
};

type ProfessionStaff = {
  facility_id: number;
  staff_csv: StaffComplimentType[];
};

type NonProfessionStaff = {
  facility_id: number;
  complements: { non_prof_staff_complement_id: number; value: number }[];
};

type PayOptions = "paystack" | "remita" | "interswitch" | "paypal";

type PayInvoice = {
  paymentMethod: PayOptions;
  invoiceId: number;
};

type UpgradeData = {
  facility_id: number;
  request_details: string;
};

type InspectionData = {
  id: number;
  facility_id: number;
  inspection_date: string;
  inspector_name: string;
  findings: string;
  results: string;
  updated_at: string;
  created_at: string;
};

type SettingsData = {
  id: number;
  name: string;
  value: string;
  input_type: string;
  slug: string;
  created_At: string;
  updated_at: string;
};

type ScheduleData = {
  id: number;
  facility_id: number;
  inspector_names: string;
  schedule_date: string;
  status: string;
  updated_at: string;
  created_at: string;
};

type UpdatePassword = {
  password: string;
  user_id: number;
};

type DocumentData = {
  id: number;
  name: string;
  compulsory: boolean;
  status: string;
  updated_at?: string;
  created_at?: string;
};

type UpdateDashboardCard = {
  card_records: DashboardCardType[];
};
