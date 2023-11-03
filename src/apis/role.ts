/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_ROLES_ENDPOINT } from "./index"
import { log } from "../utils/helpers"




export const executeGetAllRoles = async (token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    const request = await fetch(GET_ROLES_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("NOTIFICATION [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}

