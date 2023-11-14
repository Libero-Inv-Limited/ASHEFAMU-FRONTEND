import FacilityRegistration from "./components/FacilityRegistration";
import FacilityStatus from "./components/FacilityStatus";
import GeneratedInvoice from "./components/GeneratedInvoice";
import InvoiceStatus from "./components/InvoiceStatus";
import PaidVsPendingInvoices from "./components/PaidVsPendingInvoices";
import Revenue from "./components/Revenue";
import TopPerformingFacilities from "./components/TopPerformingFacilities";
import TopRevenueGeneratingFacilities from "./components/TopRevenueGeneratingFacilities";
import UserRegistration from "./components/UserRegistration";
import UserRolesDist from "./components/UserRolesDist";
import Inspection from "./components/Inspection";
import Compliance from "./components/Compliance";
import SystemPerformance from "./components/SystemPerformance";

export const data = [
  {
    name: "Overview",
    components: [
      { title: "Generated Invoice", component: <GeneratedInvoice />, size: 6 },
      {
        title: "Paid vs Pending Invoices",
        component: <PaidVsPendingInvoices />,
        size: 6,
      },
    ],
  },
  {
    name: "Facility Analytics",
    components: [
      {
        title: "Facility Registration",
        component: <FacilityRegistration />,
        size: 6,
      },
      { title: "Facility Status", component: <FacilityStatus />, size: 6 },
      {
        title: "Top performing facilities",
        component: <TopPerformingFacilities />,
        size: 12,
      },
    ],
  },
  {
    name: "User Behaviour and Engagement",
    components: [
      { title: "User Registration", component: <UserRegistration />, size: 12 },
    ],
  },
  {
    name: "Financial Reports",
    components: [
      {
        title: "Revenue",
        component: <Revenue />,
        size: 6,
      },
      { title: "Invoice Status", component: <InvoiceStatus />, size: 6 },
      {
        title: "Top Revenue Generating Facilities",
        component: <TopRevenueGeneratingFacilities />,
        size: 6,
      },
      {
        title: "Distribution of user roles",
        component: <UserRolesDist />,
        size: 6,
      },
    ],
  },
  {
    name: "Compliance and Inspection",
    components: [
      {
        title: "Inspection",
        component: <Inspection />,
        size: 6,
      },
      { title: "Compliance Breakdown", component: <Compliance />, size: 6 },
    ],
  },
  {
    name: "System Performance",
    components: [
      {
        title: "Server Storage",
        component: <SystemPerformance />,
        size: 3,
      },
    ],
  },
];

export const topRevenueGeneratingFacilities = [
  {
    name: "Gotham Clinic",
    amount: 988,
  },
  {
    name: "Gotham Clinic",
    amount: 988,
  },
  {
    name: "Central City Hospital",
    amount: 749,
  },
  {
    name: "Dummy Facility",
    amount: 721,
  },
  {
    name: "Dummy Facility",
    amount: 721,
  },
];
