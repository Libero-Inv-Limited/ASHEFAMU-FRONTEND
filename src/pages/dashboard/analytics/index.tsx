import { Grid, GridItem, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { data } from "./helpers";
import { executeGetStatsMetric } from "../../../apis/analytics";
import { populateMetricStats } from "../../../store/slice/analyticSlice";

interface AnalyticsProps {}
const Analytics: React.FC<AnalyticsProps> = () => {

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.accountStore.tokenStore);

  const handleGetMetrics = async () => {
    if (!token) return;
    try {
      const result = await executeGetStatsMetric(token.token);
      if (result.status === "error") throw new Error(result.message);
      console.log({ result: result.data }); 
      dispatch(populateMetricStats(result.data));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  React.useEffect(() => {
    handleGetMetrics();
  }, []);

  return (
    <DashboardLayout>
      {data.map((section) => (
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} columnGap={8}>
          {section.components.map((item) => (
            <GridItem
              colSpan={item.size}
              bg={item.color ?? "white"}
              p={item.color ? 0 : 6}
              mb={10}
              position="relative"
            >
              {item.title && (
                <Heading
                  color="#1A1C1E"
                  fontSize={18}
                  fontFamily="rubik"
                  fontWeight={600}
                  mb={6}
                >
                  {item.title}
                </Heading>
              )}
              <Box>{item.component}</Box>
            </GridItem>
          ))}
        </Grid>
      ))}
    </DashboardLayout>
  );
};

export default Analytics;
