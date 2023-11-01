/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_NOTIFICATIONS_ENDPOINT, PAY_INVOICE_ENDPOINT, READ_NOTIFICATIONS_ENDPOINT } from "."
import { log } from "../utils/helpers"


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


