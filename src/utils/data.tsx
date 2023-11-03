import {
  BiSolidDashboard,
  BiSolidBarChartSquare,
  BiBarChartSquare,
} from "react-icons/bi";
import { BsHospital, BsHospitalFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCardOutline, IoCard } from "react-icons/io5";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiFacebookFill, RiLinkedinFill, RiTwitterXLine, RiYoutubeFill } from "react-icons/ri";
import scrollIcon from "../assets/landing-icon/file.png"
import eyeIcon from "../assets/landing-icon/eye.png"
import paintIcon from "../assets/landing-icon/paint.png"

import remita from "../assets/remita.png"
import paypal from "../assets/paypal.png"
import paystack from "../assets/paystack.png"
import interswitch from "../assets/interswitch.png"
import { ChartIcon, DashIcon, FileIcon, MemberIcon, NotificationIcon, UserIcon } from "../components/icons";

// PAYMENT METHODS
export const paymentMethods = [
  {
    image: remita,
    name: "remita",
    isDisabled: true,
  },
  {
    image: interswitch,
    name: "interswitch",
    isDisabled: true,
  },
  {
    image: paypal,
    name: "paypal",
    isDisabled: true,
  },
  {
    image: paystack,
    name: "paystack",
    isDisabled: false,
  },
]


// LGAs
export const LGAs = [
  "Aguata",
  "Anambra East",
  "Anambra West",
  "Anaocha",
  "Awka North",
  "Awka South",
  "Ayamelum",
  "Dunukofia",
  "Ekwusigo",
  "Idemili North",
  "Idemili South",
  "Ihiala",
  "Njikoka",
  "Nnewi North",
  "Nnewi South",
  "Ogbaru",
  "Onitsha North",
  "Onitsha South",
  "Orumba North",
  "Orumba South",
  "Oyi"
];


export const generalBuildingTypes = [
  "Skyscraper",
  "Apartment Building",
  "Office Building",
  "Residential House",
  "Cottage",
  "Bungalow",
  "Penthouse",
  "Mansion",
  "Dormitory",
  "Cabin",
  "Prison",
  "Courthouse",
  "Lodge"
];



// SIDEBAR CONTENTS
export const sidebarContents = [
  {
    name: "dashboard",
    link: "/dashboard",
    icon: LuLayoutDashboard,
    activeIcon: BiSolidDashboard,
  },
  {
    name: "facilities",
    link: "/dashboard/facilities",
    icon: BsHospital,
    activeIcon: BsHospitalFill,
  },
  {
    name: "payments",
    link: "/dashboard/payments",
    icon: IoCardOutline,
    activeIcon: IoCard,
  },
  {
    name: "analytics",
    link: "/dashboard/analytics",
    icon: BiBarChartSquare,
    activeIcon: BiSolidBarChartSquare,
  },
  {
    name: "notifications",
    link: "/dashboard/notifications",
    icon: IoMdNotificationsOutline,
    activeIcon: IoMdNotifications,
  },
  {
    name: "users",
    link: "/dashboard/users",
    icon: IoMdNotificationsOutline,
    activeIcon: IoMdNotifications,
  },
];

// SECONDARY SIDEBAR CONTENTS
export const secondarySidebarContents = [
  {
    name: "dashboard",
    link: "/dashboard/facilities/:name",
    icon: <DashIcon w={"25px"} h={"25px"} fill={"none"} stroke={"inherit"} />,
    hasStroke: true,
    isElementIcon: true
  },
  {
    name: "documents",
    link: "/dashboard/facilities/:name/documents",
    icon: <FileIcon w={"25px"} h={"25px"} color={"inherit"} fill={"inherit"} stroke={"inherit"} />,
    hasStroke: true,
    isElementIcon: true
  },
  {
    name: "members",
    link: "/dashboard/facilities/:name/members",
    icon: <MemberIcon w={"23px"} h={"15px"} color={"inherit"} fill={"inherit"} />,
    isElementIcon: true
  },
  {
    name: "profile",
    link: "/dashboard/facilities/:name/profile",
    icon: <UserIcon w={"24px"} h={"24px"} color={"inherit"} fill={"inherit"} />,
    isElementIcon: true
    
  },
  {
    name: "analytics",
    link: "/dashboard/facilities/:name/analytics",
    icon: <ChartIcon w={"25px"} h={"25px"} color={"inherit"} fill={"inherit"} />,
    isElementIcon: true
  },
  {
    name: "notifications",
    link: "/dashboard/facilities/:name/notifications",
    icon: <NotificationIcon w={"25px"} h={"25px"} color={"inherit"} fill={"inherit"} />,
    isElementIcon: true
  },
];

// POWER SOURCES
export const powerSources = [
  { label: 'Grid Electricity', value: 'grid' },
  { label: 'Backup Generator', value: 'generator' },
  { label: 'Solar Power', value: 'solar' },
  { label: 'Wind Turbines', value: 'wind' },
  { label: 'Battery Storage', value: 'battery' },
  { label: 'Hydroelectric Power', value: 'hydro' },
  { label: 'Natural Gas', value: 'natural-gas' },
  { label: 'Diesel Power', value: 'diesel' },
  { label: 'Geothermal Power', value: 'geothermal' },
];


// WATER SOURCES
export const waterSources = [
  { label: 'Municipal Water Supply', value: 'municipal' },
  { label: 'Well Water', value: 'well' },
  { label: 'Rainwater Harvesting', value: 'rainwater' },
  { label: 'Bottled Water', value: 'bottled' },
  { label: 'Filtered Tap Water', value: 'filtered-tap' },
  { label: 'Spring Water', value: 'spring' },
  { label: 'Distilled Water', value: 'distilled' },
  { label: 'Water Tanker Delivery', value: 'tanker' },
  { label: 'Recycled/Gray Water', value: 'recycled' },
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


export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo (Congo-Kinshasa)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia (formerly Macedonia)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]


export const staffCompliment = [
  "Please download the Excel template below, complete accordingly and upload in the appropriate field below",
  "Upload scanned copies of respective staff in PDF format only against the staff records.",
  "The entire documents of any staff will be scanned into one PDF document with various pages."
]


export const membersData = [
  {
    name: "Chiaza Okoli",
    reg_number: "2019234567",
    compliment: "",
    status: "Part-time"
  },
  {
    name: "Chibundu Amaka Davis",
    reg_number: "2019124237",
    compliment: "",
    status: "Full-time"
  },
]


export const membersNonProData = [
  {
    name: "Chiaza Okoli",
    type: "Hospital Attendant",
    compliment: "",
  },
  {
    name: "Chiaza Okoli",
    type: "Admin Staff",
    compliment: "",
  },
]


export const notificationSearchData = [
  {
    label: "All notification",
    value: "*"
  },
  {
    label: "Invoice",
    value: "invoice"
  },
  {
    label: "Renewal",
    value: "renewal"
  },
  {
    label: "Extra fee",
    value: "extra-fee"
  },
]


export const paymentData = [
  {
    invoice_id: "45678765434",
    date_sent: "2023-04-12",
    fee_category: "Renewal",
    facility: "James Health",
    amount: 20000,
    due_date: "24-04-12",
    status: "paid"
  },
  {
    invoice_id: "43456765431",
    date_sent: "2023-05-12",
    fee_category: "Renewal",
    facility: "Honnan Health",
    amount: 40000,
    due_date: "24-04-12",
    status: "unpaid"
  },
]