import {
  BiSolidDashboard,
  BiSolidBarChartSquare,
  BiBarChartSquare,
} from "react-icons/bi";
import { BsHospital, BsHospitalFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCardOutline, IoCard } from "react-icons/io5";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiApps2Line, RiFacebookFill, RiLinkedinFill, RiTwitterXLine, RiYoutubeFill } from "react-icons/ri";
import { FaRegFileAlt, FaUsers, FaRegUser } from "react-icons/fa";
import documentImage from "../assets/doc.png"
import scrollIcon from "../assets/landing-icon/file.png"
import eyeIcon from "../assets/landing-icon/eye.png"
import paintIcon from "../assets/landing-icon/paint.png"

// SIDEBAR CONTENTS
export const sidebarContents = [
  {
    name: "dashboard",
    link: "/",
    icon: LuLayoutDashboard,
    activeIcon: BiSolidDashboard,
  },
  {
    name: "facilities",
    link: "/facilities",
    icon: BsHospital,
    activeIcon: BsHospitalFill,
  },
  {
    name: "payments",
    link: "/payments",
    icon: IoCardOutline,
    activeIcon: IoCard,
  },
  {
    name: "analytics",
    link: "/analytics",
    icon: BiBarChartSquare,
    activeIcon: BiSolidBarChartSquare,
  },
  {
    name: "notifications",
    link: "/notifications",
    icon: IoMdNotificationsOutline,
    activeIcon: IoMdNotifications,
  },
];

// SECONDARY SIDEBAR CONTENTS
export const secondarySidebarContents = [
  {
    name: "dashboard",
    link: "/facilities/:name",
    icon: RiApps2Line,
  },
  {
    name: "documents",
    link: "/facilities/:name/documents",
    icon: FaRegFileAlt,
  },
  {
    name: "members",
    link: "/facilities/:name/members",
    icon: FaUsers,
  },
  {
    name: "profile",
    link: "/facilities/:name/profile",
    icon: FaRegUser,
  },
  {
    name: "analytics",
    link: "/facilities/:name/analytics",
    icon: BiBarChartSquare,
  },
  {
    name: "notifications",
    link: "/facilities/:name/notifications",
    icon: IoMdNotificationsOutline,
  },
];

// SECONDARY SIDEBAR CONTENTS
export const facilities = [
  {
    id: 1,
    name: "Dummy Facility",
    date: "12/12/2013",
    category: "Clinic",
    status: "Form pending completion",
    accreditation: {
      date: "25/12/2013",
      category: "Clinic",
      status: "Active",
    },
  },
  {
    id: 2,
    name: "Jace Health",
    date: "12/08/2022",
    category: "Body",
    status: "Awaiting accreditation",
    accreditation: {
      date: "25/12/2013",
      category: "Body",
      status: "Inactive",
    },
  },
  {
    id: 3,
    name: "Ace Firm",
    date: "12/08/2022",
    category: "Body",
    status: "Awaiting accreditation",
    accreditation: {
      date: "25/12/2013",
      category: "Body",
      status: "Active",
    },
  },
];

export const dashboardCards = [
  {
    name: "Penalties/fines",
    amount: 6,
    isGreen: true,
  },
  {
    name: "Penalties/fines",
    amount: 6,
    isGreen: true,
  },
  {
    name: "No of accredited facilities",
    amount: 6,
    isGreen: true,
  },
  {
    name: "No of accredited facilities",
    amount: 6,
    isGreen: true,
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: true,
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: false,
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: true,
  },
];

export const documentContents = [
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: documentImage,
    
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: "",
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: "",
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: "",
  },
  {
    name: "Letter of introduction from LAWMA/LAWMA medical certificate",
    src: "",
  },
];

export const invoiceData: InvoiceData[] = [
  {
    facility_id: 4,
    amount: "10000.00",
    description: "Test invoice",
    due_date: 1696785677.101,
    invoice_date: 1696440077.101,
    status: "unpaid",
    created_at: "2023-10-04T18:21:17.102+01:00",
    updated_at: "2023-10-04T18:21:17.102+01:00",
    id: 1,
  },
  {
    facility_id: 4,
    amount: "21000.00",
    description: "Service invoice",
    due_date: 1696786677.101,
    invoice_date: 1696440077.101,
    status: "paid",
    created_at: "2023-10-04T18:21:17.102+01:00",
    updated_at: "2023-10-04T18:21:17.102+01:00",
    id: 2,
  },
  {
    facility_id: 4,
    amount: "1000.00",
    description: "Test invoice",
    due_date: 1696735677.101,
    invoice_date: 1696440077.101,
    status: "unpaid",
    created_at: "2023-10-04T18:21:17.102+01:00",
    updated_at: "2023-10-04T18:21:17.102+01:00",
    id: 3,
  },
  {
    facility_id: 4,
    amount: "30000.00",
    description: "Test invoice",
    due_date: 1696785677.101,
    invoice_date: 1696440077.101,
    status: "unpaid",
    created_at: "2023-10-04T18:21:17.102+01:00",
    updated_at: "2023-10-04T18:21:17.102+01:00",
    id: 4,
  },
];


