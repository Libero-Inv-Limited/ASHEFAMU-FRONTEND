import { Center, HStack, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Stack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { CautionIcon } from "../icons";


type StatusType = "error" | "success" | "warning" | "danger"

interface ActionModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  isLoading?: boolean;
  actionBtnText: string;
  status: StatusType;
  onClose: () => void;
  handleAction: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, isLoading, handleAction, onClose, status, text, title, actionBtnText }) => {
  const colorMap = {
    "success": "brand",
    "warning": "yellow",
    "error": "red",
    "danger": "red",
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
          <Center>
            <CautionIcon color={YELLOW} w={"45px"} h={"45px"} />
          </Center>
          <Stack>
            <Heading size={"md"} lineHeight={"7"} color={DARK}>{title}</Heading>
            <Text fontSize={"sm"} color={DARK}>{text}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter as={HStack} spacing={3}>
          <CustomButton flex={1} colorScheme="gray" variant={"outline"} onClick={onClose}>Cancel</CustomButton>
          <CustomButton flex={1} isLoading={isLoading} onClick={handleAction} colorScheme={colorMap[status]}>{actionBtnText}</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ActionModal