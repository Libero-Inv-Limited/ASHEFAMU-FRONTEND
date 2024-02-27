/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import { GET_SETTINGS, UPDATE_SETTINGS } from "./index";

export const executeGetSettings = async (
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_SETTINGS, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdateSettings = async (
  data: {setting: SettingUpdatePayload[]},
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(UPDATE_SETTINGS, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

// {{BASE_URL}}/static-metric
