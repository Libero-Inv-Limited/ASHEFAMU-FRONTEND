import { HStack, Text, useDisclosure, Box } from "@chakra-ui/react";
import { inspectionStats } from "../helpers";
import { DARK, LIGHT_BG } from "../../../../utils/color";
import CustomButton from "./../../../../components/common/CustomButton";

export const Lists = ({ name, status, date }) => {
  return (
    <Box mb={6} bg={LIGHT_BG} p="10px">
      <Text
        fontSize="14px"
        color={DARK}
        fontFamily="Inter"
        fontWeight={700}
        mb="10px"
      >
        {name}
      </Text>
      <HStack justifyContent="space-between">
        <div style={{ display: "flex" }}>
          <span color="#444B5A" style={{ fontWeight: "400", fontSize: "14px" }}>
            Status:
          </span>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="700"
            color={status ? "#48A874" : "#DC2626"}
            ml={2}
          >
            {status ? "Passed" : "Failed"}
          </Text>
        </div>
        <span
          style={{ color: "#A3AEBD", fontSize: "12px", fontStyle: "italic" }}
        >
          {date}
        </span>
      </HStack>
    </Box>
  );
};
const Inspection = () => {
  const { isOpen: isLoading, onClose } = useDisclosure();
  return (
    <>
      {inspectionStats.map((item, idx) => (
        <Lists
          key={idx}
          name={item.name}
          status={item.status}
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
        w="full"
      >
        See More
      </CustomButton>
    </>
  );
};

export default Inspection;
