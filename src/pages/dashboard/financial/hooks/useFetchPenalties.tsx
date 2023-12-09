import React from "react";
import { useAppSelector } from "../../../../store/hook";
import usePaginatedTableData from "../../../../hooks/usePaginatedTableData";
import { executeGetAllPenalties } from "./../../../../apis/finances";

interface Filters {
  status: string;
  fee_category: number;
  facility_id: number;
}
const useFetchPenalties = (arg: Filters) => {
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const payload = arg
    ? {
        filter: { status: arg.status, fee_category: arg.fee_category },
        facility_id: arg.facility_id,
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
    executeGetAllPenalties(payload, token, page, perPage)
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

export default useFetchPenalties;
