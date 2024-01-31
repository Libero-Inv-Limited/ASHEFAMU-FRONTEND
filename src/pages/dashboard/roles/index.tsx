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
import {
  executeDeleteRole,
  executeGetRoleDetails,
  executeToggleRoleStatus,
} from "./../../../apis/role";
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

  const {
    isOpen: isEditing,
    onOpen: openEditing,
    onClose: closeEditing,
  } = useDisclosure();

  const [filterText, setFilterText] = React.useState("");
  const [deletingRole, setDeletingRole] = React.useState<number | null>(null);
  const [editId, setEditId] = React.useState<number>();
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast();
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name &&
      item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponentTwo
        onFilter={(e) => setFilterText(e.target.value)}
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
      handleReloadData();
    } catch (e: any) {
      console.log("ERROR:", e.message);
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeDeleting();
    }
  };

  const handleEdit = async (id: number) => {
    try {
      openEditing();
      const response = await executeGetRoleDetails(id, token!);
      if (response.status === "error") throw new Error(response.message);
      const name = response.data[0].name;
      navigate(ROUTES.EDIT_ROLE_ROUTE(name), {
        state: response?.data[0],
      });
    } catch (e: any) {
      console.log("Error:", e.message);
    } finally {
      closeEditing();
      setEditId(undefined);
    }
  };

  const handleToggleStatus = async (id: number, status: boolean) => {
    try {
      openEditing();
      const response = await executeToggleRoleStatus(id, status, token!);
      if (response.status === "error") throw new Error(response.message);
      toast({
        title: response.message,
        status: response.status,
      });
      handleReloadData();
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  };

  React.useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={
            columns(
              isDeleting,
              deletingRole,
              setDeletingRole,
              isEditing,
              editId,
              setEditId,
              handleToggleStatus
            ) as any
          }
          data={filteredItems}
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
