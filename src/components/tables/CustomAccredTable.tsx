/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Icon, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react"
import { RED, YELLOW } from "../../utils/color";
import CustomTable from "./CustomTable";
import { BiEdit, BiTrash } from "react-icons/bi";
import FilterComponent from "../common/FilterComponent";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import useFetchFacilityData from "../../hooks/useFetchFacilityData";
import { executeDeleteFacility } from "../../apis/facility";
import { populateFacilities } from "../../store/slice/dataSlice";
import ActionModal from "../modals/ActionModal";


interface CustomAccredTableProps { }
const CustomAccredTable: React.FC<CustomAccredTableProps> = () => {
  const allFacilities = useAppSelector(state => state.dataStore.facilities)
  const facilities = allFacilities.filter(item => !item?.enable_documentation)
  const [deletingFacility, setDeletingFacility] = useState<number | null>(null)
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  const { facilityCategory } = useFetchFacilityData()
  const dispatch = useAppDispatch()


  const accreditedData = {
    data: facilities.map(item => ({
      id: item.id,
      name: item.name,
      date: item.status.approval_date,
      category: facilityCategory.find(cat => cat.id === item.categorySelection.facility_category_id)?.name || "",
      status: item.status.status
    })),
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: false,
      },
      {
        name: "Accreditation Date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Category",
        selector: "category",
        sortable: false,
      },
      {
        name: "Status",
        selector: "status",
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
                icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
              />
              <IconButton
                bg={"#FEE2E2"}
                _hover={{ bg: "#FEE2E2" }}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete"
                isLoading={(item.id === deletingFacility) && isLoading}
                onClick={() => setDeletingFacility(item.id! as number)}
                icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
              />
            </HStack>
          )
        },
      },
    ]
  }


  const { data, columns } = accreditedData

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);



  // DELETE FACILITY
  const handleDelete = async () => {
    try {
      openLoading()
      const result = await executeDeleteFacility([deletingFacility!], token!)
      if (result.status === "error") throw new Error(result.message)

      // UPDATE FACILITIES STATE
      const newFacilities = facilities.filter(item => item.id !== deletingFacility)
      dispatch(populateFacilities(newFacilities))

      toast({
        title: "Facility deleted!",
        status: "success"
      })
      setDeletingFacility(null)
    }
    catch (e: any) {
      console.log("ERROR:", e.message)
      toast({
        title: e.message,
        status: "error"
      })
    }
    finally {
      closeLoading()
    }
  }


  return (
    <>
      <CustomTable
        columns={columns as any}
        data={filteredItems}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}
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
    </>
  )
}

export default CustomAccredTable