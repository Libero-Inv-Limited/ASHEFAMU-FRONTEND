/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import CustomButton from "../../components/common/CustomButton"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { ButtonProps, HStack, Icon } from "@chakra-ui/react"
import { useAppSelector } from "../../store/hook";

interface FormFooterProps { 
  setActiveStep: (number: any) => void;
  activeStep: number;
  handleAction: () => Promise<boolean>;
  nextButtonProps?: ButtonProps;
  prevButtonProps?: ButtonProps;
}
const FormFooter: React.FC<FormFooterProps> = ({ setActiveStep, handleAction, activeStep, nextButtonProps, prevButtonProps }) => {
  const handleNext = async () => {
    const res = await handleAction()
    res && setActiveStep((prev: any) => prev + 1)
  }
  const currentStep = useAppSelector(state => state.createFacilityStore.currentStep)

  const handlePrev = () => {
    const steps = ["FILL_FORM", "SERVICES", "DOCUMENT", "STAFFS"]
    const index = steps.indexOf(currentStep)
    setActiveStep(index - 1)
  }
  return (
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <CustomButton
        isDisabled={activeStep <= 1} onClick={handlePrev} variant={"outline"} leftIcon={<Icon fontSize={"xl"} as={BsArrowLeft} />} {...prevButtonProps}>Previous</CustomButton>

      <CustomButton onClick={handleNext} rightIcon={!(activeStep >= 3) ? <Icon fontSize={"xl"} as={BsArrowRight} /> : undefined} {...nextButtonProps}>{ activeStep >= 3 ? "Complete Registration" : "Next" }</CustomButton>
    </HStack>
  )
}

export default FormFooter