export const condinateGuideline = [
  "GPS Coordinates should be taken at the facility",
  "Search for 'GPS Coordinates' on Google Play or Apple Store and install",
  "Turn ON your phone ocation service",
  "Once you launch the app, the GPS Coordinates will be displayed.",
  "Note the longitude and latitude values as it will be required on the registration form",
]

export const compulsoryDocs = [ 
  "Letter of intent to the commissioner for Health Lagos state",
  "LASRAA Card",
  "Inner Skech Diagram",
  "Access Road Diagram",
  "CAC Registration Certificate",
  "Tax Revenue Receipt",
  "Letter of Introduction from LAWMA/LAWMA Medical Certificate",
  "Letter of Good standing from professional Association of Operating Officer",
  "Stamped letter from LGA M&E Office (new facilities) HMIS Clearance (existing facilities)",
  "Last registration/renewal certificate"
]

export const warnings = [ 
  "Please note that failure to provide accurate information may delay or lead to rejection of your registration application.",
  "Ensure you have all the documents stated above so as to aid the quick completion and submission of your registration application",
  "All applications will be treated on a first-come-first-serve basis.",
  "If you are sure you have all your requirements ready, you may proceed with your application.",
]

export const facilityCategories = [
  {  
    label: "Clinic",
    value: "Clinic",
  },
  {  
    label: "Hospital",
    value: "Hospital",
  },
]

export const sectorCategories = [
  {  
    label: "Public",
    value: "Public",
  },
  {  
    label: "Private",
    value: "Private",
  },
]


export const nationalityData = [
  {
    value: "Nigeria",
    label: "Nigeria"
  },
  {
    value: "Ghana",
    label: "Ghana"
  },
]

export const facilityScopeData = [
  {
    value: "Paediatrics",
    label: "Paediatrics"
  },
  {
    value: "Eye treatment",
    label: "Eye treatment"
  },
]


export const timeData = [
  {
    value: "12am",
    label: "12am"
  },
  {
    value: "1am",
    label: "1am"
  },
  {
    value: "2am",
    label: "2am"
  },
  {
    value: "3am",
    label: "3am"
  },
  {
    value: "4am",
    label: "4am"
  },
  {
    value: "5am",
    label: "5am"
  },
  {
    value: "6am",
    label: "6am"
  },
  {
    value: "7am",
    label: "7am"
  },
  {
    value: "8am",
    label: "8am"
  },
  {
    value: "9am",
    label: "9am"
  },
  {
    value: "10am",
    label: "10am"
  },
  {
    value: "11am",
    label: "11am"
  },
  {
    value: "12pm",
    label: "12pm"
  },
  {
    value: "1pm",
    label: "1pm"
  },
  {
    value: "2pm",
    label: "2pm"
  },
  {
    value: "3pm",
    label: "3pm"
  },
  {
    value: "4pm",
    label: "4pm"
  },
  {
    value: "5pm",
    label: "5pm"
  },
  {
    value: "6pm",
    label: "6pm"
  },
  {
    value: "7pm",
    label: "7pm"
  },
  {
    value: "8pm",
    label: "8pm"
  },
  {
    value: "9pm",
    label: "9pm"
  },
  {
    value: "10pm",
    label: "10pm"
  },
  {
    value: "11pm",
    label: "11pm"
  },
]

export const headerLinks = [
  {
    link: "",
    name: "Resource Library"
  },
  {
    link: "#contact",
    name: "Contact us"
  },
  {
    link: "",
    name: "FAQs"
  },
]

export const services = ["Hospital", "Clinic", "Optical Clinic", "Diagnostic Center", "Eye Hospital", "Dental Hospital", "Laboratory", "Mobile Clinic", "Multispecialist Clinic", "Home Care", "Cosmetic Surgery", "Telemedicine", "Eye Clinic"
]

export const serviceCards = [
  {
    title: "Registration",
    icon: scrollIcon,
    color: "linear-gradient(307deg, #5E51E9 -0.43%, #4135C2 96.25%)",
    text: "The ASHEFAMU portal was developed for the registration of Healthcare faciliteis operating within Anambra in accordance with the Health Reform Law of Anambra State."
  },
  {
    title: "Monitoring",
    icon: eyeIcon,
    isBigger: true,
    color: "linear-gradient(142deg, #58A165 7.39%, #3AC754 107.65%)",
    text: "ASHEFAMU was established in X 200X and is charged with the responsibility of monitoring both private and public health facilities to ensure registration and accreditation of all health facilities in Anambra state."
  },
  {
    title: "Regulation",
    icon: paintIcon,
    color: "linear-gradient(307deg, #5E51E9 -0.43%, #4135C2 96.25%)",
    text: "A key responsibility of ASHEFAMU is the regulation of the private health facilities, a major provider of healthcare services to over 60% of the population of Anambra State."
  }
]

export const socialLinks = [
  {
    link: "",
    icon: RiFacebookFill
  },
  {
    link: "",
    icon: RiTwitterXLine
  },
  {
    link: "",
    icon: RiYoutubeFill
  },
  {
    link: "",
    icon: RiLinkedinFill
  },
]