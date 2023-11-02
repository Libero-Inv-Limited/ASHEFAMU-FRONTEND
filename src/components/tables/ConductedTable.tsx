/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react"
import CustomTable from "./CustomTable";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import { executeGetConduted } from "../../apis/user";
import InspectionResultModal from "../modals/InspectionResultModal";
import { LuFileBarChart2 } from "react-icons/lu";


interface ConductedTableProps { }

const ConductedTable: React.FC<ConductedTableProps> = () => {
  const { currentFacility } = useAppContext()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const { data, totalRows, handlePageChange, handlePerRowsChange, loadingData, } = usePaginatedTableData((page, perPage) => executeGetConduted(currentFacility!.id, token!, page, perPage))
  const facilities = useAppSelector(state => state.dataStore.facilities)
  const [selectedData, setSelectedData] = useState<InspectionData>()


  const columns = [
    {
      name: "Facility",
      selector: "id",
      cell: (data: InspectionData) => {
        return (
          <Text>{facilities?.find(fac => fac.id === data.facility_id)?.name}</Text>
        )
      },
      sortable: false,
    },
    {
      name: "Inspector",
      selector: "inspector_name",
      sortable: true,
    },
    {
      name: "Date Conducted",
      cell: (data: InspectionData) => {
        const date = new Date(data.inspection_date)
        return (
          <Text>{date.toDateString()}</Text>
        )
      },
      sortable: true,
    },
    {
      name: "",
      cell: (data: InspectionData) => {
        return (
          <IconButton
            aria-label="result-btn"
            icon={<Icon as={LuFileBarChart2} color={"primary.500"} />}
            w={"40px"} h={"40px"}
            bg={"#DBE8FE"} rounded={"full"}
            onClick={() => setSelectedData(data)}
            _hover={{ bg: "#DBE8FE" }}
          />
        )
      }
    },
  ]

  return (
    <>
      <CustomTable
        columns={columns as any}
        data={data}
        progressPending={loadingData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />

      <InspectionResultModal
        isOpen={Boolean(selectedData)}
        onClose={() => setSelectedData(undefined)}
        result={selectedData!}
      />
    </>
  )
}
export default ConductedTable