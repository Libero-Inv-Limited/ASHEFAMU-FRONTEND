/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from '../utils/helpers';
import { CHANGE_PASSWORD_ENDPOINT, FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, PROFILE_ENDPOINT, REGISTER_ENDPOINT, RESEND_OTP_ENDPOINT, UPDATE_PASSWORD_ENDPOINT, VERIFY_CONTACTS_ENDPOINT } from './index';



export const executeRegistration = async (data: RegisterData): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }
    const request = await fetch(REGISTER_ENDPOINT, options)
    const response = await request.json() as ResponseDataType
    return response
  }
  catch(error: any) {
    log("REGISTER [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeLogin = async (data: LoginData): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(LOGIN_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("LOGIN [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeChangePassword = async (data: ChangePasswordData): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(CHANGE_PASSWORD_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("CHANGE_PASSWORD [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeVerifyContact = async (data: VerifyContactData): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(VERIFY_CONTACTS_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("VERIFY_CONTACTS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeResendOTP = async (email: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(RESEND_OTP_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("RESEND_OTP [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeGetProfile = async (token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(PROFILE_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("RESEND_OTP [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeForgotPassword = async (email: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(FORGOT_PASSWORD_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("FORGOT_PASSWORD [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}


export const executeUpdateProfile = async (data: UpdateProfile, token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(UPDATE_PASSWORD_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("FORGOT_PASSWORD [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}