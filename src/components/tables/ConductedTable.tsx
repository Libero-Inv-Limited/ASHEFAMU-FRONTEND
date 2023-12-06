/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RED, TEXT_GRAY, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsPlus } from "react-icons/bs";
import CustomTable from "./CustomTable";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ActionModal from "../modals/ActionModal";
import { executeDeleteFacility } from "../../apis/facility";
import { populateFacilities } from "../../store/slice/dataSlice";
import { getSlug } from "../../utils/helpers";
import { useAppContext } from "../../contexts/AppContext";
import ScheduleInspectionModal from "../../pages/dashboard/audit-compliance/ScheduleInspectionModal";
import { useForm } from "react-hook-form";
import { executeScheduleInspection } from "../../apis/audit";
import useFetchHook from "./../../pages/dashboard/audit-compliance/hooks/useFetchHook";
import { Button } from '@chakra-ui/react';
import { LuFileBarChart2 } from "react-icons/lu";

const ConductedTable = () => {
  const facilities = useAppSelector((state) => state.dataStore.facilities);
  const status = "conducted";
  const {
    data,
    // totalRows,
    // handlePageChange,
    // handlePerRowsChange,
    // loadingData,
    handleReloadData,
  } = useFetchHook(status);
  const { control, trigger, getValues, reset } = useForm<InspectionPayload>({
    mode: "onSubmit",
  });
  const { isLoadingData, setCurrentFacility } = useAppContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const registrationData = {
    data,
    columns: [
      {
        name: "Facility",
        selector: "name",
        sortable: false,
        cell: (data: InspectionData) => {
          console.log(data);
          return <Text>{data.facility_name}</Text>;
        },
      },
      {
        name: "Inspector",
        selector: "created_at",
        cell: (data: any) => {
          return <Text>{data.inspector_names}</Text>;
        },
        sortable: true,
      },
      {
        name: "Scheduled Date",
        selector: "schedule_date",
        cell: (data: InspectionData) => {
          const date = new Date(data.schedule_date);
          const readableDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const readableTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
          const formattedDateTime = `${readableDate} ${readableTime}`;

          return <Text>{formattedDateTime}</Text>;
        },
        sortable: false,
      },
      {
        name: "Findings",
        cell: (item: FacilityData) => {
          return (
            <>
              <>
                <Button
                  bg="#DBE8FE"
                  color="#3B82F6"
                  borderRadius="50px"
                  fontSize="14px"
                  fontWeight="500"
                  w={"86px"}
                >
                  View
                </Button>
              </>
            </>
          );
        },
      },
      {
        name: "Results",
        cell: (item: FacilityData) => {
          return (
            <>
              <Button
                bg="#DBE8FE"
                color="#3B82F6"
                borderRadius="50px"
                fontSize="14px"
                fontWeight="500"
                w={"86px"}
              >
                View
              </Button>
            </>
          );
        },
      },
      {
        name: "",
        cell: (data: InspectionData) => {
          return (
            <IconButton
              aria-label="result-btn"
              icon={<Icon as={LuFileBarChart2} color={"primary.500"} />}
              w={"40px"}
              h={"40px"}
              bg={"#DBE8FE"}
              rounded={"full"}
              // onClick={() => setSelectedData(data)}
              _hover={{ bg: "#DBE8FE" }}
            />
          );
        },
      },
    ],
  };

  const { columns } = registrationData;
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.facility_name &&
      item.facility_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleScheduleInspection = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: InspectionPayload = {
        ...getValues(),
        facility_id: (getValues("facility_id") as any).value,
      };
      const response = await executeScheduleInspection(payload, token!);
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
        handleScheduleInspection={onOpen}
      />
    );
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

  return (
    <>
      <CustomTable
        columns={columns as any}
        data={filteredItems}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}
        progressPending={isLoadingData}
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
      <ScheduleInspectionModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        control={control}
        handleScheduleInspection={handleScheduleInspection}
        facilities={facilities}
      />
    </>
  );
};

// TABLE HEADER
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  handleScheduleInspection: () => void;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  handleScheduleInspection,
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
        onClick={handleScheduleInspection}
        alignSelf={["flex-end", "flex-end", "unset"]}
        leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
      >
        Schedule Inspection
      </CustomButton>
    </HStack>
  );
};

export default ConductedTable;
