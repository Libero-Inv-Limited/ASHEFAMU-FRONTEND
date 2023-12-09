/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ModalComponent from "./CustomModal";
import AuthInput from "./../common/AuthInput";
import CustomButton from "./../common/CustomButton";
import { HStack, Text, Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { TEXT_DARK } from "./../../utils/color";
import { useForm } from "react-hook-form";
import { useToast } from '@chakra-ui/react';
import { useAppSelector } from "../../store/hook";
import { executeCreateFee } from "../../apis/finances";

const CreateFeeModal = ({ onClose, isOpen, handleReloadData }) => {
  const [duration, setDuration] = React.useState<string>(null);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const { control, getValues, reset, trigger } = useForm<FeePayload>({
    mode: "onSubmit",
  });

  const {
    isOpen: isCreating,
    onOpen: openCreating,
    onClose: closeCreating,
  } = useDisclosure();

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });


  const handleCheckboxChange = (value: string) => {
    setDuration(value);
  };

  const handleCreateFee = async () => {
    if (!(await trigger())) return;
    try {
      openCreating();
      const payload: FeePayload = {
        ...getValues(),
        duration,
      };

      const response = await executeCreateFee(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      reset();
      onClose();
      handleReloadData();
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeCreating();
    }
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
          name="category"
          label="Category"
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
        <CustomButton
          isLoading={isCreating}
          onClick={handleCreateFee}
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

export default CreateFeeModal;
