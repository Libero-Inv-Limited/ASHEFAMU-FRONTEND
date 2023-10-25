/* eslint-disable @typescript-eslint/no-explicit-any */
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
  created_at: string | null;
  updated_at: string | null;
  protective_items: any;
  name: string | null;
  letter_of_intent: string | null;
  user_id: number;
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
