/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { ButtonGroup } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import useSearchParam from "../../hooks/useSearchParam"
import { useLocation, useNavigate } from "react-router-dom"
import { DARK } from "../../utils/color"

interface FacilityDocumentProps { }
const FacilityDocument: React.FC<FacilityDocumentProps> = () => {
  const { queryParam: activeTab } = useSearchParam("tab")
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleTabChange =  (e: ChangeEvent<HTMLButtonElement>) => {
    navigate(`${pathname}?tab=${e.target.name.toLowerCase()}`)
  }

  return (
    <DashboardLayout>
      <ButtonGroup w={"400px"} p={1} bg={"white"} rounded={"sm"}>
        <CustomButton colorScheme={activeTab === "registration" ? "primary" : "gray"} onClick={handleTabChange as any} bg={activeTab === "registration" ? "primary.500" : "white"} color={activeTab === "registration" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} name="" >Uploaded documents</CustomButton>

        <CustomButton colorScheme={activeTab === "accredited" ? "primary" : "gray"} onClick={handleTabChange as any} bg={activeTab === "accredited" ? "primary.500" : "white"} name="" color={activeTab === "accredited" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Invoices</CustomButton>
      </ButtonGroup>
    </DashboardLayout>
  )
}

export default FacilityDocument