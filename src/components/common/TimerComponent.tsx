import { Button, HStack, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import useTimer from "../../hooks/useTimer"
import { TEXT_GRAY } from "../../utils/color";

interface TimerComponentProps { 
  time: number;
  isMinute?: boolean;
  onClick: () => void; 
}
const TimerComponent: React.FC<TimerComponentProps> = ({ time, isMinute }) => {
  const { currentTime, isDone, start } = useTimer(time, isMinute)

  useEffect(() => {
    start()
  }, [])
  return (
    <HStack alignItems={"center"}>
      <Button size={"sm"} colorScheme="blue" isDisabled={!isDone} variant={"link"}>Resend code</Button>
      <Text color={TEXT_GRAY} fontSize={"sm"}>in {`${(currentTime.minutes).toString().padStart(2, "0")}:${currentTime.seconds.toString().padStart(2, "0")}`}</Text>
    </HStack>
  )
}

export default TimerComponent