import { useAppSelector } from "../../../store/hook";
import usePaginatedTableData from "./../../../hooks/usePaginatedTableData";
import { executeGetAllScheduledInspections } from './../../../apis/inspection';

const useFetchHook = () => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
  executeGetAllScheduledInspections(token, page, perPage)
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
