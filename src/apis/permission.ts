/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import { GET_PERMISSIONS_ENDPOINT } from "./index";

export const executeGetAllPermissions = async (
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_PERMISSIONS_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
