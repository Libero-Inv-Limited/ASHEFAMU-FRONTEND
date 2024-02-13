import React from "react";
import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from "../../../../hooks/usePaginatedTableData";
import { executeGetAllInvoiceHistory } from "../../../../apis/finances";

const useFetchInvoiceHistory = (id: number) => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllInvoiceHistory(id, token, page, perPage)
  );

  React.useEffect(() => {
    handleReloadData();
    //eslint-disable-next-line
  }, [id, token]);

  return {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  };
};

export default useFetchInvoiceHistory;
