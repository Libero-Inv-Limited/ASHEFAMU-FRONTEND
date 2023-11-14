import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);
const GeneratedInvoice = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "Aug"],
    datasets: [
      {
        label: "My First Dataset",
        data: [20, 59, 30, 81, 6, 55, 40, 44],
        fill: false,
        borderColor: "rgb(49, 176, 153)",
        borderWidth: 5,
        tension: 0.1,
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

  return <Line data={data} height={400} options={options} />;
};

export default GeneratedInvoice;
