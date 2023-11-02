/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { useAppSelector } from "../../store/hook";



interface InspectionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: InspectionData;
}
const InspectionResultModal:React.FC<InspectionResultModalProps> = ({result, isOpen, onClose }) => {
  const facilities = useAppSelector(state => state.dataStore.facilities)
  const name = facilities.find(fac => fac.id === result?.facility_id)?.name
  return(
    <Modal isCentered isOpen={isOpen} size={"2xl"} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize={"md"} fontWeight={700}>INSPECTION REPORT <span style={{ fontWeight: 400, color: TEXT_DARK_GRAY }}>for {name}</span></ModalHeader>
      <ModalBody pt={6} as={Stack} spacing={4}>
        <Stack>
          <Heading size={"sm"}>Findings</Heading>
          <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>{result?.findings}</Text>
        </Stack>

        <Stack>
          <Heading size={"sm"}>Result</Heading>
          <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>{result?.results}</Text>
        </Stack>
      </ModalBody>
      <ModalFooter as={HStack} spacing={3}>
        <CustomButton colorScheme="gray" onClick={onClose}>Close</CustomButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default InspectionResultModal