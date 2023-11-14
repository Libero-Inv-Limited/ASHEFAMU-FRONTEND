import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

interface AnalyticsProps {}
const Analytics: React.FC<AnalyticsProps> = () => {
  return (
    <DashboardLayout>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={2}>1</GridItem>
        <GridItem colSpan={5}>2</GridItem>
        <GridItem colSpan={5}>3</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={6}>4</GridItem>
        <GridItem colSpan={6}>5</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={6}>6</GridItem>
        <GridItem colSpan={6}>7</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={12}>8</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={12}>9</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={6}>10</GridItem>
        <GridItem colSpan={6}>11</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={6}>12</GridItem>
        <GridItem colSpan={6}>13</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={6}>14</GridItem>
        <GridItem colSpan={6}>15</GridItem>
      </Grid>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={2}>16</GridItem>
      </Grid>
    </DashboardLayout>
  );
};

export default Analytics;
