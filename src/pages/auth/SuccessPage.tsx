import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SuccessLayout from "../../components/layouts/SuccessLayout"
import CustomButton from "../../components/common/CustomButton"
import { Text } from "@chakra-ui/react"
import { TEXT_GRAY } from "../../utils/color"
import { IoReturnDownBackOutline } from "react-icons/io5"
import ROUTES from "../../utils/routeNames"

interface SuccessPageProps { }
const SuccessPage: React.FC<SuccessPageProps> = () => {
  const { type } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if(type === "register") return navigate(ROUTES.LOGIN_ROUTE)
      if(type === "login") return navigate(ROUTES.DASHBOARD_ROUTE)
    }, 1000)
  }, [])
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