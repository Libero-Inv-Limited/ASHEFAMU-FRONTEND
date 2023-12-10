import React from "react";
import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from "../../../../hooks/usePaginatedTableData";
import { executeGetAllInvoices } from "./../../../../apis/finances";
import { useAppContext } from "../../../../contexts/AppContext";

interface Filters {
  status: string;
  fee_category: number;
}
const useFetchHookForAFacility = (arg: Filters) => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const { currentFacility } = useAppContext();
  const filters = arg
    ? {
        status: arg.status,
        fee_category: arg.fee_category,
      }
    : null;
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllInvoices(filters, token, page, perPage, currentFacility.id)
  );

  React.useEffect(() => {
    handleReloadData();
    //eslint-disable-next-line
  }, [arg, token]);

  return {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  };
};

export default useFetchHookForAFacility;
