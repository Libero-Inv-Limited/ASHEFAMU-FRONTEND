/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOW_LOGS = true;

export const log = (...args: any[]) => SHOW_LOGS && console.log(...args);

// HIDE STRING
export const hideString = (data: string, isEmail?: boolean): string => {
  const string = data.split("");
  string.splice(isEmail ? 3 : 4, 6, "".padStart(6, "*"));
  return string.join("");
};

// ENCODE
export const getSlug = (name: string) => {
  const words = name.split(" ");
  if (words.length === 1) return name.toLowerCase();
  return words.map((_name) => _name.toLowerCase()).join("-");
};

// DECODE
export const decodeSlug = (name: string) => {
  const words = name.split("-");
  if (words.length === 1) return name[0].toUpperCase() + name.slice(1);
  return words
    .map((_name) => _name[0].toLowerCase() + _name.slice(1))
    .join(" ");
};

// RETURN MAP
export const labelValueMap = <T>(
  arr: T[]
): { label: string; value: string }[] =>
  arr.map((item) => ({ label: (item as any).name, value: (item as any).id }));

// GENERATE YEAR
export const generateYear = (startingYear: number = 1970): number[] => {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let year = startingYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  return yearsArray;
};
