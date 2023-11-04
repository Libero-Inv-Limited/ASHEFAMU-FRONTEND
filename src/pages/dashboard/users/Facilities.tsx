import React from 'react'
import DashboardLayout from './../../../components/layouts/DashboardLayout';
import { Stack } from '@chakra-ui/react';
import { ButtonGroup } from '@chakra-ui/react';
import CustomButton from './../../../components/common/CustomButton';

const Facilities = () => {
  return (
    <DashboardLayout>
      <Stack spacing={4}>
        <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
          this is my facilities
          {/* <CustomButton colorScheme={activeTab === "registration" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "registration" ? "primary.500" : "white"} color={activeTab === "registration" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >registration</CustomButton> */}
          {/* <CustomButton colorScheme={activeTab === "accredited" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "accredited" ? "primary.500" : "white"} color={activeTab === "accredited" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Accredited facilities</CustomButton> */}
        </ButtonGroup>

        {/* <Box p={2} px={3} bg={"white"} rounded={"md"}>
          {activeTab === "accredited" ? (
            <CustomAccredTable />
          ) : (
            <CustomRegTable />
          )}
        </Box> */}
      </Stack>
    </DashboardLayout>
  )
}

export default Facilities