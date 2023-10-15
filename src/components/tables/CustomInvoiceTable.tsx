/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, HStack, Icon, Input, InputGroup, InputLeftElement, Select, Spacer, Text } from "@chakra-ui/react";
import React from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_DARK, TEXT_GRAY } from "../../utils/color";
import CustomTable from "./CustomTable";
import { invoiceData } from "../../utils/data";


const invoice = {
  data: invoiceData,
  columns: [
    {
      name: "Invoice ID",
      selector: "id",
      sortable: false,
    },
    {
      name: "Date Sent",
      selector: "created_at",
      cell: (data: InvoiceData) => {
        const date = new Date(data.created_at)
        console.log(date)
        return (
          <Text>{date.toLocaleDateString()}</Text>
        )
      },
      sortable: true,
    },
    {
      name: "Fee Category",
      selector: "description",
      sortable: false,
    },
    {
      name: "Amount (N)",
      selector: "amount",
      sortable: true,
    },
    {
      name: "Due date",
      selector: "due_date",
      cell: (data: InvoiceData) => {
        const date = new Date(data.due_date)
        console.log(date)
        return (
          <Text>{date.toDateString()}</Text>
        )
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      cell: (data: InvoiceData) => {
        const color = data.status === "paid" ? "#48A874" : "#DC2626"
        return (
          <Text color={color} fontWeight={"semibold"} textTransform={"capitalize"}>{data.status}</Text>
        )
      },
    },
  ]
}


interface CustomInvoiceTableProps {}

const CustomInvoiceTable: React.FC<CustomInvoiceTableProps> = () => {
  const { data, columns } = invoice
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter((item) => item.id && item.id.toString().toLowerCase().includes(filterText.toLowerCase()),
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

  return (
    <CustomTable
      columns={columns as any}
      data={filteredItems}
      paginationResetDefaultPage={resetPaginationToggle}
      subHeaderComponent={subHeaderComponentMemo}
    />
  )
}


// TABLE HEADER 
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({ onFilter, filterText }) => {
  return (
    <HStack flexWrap={"wrap"} flexDir={['column-reverse', 'column-reverse', 'row']} spacing={2} alignItems={["flex-start", "flex-start", "center"]} w={"full"}>
      <InputGroup flex={1} maxW={['full', 'full', 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" />
      </InputGroup>
      <Spacer />
      <Select maxW={150} fontSize={"sm"} color={TEXT_DARK}>
        <option value="">Filter</option>
      </Select>
    </HStack>
  )
}

export default CustomInvoiceTable