/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { useAppSelector } from "../../../store/hook";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import { executeGeneratePenalty } from './../../../apis/finances';

interface Props {
  onClose: () => void;
  handleReloadData: () => void;
}

const IssuePenaltyForm = (props: Props) => {
  const { control, trigger, getValues, reset } = useForm<PenaltyPayload>();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const { facilities } = useAppSelector((state) => state.dataStore);

 
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
  return (
    <SimpleGrid columns={[1]} gap={4}>
      <AuthInput
        label="Facility"
        name="facility_id"
        control={control}
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
      <AuthInput
        label="Amount"
        name="amount"
        type="number"
        control={control}
        width={"50%"}
        rules={{ required: "Amount is required" }}
      />
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
