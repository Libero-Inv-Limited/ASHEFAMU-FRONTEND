/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOW_LOGS = true

export const log = (...args: any[]) => SHOW_LOGS && console.log(...args)

// 
export const hideString = (data: string, isEmail?: boolean): string => {
  const string = data.split("")
  string.splice(isEmail ? 3 : 4, 6, "".padStart(6, "*"))
  return string.join("")
}

// 
export const getSlug = (name: string) => {
  const words = name.split(" ")
  if(words.length === 1) return name.toLowerCase()
  return words.map(_name => _name.toLowerCase()).join("-")
}

// DECO
export const decodeSlug = (name: string) => {
  const words = name.split("-")
  if(words.length === 1) return name[0].toUpperCase() + name.slice(1)
  return words.map(_name => _name[0].toLowerCase() + _name.slice(1)).join(" ")
}