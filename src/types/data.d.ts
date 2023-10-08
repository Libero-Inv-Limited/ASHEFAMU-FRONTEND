type FacilityData = {
  id: number,
  cac_number: string,
  multiple_branch: number,
  facility_phone: string,
  address: string,
  closest_landmark: string,
  local_gov_area: string,
  local_council_dev_area: string,
  building_type: string,
  gps_cordinates: string,
  any_other_use_of_premises: string,
  created_at: string,
  updated_at: string,
  name: string,
  user_id: number,
  status: {
    id: number,
    facility_id: number,
    status: string,
    approval_date: string,
    rejection_date: string | null,
    rejection_reason: string | null,
    created_at: string,
    updated_at: string,
    approved_by: number
  },
  categorySelection: {
    id: number,
    facility_id: number,
    facility_category_id: number,
    created_at: string,
    updated_at: string
  }
}