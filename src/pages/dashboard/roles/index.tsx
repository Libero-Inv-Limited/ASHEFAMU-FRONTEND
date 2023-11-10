/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ROUTES from "./../../../utils/routeNames";
import { FilterComponentTwo } from "./../../../components/common/FilterComponentTwo";
import { columns } from "./helpers";
import { useNavigate } from "react-router-dom";
import useFetchHook from "./useFetchHook";
import { executeDeleteRole } from "./../../../apis/role";
import { useAppSelector } from "../../../store/hook";
import ActionModal from "./../../../components/modals/ActionModal";

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

  const {
    isOpen: isDeleting,
    onOpen: openDeleting,
    onClose: closeDeleting,
  } = useDisclosure();

  const [filterText, setFilterText] = React.useState("");
  const [deletingRole, setDeletingRole] = React.useState<number | null>(null);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast();
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    // const handleChange = (item: { label: string; value: string }) => {
    //   const val = item.value;
    //   if (!val || val === "*") return setUsers(data);
    //   const filtered = (data as InvoiceDataType[]).filter(
    //     (elem) => elem.status.toLowerCase() === val.toLowerCase()
    //   );
    //   // setInvoices(filtered);
    // };

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

  const handleDelete = async () => {
    try {
      openDeleting();
      const result = await executeDeleteRole([deletingRole!], token!);
      if (result.status === "error") throw new Error(result.message);
      toast({
        title: "Role deleted!",
        status: "success",
      });
      setDeletingRole(null);
    } catch (e: any) {
      console.log("ERROR:", e.message);
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeDeleting();
      handleReloadData
    }
  };
  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={
            columns(navigate, isDeleting, deletingRole, setDeletingRole) as any
          }
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
      <ActionModal
        title="Are you sure you want to delete this role?"
        text="This action cannot be undone"
        status="danger"
        isLoading={isDeleting}
        handleAction={handleDelete}
        isOpen={Boolean(deletingRole)}
        onClose={() => setDeletingRole(null)}
        actionBtnText="Confirm"
      />
    </DashboardLayout>
  );
};

export default Role;
