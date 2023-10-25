/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_DOCUMENT_ENDPOINT, ADD_FACILITY_ENDPOINT, ADD_NON_PROF_STAFF_ENDPOINT, ADD_PROFESSIONAL_INCHARGE_ENDPOINT, ADD_PROF_STAFF_ENDPOINT, GET_ALL_FACILITIES_ENDPOINT, LETTER_OF_INTENT_ENDPOINT, UPDATE_FACILITY_SERVICE_ENDPOINT } from "."
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

