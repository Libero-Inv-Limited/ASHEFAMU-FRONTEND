import React from "react"
import { useParams } from "react-router-dom"
import SuccessLayout from "../components/layouts/SuccessLayout"
import CustomButton from "../components/common/CustomButton"
import { Text } from "@chakra-ui/react"
import { TEXT_GRAY } from "../utils/color"
import { IoReturnDownBackOutline } from "react-icons/io5"

interface SuccessPageProps { }
const SuccessPage: React.FC<SuccessPageProps> = () => {
  const { type } = useParams()
  return (
   <SuccessLayout title={type === "reset" ? "Password successfully changed" : "Welcome to ASHEFAMU"}>
    { type === "reset" ? (
      <CustomButton leftIcon={<IoReturnDownBackOutline />}>Back to login</CustomButton>
    ): (
      <Text color={TEXT_GRAY} textAlign={"center"} fontSize={"sm"}>Anambra State Health Facilities Accreditation and Monitoring Unit</Text>
    ) }
   </SuccessLayout>
  )
}

export default SuccessPage