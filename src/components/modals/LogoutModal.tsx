import { Center, HStack, Heading, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { IoWarningOutline } from "react-icons/io5";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAction: () => void;
}
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, handleAction }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
          <Center>
            <Icon as={IoWarningOutline} fontSize={"4xl"} color={YELLOW} fill={YELLOW} />
          </Center>
          <Heading size={"md"} lineHeight={"7"} color={DARK}>Do you really want to logout?</Heading>
        </ModalBody>
        <ModalFooter as={HStack} spacing={3}>
          <CustomButton flex={1} colorScheme="gray" variant={"outline"} onClick={onClose}>Cancel</CustomButton>
          <CustomButton flex={1} onClick={handleAction} colorScheme="red">Yes, Logout.</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LogoutModal