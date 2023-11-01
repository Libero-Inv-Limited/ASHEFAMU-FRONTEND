import { CircularProgress, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK_GRAY } from "../../../utils/color"

interface DataLoaderProps { }
const DataLoader: React.FC<DataLoaderProps> = () => {
  return (
    <HStack py={6}>
      <CircularProgress isIndeterminate color='brand.300' size={6} />
      <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>Loading data...</Text>
    </HStack>
  )
}

export default DataLoader