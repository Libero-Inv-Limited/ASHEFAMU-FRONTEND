/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ROUTES from "./../../../utils/routeNames";
import { columns } from "./helpers";
import { useNavigate } from "react-router-dom";
import useFetchHook from "./useFetchHook";
import {
  executeDeletePermission,
  executeGetPermissionDetails,
} from "./../../../apis/permission";
import { useAppSelector } from "../../../store/hook";
import ActionModal from "./../../../components/modals/ActionModal";
import { getSlug } from "../../../utils/helpers";
import ModalComponent from "./../../../components/modals/FormModal";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import useFilterComponent from "./../../../hooks/useFilterComponent";
import AuthInput from "./../../../components/common/AuthInput";
import { executeCreatePermission } from "../../../apis/permission";

interface PermissionProps {}
const Permission: React.FC<PermissionProps> = () => {
  const navigate = useNavigate();
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = useFetchHook();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();

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
  const { control, trigger, getValues, reset } = useForm<PermissionData>({
    mode: "onSubmit",
  });

  const [deletingPermission, setDeletingPermission] = React.useState<
    number | null
  >(null);
  const { FilterComponent } = useFilterComponent();
  const [editId, setEditId] = React.useState<number>();
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const categories = useAppSelector(
    (state) => state.dataStore.permissionCategories
  );
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
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        cta="Create Permission"
        onOpen={onOpen}
        title="Create Permission"
        isFilterable={true}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleCreatePermission = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: PermissionData = {
        ...getValues(),
        category: (getValues("category") as any).value,
      };

      const response = await executeCreatePermission(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      reset();
      onClose();
      handleReloadData();
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeLoading();
    }
  };
  const handleDelete = async () => {
    try {
      openDeleting();
      const result = await executeDeletePermission(
        [deletingPermission!],
        token!
      );
      if (result.status === "error") throw new Error(result.message);
      toast({
        title: "Permission deleted!",
        status: "success",
      });
      setDeletingPermission(null);
    } catch (e: any) {
      console.log("ERROR:", e.message);
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeDeleting();
      handleReloadData();
    }
  };

  const handleEdit = async (id: number) => {
    try {
      openEditing();
      const response = await executeGetPermissionDetails(id, token!);
      if (response.status === "error") throw new Error(response.message);

      const name = response.data.role.name;
      navigate(ROUTES.EDIT_ROLE_ROUTE(getSlug(name)), {
        state: response?.data?.user,
      });
    } catch (e: any) {
      console.log("Error:", e.meesage);
    } finally {
      closeEditing();
      setEditId(undefined);
    }
  };

  React.useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
  }, [editId]);

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={
            columns(
              isDeleting,
              deletingPermission,
              setDeletingPermission,
              isEditing,
              editId,
              setEditId
            ) as any
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
        title="Are you sure you want to delete this permission?"
        text="This action cannot be undone"
        status="danger"
        isLoading={isDeleting}
        handleAction={handleDelete}
        isOpen={Boolean(deletingPermission)}
        onClose={() => setDeletingPermission(null)}
        actionBtnText="Confirm"
      />
      <ModalComponent
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        title="Create Permission"
      >
        <AuthInput
          name="category"
          control={control}
          data={categories.map((item) => ({ value: item, label: item }))}
          rules={{ required: "Category is required" }}
          label="Enter permission category"
          isSelect
        />
        <AuthInput
          name="name"
          control={control}
          rules={{ required: "Permission Name is required" }}
          placeholder="Enter permission name"
        />
        <AuthInput
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          placeholder="Enter Description"
        />
        <CustomButton isLoading={isLoading} onClick={handleCreatePermission}>
          Add Permission
        </CustomButton>
      </ModalComponent>
      <ModalComponent
        onClose={closeEditing}
        isOpen={isEditing}
        size="md"
        title="Create Permission"
      >
        <AuthInput
          name="name"
          control={control}
          rules={{ required: "Permission Name is required" }}
          placeholder="Enter permission name"
        />
        <AuthInput
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          placeholder="Enter Description"
        />
        <CustomButton isLoading={isLoading} onClick={handleCreatePermission}>
          Add Permission
        </CustomButton>
      </ModalComponent>
    </DashboardLayout>
  );
};

export default Permission;
