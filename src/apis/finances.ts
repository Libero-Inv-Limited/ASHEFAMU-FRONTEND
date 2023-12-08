/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import { GENERATE_BULK_INVOICES, GET_ALL_FEES, GET_ALL_INVOICES } from "./index";

export const executeGetAllInvoices = async (
  data: InvoiceFilters,
  token: string,
  page?: number,
  perPage?: number
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data ? { filter: data, page, perPage }: { page, perPage }),
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
  token: string,
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

export const executeGetAllFees = async (
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
    const request = await fetch(GET_ALL_FEES, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
