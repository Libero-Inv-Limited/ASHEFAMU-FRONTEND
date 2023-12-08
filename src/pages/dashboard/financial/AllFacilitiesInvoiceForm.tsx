/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  SimpleGrid,
  useToast,
  HStack,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import AuthInput from "./../../../components/common/AuthInput";
import { useAppSelector } from "../../../store/hook";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import { executeGetAllFacilityCategories } from "./../../../apis/facility";
import {
  executeGenerateBulkInvoices,
  executeGetAllFees,
} from "../../../apis/finances";

interface Props {
  onClose: () => void;
}

const SomeFacilitiesInvoiceForm = (props: Props) => {
  const { control, trigger, getValues, reset } = useForm<InvoicePayload>();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const [fees, setFees] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [facilitySector, setFacilitySector] = React.useState(1);

  const handleCheckboxChange = (id: number) => {
    setFacilitySector(id);
  };

  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleFetchData = async () => {
    try {
      const fees = await executeGetAllFees(token!);
      const categories = await executeGetAllFacilityCategories(token!);
      setCategories(categories.data);
      setFees(fees.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  React.useEffect(() => {
    handleFetchData();
    //eslint-disable-next-line
  }, []);

  const handleGenerateInvoice = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: InvoicePayload = {
        ...getValues(),
        fee_type: (getValues("fee_type") as any).value,
        facility_category: (getValues("facility_category") as any).value,
        specific_facilities: false,
        all_facilities: true,
        facility_sector: facilitySector
      };

      const response = await executeGenerateBulkInvoices(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      reset();
      props.onClose();
      // handleReloadData();
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
    <SimpleGrid columns={[1]} gap={4}>
      <Heading
        fontSize="14px"
        color="#4E596C"
        fontWeight="500"
      >
        Sector category
      </Heading>
      <HStack spacing={4}>
        <StyledCheckbox
          isChecked={facilitySector === 1}
          onChange={() => handleCheckboxChange(1)}
        >
          <Text mx="auto">Private</Text>
        </StyledCheckbox>
        <StyledCheckbox
          isChecked={facilitySector === 2}
          onChange={() => handleCheckboxChange(2)}
        >
          <Text mx="auto">Public</Text>
        </StyledCheckbox>
      </HStack>
      <AuthInput
        label="Facility Category"
        name="facility_category"
        control={control}
        isSelect
        data={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        rules={{ required: "Facility category is required" }}
      />
      <AuthInput
        label="Fee Category"
        name="fee_type"
        control={control}
        isSelect
        data={fees.map((fee) => ({ value: fee.id, label: fee.category }))}
        rules={{ required: "Fee category is required" }}
      />
      <CustomButton
        isLoading={isLoading}
        onClick={handleGenerateInvoice}
        width="108px"
        marginLeft="auto"
      >
        Generate
      </CustomButton>
    </SimpleGrid>
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
      width="100px"
      py={2}
      color={isChecked ? "white" : "363A43"}
      _hover={{ cursor: "pointer" }}
      onClick={onChange}
    >
      {children}
    </Box>
  );
};

export default SomeFacilitiesInvoiceForm;
