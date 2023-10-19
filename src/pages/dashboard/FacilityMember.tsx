/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Box, ButtonGroup, HStack, Icon, Stack } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import { BsPlus } from "react-icons/bs"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { DARK } from "../../utils/color"
import CustomFacilityMemberTable from "../../components/tables/CustomFacilityMemberTable"
import CustomNonProMemberTable from "../../components/tables/CustomNonProMemberTable"

interface FacilityMemberProps { }
const FacilityMember: React.FC<FacilityMemberProps> = () => {
  const [search] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeTab = search.get("tab")

  useEffect(() => {
    if (activeTab) return
    navigate(`${pathname}?tab=professional`)
  }, [])


  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase()
    navigate(`${pathname}?tab=${text}`)
  }

  return (
    <DashboardLayout>
      <Stack spacing={4}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
            <CustomButton colorScheme={activeTab === "professional" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "professional" ? "primary.500" : "white"} color={activeTab === "professional" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >Professional staff</CustomButton>
            <CustomButton colorScheme={activeTab === "non-professional" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "non-professional" ? "primary.500" : "white"} color={activeTab === "non-professional" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Non-professional staff</CustomButton>
          </ButtonGroup>

          <CustomButton onClick={() => {}} alignSelf={['flex-end', 'flex-end', 'unset']} leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}>Add member</CustomButton>
        </HStack>

        <Box p={2} px={3} bg={"white"} rounded={"md"}>
          {activeTab === "professional" ? (
            <CustomFacilityMemberTable />
          ) : (
            <CustomNonProMemberTable />
          )}
        </Box>
      </Stack>
    </DashboardLayout>
  )
}

export default FacilityMember