import { Center, Heading, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsCheckCircle } from "react-icons/bs";

interface PaymentSuccessProps { 
  isOpen: boolean;
  onClose: () => void;
}
const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={4} as={VStack} textAlign={"center"}>
          <Center>
            <Icon as={BsCheckCircle} fontSize={"4xl"} color={"brand.500"} />
          </Center>
          <Heading size={"md"} color={DARK}>Payment successful</Heading>
          <Text color={DARK} fontFamily={"rubik"} fontWeight={"semibold"}>Do you really want to logout?</Text>
        </ModalBody>
        <ModalFooter>
          <CustomButton flex={1} w={"full"} colorScheme="brand" onClick={onClose}>Ok, noted!</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PaymentSuccess