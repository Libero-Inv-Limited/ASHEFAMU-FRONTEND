/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Box, ButtonGroup, Stack } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { DARK } from "../../utils/color"
import CustomRegTable from "../../components/tables/CustomRegTable"
import CustomAccredTable from "../../components/tables/CustomAccredTable"


interface FacilitiesProps { }
const Facilities: React.FC<FacilitiesProps> = () => {
  const [search] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeTab = search.get("tab")

  useEffect(() => {
    if (activeTab) return
    navigate(`${pathname}?tab=registration`)
    //eslint-disable-next-line
  }, [])


  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase()
    navigate(`${pathname}?tab=${text}`)
  }

  return (
    <DashboardLayout>
      <Stack spacing={4}>
        <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
          <CustomButton colorScheme={activeTab === "registration" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "registration" ? "primary.500" : "white"} color={activeTab === "registration" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >registration</CustomButton>
          <CustomButton colorScheme={activeTab === "accredited" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "accredited" ? "primary.500" : "white"} color={activeTab === "accredited" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Accredited facilities</CustomButton>
        </ButtonGroup>

        <Box p={2} px={3} bg={"white"} rounded={"md"}>
          {activeTab === "accredited" ? (
            <CustomAccredTable />
          ) : (
            <CustomRegTable />
          )}
        </Box>
      </Stack>
    </DashboardLayout>
  )
}

export default Facilities