/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  useDisclosure,
  useToast,
  Heading,
  HStack,
  InputLeftElement,
  InputGroup,
  Icon,
  Center,
  Spacer,
  Input,
} from "@chakra-ui/react";
import React from "react";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { columns } from "./helpers";
import useFetchHook from "./useFetchHook";
import { executeDeletePermission } from "./../../../apis/permission";
import { useAppSelector } from "../../../store/hook";
import ActionModal from "./../../../components/modals/ActionModal";
import ModalComponent from "./../../../components/modals/FormModal";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import AuthInput from "./../../../components/common/AuthInput";
import { executeCreatePermission } from "../../../apis/permission";
import { SimpleGrid } from "@chakra-ui/react";
import { executeUpdatePermission } from "./../../../apis/permission";
import { BsPlus } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../../../utils/color";

interface PermissionProps {}
const Permission: React.FC<PermissionProps> = () => {
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

  const {
    control: xcontrol,
    trigger: xtrigger,
    getValues: xgetValues,
    reset: xreset,
    setValue,
  } = useForm<PermissionData>({
    mode: "onSubmit",
  });

  const [deletingPermission, setDeletingPermission] = React.useState<
    number | null
  >(null);
  const [editId, setEditId] = React.useState<number | null>();
  const [editablePermission, setEditablePermission] =
    React.useState<PermissionData>(null);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const categories = useAppSelector(
    (state) => state.dataStore.permissionCategories
  );
  const toast = useToast();
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

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
        filterText={filterText}
        onOpen={onOpen}
      />
    );
    //eslint-disable-next-line
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

  const handleEdit = async () => {
    if (!(await xtrigger())) return;
    try {
      openEditing();
      const payload: PermissionData = {
        ...xgetValues(),
        id: editablePermission.id,
        category: (getValues("category") as any).value,
      };

      const response = await executeUpdatePermission(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      xreset();
      handleReloadData();
      setEditId(null);
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeEditing();
    }
  };

  React.useEffect(() => {
    if (!editId) return;
    setEditablePermission(() => data.find((item) => item.id === editId));
    //eslint-disable-next-line
  }, [editId]);

  React.useEffect(() => {
    if (editablePermission) {
      setValue("category", editablePermission.category || "");
      setValue("description", editablePermission.description || "");
    }
    //eslint-disable-next-line
  }, [editablePermission]);

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
        onClose={() => setEditId(null)}
        isOpen={Boolean(editId)}
        size="md"
        title="Edit Permission"
      >
        {editablePermission && (
          <SimpleGrid columns={[1]} gap={4}>
            <AuthInput
              name="category"
              control={control}
              data={categories.map((item) => ({ value: item, label: item }))}
              rules={{ required: "Category is required" }}
              value={editablePermission.category}
              label="Enter permission category"
              isSelect
            />
            <AuthInput
              name="description"
              control={xcontrol}
              rules={{ required: "Description is required" }}
              value={editablePermission.description}
              placeholder="Enter Description"
            />
            <CustomButton isLoading={isEditing} onClick={handleEdit}>
              Edit Permission
            </CustomButton>
          </SimpleGrid>
        )}
      </ModalComponent>
    </DashboardLayout>
  );
};

export default Permission;

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onOpen: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  onOpen,
}) => {
  return (
    <HStack
      flexWrap={"wrap"}
      flexDir={["column-reverse", "column-reverse", "row"]}
      spacing={2}
      alignItems={["flex-start", "flex-start", "center"]}
      w={"full"}
    >
      <InputGroup flex={1} maxW={["full", "full", 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input
          fontSize={"sm"}
          onChange={onFilter}
          value={filterText}
          placeholder="Search"
        />
      </InputGroup>

      <Spacer />
      <CustomButton
        onClick={onOpen}
        alignSelf={["flex-end", "flex-end", "unset"]}
        leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
      >
        Create Permissions
      </CustomButton>
    </HStack>
  );
};
