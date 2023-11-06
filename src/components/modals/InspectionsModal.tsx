/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonGroup, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState } from "react"
import { DARK } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import ScheduledTable from "../tables/ScheduledTable";
import ConductedTable from "../tables/ConductedTable";

interface InspectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const InspectionsModal: React.FC<InspectionsModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<"conducted" | "scheduled">("scheduled")

 return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"}>
    <ModalOverlay />
    <ModalContent bg={"transparent"}>
      <ModalHeader>
      <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
          <CustomButton colorScheme={tab === "scheduled" ? "primary" : "gray"} onClick={() => setTab("scheduled")} bg={tab === "scheduled" ? "primary.500" : "white"} color={tab === "scheduled" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >Scheduled</CustomButton>
          <CustomButton colorScheme={tab === "conducted" ? "primary" : "gray"} onClick={() => setTab("conducted")} bg={tab === "conducted" ? "primary.500" : "white"} color={tab === "conducted" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Conducted</CustomButton>
        </ButtonGroup>
      </ModalHeader>
      <ModalBody p={4} bg={"white"} rounded={"md"}>
       { tab === "scheduled" ? <ScheduledTable /> : <ConductedTable /> }
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default InspectionsModal