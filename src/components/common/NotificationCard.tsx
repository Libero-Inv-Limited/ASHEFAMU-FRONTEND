import { Breadcrumb, BreadcrumbItem, Center, HStack, Icon, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_GRAY } from "../../utils/color"
import { BsDot } from "react-icons/bs"
import { LuInfo } from "react-icons/lu"

interface NotificationCardProps {
  type: "info" | "warning" | "error"
}
const NotificationCard: React.FC<NotificationCardProps> = ({ type }) => {
  const colorMap = {
    info: {
      bgColor: "#F1FAFF",
      color: "#2570EB"
    },
    warning: {
      bgColor: "#FFF8DD",
      color: "#F59E0B"
    },
    error: {
      bgColor: "#FFDFDD",
      color: "#EF4444"
    }
  }

  const color = colorMap[type]
  return (
    <Stack p={6} bg={color.bgColor} w={"full"} minW={"250px"} minH={130} rounded={"sm"}>
      <HStack alignItems={"flex-start"}>
        <Stack flex={1} spacing={1}>
          <Text fontWeight={"600"} color={DARK} fontSize={"lg"}>Sender</Text>
          <Breadcrumb separator={<Center><Icon as={BsDot} /></Center>}>
            <BreadcrumbItem fontWeight={"medium"} fontSize={"sm"} color={TEXT_GRAY}>
              <Text>header</Text>
            </BreadcrumbItem>

            <BreadcrumbItem fontWeight={"medium"} fontSize={"sm"} color={TEXT_GRAY}>
              <Text>timestamp</Text>
            </BreadcrumbItem>
          </Breadcrumb>

          <Text mt={2} color={DARK}>message body message body message body message body message body message body message body </Text>
        </Stack>

        <Icon as={LuInfo}  color={color.color} fontSize={"2xl"} />
      </HStack>
    </Stack>
  )
}

export default NotificationCard