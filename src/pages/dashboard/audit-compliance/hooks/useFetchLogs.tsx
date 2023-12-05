import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from ".././../../../hooks/usePaginatedTableData";
import { executeGetAllLogs } from "../../../../apis/audit";

const useFetchLogs = () => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
  executeGetAllLogs(token, page, perPage)
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

export default useFetchLogs;
