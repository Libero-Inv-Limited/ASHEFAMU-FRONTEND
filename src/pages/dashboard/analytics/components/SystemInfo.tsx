import { HStack } from "@chakra-ui/react";
import ErrorRate from "./ErrorRates";
import ServerHealth from "./ServerHealth";

const SystemInfo = () => {
  return (
    <HStack>
      <ErrorRate />
      <ServerHealth/>
    </HStack>
  );
};

export default SystemInfo;
