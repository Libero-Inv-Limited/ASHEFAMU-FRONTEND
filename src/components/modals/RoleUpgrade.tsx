import { Center, HStack, Heading, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_DARK_GRAY, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { IoWarningOutline } from "react-icons/io5";

interface RoleUpgradeProps { 
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
}
const RoleUpgrade: React.FC<RoleUpgradeProps> = ({ isOpen, onClose, handleClick }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={6} as={VStack} spacing={4} textAlign={"center"}>
          <Center>
            <Icon as={IoWarningOutline} fontSize={"4xl"} color={YELLOW} fill={YELLOW} />
          </Center>
          <Heading size={"md"} lineHeight={"7"} color={DARK}>Are you sure you want to request for a role upgrade?</Heading>
          <Text fontSize="sm" color={TEXT_DARK_GRAY}>You won't be able to do this again until after 30 days</Text>
        </ModalBody>
        <ModalFooter as={HStack} spacing={3}>
          <CustomButton flex={1} colorScheme="gray" variant={"outline"} onClick={onClose}>Cancel</CustomButton>
          <CustomButton flex={1} colorScheme="brand" onClick={handleClick}>Yes</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RoleUpgrade