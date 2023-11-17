import { Grid, GridItem, Heading } from "@chakra-ui/react";
import ErrorRate from "./ErrorRates";
import ServerHealth from "./ServerHealth";

const SystemInfo = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem colSpan={1}>
        <Heading
          fontSize="14px"
          color="#64748B"
          fontWeight="500"
          textAlign="center"
        >
          Server Health
        </Heading>
        <ErrorRate />
      </GridItem>
      <GridItem colSpan={1}>
        <Heading
          fontSize="14px"
          color="#64748B"
          fontWeight="500"
          textAlign="center"
        >
          Error Rates{" "}
        </Heading>
        <ServerHealth />
      </GridItem>
    </Grid>
  );
};

export default SystemInfo;
