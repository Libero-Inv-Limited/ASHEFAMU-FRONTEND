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
    link: "/facilities",
    icon: RiApps2Line,
  },
  {
    name: "documents",
    link: "/facilities/documents",
    icon: FaRegFileAlt,
  },
  {
    name: "members",
    link: "/facilities/members",
    icon: FaUsers,
  },
  {
    name: "profile",
    link: "/facilities/profile",
    icon: FaRegUser,
  },
  {
    name: "analytics",
    link: "/facilities/analytics",
    icon: BiBarChartSquare,
  },
  {
    name: "notifications",
    link: "/notifications",
    icon: IoMdNotificationsOutline,
  },
]


// SECONDARY SIDEBAR CONTENTS
export const facilities = [
  {
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