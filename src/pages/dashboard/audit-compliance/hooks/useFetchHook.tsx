import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from "../../../../hooks/usePaginatedTableData";
import { executeGetAllScheduledInspections } from "../../../../apis/audit";

const useFetchHook = (status: string) => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllScheduledInspections(token, status, page, perPage)
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

export default useFetchHook;
