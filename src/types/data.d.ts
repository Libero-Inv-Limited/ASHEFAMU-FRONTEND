/* eslint-disable @typescript-eslint/no-explicit-any */
type FacilityData = {
  id: number;
  cac_number: string;
  multiple_branch: number;
  facility_phone: string;
  address: string;
  closest_landmark: string;
  local_gov_area: string;
  local_council_dev_area: string;
  building_type: string;
  gps_cordinates: string;
  any_other_use_of_premises: string;
  created_at: string;
  updated_at: string;
  name: string;
  user_id: number;
  status: {
    id: number;
    facility_id: number;
    status: string;
    approval_date: string;
    rejection_date: string | null;
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
    approved_by: number;
  };
  categorySelection: {
    id: number;
    facility_id: number;
    facility_category_id: number;
    created_at: string;
    updated_at: string;
  };
};

type TokenData = {
  token: string;
  type: string;
  expires_at: string;
};

type InvoiceData = {
  facility_id: number;
  amount: string;
  description: string;
  due_date: number;
  invoice_date: number;
  status: "unpaid" | "paid";
  created_at: string;
  updated_at: string;
  id: number;
};

type Proprietor = {
  facility_id?: number;
  name: string;
  address: string;
  occupation: string;
  nationality: string;
};

type UserData = {
  permissions: any[];
  user: {
    email: string;
    firstname: string;
    id: number;
    last_login: string;
    lastname: string;
    mobile_number: string;
    role: number;
  };
  userRole: {
    id: number;
    role: number;
    roleDetails: {
      name: string;
      id: number;
    }[];
    user_id: number;
  };
  verifiedContacts: {
    email_verification_status: string;
    id: number;
    mobile_verification_status: string;
    user_id: number;
  };
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
