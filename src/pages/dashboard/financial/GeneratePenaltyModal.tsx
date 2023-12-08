/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalComponent from "./../../../components/modals/CustomModal";
import { Box, Heading } from "@chakra-ui/react";
import IssuePenaltyForm from "./IssuePenaltyForm";

const GeneratePenaltyModal = ({ onClose, isOpen, handleReloadData }) => {
  
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} size={"3xl"}>
      <Heading
        fontWeight="700"
        fontSize="16px"
        textTransform="uppercase"
        mb={9}
      >
        Generate Penalty
      </Heading>
      <Box p={2} px={3} bg={"white"} rounded={"md"}>
        <IssuePenaltyForm onClose={onClose} handleReloadData={handleReloadData}/>
      </Box>
    </ModalComponent>
  );
};

export default GeneratePenaltyModal;
