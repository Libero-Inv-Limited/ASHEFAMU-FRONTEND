import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from ".././../../../hooks/usePaginatedTableData";
import { executeGetAllUserActivities } from "../../../../apis/audit";

const useFetchHistory = () => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
  executeGetAllUserActivities(token, page, perPage)
  );

  return {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  };
};

export default useFetchHistory;