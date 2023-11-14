import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions, DoughnutControllerChartOptions } from "chart.js";

type RevenueProps = {
  // Your component props if any
};

const Revenue: React.FC<RevenueProps> = () => {
  const data = {
    labels: ["Registration fees", "Penalties", "Renewal Fees", "Other fees"],
    datasets: [
      {
        label: "Facility Status",
        data: [40, 40, 20],
        fill: false,
        backgroundColor: ["#62C28D", "#F59E0B", "#EF4444"],
        hoverOffset: 4,
        tension: 0.1,
      },
    ],
  };

  const options: Partial<
    ChartOptions<"doughnut"> & DoughnutControllerChartOptions
  > = {
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false, // Hide the y-axis
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          boxPadding: 10,
          color: "black",
          borderRadius: 5,
        },
      },
    },
  };

  return <Doughnut data={data} height={400} options={options} />;
};

export default Revenue;
