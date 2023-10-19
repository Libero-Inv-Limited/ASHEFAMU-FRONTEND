import { HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from "@chakra-ui/react"
import React from "react"
import { DARK } from "../../utils/color";
import CustomButton from "../common/CustomButton";

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
        <ModalBody pt={4}>
          <Text color={DARK} fontFamily={"rubik"} fontWeight={"semibold"}>Do you really want to logout?</Text>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <CustomButton onClick={handleAction} colorScheme="red">Logout</CustomButton>
            <CustomButton colorScheme="gray" onClick={onClose}>Cancel</CustomButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LogoutModal