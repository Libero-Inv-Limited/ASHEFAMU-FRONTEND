import { HStack, Heading, Select, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { DARK } from "../../utils/color";

interface DashboardCardProps { 
  isGreen?: boolean;
  isActive?: boolean;
  name: string;
  amount: number | string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({ isGreen, amount, name, isActive  }) => {
  return (
   <Stack borderWidth={isGreen ? undefined : "1px"} borderColor={isGreen ? "transparent" : isActive ? "brand.500" : "#DC2626"} w={"full"} minH={131} rounded={"4px"} p={6} pt={isGreen ? 2 : 6} minW={246} bg={isGreen ? `linear-gradient(249deg, #25C6A9 2.65%, #0E767C 80.3%);
   `: "white"}>
      <HStack justifyContent={"flex-end"}>
      { isGreen && 
        <Select color={"white"} fontWeight={"500"} w={"100px"} variant={"unstyled"} size={"xs"}>
          <option value="">This month</option>
        </Select> }
      </HStack>
      <Stack>
        <Text fontWeight={"medium"} color={isGreen ? "white" : DARK}>{name}</Text>
        <Heading size={["lg"]} color={isGreen ? "white" : isActive ? "brand.500" : "#DC2626"}>{amount}</Heading>
      </Stack>
   </Stack>
  )
}

export default DashboardCard