/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ModalComponent from "./CustomModal";
import AuthInput from "./../common/AuthInput";
import CustomButton from "./../common/CustomButton";
import { HStack, Text, Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { TEXT_DARK } from "./../../utils/color";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hook";
import { executeCreateFee } from "../../apis/finances";
import { useAppDispatch } from "./../../store/hook";
import { populateFees } from "../../store/slice/dataSlice";
import useFetchFacilityData from "./../../hooks/useFetchFacilityData";
import { labelValueMap } from "../../utils/helpers";

const CreateFeeModal = ({ onClose, isOpen, handleReloadData, data }) => {
  const [duration, setDuration] = React.useState<string>(null);
  const [category, setCategory] = React.useState<string>(null);
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

  const dispatch = useAppDispatch();

  const { facilityCategory } = useFetchFacilityData();

  const handleCheckboxChange = (value: string, name: string) => {
    if (name === "category") {
      setCategory(value);
    } else {
      setDuration(value);
    }
  };

  const classOfFees = [
    { id: "urban", name: "urban" },
    { id: "rural", name: "rural" },
    { id: "main", name: "main" },
  ];

  const typeOfFees = [
    { id: "penalty", name: "penalty" },
    { id: "fee", name: "fee" },
  ];

  const handleCreateFee = async () => {
    if (!(await trigger())) return;
    try {
      openCreating();
      const payload: FeePayload = {
        ...getValues(),
        category:
          category === "custom" ? (getValues("category") as any) : category,
        duration:
          category === "penalty" || category === "registration" ? "one-time" : duration,
        description: (getValues("facility_category_id") as any).label,
        facility_category_id: (getValues("facility_category_id") as any).value,
        type: (getValues("type") as any).value,
        fee_class: (getValues("fee_class") as any).value,
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
      dispatch(populateFees(data));
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
        <Box mb={4}>
          <Text
            color={TEXT_DARK}
            fontSize={"14px"}
            mb={4}
            fontWeight={"500"}
            fontFamily={"body"}
          >
            Fee Category
          </Text>
          <HStack spacing={4}>
            <StyledCheckbox
              isChecked={category === "registration"}
              onChange={() => handleCheckboxChange("registration", "category")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Registration
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={category === "renewal"}
              onChange={() => handleCheckboxChange("renewal", "category")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Renewal
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={category === "penalty"}
              onChange={() => handleCheckboxChange("penalty", "category")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Penalty
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={category === "custom"}
              onChange={() => handleCheckboxChange("custom", "category")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Custom{" "}
              </Text>
            </StyledCheckbox>
          </HStack>
        </Box>
        {category === "custom" && (
          <AuthInput
            name="category"
            label="Category"
            control={control}
            rules={{ required: "Fee Name is required" }}
          />
        )}
        <AuthInput
          control={control}
          fontSize={"sm"}
          label="Facility category"
          name="facility_category_id"
          isSelect
          data={labelValueMap(facilityCategory)}
          rules={{
            required: "Facility category is required",
          }}
        />
        <AuthInput
          name="amount"
          label="Amount"
          control={control}
          rules={{ required: "Amount is required" }}
        />
        <AuthInput
          labelStyles={{
            fontWeight: "500",
          }}
          name="fee_class"
          control={control}
          isSelect
          label="Fee Class"
          data={labelValueMap<AreaCategoryType>(classOfFees)}
          rules={{
            required: "Fee class is required",
          }}
        />
        <AuthInput
          labelStyles={{
            fontWeight: "500",
          }}
          name="type"
          control={control}
          isSelect
          label="Fee Type"
          data={labelValueMap<AreaCategoryType>(typeOfFees)}
          rules={{
            required: "Fee class is required",
          }}
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
              onChange={() => handleCheckboxChange("annually", "duration")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Annually
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={duration === "monthly"}
              onChange={() => handleCheckboxChange("monthly", "duration")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Monthly
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={duration === "weekly"}
              onChange={() => handleCheckboxChange("weekly", "duration")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                Weekly
              </Text>
            </StyledCheckbox>
            <StyledCheckbox
              isChecked={duration === "one-time"}
              onChange={() => handleCheckboxChange("one-time", "duration")}
            >
              <Text mx="auto" fontSize="14px" fontWeight="500">
                One-Time
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
