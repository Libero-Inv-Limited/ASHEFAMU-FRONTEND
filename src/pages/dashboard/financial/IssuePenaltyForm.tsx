/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SimpleGrid, useToast, Box } from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { useAppSelector } from "../../../store/hook";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import { executeGeneratePenalty } from "./../../../apis/finances";
import { executeGetPenaltyItems } from "./../../../apis/finances";

interface Props {
  onClose: () => void;
  handleReloadData: () => void;
}

const IssuePenaltyForm = (props: Props) => {
  const { control, trigger, getValues, reset, setValue } =
    useForm<PenaltyPayload>();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const { facilities } = useAppSelector((state) => state.dataStore);
  const [penaltyResults, setPenaltyResults] = React.useState<PenaltyItems>();

  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleIssuePenalty = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: PenaltyPayload = {
        ...getValues(),
        facility_id: (getValues("facility_id") as any).value,
      };

      const response = await executeGeneratePenalty(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      reset();
      props.onClose();
      props.handleReloadData();
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

  const handleChange = async (e: any) => {
    const results = await executeGetPenaltyItems(e.value, token);
    setPenaltyResults(results.data);
  };

  return (
    <SimpleGrid columns={[1]} gap={4}>
      <AuthInput
        label="Facility"
        name="facility_id"
        control={control}
        onChange={handleChange}
        isSelect
        data={facilities.map((facility) => ({
          value: facility.id,
          label: facility.name,
        }))}
        rules={{ required: "Facility is required" }}
      />
      <AuthInput
        label="Details"
        name="details"
        control={control}
        type="textarea"
        rules={{ required: "Details is required" }}
      />
      {penaltyResults && <Box color="red">Amount: {penaltyResults.amount}</Box>}
      <CustomButton
        isLoading={isLoading}
        onClick={handleIssuePenalty}
        width="108px"
        marginLeft="auto"
      >
        Generate
      </CustomButton>
    </SimpleGrid>
  );
};

export default IssuePenaltyForm;
