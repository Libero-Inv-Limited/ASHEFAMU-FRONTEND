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
import { AiOutlineFileText, AiOutlineSearch } from "react-icons/ai";
import { RED, TEXT_GRAY, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsPlus } from "react-icons/bs";
import CustomTable from "./CustomTable";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ActionModal from "../modals/ActionModal";
import { executeDeleteFacility } from "../../apis/facility";
import { populateFacilities } from "../../store/slice/dataSlice";
import ScheduleInspectionModal from "../../pages/dashboard/audit-compliance/ScheduleInspectionModal";
import { useForm } from "react-hook-form";
import {
  executeDocumentInspection,
  executeScheduleInspection,
} from "../../apis/audit";
import useFetchHook from "./../../pages/dashboard/audit-compliance/hooks/useFetchHook";
import SubmitInspectionModal from "./../../pages/dashboard/audit-compliance/SubmitInspectionModal";

const CustomScheduledTable = () => {
  const facilities = useAppSelector((state) => state.dataStore.facilities);
  const status = "upcoming";
  const { data, loadingData, handleReloadData } = useFetchHook(status);
  const [inspectionId, setInspectionId] = React.useState(null);
  const { control, trigger, getValues, reset } = useForm<InspectionPayload>({
    mode: "onSubmit",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control: xcontrol,
    trigger: xtrigger,
    getValues: xgetValues,
    reset: xreset,
  } = useForm<InspectionReportPayload>({
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
        name: "Action",
        cell: (item: InspectionData) => {
          return (
            <HStack justifyContent="center">
              <IconButton
                bg={"#FEE2E2"}
                _hover={{ bg: "#FEE2E2" }}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete"
                isLoading={item.id === deletingFacility && isLoading}
                onClick={() => setDeletingFacility(item.id! as number)}
                icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
              />
              <IconButton
                _hover={{ bg: "#FFEBC9" }}
                rounded={"full"}
                bg={"#FFEBC9"}
                colorScheme="red"
                aria-label="submit"
                isLoading={item.id === deletingFacility && isLoading}
                onClick={() => setInspectionId(item.id! as number)}
                icon={
                  <Icon
                    fontSize={"xl"}
                    as={AiOutlineFileText}
                    color={YELLOW}
                  />
                }
              />
            </HStack>
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

  const handleSubmitInspection = async () => {
    if (!(await xtrigger())) return;
    try {
      openLoading();
      const payload: InspectionReportPayload = {
        ...xgetValues(),
        inspection_id: inspectionId,
      };
      const response = await executeDocumentInspection(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      xreset();
      setInspectionId(null);
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
      <ScheduleInspectionModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        control={control}
        handleScheduleInspection={handleScheduleInspection}
        facilities={facilities}
      />
      <SubmitInspectionModal
        isOpen={Boolean(inspectionId)}
        isLoading={isLoading}
        onClose={() => setInspectionId(null)}
        control={xcontrol}
        handleScheduleInspection={handleSubmitInspection}
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

export default CustomScheduledTable;
