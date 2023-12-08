/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import {
  GENERATE_BULK_INVOICES,
  GET_ALL_FEES,
  GET_ALL_INVOICES,
  ISSUE_FACILITY_PENALTY,
  UPDATE_FEE_ENDPOINT,
} from "./index";

export const executeGetAllInvoices = async (
  data: InvoiceFilters,
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(
        data ? { filter: data, page, perPage } : { page, perPage }
      ),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(GET_ALL_INVOICES, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGenerateBulkInvoices = async (
  data: InvoicePayload,
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
    const request = await fetch(GENERATE_BULK_INVOICES, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGeneratePenalty = async (
  data: PenaltyPayload,
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
    const request = await fetch(ISSUE_FACILITY_PENALTY, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetAllFees = async (
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    console.log({ page, perPage });
    const request = await fetch(GET_ALL_FEES, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdateFee = async (
  data: FeePayload,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(UPDATE_FEE_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
