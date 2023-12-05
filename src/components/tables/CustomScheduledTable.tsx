/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
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
import { useNavigate } from "react-router-dom";
import useFetchFacilityData from "../../hooks/useFetchFacilityData";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ActionModal from "../modals/ActionModal";
import { executeDeleteFacility } from "../../apis/facility";
import { populateFacilities } from "../../store/slice/dataSlice";
import { Link as ReactLink } from "react-router-dom";
import { getSlug } from "../../utils/helpers";
import { useAppContext } from "../../contexts/AppContext";
import ScheduleInspectionModal from "../../pages/dashboard/audit-compliance/ScheduleInspectionModal";
import { useForm } from "react-hook-form";
import { executeScheduleInspection } from "../../apis/audit";

interface CustomRegTableProps {
  handleReloadData: () => void;
}

const CustomScheduledTable: React.FC<CustomRegTableProps> = ({
  handleReloadData,
}) => {
  const allFacilities = useAppSelector((state) => state.dataStore.facilities);
  const { control, trigger, getValues, reset } = useForm<InspectionPayload>({
    mode: "onSubmit",
  });
  const facilities = allFacilities.filter((item) => item?.enable_documentation);
  const { isLoadingData, setCurrentFacility } = useAppContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const { facilityCategory } = useFetchFacilityData();
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

  const colorMap = {
    pending: "#FCBB4D",
    awaiting: "#62C28D",
    payment: "#146BD1",
  };

  // Approve/Reject Facility

  const registrationData = {
    data: facilities.map((item) => ({
      id: item.id,
      name: item.name,
      date: item.created_at,
      category: item.categorySelection,
      status: item.status,
    })),
    columns: [
      {
        name: "Facility",
        selector: "name",
        sortable: false,
        cell: (data: FacilityData) => {
          return (
            <Link
              as={ReactLink}
              to={`/dashboard/facilities/${getSlug(data.name!)}`}
            >
              {data.name}
            </Link>
          );
        },
      },
      {
        name: "Inspector",
        selector: "created_at",
        cell: (data: any) => {
          const date = new Date(data.date);
          return <Text>{date.toLocaleString().split(", ")[0]}</Text>;
        },
        sortable: true,
      },
      {
        name: "Scheduled Date",
        selector: "category",
        cell: (data: any) => {
          const category = facilityCategory.find(
            (item) => item.id === data.category.facility_category_id
          );
          return <Text>{category?.name || ""}</Text>;
        },
        sortable: false,
      },
      {
        name: "Action",
        cell: (item: FacilityData) => {
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
            </HStack>
          );
        },
      },
    ],
  };

  const { data, columns } = registrationData;
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
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
        facilities={data}
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
