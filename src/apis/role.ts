/* eslint-disable @typescript-eslint/no-explicit-any */
import { CREATE_ROLE_ENDPOINT, GET_ROLES_ENDPOINT } from "./index";
import { log } from "../utils/helpers";

export const executeGetAllRoles = async (
  token: string,
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_ROLES_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeCreateRole = async (data: RolePayload, token: string): Promise<ResponseDataType> => {
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
    const request = await fetch(CREATE_ROLE_ENDPOINT, options)
    const response = await request.json() satisfies ResponseDataType
    return response
  }
  catch(error: any) {
    log("DOCS [ERROR]:", error.message)
    return { message: error.message, status: "error" } as ResponseDataType
  }
}
