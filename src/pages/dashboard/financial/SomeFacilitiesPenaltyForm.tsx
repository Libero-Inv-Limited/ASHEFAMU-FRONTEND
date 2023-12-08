/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import AuthInput from "./../../../components/common/AuthInput";
import { useAppSelector } from "../../../store/hook";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import {
  executeGenerateBulkInvoices,
  executeGetAllFees,
} from "../../../apis/finances";

interface Props {
  onClose: () => void;
}

const SomeFacilitiesPenaltyForm = (props: Props) => {
  const { facilities } = useAppSelector((state) => state.dataStore);
  const { control, trigger, getValues, reset } = useForm<InvoicePayload>();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const [fees, setFees] = React.useState([]);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const fetchFees = async () => {
    try {
      const fees = await executeGetAllFees(token);
      setFees(fees.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  React.useEffect(() => {
    fetchFees();
    //eslint-disable-next-line
  }, []);

  const handleGenerateInvoice = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: InvoicePayload = {
        ...getValues(),
        fee_type: (getValues("fee_type") as any).value,
        facilities: (getValues("facilities") as any).map((item) => item.value),
        specific_facilities: true,
        all_facilities: false,
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
      <AuthInput
        label="Fee Category"
        name="fee_type"
        control={control}
        isSelect
        data={fees.map((fee) => ({ value: fee.id, label: fee.category }))}
        rules={{ required: "Fee category is required" }}
      />
      <AuthInput
        label="Facility"
        name="facilities"
        control={control}
        isSelect
        data={facilities.map((facility) => ({
          value: facility.id,
          label: facility.name,
        }))}
        rules={{ required: "facility is required" }}
        selectProps={{ isMulti: true }}
      />
      <AuthInput
        label="Amount"
        name="amount"
        control={control}
        rules={{ required: "Amount is required" }}
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

export default SomeFacilitiesPenaltyForm;
