/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, BreadcrumbItem, Center, HStack, Icon, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_GRAY } from "../../utils/color"
import { BsDot } from "react-icons/bs"
import { LuInfo } from "react-icons/lu"
import { humanReadableDate } from "../../utils/helpers"
import { executeReadUserNotification } from "../../apis/user"
import { useAppSelector } from "../../store/hook"

interface NotificationCardProps extends NotificationDataType {
  handleReload?: () => void
}
const NotificationCard: React.FC<NotificationCardProps> = ({ id,  priority, content, sender, created_at, handleReload }) => {
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const colorMap = {
    low: {
      bgColor: "#F1FAFF",
      color: "#2570EB"
    },
    other: {
      bgColor: "#FFF8DD",
      color: "#F59E0B"
    },
    high: {
      bgColor: "#FFDFDD",
      color: "#EF4444"
    }
  }

  const color = colorMap[priority] || colorMap['low']
  const handleMarkAsRead = async () => {
    if(isLoading) return
    try{
      openLoading()
      const response = await executeReadUserNotification(id, token!)
      if(response.status === "error") throw new Error(response.message)
      toast({
        status: "success",
        title: response.message
      })
      handleReload?.()
    }
    catch(e: any){
      toast({
        status: "success",
        title: e.message
      })
    }
    finally{
      closeLoading()
    }
  }

  return (
    <Stack p={6} bg={color.bgColor} w={"full"} flex={1} minW={"250px"} minH={130} rounded={"md"} onDoubleClick={handleMarkAsRead}>
      <HStack alignItems={"flex-start"}>
        <Stack flex={1} spacing={1}>
          <Text fontWeight={"600"} color={DARK} fontSize={"lg"}>{sender}</Text>
          <Breadcrumb separator={<Center><Icon as={BsDot} /></Center>}>
            <BreadcrumbItem fontWeight={"medium"} fontSize={"sm"} color={TEXT_GRAY}>
              <Text>{humanReadableDate(created_at)}</Text>
            </BreadcrumbItem>
          </Breadcrumb>

          <Text mt={2} color={DARK}>{content}</Text>
        </Stack>

        <Icon as={LuInfo}  color={color.color} fontSize={"2xl"} />
      </HStack>
    </Stack>
  )
}

export default NotificationCard