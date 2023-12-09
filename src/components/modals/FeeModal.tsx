import React from "react";
import ModalComponent from "./CustomModal";
import AuthInput from "./../common/AuthInput";
import CustomButton from "./../common/CustomButton";
import {
  HStack,
  Text,
  Box,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { DARK, TEXT_DARK } from "./../../utils/color";

const FeeModal = ({ onClose, isEditing, control, handleEdit, isOpen }) => {
  const [duration, setDuration] = React.useState<string>("monthly");
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  const handleCheckboxChange = (value: string) => {
    setDuration(value);
  };

  return (
    <ModalComponent
      onClose={onClose}
      isOpen={isOpen}
      size="lg"
      title="Edit Fee"
    >
      <SimpleGrid columns={[1]} gap={4}>
        <AuthInput
          name="name"
          label="Name"
          control={control}
          rules={{ required: "Fee Name is required" }}
        />
        <AuthInput
          name="description"
          label="Description"
          control={control}
          rules={{ required: "Description is required" }}
        />
        <AuthInput
          name="amount"
          label="Amount"
          control={control}
          rules={{ required: "Amount is required" }}
        />
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
            <StyledCheckbox
              isChecked={duration === "annually"}
              onChange={() => handleCheckboxChange("annually")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Annually
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={duration === "monthly"}
              onChange={() => handleCheckboxChange("monthly")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Monthly
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={duration === "weekly"}
              onChange={() => handleCheckboxChange("weekly")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Weekly
              </Text>
            </StyledCheckbox>
          </HStack>
        </Box>
        <Box>
          <HStack>
            <Switch
              id="status"
              colorScheme="brand"
              isChecked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              color={DARK}
              size="md"
            />
            <Text color={isChecked ? "#00BF55" : "black"}>
              {isChecked ? "Enabled" : "Disabled"}
            </Text>
          </HStack>
        </Box>
        <CustomButton
          isLoading={isEditing}
          onClick={handleEdit}
          width="108px"
          marginLeft="auto"
        >
          Save
        </CustomButton>
      </SimpleGrid>
    </ModalComponent>
  );
};

const StyledCheckbox = ({ children, isChecked, onChange }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderWidth="1px"
      borderRadius="50px"
      borderColor={isChecked ? "#62C28D" : "#C9CFD8"}
      bg={isChecked ? "#62C28D" : "white"}
      py={3}
      px={4}
      color={isChecked ? "white" : "363A43"}
      _hover={{ cursor: "pointer" }}
      onClick={onChange}
    >
      {children}
    </Box>
  );
};

export default FeeModal;
