import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LinearScale, CategoryScale);
const TopPerformingFacilities = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 59, 80, 81, 56, 55, 40, 100, 80, 30, 55, 80],
        grouped: true,
        backgroundColor: ["#62C28D"],
        hoverBackgroundColor: "#146BD1",
        borderWidth: 1,
        borderColor: "#62C28D",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return <Bar data={data} height={400} options={options} />;
};

export default TopPerformingFacilities;
