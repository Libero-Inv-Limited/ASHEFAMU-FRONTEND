/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_DOCUMENT_ENDPOINT, ADD_FACILITY_ENDPOINT, ADD_NON_PROF_STAFF_ENDPOINT, ADD_PROFESSIONAL_INCHARGE_ENDPOINT, ADD_PROF_STAFF_ENDPOINT, DELETE_FACILITY_ENDPOINT, GET_ALL_FACILITIES_ENDPOINT, GET_PROFFESSIONAL_STAFF_ENDPOINT, LETTER_OF_INTENT_ENDPOINT, UPDATE_FACILITY_SERVICE_ENDPOINT, DELETE_PROFFESSIONAL_STAFF_ENDPOINT, ADD_PROF_MEMBER_ENDPOINT, DELETE_NON_PROFFESSIONAL_STAFF_ENDPOINT, GET_NON_PROFFESSIONAL_STAFF_ENDPOINT, ADD_NON_PROF_MEMBER_ENDPOINT, GET_NOTIFICATIONS_ENDPOINT, GET_INVOICE_STAFF_ENDPOINT, GET_ONE_FACILITY_ENDPOINT, UPGRADE_FACILITY_ENDPOINT, DASHBOARD_FACILITY_CARD_ENDPOINT} from "."
import { log } from "../utils/helpers"

export const executeCreateIntent = async (data: FormData , token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: data,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(LETTER_OF_INTENT_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("INTENT [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}

export const executeDocumentFacility = async (data: any, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_FACILITY_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("CREATE FACILTY [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetOneFacility = async (id: number, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(GET_ONE_FACILITY_ENDPOINT(id), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("GET FACILITY [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetFacilities = async (token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(GET_ALL_FACILITIES_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("GET FACILITY [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeSaveFacilityService = async (data: ServiceData, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(UPDATE_FACILITY_SERVICE_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("FACILITY SERVICE [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeAddProIncharge = async (data: MedicalProfessional, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_PROFESSIONAL_INCHARGE_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("PROF INCHARGE [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}



export const executeUploadFacilityDocs = async (data: FormData, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: data,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(ADD_DOCUMENT_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}



export const executeAddProfessional = async (data: ProfessionStaff, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_PROF_STAFF_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeAddProfessionalMember = async (data: ProffessionalStaffData & { facility_id: number }, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_PROF_MEMBER_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeAddNonProfessionalMember = async (data: NonProfessionalStaffData & { facility_id: number }, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_NON_PROF_MEMBER_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}



export const executeAddNonProfessional = async (data: NonProfessionStaff, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(ADD_NON_PROF_STAFF_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}



export const executeDeleteFacility = async (ids: number[], token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ ids }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(DELETE_FACILITY_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetFacilityProffessionalMembers = async (facilityId: number, token: string, page: number = 1, perPage: number = 15): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_PROFFESSIONAL_STAFF_ENDPOINT(facilityId, page, perPage), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("PRO MEMBERS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetNonFacilityProffessionalMembers = async (facilityId: number, token: string, page: number = 1, perPage: number = 15): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_NON_PROFFESSIONAL_STAFF_ENDPOINT(facilityId, page, perPage), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("PRO MEMBERS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeDeleteProffessionalStaff = async (id: number, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(DELETE_PROFFESSIONAL_STAFF_ENDPOINT(id), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("PRO MEMBERS (DELETE) [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeDeleteNonProffessionalStaff = async (id: number, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(DELETE_NON_PROFFESSIONAL_STAFF_ENDPOINT(id), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("NON PRO MEMBERS (DELETE) [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetFacilityNotification = async (facility_id: number, token: string, page: number = 1, perPage: number = 9): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ page, perPage, source: "facility", facility_id } as NotificationRequest),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_NOTIFICATIONS_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("NOTIFICATION [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetFacilityInvoices = async (facilityId: number, token: string, page: number = 1, perPage: number = 9): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_INVOICE_STAFF_ENDPOINT(facilityId, page, perPage), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("INVOICE [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}



export const executeFacilityUpgrade = async (data: UpgradeData, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
    const request = await fetch(UPGRADE_FACILITY_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("INVOICE [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetFacilityDashboardCards = async (facilityId: number, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(DASHBOARD_FACILITY_CARD_ENDPOINT(facilityId), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DASHBOARD CARD [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}
