/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useTimer from "../../hooks/useTimer";
import { TEXT_GRAY } from "../../utils/color";

interface TimerComponentProps {
  time: number;
  isMinute?: boolean;
  isLoading?: boolean;
  onClick: (prop: any) => void;
}
const TimerComponent: React.FC<TimerComponentProps> = ({
  time,
  onClick,
  isLoading,
  isMinute,
}) => {
  const { currentTime, isDone, start } = useTimer(time, isMinute);

  useEffect(() => {
    start();
  }, []);
  return (
    <HStack alignItems={"center"}>
      <Button
        onClick={() => onClick(start)}
        size={"sm"}
        isLoading={isLoading}
        colorScheme="blue"
        isDisabled={!isDone}
        variant={"link"}
      >
        {!isLoading && "Resend code"}
      </Button>
      <Text color={TEXT_GRAY} fontSize={"sm"}>
        in{" "}
        {`${currentTime.minutes
          .toString()
          .padStart(2, "0")}:${currentTime.seconds
          .toString()
          .padStart(2, "0")}`}
      </Text>
    </HStack>
  );
};

export default TimerComponent;
