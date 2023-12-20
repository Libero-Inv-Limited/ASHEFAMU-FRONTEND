/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DASHBOARD_CARD_ENDPOINT,
  GET_CONDUCTED_ENDPOINT,
  GET_NOTIFICATIONS_ENDPOINT,
  GET_SCHEDULE_ENDPOINT,
  PAY_INVOICE_ENDPOINT,
  READ_NOTIFICATIONS_ENDPOINT,
  REMOVE_FACILITY,
  UPDATE_DASHBOARD_CARD_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  UPDATE_USER_PASSWORD_ENDPOINT,
} from ".";
import { log } from "../utils/helpers";
import { GET_USERS_ENDPOINT, GET_USER_PROFILE_ENDPOINT } from "./index";
import { CREATE_USER_ENDPOINT } from "./index";
import { GET_USER_FACILITIES_ENDPOINT } from "./index";
import { DOWNLOAD_INVOICE_ENDPOINT } from './index';
import { DELETE_USER_ACCOUNT } from './index';
import { ASSIGN_FACILITY } from './index';

export const executeGetUserNotification = async (
  token: string,
  page: number = 1,
  perPage: number = 9
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        page,
        perPage,
        source: "user",
      } as NotificationRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_NOTIFICATIONS_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetAllUsers = async (
  token: string,
  page: number = 1,
  perPage: number = 9
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_USERS_ENDPOINT(page, perPage), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetUserFacilities = async (
  token: string,
  id: number,
  page: number,
  perPage: number
): Promise<ResponseDataType> => {

  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_USER_FACILITIES_ENDPOINT(id, page, perPage), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeCreateUser = async (
  data: UserPayload,
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
    const request = await fetch(CREATE_USER_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdateProfile = async (
  data: UserUpdatePayload,
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
    const request = await fetch(UPDATE_USER_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetUserProfile = async (
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
    const request = await fetch(GET_USER_PROFILE_ENDPOINT(id), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeDeleteUserAccount = async (
  id: number,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const request = await fetch(DELETE_USER_ACCOUNT(id), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DOCS [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdatePassword = async (
  data: UpdatePassword,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(UPDATE_USER_PASSWORD_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("UPDATE PASSWORD [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeAssignFacility = async (
  data: AssignFacility,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(ASSIGN_FACILITY, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("UPDATE PASSWORD [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeRemoveFacility = async (
  data: RemoveFacility,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(REMOVE_FACILITY, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("UPDATE PASSWORD [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeReadUserNotification = async (
  notifyId: number,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(READ_NOTIFICATIONS_ENDPOINT(notifyId), options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION READ [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executePayInvoice = async (
  data: PayInvoice,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(PAY_INVOICE_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("PAYMENT [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeDownloadInvoice = async (
  id: number,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = await fetch(DOWNLOAD_INVOICE_ENDPOINT(id), options);

    if (!request.ok) {
      // Check for HTTP error status
      throw new Error(`HTTP error! Status: ${request.status}`);
    }

    const filename = request.headers.get("Content-Disposition")?.split("filename=")[1];

    // Handle different content types
    const contentType = request.headers.get("Content-Type");

    if (contentType && contentType.toLowerCase().includes("application/json")) {
      // If the content type is JSON, parse it as JSON
      const response = await request.json();
      return response;
    } else {
      // If the content type is not JSON, handle it as a file download
      const blob = await request.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Open the file in a new tab/window
      const newWindow = window.open(blobUrl, "_blank");
      if (filename) {
        newWindow?.document.write(`<title>${filename}</title>`);
      }
    }
  } catch (error: any) {
    log("PAYMENT [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

// export const executeDownloadInvoice = async (
//   id: number,
//   token: string
// ): Promise<ResponseDataType> => {
//   try {
//     const options: RequestInit = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const request = await fetch(DOWNLOAD_INVOICE_ENDPOINT(id), options);
//     const response = (await request.json()) satisfies ResponseDataType;
//     return response;
//   } catch (error: any) {
//     log("PAYMENT [ERROR]:", error.message);
//     return { message: error.message, status: "error" } as ResponseDataType;
//   }
// };

export const executeGetSchedules = async (
  facilityId: number,
  token: string,
  page: number = 1,
  perPage: number = 9
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(
      GET_SCHEDULE_ENDPOINT(facilityId, page, perPage),
      options
    );
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("SCHEDULED [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetConduted = async (
  facilityId: number,
  token: string,
  page: number = 1,
  perPage: number = 9
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(
      GET_CONDUCTED_ENDPOINT(facilityId, page, perPage),
      options
    );
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("CONDUCTED [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetDashboardCards = async (
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(DASHBOARD_CARD_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DASHBOARD CARD [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeUpdateDashboardCards = async (
  data: UpdateDashboardCard,
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(UPDATE_DASHBOARD_CARD_ENDPOINT, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("DASHBOARD CARD [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};
