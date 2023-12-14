/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalComponent from "./CustomModal";
import { HStack, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { TEXT_DARK } from "./../../utils/color";


const CreateFeeModal = ({ onClose, isOpen }) => {

  return (
    <ModalComponent
      onClose={onClose}
      isOpen={isOpen}
      size="lg"
      title="Edit Fee"
    >
      <SimpleGrid columns={[1]} gap={4}>
        <Box mb={4}>
          <Text
            color={TEXT_DARK}
            fontSize={"14px"}
            mb={4}
            fontWeight={"500"}
            fontFamily={"body"}
          >
            Duration
          </Text>
          <HStack spacing={4}>
            
          </HStack>
        </Box>
      </SimpleGrid>
    </ModalComponent>
  );
};

export default CreateFeeModal;
