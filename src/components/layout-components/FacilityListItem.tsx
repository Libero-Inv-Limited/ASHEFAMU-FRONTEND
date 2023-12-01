import { HStack, Text } from "@chakra-ui/react";
import { useNavigation } from "../../contexts/NavContexts";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TEXT_DARK_GRAY } from "../../utils/color";
import { getSlug } from "../../utils/helpers";
import { facilityNavContents } from "../../utils/data";

interface FacilityListItemProps extends FacilityData {}
const FacilityListItem: React.FC<FacilityListItemProps> = ({ name }) => {
  const navigate = useNavigate();
  const { updateNavigation } = useNavigation();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/facilities/${getSlug(name!)}`);
    updateNavigation(getSlug(name!), facilityNavContents)
  };
  return (
    <HStack
      rounded={"sm"}
      _hover={{ bg: "gray.100" }}
      color={TEXT_DARK_GRAY}
      spacing={2}
      onClick={handleClick}
      alignItems={"center"}
      p={3}
      h={"40px"}
    >
      <Text
        textTransform={"capitalize"}
        color={"inherit"}
        fontWeight={"500"}
        fontSize={"sm"}
      >
        {name}
      </Text>
    </HStack>
  );
};

export default FacilityListItem;
