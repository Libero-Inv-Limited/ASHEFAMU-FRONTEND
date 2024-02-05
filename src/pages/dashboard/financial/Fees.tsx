/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useDisclosure, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { TEXT_GRAY } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import { executeGetAllFees } from "./../../../apis/finances";
import EditFeeModal from "./../../../components/modals/FeeModal";
import CreateFeeModal from "./../../../components/modals/CreateFeeModal";
import { HStack } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { InputLeftElement } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
import CustomButton from "./../../../components/common/CustomButton";
import { BsPlus } from "react-icons/bs";
import useFeeHook from "./hooks/useFeeHook";
import { feeColumns } from "./helpers";
import { labelValueMap } from "../../../utils/helpers";
import useFetchFacilityData from "./../../../hooks/useFetchFacilityData";
import CustomSelect from "./../../../components/common/CustomSelect";

interface PaymentProps {}
const Fees: React.FC<PaymentProps> = () => {
  const [editId, setEditId] = React.useState<number>();
  const [fId, setFId] = React.useState<string>("");
  const { facilityCategory } = useFetchFacilityData();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);

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
    executeGetAllFees(token!, fId, page, perPage)
  );

  const { handleToggleStatus } = useFeeHook(
    openEditing,
    token,
    handleReloadData,
    closeEditing
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

  React.useEffect(() => {
    setFees(data);
  }, [data]);

  React.useEffect(() => {
    handleReloadData();
  }, [fId]);

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
        facilityCategory={facilityCategory}
        setFId={setFId}
      />
    );
    // eslint-disable-next-line
  }, [filterText, resetPaginationToggle]);

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={
            feeColumns(handleToggleStatus, isEditing, editId, setEditId) as any
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

      <EditFeeModal
        isOpen={Boolean(editId)}
        onClose={() => setEditId(undefined)}
        editId={editId}
        handleReloadData={handleReloadData}
      />
      <CreateFeeModal
        data={data}
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
  facilityCategory: FacilityCategoryType[];
  setFId: (value: string) => void;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  handleCreateFee,
  facilityCategory,
  setFId,
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

      <HStack alignItems={"flex-start"} flexDir={["column", "column", "row"]}>
        <CustomSelect
          fontSize="sm"
          styles={{
            container: (style) => ({
              ...style,
              maxWidth: "280px",
            }),
          }}
          className="custom-select"
          placeholder="Filter fees by category"
          options={labelValueMap(facilityCategory)}
          onChange={(item: { label: string; value: string }) =>
            setFId(item.value)
          }
        />
        <CustomButton
          onClick={handleCreateFee}
          alignSelf={["flex-end", "flex-end", "unset"]}
          leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
        >
          Create Fee
        </CustomButton>
      </HStack>
    </HStack>
  );
};

export default Fees;
