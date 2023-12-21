/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hook";
import { executeGetAllPossibleUserPermissions } from "./../apis/permission";
import { groupPermissionsByCategory } from "./../pages/dashboard/roles/helpers";

const useGetAllPossiblePermissions = (id: number) => {
  const [data, setData] = useState<{ [key: string]: Permission[] }>({});
  const [loadingData, setLoading] = useState(false);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await executeGetAllPossibleUserPermissions(token, id);
      if (response.status === "error") throw new Error(response.message);
      setData(groupPermissionsByCategory(response.data.permissions));
    } catch (e: any) {
      console.log("ERROR HOOKKKK: ", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReloadData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loadingData, handleReloadData };
};

export default useGetAllPossiblePermissions;
