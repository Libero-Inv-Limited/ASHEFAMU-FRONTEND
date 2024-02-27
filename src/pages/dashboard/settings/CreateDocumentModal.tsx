import ModalComponent from "./../../../components/modals/CustomModal";
import AuthInput from "./../../../components/common/AuthInput";
import CustomButton from "./../../../components/common/CustomButton";
import { SimpleGrid, Heading } from "@chakra-ui/react";

const CreateDocumentModal = ({
  control,
  onClose,
  isOpen,
  isLoading,
  handleCreateDoc,
}) => {
  const compulsory = [{ name: "false" }, { name: "true" }];
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} size={"xl"}>
      <SimpleGrid columns={[1]} gap={4}>
        <Heading fontWeight="700" fontSize="16px" textTransform="uppercase">
          Create Required Document
        </Heading>
        <AuthInput
          label="Name of Document"
          name="name"
          control={control}
          rules={{ required: "Inspector's name is required" }}
        />
        <AuthInput
          label="Compulsory?"
          name="compulsory"
          control={control}
          isSelect
          data={compulsory.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
          rules={{ required: "facility is required" }}
        />
        <CustomButton
          isLoading={isLoading}
          onClick={handleCreateDoc}
          width="108px"
          marginLeft="auto"
        >
          Generate
        </CustomButton>
      </SimpleGrid>
    </ModalComponent>
  );
};

export default CreateDocumentModal;
