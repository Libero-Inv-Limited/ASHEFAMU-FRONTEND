import { Center, HStack, Heading, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsCheckCircle } from "react-icons/bs";

interface RoleUpgradeSuccessProps { 
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
}

interface RoleUpgradeSuccessProps {}
const RoleUpgradeSuccess:React.FC<RoleUpgradeSuccessProps> = ({ isOpen, onClose, handleClick }) => {
  return(
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
        <Center>
          <Icon as={BsCheckCircle} fontSize={"4xl"} color={"brand.500"} />
        </Center>
        <Heading size={"md"} lineHeight={"7"} color={DARK}>Request sent successfully</Heading>
        <Text fontSize="sm" color={TEXT_DARK_GRAY}>You won't be able to do this again until after 30 days. Check your notification section for confirmation or rejection of your request</Text>
      </ModalBody>
      <ModalFooter as={HStack} spacing={4}>
        <CustomButton flex={1} colorScheme="brand" onClick={handleClick}>Okay, noted.</CustomButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default RoleUpgradeSuccess