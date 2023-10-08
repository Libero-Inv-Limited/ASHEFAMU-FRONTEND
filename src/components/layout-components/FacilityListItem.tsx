import { HStack, Text } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK_GRAY } from "../../utils/color";
import { Link } from "react-router-dom";
import { getSlug } from "../../utils/helpers";

interface FacilityListItemProps { 
  name: string;
}
const FacilityListItem: React.FC<FacilityListItemProps> = ({name}) => {
  return (
    <HStack rounded={"sm"} to={`/facilities/${getSlug(name)}`} _hover={{ bg: "gray.100" }} color={TEXT_DARK_GRAY }  spacing={2} as={Link} alignItems={"center"} p={3} h={"40px"}>
      <Text textTransform={"capitalize"} color={"inherit"} fontWeight={"500"} fontSize={"sm"}>{name}</Text>
    </HStack>
  )
}

export default FacilityListItem