import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from "../../../../hooks/usePaginatedTableData";
import { executeGetAllInvoices } from "./../../../../apis/finances";

interface Filters {
  status: string;
  fee_category: number;
}
const useFetchHook = (arg: Filters) => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const filters = arg ? { status: arg.status, fee_category: arg.fee_category }: null;
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllInvoices(filters, token, page, perPage)
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
