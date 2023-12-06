import ModalComponent from "./../../../components/modals/CustomModal";
import AuthInput from "./../../../components/common/AuthInput";
import CustomButton from "./../../../components/common/CustomButton";
import { SimpleGrid, Heading } from "@chakra-ui/react";

const SubmitInspectionModal = ({
  control,
  onClose,
  isOpen,
  isLoading,
  handleScheduleInspection,
}) => {
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} size={"xl"}>
      <SimpleGrid
        columns={[1]}
        gap={4}
      >
        <Heading fontWeight="700" fontSize="16px" textTransform="uppercase">
          Inspection Report
        </Heading>
        <AuthInput
          label="Findings"
          name="findings"
          control={control}
          rules={{ required: "Findings are required" }}
        />
        <AuthInput
          label="Results"
          name="results"
          control={control}
          rules={{ required: "Results are required" }}
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
          Submit
        </CustomButton>
      </SimpleGrid>
    </ModalComponent>
  );
};

export default SubmitInspectionModal;
