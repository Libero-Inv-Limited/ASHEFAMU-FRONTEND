/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react"
import { DARK, RED, YELLOW } from "../../utils/color";
import CustomTable from "../../components/tables/CustomTable";
import { paymentData } from "../../utils/data";
import { BiEdit, BiTrash } from "react-icons/bi";
import FilterComponent from "../../components/common/FilterComponent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InvoiceModal from "../../components/modals/InvoiceModal";



interface PaymentProps { }
const Payment: React.FC<PaymentProps> = () => {
  const [selectedData, setSelectedData] = useState<typeof paymentData[0] | null>(null)

  const accreditedData = {
    data: paymentData,
    columns: [
      {
        name: "Invoice Id",
        selector: "invoice_id",
        sortable: false,
        cell: (item: typeof paymentData[0]) => {
          return <Button color={DARK} onClick={() => setSelectedData(item)} variant={"link"} size={"sm"}>{item.invoice_id}</Button>
        }
      },
      {
        name: "Date sent",
        selector: "date_sent",
        sortable: true,
        cell: (item: typeof paymentData[0]) => {
          const date = new Date(item.date_sent)
          return <Text fontSize={"sm"} color={DARK}>{date.getFullYear()}</Text>
        }
      },
      {
        name: "Fee category",
        selector: "fee_category",
        sortable: false,
      },
      {
        name: "Facility",
        selector: "facility",
        sortable: false,
      },
      {
        name: "Amount (N)",
        selector: "amount",
        sortable: true,
      },
      {
        name: "Due Date",
        selector: "due_date",
        sortable: true,
      },
      {
        name: "Status",
        selector: "status",
        sortable: false,
        cell: (item: typeof paymentData[0]) => {
          const isPaid = item.status.toLowerCase() === "paid"
          return <Text fontSize={"sm"} color={isPaid ? "brand.500" : RED } fontWeight={600}>{item.status}</Text>
        }
      },
      {
        name: "Actions",
        selector: "",
        sortable: false,
        cell: () => {
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
  const filteredItems = data.filter((item) => item.status && item.status.toLowerCase().includes(filterText.toLowerCase()),
  );


  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        placeholder="Search status"
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DashboardLayout>
      <Stack bg={"white"} p={4} rounded={"md"}>
        <CustomTable
          columns={columns as any}
          data={filteredItems}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeaderComponent={subHeaderComponentMemo}
        />
      </Stack>
      <InvoiceModal 
        handleAction={() => {}}
        invoiceId={selectedData?.invoice_id as any}
        isOpen={Boolean(selectedData)}
        onClose={() => setSelectedData(null)}
        status={selectedData?.status as any}
        handleViewInvoice={() => {}}
      />
    </DashboardLayout>
  )
}

export default Payment