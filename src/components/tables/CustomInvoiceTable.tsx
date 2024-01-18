/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color";
import CustomTable from "./CustomTable";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { executeGetFacilityInvoices } from "../../apis/facility";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import CustomSelect from "../common/CustomSelect";

interface CustomInvoiceTableProps {}

const CustomInvoiceTable: React.FC<CustomInvoiceTableProps> = () => {
  const { currentFacility } = useAppContext();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetFacilityInvoices(currentFacility!.id, token!, page, perPage)
  );
  const [invoices, setInvoices] = useState<InvoiceDataType[]>(data);

  const columns = [
    {
      name: "Invoice ID",
      selector: "id",
      sortable: false,
    },
    {
      name: "Date Sent",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.invoice_date);
        return <Text>{date.toLocaleDateString()}</Text>;
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
      cell: (data: InvoiceDataType) => {
        return <Text>{(+data.amount).toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Due date",
      selector: "due_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.due_date);
        return <Text>{date.toDateString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      cell: (data: InvoiceDataType) => {
        const isPaid = data.status === "paid";
        const color = isPaid ? "#48A874" : "#DC2626";
        const paymentInfo = JSON.parse(
          data.payments[0].payment_method
        ) as PaymentDataType;
        return (
          <Stack spacing={0}>
            <Text
              color={color}
              fontWeight={"semibold"}
              textTransform={"capitalize"}
            >
              {data.status}
            </Text>
            {isPaid && (
              <Text color={TEXT_DARK_GRAY} fontSize={"xs"}>
                with {paymentInfo.authorization.channel}
              </Text>
            )}
          </Stack>
        );
      },
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const handleChange = (item: { label: string; value: string }) => {
      const val = item.value;
      if (!val || val === "*") return setInvoices(data);
      const filtered = (data as InvoiceDataType[]).filter(
        (elem) => elem.status.toLowerCase() === val.toLowerCase()
      );
      setInvoices(filtered);
    };

    return (
      <FilterComponent
        onChange={handleChange}
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
    //eslint-disable-next-line
  }, [filterText, resetPaginationToggle]);

  return (
    <Box p={4} bg={"white"} rounded={"md"}>
      <CustomTable
        columns={columns as any}
        data={invoices}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}
        progressPending={loadingData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </Box>
  );
};

// TABLE HEADER
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onChange: (data: { label: string; value: string }) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onChange,
  onFilter,
  filterText,
}) => {
  const filterData = [
    { label: "All", value: "*" },
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
  ];
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
      <CustomSelect
        onChange={(value) => onChange(value as any)}
        options={filterData}
        fontSize="sm"
      />
    </HStack>
  );
};

export default CustomInvoiceTable;
