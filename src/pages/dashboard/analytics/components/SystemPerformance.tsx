import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions, DoughnutControllerChartOptions } from "chart.js";

type SystemPerformanceProps = {
  // Your component props if any
};

const SystemPerformance: React.FC<SystemPerformanceProps> = () => {
  const data = {
    labels: ["Used Space"],
    datasets: [
      {
        label: "Facility Status",
        data: [70, 40],
        fill: false,
        backgroundColor: ["#62C28D", "#E3EBE2"],
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
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 20,
          color: "black",
        },
      },
    },
  };

  return <Doughnut data={data} height={400} options={options} />;
};

export default SystemPerformance;
