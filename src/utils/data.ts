import { BiSolidDashboard, BiSolidBarChartSquare, BiBarChartSquare} from "react-icons/bi";
import { BsHospital, BsHospitalFill, } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCardOutline, IoCard } from "react-icons/io5";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiApps2Line } from "react-icons/ri";
import { FaRegFileAlt, FaUsers, FaRegUser } from "react-icons/fa";


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
]


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
]


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
    }
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
    }
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
    }
  },
]

export const dashboardCards = [
  {
    name: "Penalties/fines",
    amount: 6,
    isGreen: true
  },
  {
    name: "Penalties/fines",
    amount: 6,
    isGreen: true
  },
  {
    name: "No of accredited facilities",
    amount: 6,
    isGreen: true
  },
  {
    name: "No of accredited facilities",
    amount: 6,
    isGreen: true
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: true
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: false
  },
  {
    name: "Renewal deadline",
    amount: "2d 03h",
    isGreen: false,
    isActive: true
  },
]