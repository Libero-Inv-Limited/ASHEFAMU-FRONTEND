/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_NOTIFICATIONS_ENDPOINT, PAY_INVOICE_ENDPOINT, READ_NOTIFICATIONS_ENDPOINT } from "."
import { log } from "../utils/helpers"
import { GET_USERS_ENDPOINT } from "./index"
import { CREATE_USER_ENDPOINT } from './index';


export const executeGetUserNotification = async (token: string, page: number = 1, perPage: number = 9): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ page, perPage, source: "user" } as NotificationRequest),
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

export const executeGetAllUsers = async (token: string, page: number = 1, perPage: number = 9): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      // body: JSON.stringify({ page, perPage, source: "user" } as NotificationRequest),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_USERS_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("NOTIFICATION [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}

export const executeCreateUser = async (data: UserData, token: string): Promise<ResponseDataType> => {
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
    const request = await fetch(CREATE_USER_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}

// export const executeGetFacilities = async (token: string): Promise<ResponseDataType> => {
//   try {
//     const options: RequestInit = {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     }
//     const request = await fetch(GET_ALL_FACILITIES_ENDPOINT, options)
//     const response = await request.json() satisfies ResponseDataType
//     return response
//   }
//   catch(error: any) {
//     log("GET FACILITY [ERROR]:", error.message)
//     return { message: error.message, status: "error" } as ResponseDataType
//   }
// }


export const executeReadUserNotification = async (notifyId: number, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(READ_NOTIFICATIONS_ENDPOINT(notifyId), options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("NOTIFICATION READ [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executePayInvoice = async (data: PayInvoice, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(PAY_INVOICE_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("PAYMENT [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


