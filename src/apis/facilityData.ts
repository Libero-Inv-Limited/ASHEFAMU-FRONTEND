/* eslint-disable @typescript-eslint/no-explicit-any */
import { REQUIRED_DOCS_ENDPOINT } from "."
import { log } from "../utils/helpers"


export const executeGetRequiredDocs = async (token: string): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(REQUIRED_DOCS_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("FACILITY DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}
