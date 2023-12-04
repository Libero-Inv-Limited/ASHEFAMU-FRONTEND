import ModalComponent from "./../../../components/modals/CustomModal";
import AuthInput from "./../../../components/common/AuthInput";
import CustomButton from "./../../../components/common/CustomButton";
import { SimpleGrid, Heading } from "@chakra-ui/react";

const ScheduleInspectionModal = ({
  control,
  onClose,
  isOpen,
  isLoading,
  handleScheduleInspection,
  facilities,
}) => {
  return (
    <ModalComponent
      onClose={onClose}
      isOpen={isOpen}
      size={"xl"}
    >
      <SimpleGrid columns={[1]} gap={4}>
        <Heading fontWeight="700" fontSize="16px" textTransform="uppercase">Schedule Inspection</Heading>
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
          onClick={handleScheduleInspection}
          width="108px"
          marginLeft="auto"
        >
          Generate
        </CustomButton>
      </SimpleGrid>
    </ModalComponent>
  );
};

export default ScheduleInspectionModal;
