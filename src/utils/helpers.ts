/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOW_LOGS = true

export const log = (...args: any[]) => SHOW_LOGS && console.log(...args)

export const hideString = (data: string, isEmail?: boolean): string => {
  const string = data.split("")
  string.splice(isEmail ? 3 : 4, 6, "".padStart(6, "*"))
  return string.join("")
}