/* eslint-disable @typescript-eslint/no-explicit-any */
type RegUserType = {
  email: string;
  phone: string;
};

type FacilitiesRegStats = {
  labels: string[];
  values: string[];
};

type metricsStats = {
  registeredFacilities: string;
  activeUsers: string;
  facilityStatus: {
    pending: string;
    approved: string;
    rejected: string;
  };
  roleDistribution: {
    roles: { id: number; name: string }[];
    roleCount: string[];
  };
};

type LogData = {
  id: number;
  user_id: number | null;
  timestamp: null | string;
  description: string;
  log_type: string;
  refUser: {
    firstname: string;
    lastname: string;
    id: number;
  };
};

type FacilityData = {
  id: number;
  cac_number: string | null;
  multiple_branch: number;
  facility_phone: string | null;
  address: string | null;
  closest_landmark: string | null;
  local_gov_area: string | null;
  local_council_dev_area: string | null;
  building_type: string | null;
  gps_cordinates: string | null;
  any_other_use_of_premises: string | null;
  enable_documentation: boolean;
  created_at: string | null;
  updated_at: string | null;
  protective_items: any;
  name: string | null;
  letter_of_intent: string | null;
  user_id: number;
  qr_code: string;
  status: {
    id: number;
    facility_id: number;
    status: string | null;
    approval_date: string | null;
    rejection_date: string | null;
    rejection_reason: string | null;
    created_at: string | null;
    updated_at: string | null;
    approved_by: number;
  };
  categorySelection: {
    id: number;
    facility_id: number;
    facility_category_id: number;
    created_at: string | null;
    updated_at: string | null;
    category: {
      id: number;
      name: string;
    };
  };
};

type OneFacilityDataType = {
  id: number;
  name: string;
  cac_number: string;
  facility_sector?: string;
  multiple_branch: true;
  facility_phone: string;
  address: string;
  closest_landmark: string;
  local_gov_area: string;
  local_council_dev_area: string;
  building_type: string;
  gps_cordinates: string;
  waste_disposal_methods: {
    human_waste: string[];
    medical_waste: string[];
    refuse_disposal: string[];
  };
  user_id: number;
  protective_items: string[];
  any_other_use_of_premises: string;
  updated_at: string;
  created_at: string;
  qr_code: string;
  letter_of_intent: string;
  enable_documentation: boolean;
  documents: {
    id: number;
    facility_id: number;
    name: string;
    type: string;
    status: string;
  }[];
  operationDetails: {
    id: number;
    facility_id: number;
    opening_time: string;
    closing_time: string;
    date_of_establishment: string;
    provides_ambulance_services: boolean;
    provides_emergency_services: boolean;
    updated_at: string;
    created_at: string;
  };
  staffs: {
    id: number;
    facility_id: number;
    complement: string;
    employment_type: string;
    fullname: string;
    address: string;
    basic_qualification: string;
    institution_attended: string;
    year_of_qualification: string;
    registration_number: string;
    post_graduate_qualification: string;
    post_institution_attended: string;
    post_year_of_qualification: string;
    post_registration_number: string;
    updated_at: string;
    created_at: string;
  }[];
  proprietor: {
    id: number;
    facility_id: number;
    name: string;
    address: string;
    occupation: string;
    nationality: string;
    updated_at: string;
    created_at: string;
  }[];
  ServicesOffered: {
    id: number;
    facility_id: number;
    number_of_couches: number;
    number_of_observation_beds: number;
    number_of_admission_beds: number;
    updated_at: string;
    created_at: string;
  };
  powerSources: {
    id: number;
    power_source: string;
    facility_id: number;
  }[];
  waterSources: {
    id: number;
    water_source: string;
    facility_id: number;
  }[];
  medicalProffessional: {
    id: number;
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
    updated_at: string;
    created_at: string;
  };
  status: {
    facility_id: number;
    status: string;
    approval_date: null;
    rejection_date: null;
    rejection_reason: null;
    created_by: null;
  };
  scopeOfService: { service_scope: string; id?: number }[];
  nonProfessionalStaffComplement: NonProfessionalStaffData[];
  categorySelection: {
    id: number;
    facility_id: number;
    facility_category_id: number;
    category: {
      id: number;
      name: string;
    };
  };
};

type TokenData = {
  token: string;
  type: string;
  expires_at: string;
};

type Proprietor = {
  facility_id?: number;
  name: string;
  address: string;
  occupation: string;
  nationality: string;
};

type RoleData = {
  id: number;
  description: string;
  name: string;
  status: boolean;
  permissions: any[];
};

type RolePayload = {
  description: string;
  name: string;
  permissions: string[];
};

type UserData = {
  user: {
    id: number;
    email: string;
    mobile_number: string;
    firstname: string;
    lastname: string;
    username: string;
    role: number;
    last_login: string;
    login_count: number;
    verifiedContacts: {
      id: number;
      email_verification_status: string;
      mobile_verification_status: string;
      user_id: number;
    };
    userRole: {
      id: number;
      role: number;
      user_id: number;
      roleDetails: {
        name: string;
        id: number;
      };
    };
  };
  permissions: sauthtring[];
};

type SecondarySidebarItem = {
  name: string;
  link: string;
  icon: JSX.Element;
  hasStroke?: boolean;
  isElementIcon: boolean;
};

