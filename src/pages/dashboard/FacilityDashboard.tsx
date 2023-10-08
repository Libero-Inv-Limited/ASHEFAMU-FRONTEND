import React from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Text } from "@chakra-ui/react"

interface FacilityDashboardProps { }
const FacilityDashboard: React.FC<FacilityDashboardProps> = () => {
  return (
   <DashboardLayout>
    <Text>Dashboard</Text>
   </DashboardLayout>
  )
}

export default FacilityDashboard