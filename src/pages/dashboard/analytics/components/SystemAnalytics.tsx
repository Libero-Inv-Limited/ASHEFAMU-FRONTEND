import { HStack, Text, useDisclosure, Box } from "@chakra-ui/react";
import { systemStats } from "../helpers";
import { DARK, LIGHT_BG } from "../../../../utils/color";
import CustomButton from "./../../../../components/common/CustomButton";

export const Lists = ({ type, description, date }) => {
  return (
    <Box mb={6} bg={LIGHT_BG} p="10px">
      <HStack>
        <Text
          fontSize="14px"
          color={DARK}
          fontFamily="Inter"
          fontWeight={700}
        >
          {type}:
        </Text>
        <Text fontSize="14px" color={DARK} fontFamily="Inter">
          {description}
        </Text>
      </HStack>
      <HStack justifyContent="flex-end">
        <span
          style={{ color: "#A3AEBD", fontSize: "12px", fontStyle: "italic" }}
        >
          {date}
        </span>
      </HStack>
    </Box>
  );
};
const SystemAnalytics = () => {
  const { isOpen: isLoading, onClose } = useDisclosure();
  return (
    <>
      {systemStats.map((item, idx) => (
        <Lists
          key={idx}
          type={item.type}
          description={item.description}
          date={item.date}
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
        position="absolute"
        bottom="10px"
        right="10px"
        left="10px"
      >
        See More
      </CustomButton>
    </>
  );
};

export default SystemAnalytics;
