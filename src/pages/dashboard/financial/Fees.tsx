/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  IconButton,
  Text,
  useDisclosure,
  useToast,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DARK, TEXT_GRAY, YELLOW } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import { executeGetAllFees } from "./../../../apis/finances";
import { Switch } from "@chakra-ui/react";
import { executeUpdateFee } from "./../../../apis/finances";
import { BiEdit } from "react-icons/bi";
import FeeModal from "./../../../components/modals/FeeModal";
import { useForm } from "react-hook-form";
import CreateFeeModal from "./../../../components/modals/CreateFeeModal";
import { HStack } from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { InputLeftElement } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input } from '@chakra-ui/react';
import { Spacer } from '@chakra-ui/react';
import CustomButton from './../../../components/common/CustomButton';
import { BsPlus } from 'react-icons/bs';

interface PaymentProps {}
const Fees: React.FC<PaymentProps> = () => {
  const [editId, setEditId] = React.useState<number>();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const { control, trigger, getValues, reset } = useForm<FeeDataType>({
    mode: "onSubmit",
  });

  const {
    isOpen: isEditing,
    onOpen: openEditing,
    onClose: closeEditing,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllFees(token!, page, perPage)
  );
  const [fees, setFees] = useState<FeeDataType[]>(data);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = fees.filter(
    (item) =>
      item.category &&
      item.category.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleToggleStatus = async (
    id: number,
    status: string,
    data: FeeDataType
  ) => {
    try {
      openEditing();
      const response = await executeUpdateFee({ ...data, id, status }, token!);
      if (response.status === "error") throw new Error(response.message);
      toast({
        title: response.message,
        status: response.status,
      });
      handleReloadData();
      closeEditing();
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  };

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const columns = [
    {
      name: "Name",
      selector: "category",
      sortable: false,
    },
    {
      name: "Date Created",
      cell: (data: FeeDataType) => {
        const date = new Date(data.created_at);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: true,
    },
    {
      name: "Amount (N)",
      cell: (data: FeeDataType) => {
        return <Text>{(+data.amount).toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: false,
    },
    {
      name: "Enable/Disable",
      cell: (data: FeeDataType) => {
        return (
          <Switch
            isChecked={data.status === "active"}
            colorScheme="brand"
            onChange={() => {
              const status = data.status === "active" ? "inactive" : "active";
              handleToggleStatus(data.id, status, data);
            }}
            color={DARK}
            size="md"
            fontWeight="500"
            py={1}
          />
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (item: FeeDataType) => {
        return (
          <IconButton
            _hover={{ bg: "#FFEBC9" }}
            rounded={"full"}
            bg={"#FFEBC9"}
            aria-label="edit"
            isLoading={isEditing && item.id === editId}
            onClick={() => setEditId(item.id)}
            icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
          />
        );
      },
    },
  ];

  const handleEdit = async (id: number) => {
    try {
      openEditing();
      console.log({ id });
      // const response = await executeGetPermissionDetails(id, token!);
      // if (response.status === "error") throw new Error(response.message);

      // const name = response.data.role.name;
      // navigate(ROUTES.EDIT_ROLE_ROUTE(getSlug(name)), {
      //   state: response?.data?.user,
      // });
    } catch (e: any) {
      console.log("Error:", e.meesage);
    } finally {
      closeEditing();
      // setEditId(undefined);
    }
  };

  React.useEffect(() => {
    if (!editId) return;
    handleEdit(editId);
    //eslint-disable-next-line
  }, [editId]);


  React.useEffect(() => {
    setFees(data);
  }, [data]);

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
        handleCreateFee={onOpen}
      />
    );
    // eslint-disable-next-line
  }, [filterText, resetPaginationToggle]);

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

      <FeeModal
        isEditing={isEditing}
        handleEdit={handleEdit}
        control={control}
        isOpen={Boolean(editId)}
        onClose={() => setEditId(undefined)}
      />
      <CreateFeeModal
        isOpen={isOpen}
        onClose={onClose}
        handleReloadData={handleReloadData}
      />
    </DashboardLayout>
  );
};

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  handleCreateFee: () => void;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  handleCreateFee,
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
        onClick={handleCreateFee}
        alignSelf={["flex-end", "flex-end", "unset"]}
        leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
      >
        Create Fee
      </CustomButton>
    </HStack>
  );
};

export default Fees;
