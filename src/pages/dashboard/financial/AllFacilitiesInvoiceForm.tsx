import { SimpleGrid } from "@chakra-ui/react";
import AuthInput from "./../../../components/common/AuthInput";
import { useAppSelector } from "../../../store/hook";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";


interface Props {
  onClose: () => void;
}
const AllFacilitiesInvoiceForm = (props: Props) => {
  const { facilities } = useAppSelector((state) => state.dataStore);
  const { control, trigger, getValues, reset } = useForm<InvoicePayload>();
  const {
    isOpen: isLoading,
    // onOpen: openLoading,
    // closeLoading: closeLoading,
  } = useDisclosure();

  const handleGenerateInvoice = () => {
    const payload = {
      ...getValues(),
    };
    reset()
    trigger()
    props.onClose()
    console.log({ payload });
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
        rules={{ required: "facility is required" }}
      />
      <AuthInput
        label="Inspector's name"
        name="inspector_name"
        control={control}
        rules={{ required: "Inspector's name is required" }}
      />
      <AuthInput
        label="Inspection date"
        name="inspection_date"
        control={control}
        rules={{ required: "Inspection date is required" }}
        type="date"
        width={"50%"}
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

export default AllFacilitiesInvoiceForm;
