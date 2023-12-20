/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Icon,
  HStack,
  Input,
  InputLeftElement,
  Spacer,
  Text,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DARK, TEXT_GRAY } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import {
  executeGetUserFacilities,
  executeGetUserProfile,
  executeRemoveFacility,
} from "../../../apis/user";
import ModalComponent from "../../../components/modals/CustomModal";
import { useForm } from "react-hook-form";
import ROUTES from "./../../../utils/routeNames";
import { useNavigate } from "react-router-dom";
import { getSlug } from "../../../utils/helpers";
import { useLocation } from "react-router-dom";
import { facilitiesColumns } from "./helpers";
import { SimpleGrid } from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { InputGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import CustomButton from "./../../../components/common/CustomButton";
import { BsPlus } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { executeAssignFacility } from "./../../../apis/user";
import ActionModal from './../../../components/modals/ActionModal';

interface UserProps {}
const Facilities: React.FC<UserProps> = () => {
  const location = useLocation();
  const { id } = location.state;
  const [editId, setEditId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number | null>();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const allFacilities = useAppSelector((state) => state.dataStore.facilities);
  const { control, trigger, getValues, reset } = useForm<AssignFacility>({
    mode: "onSubmit",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onOpen: openEditing, onClose: closeEditing } = useDisclosure();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

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

  const handleAddUserFacilities = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: AssignFacility = {
        ...getValues(),
        facilityId: (getValues("facilityId") as any).value,
        userId: id,
      };

      const response = await executeAssignFacility(payload, token!);
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
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: RemoveFacility = {
        ids: [deleteId],
        userId: id,
      };

      const response = await executeRemoveFacility(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });
      setDeleteId(null)
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


  useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
  }, [editId]);

  const [filterText, setFilterText] = React.useState("");
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
        onClear={handleClear}
        filterText={filterText}
        onOpen={onOpen}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleChange = (value) => {
    console.log({ value });
  };

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={facilitiesColumns(setDeleteId) as any}
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

      <ModalComponent isOpen={isOpen} onClose={onClose} size="md">
        <SimpleGrid
          columns={[1]}
          gap={4}
          minHeight={"30vh"}
          position="relative"
        >
          <Heading size={"md"} lineHeight={"7"} color={DARK} fontSize="md">
            ASSIGN FACILITY
          </Heading>
          <InputGroup flex={1} maxW={["full", "full", 435]} zIndex={3}>
            <AuthInput
              bg={"#F4F7F4"}
              data={allFacilities.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              isSelect={true}
              control={control}
              fontSize={"sm"}
              name="facilityId"
              onChange={handleChange}
              rules={{ required: "Facility is required" }}
            />
          </InputGroup>
          <Text fontSize="sm" fontWeight={500}>
            Added Facilities
          </Text>
          <CustomButton isLoading={isLoading} onClick={handleAddUserFacilities}>
            Add
          </CustomButton>
        </SimpleGrid>
      </ModalComponent>
      <ActionModal
        title={`Are you sure you want to remove this facility?`}
        text="This action cannot be undone"
        status="danger"
        isLoading={isLoading}
        handleAction={handleDelete}
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        actionBtnText="Confirm"
      />
    </DashboardLayout>
  );
};

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  onOpen: () => void;
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
        Assign a facility{" "}
      </CustomButton>
    </HStack>
  );
};

export default Facilities;
