import { Center, HStack, Heading, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsCheckCircle } from "react-icons/bs";

interface SuccessModalProps {
  title: string;
  text: string;
  btnText?: string;
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
}

interface SuccessModalProps { }
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, btnText, text, title, handleClick }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
          <Center>
            <Icon as={BsCheckCircle} fontSize={"4xl"} color={"brand.500"} />
          </Center>
          <Heading size={"md"} lineHeight={"7"} color={DARK}>{title}</Heading>
          <Text fontSize="sm" color={TEXT_DARK_GRAY}> {text} </Text>
        </ModalBody>
        <ModalFooter as={HStack} spacing={4}>
          <CustomButton flex={1} w={"full"} colorScheme="brand" onClick={handleClick}>{btnText || "Okay, noted."}</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SuccessModal