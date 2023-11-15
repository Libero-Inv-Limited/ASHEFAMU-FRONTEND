import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

const GeneralStats = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" rowGap={4}>
      <GridItem colSpan={12}>
        <Box bgColor="white" p={4}>
          <Text fontFamily="inter" fontSize={20} fontWeight={500}>
            No of Registered Facilities
          </Text>
          <Text
            fontSize={32}
            fontFamily="rubik"
            fontWeight={500}
            color="#008940"
          >
            206
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={12}>
        <Box bgColor="white" p={4}>
          <Text fontFamily="inter" fontSize={20} fontWeight={500}>
            No of Registered Facilities
          </Text>
          <Text
            fontSize={32}
            fontFamily="rubik"
            fontWeight={500}
            color="#008940"
          >
            206
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default GeneralStats;
