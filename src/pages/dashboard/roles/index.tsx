/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ROUTES from "./../../../utils/routeNames";
import { FilterComponentTwo } from "./../../../components/common/FilterComponentTwo";
import { columns } from "./helpers";
import { useNavigate } from "react-router-dom";
import useFetchHook from "./useFetchHook";

interface RoleProps {}
const Role: React.FC<RoleProps> = () => {
  const navigate = useNavigate();
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = useFetchHook();

  const [users, setUsers] = useState<InvoiceDataType[]>(data);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const handleChange = (item: { label: string; value: string }) => {
      const val = item.value;
      if (!val || val === "*") return setUsers(data);
      const filtered = (data as InvoiceDataType[]).filter(
        (elem) => elem.status.toLowerCase() === val.toLowerCase()
      );
      // setInvoices(filtered);
    };

    return (
      <FilterComponentTwo
        onFilter={(e: React.FormEvent) => setFilterText(e)}
        onClear={handleClear}
        filterText={filterText}
        buttonLabel="Create Role"
        actionRoute={ROUTES.CREATE_ROLE_ROUTE}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={columns(navigate) as any}
          data={data}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeaderComponent={subHeaderComponentMemo}
          progressPending={loadingData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Role;
