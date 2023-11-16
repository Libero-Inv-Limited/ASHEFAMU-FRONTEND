/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from "../utils/helpers";
import { GET_FACILITY_REGISTRATION, GET_STATS_METRICS } from "./index";

const generateDateRange = (year: string) => {
  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  const formattedStartDate = startDate.toISOString();
  const formattedEndDate = endDate.toISOString();

  return {
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    duration: "monthly",
  };
};
export const executeGetFacilityRegStats = async (
  token: string
): Promise<ResponseDataType> => {
  const body = generateDateRange("2023");
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({...body}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_FACILITY_REGISTRATION, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

export const executeGetStatsMetric = async (
  token: string
): Promise<ResponseDataType> => {
  try {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(GET_STATS_METRICS, options);
    const response = (await request.json()) satisfies ResponseDataType;
    return response;
  } catch (error: any) {
    log("NOTIFICATION [ERROR]:", error.message);
    return { message: error.message, status: "error" } as ResponseDataType;
  }
};

// {{BASE_URL}}/static-metric
