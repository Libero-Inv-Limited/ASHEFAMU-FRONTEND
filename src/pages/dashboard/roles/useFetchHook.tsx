import { executeGetAllRoles } from "../../../apis/role";
import { useAppSelector } from "../../../store/hook";
import usePaginatedTableData from "./../../../hooks/usePaginatedTableData";

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
    executeGetAllRoles(token, page, perPage)
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
