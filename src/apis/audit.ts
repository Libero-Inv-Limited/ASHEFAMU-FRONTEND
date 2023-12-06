/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import {
  GET_ALL_LOGS,
  GET_ALL_SCHEDULED_INSPECTIONS,
  SCHEDULE_INSPECTION_ENDPOINT,
  GET_ALL_USER_ACTIVITIES,
} from "./index";

export const executeGetAllScheduledInspections = async (
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({ page, perPage });
    const request = await fetch(
      GET_ALL_SCHEDULED_INSPECTIONS(page, perPage),
      options
    );
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetAllLogs = async (
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({ page, perPage });
    const request = await fetch(GET_ALL_LOGS(page, perPage), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetAllUserActivities = async (
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({ page, perPage });
    const request = await fetch(
      GET_ALL_USER_ACTIVITIES(page, perPage),
      options
    );
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeScheduleInspection = async (
  data: InspectionPayload,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(SCHEDULE_INSPECTION_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
