import { Box, Center, HStack, Heading, Icon, Stack } from "@chakra-ui/react";
import React from "react"
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { DARK, LIGHT_BG } from "../../utils/color";

interface StepperProps {
  currentIndex: number;
  steps: { title: string }[];
}
const Stepper: React.FC<StepperProps> = ({ currentIndex, steps }) => {
  return (
    <HStack spacing={0} w={"full"}>
      {steps.map((step, index) => {
        const isActive = index <= currentIndex
        return (
          <HStack spacing={0} flex={1} alignItems={"flex-start"}>
            <Stack flex={1} spacing={6}>
              <Box
                h={2} w={"100%"} rounded={"sm"}
                bg={isActive ? "primary.500" : LIGHT_BG} />
              <Heading flex={1} textAlign={"center"} noOfLines={2} fontWeight={"600"} textTransform={"uppercase"} fontSize={["sm", "sm", "md"]} color={DARK} fontFamily={"rubik"}>{step.title}</Heading>
            </Stack>
            <Center transform={"translateY(-6px)"} rounded={"full"}>
              <Icon color={isActive ? "primary.500" : "#C9CFD8"} fontSize={"xl"} as={isActive ? BsCheckCircleFill : BsCheckCircle} />
            </Center>
          </HStack>
        )
      })}
    </HStack>
  )
}

export default Stepper