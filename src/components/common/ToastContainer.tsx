import React from "react"
import { Center, HStack, Icon, IconButton, Stack, Text } from "@chakra-ui/react"
import { CheckIcon, InfoIcon, CautionIcon } from "../icons";
import { TEXT_DARK } from "../../utils/color";
import { RxCross1 } from "react-icons/rx";

interface ToastContainerProps {
  status: "error" | "danger" | "success" | "warning" ;
  title: string;
  text?: string;
}

const dataMap = {
  "danger": {
    border: "1px solid #EF4444",
    bg: "#FEF2F2",
    boxShadow: "0px 7px 20px 0px rgba(211, 31, 31, 0.10)",
    color: "#EF4444"
  },
  "error": {
    border: "1px solid #EF4444",
    bg: "#FEF2F2",
    boxShadow: "0px 7px 20px 0px rgba(211, 31, 31, 0.10)",
    color: "#EF4444"
  },
  "success": {
    border: "1px solid #62C28D",
    bg: "#EDFFF5",
    boxShadow: "0px 7px 20px 0px rgba(30, 217, 38, 0.10)",
    color: "#02E56B"
  },
  "warning": {
    border: "1px solid #F59E0B",
    bg: "#FFF8EB",
    boxShadow: "0px 7px 20px 0px rgba(242, 176, 76, 0.10)",
    color: "#02E56B"
  },
}

const IconMap = {
  "danger": <InfoIcon fill={"inherit"} color={"inherit"} w={"24px"} h={"24px"} />,
  "error": <InfoIcon fill={"inherit"} color={"inherit"} w={"24px"} h={"24px"} />,
  "success": <CheckIcon fill={"inherit"} color={"inherit"} w={"24px"} h={"24px"} />,
  "warning": <CautionIcon fill={"inherit"} color={"inherit"} w={"24px"} h={"24px"} />,
}

const iconShadeColor = {
  "danger": { bg: "#FFE5E5" },
  "error": { bg: "#FFE5E5" },
  "success": { bg: "#D7FDD6" },
  "warning": { bg: "#FFF0D4" }
}
const ToastContainer: React.FC<ToastContainerProps> = ({ status, title, text }) => {
  return (
    <HStack borderRadius={"4px"} py={4} {...dataMap[status]}>
      <Center {...iconShadeColor[status]} rounded={"full"} w={"40px"} h={"40px"}>
        { IconMap[status] }
      </Center>

      <Stack flex={1} spacing={0}>
        <Text fontSize={"sm"} fontWeight={500} color={TEXT_DARK}>{title}</Text>
        { text && <Text fontSize={"xs"} color={TEXT_DARK}>{text}</Text> }
      </Stack>

      <IconButton 
        aria-label="close"
        size={"sm"}
        icon={<Icon as={RxCross1} fontSize={"24px"} color={TEXT_DARK} />}
      />
    </HStack>
  )
}

export default ToastContainer