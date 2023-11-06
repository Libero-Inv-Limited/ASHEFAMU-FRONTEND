/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import DataTable, { TableProps } from "react-data-table-component"
import { DARK, LIGHT_GRAY, LIGHT_GREEN, TEXT_DARK_GRAY } from "../../utils/color"
import { CircularProgress, HStack, Text } from "@chakra-ui/react"
import CustomPagination from "./CustomPagination"
import EmptyTable from "../states/EmptyTable"



interface CustomTableProps extends TableProps<any> { 
}
const CustomTable: React.FC<CustomTableProps> = (props) => {
  return (
    <DataTable
      pagination
      customStyles={{
        tableWrapper: {
          style: {
            background: "#fff",
          }
        },
        subHeader: {
          style: {
            padding: 0
          }
        },
        table: {
          style: {
            border: `1px solid #E2E6EB`,
            borderBottom: 0,
            marginTop: 16,
            borderRadius: 0,
            color: TEXT_DARK_GRAY,
            fontSize: ".9rem"
          }
        },
        headRow: {
          style: {
            backgroundColor: LIGHT_GREEN,
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
          },
        },
        headCells: {
          style: {
            textTransform: "uppercase"
          }
        },
      cells: {
        style: {
          color: DARK,
          borderRight: `1px solid ${LIGHT_GRAY}`
        }
      }
      }}
      subHeader
      noDataComponent={<EmptyTable />}
      persistTableHead
      progressComponent={
        <HStack py={6}>
          <CircularProgress isIndeterminate color='brand.300' size={6} />
          <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>Loading data...</Text>
        </HStack>
      }
      paginationComponent={(props: any) => <CustomPagination {...props} />}
      {...props}
    />
  )
}


export default CustomTable