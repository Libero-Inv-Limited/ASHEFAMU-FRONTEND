/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_ROLE_ENDPOINT,
  DELETE_ROLE_ENDPOINT,
  GET_ONE_ROLE_ENDPOINT,
  GET_ROLES_ENDPOINT,
  TOGGLE_ROLE_ENDPOINT,
  UPDATE_ROLE_ENDPOINT,
} from "./index";
import { log } from "../utils/helpers";

export const executeGetAllRoles = async (
  token: string
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

export const executeGetRoleDetails = async (
  id: number,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(GET_ONE_ROLE_ENDPOINT(id), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeToggleRoleStatus = async (
  id: number,
  status: boolean,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(TOGGLE_ROLE_ENDPOINT(id, status), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeCreateRole = async (
  data: RolePayload,
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
    const request = await fetch(CREATE_ROLE_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdateRole = async (
  data: RolePayload,
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
    const request = await fetch(UPDATE_ROLE_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeDeleteRole = async (
  ids: number[],
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ ids }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(DELETE_ROLE_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
