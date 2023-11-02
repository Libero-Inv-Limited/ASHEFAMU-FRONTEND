import { Heading, Stack, Text } from "@chakra-ui/react"
import React from "react"

interface DashboardCardProps extends DashboardCardType { 
}
const DashboardCard: React.FC<DashboardCardProps> = ({ name, content }) => {
  return (
   <Stack w={"full"} minH={131} rounded={"4px"} p={6} pt={2} minW={246} bg={`linear-gradient(249deg, #25C6A9 2.65%, #0E767C 80.3%);
   `}>
      <Stack>
        <Text fontWeight={"medium"} color={"white"}>{name}</Text>
        <Heading size={["lg"]} color={"white"}>{content}</Heading>
      </Stack>
   </Stack>
  )
}

export default DashboardCard