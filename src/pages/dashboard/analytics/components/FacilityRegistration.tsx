import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { executeGetFacilityRegStats } from "./../../../../apis/analytics";
import { useDisclosure } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { populateFacilitiesRegStats } from "../../../../store/slice/analyticSlice";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);
const FacilityRegistration = () => {
  const [stats, setStats] = React.useState<FacilitiesRegStats>({
    labels: [],
    values: [],
  });
  const tokenStore = useAppSelector((state) => state.accountStore.tokenStore);
  const dispatch = useAppDispatch();
  const { onOpen: openLoadingData, onClose: closeLoadingData } =
    useDisclosure();

  const handleGetStatistics = async () => {
    try {
      openLoadingData();
      const result = await executeGetFacilityRegStats(tokenStore.token);
      setStats(result.data);
      if (result.status === "error") throw new Error(result.message);
      dispatch(populateFacilitiesRegStats(result.data));
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      closeLoadingData();
    }
  };

  React.useEffect(() => {
    handleGetStatistics();
  }, []);

  const data = {
    labels: stats.labels.map((item) => item.split(" ")[0]),
    datasets: [
      {
        label: "",
        data: stats.values,
        fill: false,
        borderColor: "rgb(49, 176, 153)",
        borderWidth: 5,
        tension: 0.2,
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

export default FacilityRegistration;
