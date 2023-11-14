import {
  HStack,
  Text,
  Divider,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { userRoles } from "../helpers";
import { DARK } from "../../../../utils/color";
import CustomButton from "./../../../../components/common/CustomButton";

export const Lists = ({ name, amount, percentage }) => {
  const dashedLineStyle = {
    borderTop: "1px dashed #ccc",
    width: "50%",
    margin: "0 auto",
    backgroundColor: "#C9CFD8",
  };
  return (
    <HStack justifyContent="space-between" mb={6}>
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
const UserRolesDist = () => {
  const { isOpen: isLoading, onClose } = useDisclosure();
  return (
    <>
      <Heading fontSize="14px" fontWeight={600} mb={6}>
        Total number of users: 78
      </Heading>
      {userRoles.map((item) => (
        <Lists
          name={item.name}
          amount={item.amount}
          percentage={item.percentage}
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
        left={6}
        right={6}
        bottom={6}
      >
        See More
      </CustomButton>
    </>
  );
};

export default UserRolesDist;
