import { HStack, Text } from "@chakra-ui/react"
import React from "react"
import { HourIcon } from "../icons"

interface EmptyTableProps {
  isSearch?: boolean;
  text?: string;
}
const EmptyTable: React.FC<EmptyTableProps> = ({ isSearch, text }) => {
  return (
    <HStack spacing={1} justifyContent={"center"} py={4} justifyItems={"center"}>
      <HourIcon w={"25px"} h={"25px"} />
      {isSearch ? (
        <Text fontSize={"sm"} color={"#A3AEBD"}>No search results found</Text>
      ) : (
        <Text fontSize={"sm"} color={"#A3AEBD"}>{ text || "This table is empty"}</Text>
      )}
    </HStack>
  )
}

export default EmptyTable