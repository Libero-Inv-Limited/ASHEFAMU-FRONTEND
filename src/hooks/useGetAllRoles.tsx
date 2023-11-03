/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hook";
import { executeGetAllRoles } from "./../apis/role";


const useGetAllRoles = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoading] = useState(false);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await executeGetAllRoles(token);
      if (response.status === "error") throw new Error(response.message);
      setData(response.data.data);
    } catch (e: any) {
      console.log("ERROR HOOKKKK: ", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loadingData };
};

export default useGetAllRoles;
