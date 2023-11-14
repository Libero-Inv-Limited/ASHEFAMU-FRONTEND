import {
  Chart as ChartJS,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  DoughnutControllerChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, PointElement, Tooltip, Legend);
const FacilityStatus = () => {
  const data = {
    labels: ["Approved", "Pending", "Rejected"],
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

  // const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

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

export default FacilityStatus;
