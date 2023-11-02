/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, FormControl, FormLabel, HStack, Heading, Icon, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { LIGHT_BG, TEXT_DARK, TEXT_DARK_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { HiMiniBars4 } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { populateDashboardCards } from "../../store/slice/dataSlice";
import DashboardSort from "../common/DashboardSort";
import { executeUpdateDashboardCards } from "../../apis/user";
import { RxCross1 } from "react-icons/rx";

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CustomizeModal: React.FC<CustomizeModalProps> = ({ isOpen, onClose }) => {
  const dashboardCards = useAppSelector(state => state.dataStore.dashboardCards)
  const { isOpen: isSaving, onOpen: openSaving, onClose: closeSaving } = useDisclosure()

  const { isOpen: isReordering, onOpen: openReordering, onClose: closeReordering } = useDisclosure()
  const [tempState, setTempState] = useState<DashboardCardType[]>(dashboardCards)
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTempState(dashboardCards)
  }, [dashboardCards])

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleRestoreDefault = () => {
    const defaultCards = dashboardCards.map(item => ({ ...item, visibility: true }))
    console.log(defaultCards)
    dispatch(populateDashboardCards(defaultCards))
    onClose()
  }

  const handleChange = (value: "on" | "off", item: DashboardCardType) => {
    const index = tempState.indexOf(item)
    const prevData = [...tempState]
    if (value === "off") {
      prevData[index] = { ...prevData[index], visibility: true }
    }
    else {
      prevData[index] = { ...prevData[index], visibility: false }
    }
    setTempState(prevData)
  }

  const handleSaveChange = async () => {
    const sortedData = [...tempState]
    try{
      openSaving()
      const payload: UpdateDashboardCard = {
        card_records: sortedData
      } 
      const response = await executeUpdateDashboardCards(payload, token)
      if(response.status === "error") throw new Error(response.message)
      dispatch(populateDashboardCards(sortedData))
     
      toast({
        status: "success",
        title: response.message
      })
      onClose()
    }
    catch(err: any){
      console.log("ERROR:", err.message)
      toast({
        status: "error",
        title: err.message
      })
    }
    finally{
      closeSaving()
    }
  }

  return (
    <>
      <Modal scrollBehavior="inside" isCentered isOpen={isOpen} size={"2xl"} onClose={onClose}>
        <ModalOverlay />
        {isReordering ? <DashboardSort onCancel={closeReordering} /> : (
          <ModalContent>
            <ModalHeader as={HStack}>
              <Heading fontSize={"md"} fontWeight={700}>CUSTOMIZE DASHBOARD</Heading>
              <Spacer />
              <HStack>
                <CustomButton variant={"outline"} onClick={openReordering} colorScheme="gray" leftIcon={<Icon as={HiMiniBars4} color={TEXT_DARK} fontSize={"xl"} />}>Re-order</CustomButton>
                <IconButton 
                  aria-label="cancel"
                  onClick={onClose}
                  size={"sm"}
                  variant={"ghost"}
                  icon={<Icon as={RxCross1} fontSize={"xl"} color={TEXT_DARK_GRAY} />}
                />
              </HStack>
            </ModalHeader>
            <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
              {tempState.map(item => (
                <FormControl key={item.id} as={HStack} p={4} rounded={"md"} bg={LIGHT_BG}>
                  <FormLabel mb={0} flex={1} color={TEXT_DARK} fontSize={"sm"}>{item.name}</FormLabel>
                  <Checkbox
                    isChecked={item.visibility}
                    value={item.visibility ? "on" : "off"}
                    colorScheme="brand" onChange={({ target }) => handleChange(target.value as any, item)}
                  />
                </FormControl>
              ))}
            </ModalBody>
            <ModalFooter as={HStack} spacing={3}>
              <CustomButton variant={"outline"} colorScheme="gray" onClick={handleRestoreDefault}>Restore default</CustomButton>
              <CustomButton colorScheme="brand" isLoading={isSaving} onClick={handleSaveChange}>Save</CustomButton>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default CustomizeModal