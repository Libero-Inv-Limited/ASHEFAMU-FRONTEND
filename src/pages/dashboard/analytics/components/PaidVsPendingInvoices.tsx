import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LinearScale, CategoryScale);
const PaidVsPendingInvoices = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 59, 80, 81, 56, 55, 40],
        grouped: true,
        backgroundColor: [
          "#62C28D",
        ],
        borderWidth: 1,
        borderColor: "#62C28D"
      },
      {
        label: "My First Dataset",
        data: [30, 79, 60, 51, 26, 65],
        grouped: true,
        backgroundColor: [
          "#F59E0B",
        ],
        borderColor:"#F59E0B",
        borderWidth: 1,
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

export default PaidVsPendingInvoices;
