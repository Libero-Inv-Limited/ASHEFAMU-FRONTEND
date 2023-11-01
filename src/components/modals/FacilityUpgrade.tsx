/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { CautionIcon } from "../icons";
import { executeFacilityUpgrade } from "../../apis/facility";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import ActionModal from "./ActionModal";
import SuccessModal from "./SuccessModal";

interface FacilityUpgradeProps { 
  isOpen: boolean;
  onClose: () => void;
}
const FacilityUpgrade: React.FC<FacilityUpgradeProps> = ({ isOpen, onClose }) => {
  const { currentFacility } = useAppContext()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const { register, trigger, getValues, formState: { errors }, reset } = useForm<{request_details: string}>({ mode: "onSubmit" })
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const { isOpen: isActionOpen, onOpen: openActionLoading, onClose: closeActionLoading } = useDisclosure()
  const { isOpen: isSuccessOpen, onOpen: openSuccessLoading, onClose: closeSuccessLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleSubmit = async () => {
    if(! await trigger()) return
    try {
      openLoading()
      const payload: UpgradeData = { ...getValues(), facility_id: currentFacility!.id } 
      const result = await executeFacilityUpgrade(payload, token!)
      if(result.status === "error") throw new Error(result.message)

      toast({
        status: "success",
        title: result.message
      })

      openSuccessLoading()

      setTimeout(() => {
        reset()
        onClose()
      })
    }
    catch(e: any) {
      toast({
        status: "error",
        title: e.message
      })
    }
    finally {
      closeLoading()
    }
  }
  return (
    <>
    <Modal isCentered isOpen={isOpen} size={"2xl"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"md"} fontWeight={700}>EDIT FACILITY DETAILS</ModalHeader>
        <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
          <HStack spacing={4} p={6} rounded={"md"} bg={"#FFF8EB"} border={"1px solid #F59E0B"}>
            <Center rounded={"full"} w={"40px"} h={"40px"} bg={"#FFF0D4"}>
              <CautionIcon w={"24px"} h={"24px"} color={"#FCBB4D"} />
            </Center>

            <Stack flex={1}>
              <Heading textAlign={"left"} fontWeight={"700"} size={"sm"} color={"#1E478A"}>NOTE</Heading>
              <Text textAlign={"left"} fontSize={"sm"} color={TEXT_DARK_GRAY}>If your application is successful, you'll get a button to 'upgrade facility' in the profile section that was previously greyed out or unavailable. On clicking 'upgrade facility', your status will be temporarily changed to 'pending' in other to facilitate that action and the changes will be reflected when you click 'save'.</Text>
            </Stack>
          </HStack>

          <FormControl isInvalid={Boolean(errors.request_details)}>
            <FormLabel color={TEXT_DARK_GRAY} fontSize={"sm"}>Why do you want to edit your facility details?</FormLabel>
            <Textarea color={TEXT_DARK_GRAY} fontSize={"sm"} rows={5} {...register("request_details", {
              required: "This field is required"
            })}></Textarea>
            {errors.request_details && <FormErrorMessage fontSize={"xs"}>{errors.request_details.message}</FormErrorMessage>}
          </FormControl>

        </ModalBody>
        <ModalFooter as={HStack} spacing={3}>
          <CustomButton colorScheme="brand" onClick={openActionLoading}>Submit</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>

    <ActionModal 
      onClose={closeActionLoading}
      status="success"
      actionBtnText="Yes"
      handleAction={handleSubmit}
      isOpen={isActionOpen}
      isLoading={isLoading}
      title="You are requesting for permission to update your facility's details. Proceed with this action?"
      text="You won't be able to do this again until after 30 days"
    />

    <SuccessModal 
      isOpen={isSuccessOpen}
      onClose={closeSuccessLoading}
      text="You won't be able to do this again until after 30 days. Check your notification section for confirmation or rejection of your request"
      title="Request sent successfully"
      handleClick={closeSuccessLoading}
    />
    </>
  )
}

export default FacilityUpgrade