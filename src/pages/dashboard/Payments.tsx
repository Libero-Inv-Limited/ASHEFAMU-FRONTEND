/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color";
import CustomTable from "../../components/tables/CustomTable";
import FilterComponent from "../../components/common/FilterComponent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InvoiceModal from "../../components/modals/InvoiceModal";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { executeGetFacilityInvoices } from "../../apis/facility";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import CustomSelect from "../../components/common/CustomSelect";
import { executePayInvoice } from "../../apis/user";


interface PaymentProps { }
const Payment: React.FC<PaymentProps> = () => {
  const [selectedData, setSelectedData] = useState<InvoiceDataType | null>(null)
  const { currentFacility } = useAppContext()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const { data, totalRows, handlePageChange, handlePerRowsChange, loadingData, } = usePaginatedTableData((page, perPage) => executeGetFacilityInvoices(currentFacility!.id, token!, page, perPage))
  const [invoices, setInvoices] = useState<InvoiceDataType[]>(data)
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  
  
  const columns = [
    {
      name: "Invoice ID",
      cell: (item: InvoiceDataType) => {
        return <Button color={DARK} onClick={() => setSelectedData(item)} variant={"link"} size={"sm"}>{item.id}</Button>
      },
      sortable: false,
    },
    {
      name: "Date Sent",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.invoice_date)
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
      cell: (data: InvoiceDataType) => {
        return (
          <Text>{(+data.amount).toLocaleString()}</Text>
        )
      },
      sortable: true,
    },
    {
      name: "Due date",
      selector: "due_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.due_date)
        return (
          <Text>{date.toDateString()}</Text>
        )
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      cell: (data: InvoiceDataType) => {
        const isPaid = data.status === "paid"
        const color = isPaid ? "#48A874" : "#DC2626"
        const paymentInfo = JSON.parse(data.payments[0].payment_method) as PaymentDataType
        return (
          <Stack spacing={0}>
            <Text color={color} fontWeight={"semibold"} textTransform={"capitalize"}>{data.status}</Text>
            {isPaid && <Text color={TEXT_DARK_GRAY} fontSize={"xs"}>with {paymentInfo.authorization.channel}</Text>}
          </Stack>
        )
      },
    },
  ]

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    const filterData = [
      {label: "All", value: "*"},
      {label: "Paid", value: "paid"},
      {label: "Unpaid", value: "unpaid"},
    ]

    const handleChange = (item: { label: string, value: string }) => {
      const val = item.value
      if(!val || val === "*") return setInvoices(data)
      const filtered = (data as InvoiceDataType[]).filter(elem => elem.status.toLowerCase() === val.toLowerCase())
      setInvoices(filtered)
    }

    return (
      <FilterComponent
        placeholder="Search status"
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        customRightElement={
          <CustomSelect
            onChange={(value) => handleChange(value as any)}
            options={filterData}
            fontSize="sm"
          />
        }
      />
    );
  }, [filterText, resetPaginationToggle]);


  // HANDLE PAYMENT
  const handlePayment = async (method: PayOptions) => {
    try {
      openLoading()
      const payload: PayInvoice = { paymentMethod: method, invoiceId: selectedData!.id }
      const result = await executePayInvoice(payload, token!)
      if(result.status === "error") throw new Error(result.message)

      // REDIRECT
      window.open(result.data.url, "_blank")
    }
    catch(e: any) {
      toast({
        title: e.message,
        status: "error" 
      })
    }
    finally {
      closeLoading()
      setSelectedData(null)
    }
  }

  return (
    <DashboardLayout>
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

      <InvoiceModal 
        invoiceId={selectedData?.id as any}
        isOpen={Boolean(selectedData)}
        onClose={() => setSelectedData(null)}
        status={selectedData?.status as any}
        isLoading={isLoading}

        handleAction={handlePayment }
        handleViewInvoice={() => {}}
      />
    </DashboardLayout>
  )
}

export default Payment