/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DARK, RED, TEXT_GRAY, YELLOW } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import {
  executeCreateUser,
  executeGetUserFacilities,
  executeGetUserProfile,
} from "../../../apis/user";
// import { data } from "./data";
import { HStack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import ModalComponent from "../../../components/modals/CustomModal";
import useFilterComponent from "./useFilterComponent";
import AddUserModal from "../../../components/modals/AddUserModal";
import { useForm } from "react-hook-form";
import CustomButton from "./../../../components/common/CustomButton";
import useGetAllRoles from "../../../hooks/useGetAllRoles";
import ROUTES from "./../../../utils/routeNames";
import { useNavigate } from "react-router-dom";
import { getSlug } from "../../../utils/helpers";
import { useLocation } from "react-router-dom";
import { facilitiesColumns } from "./helpers";
import { SimpleGrid } from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { InputGroup } from "@chakra-ui/react";
import { InputLeftElement } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

interface UserProps {}
const Facilities: React.FC<UserProps> = () => {
  const { FilterComponent } = useFilterComponent();
  const location = useLocation();
  const { id, firstname } = location.state;
  const [userValues, setUserValues] = useState<UserPayload | null>(null);
  const [editId, setEditId] = useState<number>();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const { control, trigger, getValues, reset, watch } =
    useForm<ProffessionalStaffData>({
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

  const { data: rolesData } = useGetAllRoles();
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetUserFacilities(token, id, page, perPage)
  );

  const [users, setUsers] = useState<InvoiceDataType[]>(data);
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

      // const responseData = response.data as OneFacilityDataType
      // console.log("Response:", response)

      // // // SET THE FACILITY UPDATE STATE
      // // setCurrentFacility(responseData)

      // NAVIGATE TO EDIT SCREEN
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

  useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
  }, [editId]);

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
      <FilterComponent
        onClear={handleClear}
        filterText={handleChange}
        onOpen={onOpen}
        isUserFacilitiesTable={true}
        user={firstname}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // HANDLE CREATE USER

  const handleCreateUser = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: UserData = {
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
          columns={facilitiesColumns() as any}
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

      <ModalComponent isOpen={isOpen} onClose={onClose}>
        <SimpleGrid columns={[1]} gap={4}>
          <Heading size={"md"} lineHeight={"7"} color={DARK} fontSize="md">
            ASSIGN FACILITY
          </Heading>
          <InputGroup flex={1} maxW={["full", "full", 435]}>
            <InputLeftElement as={Center}>
              <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
            </InputLeftElement>
            <Input
              fontSize={"sm"}
              // onChange={handleChange}
              value={filterText}
              placeholder="Search"
            />
          </InputGroup>
          <Text fontSize="sm" fontWeight={500}>
            Added Facilities
          </Text>
          <CustomButton onClick={onClose} isLoading={isLoading} isDisabled>
            Add
          </CustomButton>
        </SimpleGrid>
      </ModalComponent>

      {/* <AddUserModal
        control={control}
        values={userValues}
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
      /> */}
    </DashboardLayout>
  );
};

export default Facilities;
