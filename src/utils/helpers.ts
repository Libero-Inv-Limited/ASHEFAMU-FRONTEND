/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOW_LOGS = true;

export const log = (...args: any[]) => SHOW_LOGS && console.log(...args);

// HIDE STRING
export const hideString = (data: string, isEmail?: boolean): string => {
  const string = data.split("");
  string.splice(isEmail ? 3 : 4, 6, "".padStart(6, "*"));
  return string.join("");
};


export const convertToSnakecase = (name: string) => {
  const words = name.split(" ");
  if (words.length === 1) return name.toLowerCase();
  return words.filter(name => name).map((_name) => _name.toLowerCase()).join("_");
};

// ENCODE
export const getSlug = (name: string) => {
  const words = name.split(" ");
  if (words.length === 1) return name.toLowerCase();
  return words.filter(name => name).map((_name) => _name.toLowerCase()).join("-");
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

export const readFile = (file: File, type: "text" | "base64" = "text") => new Promise((res, rej) => {
  const reader = new FileReader()
  if(type === "text") reader.readAsText(file)
  if(type === "base64") reader.readAsDataURL(file)
  reader.addEventListener("load", () => {
    res(reader.result)
  })
  
  reader.addEventListener("error", () => {
    rej("Failed to read file")
  })
})

export const handleConvertCSVToArray = (text: string) => {
  const [head, ...body] = text.trim().split("\r\n").map(line => line.split(","))
  const data: any[] = []
  body.forEach((line) => {
    const value: any = {}
    line.forEach((item, idx) => {
      value[head[idx].trim()] = item
    })
    data.push(value)
  })
  return data
}