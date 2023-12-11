import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


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
  if(!name) return ""
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

export const readFile = (file: File | Blob, type: "text" | "base64" = "text") => new Promise((res, rej) => {
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
      let key = head[idx].trim().toLowerCase();

      // Adjustments
      key = key.replace(/\s+/g, "_"); // Replace spaces with underscores
      if (key === "full-time/part-time") {
        key = "employment_type"; // Change key name
      }
      if( key ==="post_qualification") {
        key = "post_graduate_qualification"
      }
      if(key === "year_of_qulification"){
        key="year_of_qualification"
      }

      value[key] = item;
    });

    data.push(value);
  });

  return data;
}


// HUMAN REDABLE DATE
export const humanReadableDate = (isoTimestamp: string) => {
  const parsedTimestamp = dayjs(isoTimestamp);
  return parsedTimestamp.fromNow();
}

export const formatDate = (date: string) => {
  const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate.replace(/(\d)(st|nd|rd|th)/, '$1');
}

export const formatNigerianPhoneNumber = (inputNumber:string) => {
  const cleanedNumber = inputNumber.replace(/^0/, '');
  const formattedNumber = `+234${cleanedNumber}`;
  return formattedNumber;
}