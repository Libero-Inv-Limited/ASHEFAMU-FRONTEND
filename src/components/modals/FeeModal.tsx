/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DARK, TEXT_DARK } from "./../../utils/color";
import { useForm } from "react-hook-form";
import { executeUpdateFee } from "../../apis/finances";
import { useAppSelector } from "../../store/hook";
import { useAppDispatch } from "./../../store/hook";
import { populateFees } from "../../store/slice/dataSlice";
import { labelValueMap } from "../../utils/helpers";
import useFetchFacilityData from "../../hooks/useFetchFacilityData";

const FeeModal = ({ onClose, isOpen, editId, handleReloadData }) => {
  const [duration, setDuration] = React.useState<string>("monthly");
  // const [fee, setFee] = React.useState<FeeDataType | null>(null)
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const fees = useAppSelector((state) => state.dataStore.fees);
  const feeData = fees.find((fee) => fee.id === editId);
  const { facilityCategory } = useFetchFacilityData();
  const { control, trigger, getValues, reset, setValue } =
    useForm<FeePayload>();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const classOfFees = [
    { id: "urban", name: "urban" },
    { id: "rural", name: "rural" },
    { id: "main", name: "main" },
  ];

  const typeOfFees = [
    { id: "penalty", name: "penalty" },
    { id: "fee", name: "fee" },
  ];

  const handleCheckboxChange = (value: string) => {
    setDuration(value);
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (feeData) {
      setValue("category", feeData.category || "");
      setValue("description", feeData.description || "");
      setValue("amount", feeData.amount || "");

      // Manually set the value for the duration field
      setDuration(feeData.duration || "");

      // Manually set the value for the status field (checkbox)
      setIsChecked(feeData.status === "active");
    }
  }, [feeData, setValue, setDuration, setIsChecked]);

  const handleEditFee = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: FeePayload = {
        id: +editId!,
        category: getValues("category"),
        amount: getValues("amount"),
        description: getValues("description"),
        duration,
        status: isChecked ? "active" : "inactive",
        fee_class: (getValues("fee_class") as any).value,
        facility_category_id: (getValues("facility_category_id") as any).value,
        type: (getValues("type") as any).value,
      };
      const response = await executeUpdateFee(payload, token!);
      if (response.status === "error") throw new Error(response.message);
      const updatedFees = fees.map((fee) =>
        fee.id === editId ? { ...fee, ...payload } : fee
      );
      dispatch(populateFees(updatedFees));
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
      closeLoading();
    }
  };

  return (
    <ModalComponent
      onClose={onClose}
      isOpen={isOpen}
      size="lg"
      title="Edit Fee"
    >
      {feeData && (
        <SimpleGrid columns={[1]} gap={4}>
          <AuthInput
            name="category"
            label="Category"
            control={control}
            rules={{ required: "Fee Category is required" }}
            value={feeData.category}
          />
          <AuthInput
            control={control}
            fontSize={"sm"}
            label="Facility category"
            name="facility_category_id"
            value={
              labelValueMap(facilityCategory).find(
                (item) => Number(item.value) === feeData!.facility_category_id
              ) as any
            }
            isSelect
            data={labelValueMap(facilityCategory)}
            rules={{
              required: "Facility category is required",
            }}
          />
          <AuthInput
            name="description"
            label="Description"
            control={control}
            rules={{ required: "Description is required" }}
            value={feeData.description}
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
            value={
              labelValueMap(classOfFees).find(
                (item) => item.value === feeData!.fee_class!
              ) as any
            }
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
            value={
              labelValueMap(typeOfFees).find(
                (item) => item.value === feeData!.type!
              ) as any
            }
            data={labelValueMap<AreaCategoryType>(typeOfFees)}
            rules={{
              required: "Fee type is required",
            }}
          />
          <AuthInput
            name="amount"
            label="Amount"
            control={control}
            rules={{ required: "Amount is required" }}
            value={feeData.amount}
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
                isChecked={duration === "one-time"}
                onChange={() => handleCheckboxChange("one-time")}
              >
                <Text mx="auto" fontSize="14px" fontWeight="500">
                  One-Time
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
            isLoading={isLoading}
            onClick={handleEditFee}
            width="108px"
            marginLeft="auto"
          >
            Save
          </CustomButton>
        </SimpleGrid>
      )}
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
