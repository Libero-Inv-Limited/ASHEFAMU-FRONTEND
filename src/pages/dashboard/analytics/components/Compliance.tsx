import {
  HStack,
  Text,
  Divider,
  useDisclosure,
  Heading,
  Box,
} from "@chakra-ui/react";
import { complianceBreakdown } from "../helpers";
import { DARK } from "../../../../utils/color";
import CustomButton from "./../../../../components/common/CustomButton";

export const Lists = ({ name, amount, percentage, color }) => {
  const dashedLineStyle = {
    borderTop: "1px dashed #ccc",
    width: "50%",
    margin: "0 auto",
    backgroundColor: "#C9CFD8",
  };
  return (
    <HStack justifyContent="space-between" mb={6}>
      <Box width="12px" height="12px" bgColor={color} borderRadius="50%"></Box>
      <Text fontSize="14px" color={DARK} fontFamily="Inter">
        {name}({percentage}%)
      </Text>
      <Divider style={dashedLineStyle} />
      <Text fontFamily="Inter" fontSize="14px" fontWeight="700">
        {amount}
      </Text>
    </HStack>
  );
};
const Compliance = () => {
  const { isOpen: isLoading, onClose } = useDisclosure();
  return (
    <>
      <Heading fontSize="14px" fontWeight={600} mb={6}>
        Total number of facilities: 78
      </Heading>
      {complianceBreakdown.map((item) => (
        <Lists
          name={item.name}
          amount={item.amount}
          percentage={item.percentage}
          color={item.color}
        />
      ))}
      <CustomButton
        isDisabled={isLoading}
        onClick={onClose}
        color={DARK}
        bg="none"
        border="1px solid"
        borderColor="#C9CFD8"
        _hover={{ bg: "none" }}
        w="full"
      >
        See More
      </CustomButton>
    </>
  );
};

export default Compliance;
