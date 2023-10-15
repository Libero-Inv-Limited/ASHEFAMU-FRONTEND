import React, { useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { HStack, Icon, Stack, Text } from "@chakra-ui/react"
import { LuInfo } from "react-icons/lu"
import BasicForm from "./forms/BasicForm"
import CustomButton from "../../components/common/CustomButton"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Stepper from "../../components/layout-components/Stepper"
import ServicesForm from "./forms/ServicesForm"
import FacilityDocumentForm from "./forms/FacilityDocumentForm"
import FacilityStaffForm from "./forms/FacilityStaffForm"


interface FacilityFormProps { }
const FacilityForm: React.FC<FacilityFormProps> = () => {
const [activeStep, setActiveStep] = useState(0)

const steps = [
  {
    name: "Basic facility details",
    component: <BasicForm />
  },
  {
    name: "Services offered",
    component: <ServicesForm />
  },
  {
    name: "Facility documents",
    component: <FacilityDocumentForm />
  },
  {
    name: "Facility staff",
    component: <FacilityStaffForm />
  },
]
  return (
    <DashboardLayout>
      <Stack bg={"white"} p={8} pt={4} spacing={"14"}>
        <HStack alignItems={["flex-start", "flex-start", "center"]} p={3} bg={"blue.50"} rounded={"md"}>
          <Icon fontSize={"xl"} as={LuInfo} color={"primary.500"} />
          <Text fontSize={"sm"} color={"#444B5A"}>Please Provide Accurate Information In The Appropriate Fields</Text>
        </HStack>

        <Stepper currentIndex={activeStep} steps={steps.map(step => ({ title: step.name }))} />
        { steps[activeStep].component }

          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <CustomButton 
              isDisabled={activeStep < 1} onClick={() => {
              setActiveStep(prev => prev - 1)
            }} variant={"outline"} leftIcon={<Icon fontSize={"xl"} as={BsArrowLeft} />}>Previous</CustomButton>
            
            <CustomButton onClick={() => {
              setActiveStep(prev => prev + 1)
            }} rightIcon={<Icon fontSize={"xl"} as={BsArrowRight} />}>Next</CustomButton>
          </HStack>
      </Stack>
    </DashboardLayout>
  )
}

export default FacilityForm