/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import DataTable, { TableProps } from "react-data-table-component"
import { LIGHT_GREEN } from "../../utils/color"

interface CustomTableProps extends TableProps<any> { 
}
const CustomTable: React.FC<CustomTableProps> = (props) => {
  return (
    <DataTable
      pagination
      customStyles={{
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
            borderRadius: 0
          }
        },
        headRow: {
          style: {
            backgroundColor: LIGHT_GREEN,
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
          },
        }
      }}
      subHeader
      selectableRows
      persistTableHead
      {...props}
    />
  )
}

export default CustomTable