/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RED, YELLOW } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import {
  executeCreateUser,
  executeDeleteUserAccount,
  executeGetAllUsers,
  executeGetUserProfile,
} from "../../../apis/user";
import { IconButton } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import useFilterComponent from "./useFilterComponent";
import AddUserModal from "../../../components/modals/AddUserModal";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import useGetAllRoles from "../../../hooks/useGetAllRoles";
import ROUTES from "./../../../utils/routeNames";
import { useNavigate } from "react-router-dom";
import { getSlug } from "../../../utils/helpers";
import ActionModal from './../../../components/modals/ActionModal';

interface UserProps {}
const User: React.FC<UserProps> = () => {
  const { FilterComponent } = useFilterComponent();
  const [editId, setEditId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number | null>();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const { control, trigger, getValues, reset, watch } = useForm<UserPayload>({
    mode: "onSubmit",
  });

  const extractIdAndName = (arr) => {
    return arr.map((item) => ({ value: item.id, label: item.name }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditing,
    onOpen: openEditing,
    onClose: closeEditing,
  } = useDisclosure();

  const {
    isOpen: isDeleting,
    onOpen: openDeleting,
    onClose: closeDeleting,
  } = useDisclosure();

  const { data: rolesData } = useGetAllRoles();
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllUsers(token, page, perPage)
  );

  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });
  const navigate = useNavigate();

  const handleEdit = async (id: number) => {
    try {
      openEditing();
      const response = await executeGetUserProfile(id, token!);
      if (response.status === "error") throw new Error(response.message);

      const firstname = response.data.user.firstname;
      navigate(ROUTES.EDIT_USER_ROUTE(getSlug(firstname)), {
        state: response?.data?.user,
      });
    } catch (e: any) {
      console.log("Error:", e.meesage);
    } finally {
      closeEditing();
      setEditId(undefined);
    }
  };

  const handleDelete = async () => {
    try {
      openDeleting();
      const response = await executeDeleteUserAccount(deleteId, token!);
      if (response.status === "error") throw new Error(response.message);
      toast({
        title: "User Account deleted!",
        status: "success",
      });
      setDeleteId(undefined);
    } catch (e: any) {
      console.log("Error:", e.meesage);
    } finally {
      closeDeleting();
      handleReloadData()
    }
  };

  useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
  }, [editId]);

  const columns = [
    {
      name: "Name",
      cell: (data: UserData["user"]) => {
        return (
          <Text>{(data.firstname + " " + data.lastname).toLocaleString()}</Text>
        );
      },
      sortable: true,
    },
    {
      name: "Username",
      cell: (data: UserData["user"]) => {
        return <Text>{data.username.toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Email",
      cell: (data: UserData["user"]) => {
        return <Text>{data.email.toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Role",
      cell: (data: UserData["user"]) => {
        return <Text>{data.userRole.roleDetails.name.toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Actions",
      selector: "",
      sortable: false,
      cell: (item: any) => {
        return (
          <HStack>
            <IconButton
              _hover={{ bg: "#FFEBC9" }}
              rounded={"full"}
              bg={"#FFEBC9"}
              aria-label="edit"
              isLoading={isEditing && item.id === editId}
              onClick={() => setEditId(item.id)}
              icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
            />
            <IconButton
              bg={"#FEE2E2"}
              _hover={{ bg: "#FEE2E2" }}
              rounded={"full"}
              colorScheme="red"
              aria-label="delete"
              onClick={() => setDeleteId(item.id)}
              icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
            />
          </HStack>
        );
      },
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      (item.firstname &&
        item.firstname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.username &&
        item.username.toLowerCase().includes(filterText.toLowerCase()))
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
        onClear={handleClear}
        filterText={filterText}
        onOpen={onOpen}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // HANDLE CREATE USER

  const handleCreateUser = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: UserPayload = {
        ...getValues(),
        role: (getValues("role") as any).value,
      };
      delete (payload as any)["confirm"];

      const response = await executeCreateUser(payload, token!);
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

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={columns as any}
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

      <AddUserModal
        control={control}
        roles={extractIdAndName(rolesData)}
        watch={watch}
        modalFooterButton={
          <HStack>
            <CustomButton
              isDisabled={isLoading}
              onClick={onClose}
              colorScheme="gray"
            >
              Cancel
            </CustomButton>
            <CustomButton isLoading={isLoading} onClick={handleCreateUser}>
              Update Details
            </CustomButton>
          </HStack>
        }
        onClose={onClose}
        isOpen={isOpen}
      />
      <ActionModal
        title={`Are you sure you want to delete this user?`}
        text="This action cannot be undone"
        status="danger"
        isLoading={isDeleting}
        handleAction={handleDelete}
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        actionBtnText="Confirm"
      />
    </DashboardLayout>
  );
};

export default User;
