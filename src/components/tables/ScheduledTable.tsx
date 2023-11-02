/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@chakra-ui/react";
import React, { useState } from "react"
import CustomTable from "./CustomTable";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import { executeGetSchedules } from "../../apis/user";


interface ScheduledTableProps { }

const ScheduledTable: React.FC<ScheduledTableProps> = () => {
  const { currentFacility } = useAppContext()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const { data, totalRows, handlePageChange, handlePerRowsChange, loadingData, } = usePaginatedTableData((page, perPage) => executeGetSchedules(currentFacility!.id, token!, page, perPage))
  const facilities = useAppSelector(state => state.dataStore.facilities)

  const columns = [
    {
      name: "Facility",
      selector: "id",
      cell: (data: ScheduleData) => {
        return (
          <Text>{facilities?.find(fac => fac.id === data.facility_id)?.name}</Text>
        )
      },
      sortable: false,
    },
    {
      name: "Inspector",
      selector: "inspector_names",
      sortable: true,
    },
    {
      name: "Scheduled Date",
      cell: (data: ScheduleData) => {
        const date = new Date(data.schedule_date)
        return (
          <Text>{date.toDateString()}</Text>
        )
      },
      sortable: true,
    }
  ]

  return (
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
  )
}

export default ScheduledTable