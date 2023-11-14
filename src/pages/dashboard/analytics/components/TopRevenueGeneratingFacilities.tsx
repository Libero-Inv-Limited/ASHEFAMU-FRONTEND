import { HStack, Icon, Text, Divider, useDisclosure } from "@chakra-ui/react";
import { topRevenueGeneratingFacilities } from "../helpers";
import { BsHospital } from "react-icons/bs";
import { DARK } from "../../../../utils/color";
import CustomButton from "./../../../../components/common/CustomButton";

export const Lists = ({ name, amount }) => {
  const dashedLineStyle = {
    borderTop: "1px dashed #ccc",
    width: "50%",
    margin: "0 auto",
    backgroundColor: "#C9CFD8",
  };
  return (
    <HStack justifyContent="space-between" mb={6}>
      <Text fontSize="14px" color={DARK} fontFamily="Inter">
        <Icon as={BsHospital} mr={2} />
        {name}
      </Text>
      <Divider style={dashedLineStyle} />
      <Text fontFamily="Manrope" fontSize="14px" fontWeight="700">
        {amount}K
      </Text>
    </HStack>
  );
};
const TopRevenueGeneratingFacilities = () => {
  const { isOpen: isLoading, onClose } = useDisclosure();
  return (
    <>
      {topRevenueGeneratingFacilities.map((item) => (
        <Lists name={item.name} amount={item.amount} />
      ))}
      <CustomButton
        isDisabled={isLoading}
        onClick={onClose}
        w="full"
        color={DARK}
        bg="none"
        border="1px solid"
        borderColor="#C9CFD8"
        _hover={{ bg: "none" }}
    
      >
        See More
      </CustomButton>
    </>
  );
};

export default TopRevenueGeneratingFacilities;
