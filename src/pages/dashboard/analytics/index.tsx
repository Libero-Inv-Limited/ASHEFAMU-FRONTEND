import { Grid, GridItem, Heading, Box } from "@chakra-ui/react";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { data } from "./helpers";

interface AnalyticsProps {}
const Analytics: React.FC<AnalyticsProps> = () => {
  return (
    <DashboardLayout>
      {data.map((section) => (
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} columnGap={8}>
          {section.components.map((item) => (
            <GridItem colSpan={item.size} bg="white" p={6} mb={10}>
              <Heading
                color="#1A1C1E"
                fontSize={18}
                fontFamily="rubik"
                fontWeight={600}
                mb="50px"
              >
                {item.title}
              </Heading>
              <Box>{item.component}</Box>
            </GridItem>
          ))}
        </Grid>
      ))}
    </DashboardLayout>
  );
};

export default Analytics;
