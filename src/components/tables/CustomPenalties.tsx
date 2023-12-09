/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsPlus } from "react-icons/bs";
import CustomTable from "./CustomTable";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ActionModal from "../modals/ActionModal";
import { executeDeleteFacility } from "../../apis/facility";
import { populateFacilities } from "../../store/slice/dataSlice";
import { useForm } from "react-hook-form";
import DrawerComponent from "../../components/common/Drawer";
import FilterForm from "../../pages/dashboard/financial/PenaltyFilterForm";
import { penaltiesData } from "./../../pages/dashboard/financial/helpers";
import { BiFilter } from "react-icons/bi";
import useFetchPenalties from "./../../pages/dashboard/financial/hooks/useFetchPenalties";
import GeneratePenaltyModal from "./../../pages/dashboard/financial/GeneratePenaltyModal";

const CustomPenaltiesTable = () => {
  const facilities = useAppSelector((state) => state.dataStore.facilities);
  const [initialState, setInitialState] = React.useState(null);
  const { data, loadingData, handleReloadData } =
    useFetchPenalties(initialState);
  const [penalties, setPenalties] = React.useState<PenaltyDataType[]>(data);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  const {
    control: xcontrol,
    trigger: xtrigger,
    getValues: xgetValues,
    reset: xreset,
  } = useForm<PenaltyFilters>({
    mode: "onSubmit",
  });

  const [deletingFacility, setDeletingFacility] = useState<number | null>(null);

  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();

  const dispatch = useAppDispatch();
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const { columns } = penaltiesData(penalties);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = penalties.filter(
    (item) =>
      item.facility.name &&
      item.facility.name.toLowerCase().includes(filterText.toLowerCase())
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
        handleGeneratePenalty={onOpen}
        handleFilter={openDrawer}
      />
    );
    // eslint-disable-next-line
  }, [filterText, resetPaginationToggle]);

  // DELETE FACILITY
  const handleDelete = async () => {
    try {
      openLoading();
      const result = await executeDeleteFacility([deletingFacility!], token!);
      if (result.status === "error") throw new Error(result.message);

      // UPDATE FACILITIES STATE
      const newFacilities = facilities.filter(
        (item) => item.id !== deletingFacility
      );
      dispatch(populateFacilities(newFacilities));

      toast({
        title: "Facility deleted!",
        status: "success",
      });
      setDeletingFacility(null);
    } catch (e: any) {
      console.log("ERROR:", e.message);
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeLoading();
    }
  };

  const handleFilters = async () => {
    if (!(await xtrigger())) return;
    try {
      openLoading();
      const payload: PenaltyFilters = {
        ...xgetValues(),
        status: (xgetValues("status") as any).value,
        fee_category: (xgetValues("fee_category") as any).value,
        facility_id: (xgetValues("facility_id") as any).value,
      };
      setInitialState(payload);

      xreset();
      closeDrawer();
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

  React.useEffect(() => {
    setPenalties(data);
  }, [data]);

  return (
    <>
      <CustomTable
        columns={columns as any}
        data={filteredItems}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}
        progressPending={loadingData}
      />

      <ActionModal
        title="Are you sure you want to delete this facility?"
        text="This action cannot be undone"
        status="danger"
        isLoading={isLoading}
        handleAction={handleDelete}
        isOpen={Boolean(deletingFacility)}
        onClose={() => setDeletingFacility(null)}
        actionBtnText="Confirm"
      />
      <GeneratePenaltyModal
        isOpen={isOpen}
        onClose={onClose}
        handleReloadData={handleReloadData}
      />
      <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <BiFilter size={24} />
            <span style={{ marginLeft: "8px" }}>Filter</span>
          </div>
        }
      >
        <FilterForm control={xcontrol} handleFilters={handleFilters} />
      </DrawerComponent>
    </>
  );
};

// TABLE HEADER
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  handleGeneratePenalty: () => void;
  handleFilter: () => void;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  handleGeneratePenalty,
  handleFilter,
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
        onClick={handleFilter}
        alignSelf={["flex-end", "flex-end", "unset"]}
        sx={{
          bg: "transparent",
          color: "#363A43",
          border: "1px solid #C9CFD8",
        }}
        borderRadius={4}
        _hover={{ bg: "transparent" }}
      >
        Filter
      </CustomButton>
      <CustomButton
        onClick={handleGeneratePenalty}
        alignSelf={["flex-end", "flex-end", "unset"]}
        leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
      >
        Generate Penalty
      </CustomButton>
    </HStack>
  );
};

export default CustomPenaltiesTable;