type Permission = {
  id: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;
  category: string;
  assigned?: boolean;
  isRolePermission?: boolean;
};

type UserPermissions = {
  userId: number;
  permissions: string[];
  assigned?: boolean;
};

type UserPayload = {
  user_id?: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  status: string;
  role: number;
};

type UserUpdatePayload = {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  username: string;
  status: string;
  role_id: number;
};

type RequireDocumentType = {
  id: number;
  name: string;
  compulsory: boolean;
  status: string;
  updated_at: string;
  created_at: string;
};

type SectorCategoryType = {
  id: number;
  name: string;
  description: string;
};

type FacilityCategoryType = {
  id: number;
  name: string;
  description: string;
  status: string;
  updated_at: string;
  created_at: string;
};

type WasteDisposalType = {
  id: number;
  name: string;
  category: string;
};

type ProctectiveItemType = {
  id: number;
  name: string;
};

type NonComplimentListType = {
  id: number;
  name: string;
  status: "active" | "inactive";
};

type StaffComplimentType = {
  complement: string;
  employment_type: string;
  fullname: string;
  address: string;
  basic_qualification: string;
  institution_attended: string;
  year_of_qualification: string;
  registration_number: string;
  post_graduate_qualification: string;
  post_institution_attended: string;
  post_year_of_qualification: string;
  post_registration_number: string;
};

type ProffessionalStaffData = {
  id: number;
  facility_id: number;
  complement: any;
  employment_type: string;
  fullname: string;
  address: string;
  basic_qualification: string;
  institution_attended: string;
  year_of_qualification: string;
  registration_number: string;
  post_graduate_qualification: string;
  post_institution_attended: string;
  post_year_of_qualification: string;
  post_registration_number: string;
  updated_at: string;
  created_at: string;
};

type PermissionData = {
  name: string;
  description: string;
  category: string;
};

type InspectionPayload = {
  facility_id: number;
  inspection_date: string;
  inspector_name: string;
};

type InvoiceFilters = {
  status: string;
  fee_category?: number;
  facility_id?: number;
};

type BoundingBox = {
  startLatitude: number;
  stopLatitude: number;
  startLongitude: number;
  stopLongitude: number;
};

type GISPayload = {
  startLatitude: number;
  stopLatitude: number;
  startLongitude: number;
  stopLongitude: number;
  category?: number;
  sector?: number;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type AssignFacility = {
  userId: number;
  facilityId: number;
};

type RemoveFacility = {
  userId: number;
  ids: number[];
};

type GISFilters = {
  options: { type: string; label: string; value: number };
};

type PenaltyFilters = {
  status?: string;
  fee_category?: number;
  facility_id: number;
};

type InspectionReportPayload = {
  inspection_id: number;
  inspection_date: string;
  inspector_name: string;
  findings: string;
  results: string;
};

type InspectionData = {
  id: number;
  facility_name: string;
  inspector_names: string;
  status: string;
  schedule_date: string;
  facility_id?: number;
  findings?: any[];
  results?: any[];
};

type ConductedData = {
  id: number;
  findings: string;
  results: string;
  status: string;
  schedule_date: string;
};

type NonProfessionalStaffData = {
  id: number;
  complement: string;
  staff_type: string;
  name: string;
};

type NotificationDataType = {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  updated_at: string;
  created_at: string;
  facility_id: number;
  priority: "low" | "high" | "other";
  read_status: boolean;
  sender_id: number;
};

type FeeDataType = {
  id: number;
  category: string;
  amount: string;
  description: string;
  status: string;
  created_at: string;
  updates_at: string;
  duration: string;
};

type FeePayload = {
  id: number;
  category?: string;
  amount?: string;
  description?: string;
  status?: string;
  duration?: string;
};

type InvoicePayload = {
  fee_type: number;
  specific_facilities: boolean;
  all_facilities: boolean;
  facility_id: number;
  facilities?: number[];
  facility_sector?: number;
  facility_category?: number;
  description?: string;
};

type PenaltyPayload = {
  facility_id: number;
  amount: number;
  details: string;
};

type PenaltyDataType = {
  id: number;
  facility_id: number;
  created_at: string;
  paid: boolean;
  amount: string;
  details: string;
  payment_details: string;
  facility: {
    name: string;
    id: number;
  };
};

type InvoiceDataType = {
  id: number;
  facility_id: number;
  invoice_date: string;
  due_date: string;
  status: string;
  amount: string;
  description: string;
  updated_at: string;
  created_at: string;
  fee: number;
  next_payment: string;
  duration: string;
  facility: {
    id: number;
    name: string;
  };
  invoiceHistory: {
    id: number;
    facility_id: number;
    invoice_id: number;
    payment_date: string;
    amount_paid: string;
    payment_method: string;
    payment_status: string;
    updated_at: string;
    created_at: string;
  }[];
  payments: {
    id: number;
    invoice_id: number;
    payment_date: string;
    amount: string;
    payment_method: string;
    transaction_id: string;
    updated_at: string;
    created_at: string;
  }[];
};

type PaymentDataType = {
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: null | string;
  };
  method: string;
};

type DashboardCardType = {
  id: number;
  name: string;
  content: string;
  associated_user: number;
  display_preference: string;
  position: number;
  visibility: boolean;
  card_template: number;
  template: {
    slug: string;
    id: number;
  };
};
