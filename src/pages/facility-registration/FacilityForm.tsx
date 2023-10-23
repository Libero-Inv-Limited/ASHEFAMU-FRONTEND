/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { HStack, Icon, Stack, Text } from "@chakra-ui/react"
import { LuInfo } from "react-icons/lu"
import BasicForm from "./forms/BasicForm"
import Stepper from "../../components/layout-components/Stepper"
import ServicesForm from "./forms/ServicesForm"
import FacilityDocumentForm from "./forms/FacilityDocumentForm"
import FacilityStaffForm from "./forms/FacilityStaffForm"
import { useAppSelector } from "../../store/hook"


interface FacilityFormProps { }
const FacilityForm: React.FC<FacilityFormProps> = () => {
const { currentStep } = useAppSelector(state => state.createFacilityStore)
const valueMap = {
  FILL_FORM: 0,
  SERVICES: 1,
  DOCUMENT: 2,
  STAFFS: 3,
}
const [activeStep, setActiveStep] = useState((valueMap as any)[currentStep] || 0)

const steps = [
  {
    name: "Basic facility details",
    component: <BasicForm setActiveStep={setActiveStep} activeStep={activeStep}  />
  },
  {
    name: "Services offered",
    component: <ServicesForm setActiveStep={setActiveStep} activeStep={activeStep}  />
  },
  {
    name: "Facility documents",
    component: <FacilityDocumentForm setActiveStep={setActiveStep} activeStep={activeStep} />
  },
  {
    name: "Facility staff",
    component: <FacilityStaffForm setActiveStep={setActiveStep} activeStep={activeStep}  />
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
      </Stack>
    </DashboardLayout>
  )
}

export default FacilityForm