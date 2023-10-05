/* eslint-disable @typescript-eslint/no-explicit-any */
type RegisterData = {
  firstname: string,
  lastname: string,
  email: string,
  mobile: string,
  password: string,
  username?: string,
}

type LoginData = {
  username: string,
  password: string
}

type VerifyContactData = {
  email: string,
  emailotp: string,
  mobileotp: string
}

type ChangePasswordData = {
  email: string;
  token: string,
  password: string
}

type ResponseDataType = {
  status: "success" | "error",
  message: string,
  data?: any;
  code?: number;
}