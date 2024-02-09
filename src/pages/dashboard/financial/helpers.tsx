import { Text } from "@chakra-ui/react";
import { Switch, Button, Stack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { DARK, YELLOW } from "../../../utils/color";
import { BiEdit } from "react-icons/bi";

export const registrationData = (
  invoices: InvoiceDataType[],
  setSelectedData: (data) => void
) => ({
  invoices,
  setSelectedData,
  columns: [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: false,
      cell: (data: InvoiceDataType) => {
        return data.status === "paid" ? (
          <Button
            color={DARK}
            onClick={() => setSelectedData(data)}
            variant={"link"}
            size={"sm"}
          >
            {data.id}
          </Button>
        ) : (
          <Button
            h={"30px"}
            rounded={"4px"}
            colorScheme="brand"
            size={"lg"}
            fontWeight={"500"}
            fontSize={"14px"}
            onClick={() => setSelectedData(data)}
          >
            pay now
          </Button>
        );
      },
    },
    {
      name: "facility",
      selector: "facility",
      cell: (data: InvoiceDataType) => {
        return <Text>{data.facility.name}</Text>;
      },
      sortable: true,
    },
    {
      name: "Date Sent",
      selector: "invoice_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.invoice_date * 1000);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Fee Category",
      selector: "facility",
      cell: (data: InvoiceDataType) => {
        return <Text>{data.description}</Text>;
      },
      sortable: true,
    },
    {
      name: "Amount",
      selector: "facility",
      cell: (data: InvoiceDataType) => {
        return <Text fontWeight={600}>{data.amount}</Text>;
      },
      sortable: true,
    },
    {
      name: "Due Date",
      selector: "invoice_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.due_date * 1000);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Next Payment",
      selector: "next_payment",
      cell: (data: InvoiceDataType) => {
        const date =
          data.next_payment === "0"
            ? null
            : new Date(+data.next_payment * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
        return <Text>{date ?? "NIL"}</Text>;
      },
      sortable: false,
    },
    {
      name: "Status",
      selector: "status",
      cell: (data: InvoiceDataType) => {
        const isPaid = data.status === "paid";
        const color = isPaid ? "#48A874" : "#DC2626";
        return (
          <Stack spacing={0}>
            <Text
              color={color}
              fontWeight={"semibold"}
              textTransform={"capitalize"}
            >
              {data.status}
            </Text>
          </Stack>
        );
      },
    },
  ],
});

export const registrationDataTwo = (invoices: InvoiceDataType[]) => ({
  invoices,
  columns: [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: false,
      cell: (data: InvoiceDataType) => {
        return (
          <Button color={DARK} variant={"link"} size={"sm"}>
            {data.id}
          </Button>
        );
      },
    },
    {
      name: "facility",
      selector: "facility",
      cell: (data: InvoiceDataType) => {
        return <Text>{data.facility.name}</Text>;
      },
      sortable: true,
    },
    {
      name: "Date Sent",
      selector: "invoice_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.invoice_date * 1000);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Fee Category",
      selector: "facility",
      cell: (data: InvoiceDataType) => {
        return <Text>{data.description}</Text>;
      },
      sortable: true,
    },
    {
      name: "Due Date",
      selector: "invoice_date",
      cell: (data: InvoiceDataType) => {
        const date = new Date(+data.due_date * 1000);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Status",
      selector: "status",
      cell: (data: InvoiceDataType) => {
        const isPaid = data.status === "paid";
        const color = isPaid ? "#48A874" : "#DC2626";
        return (
          <Stack spacing={0}>
            <Text
              color={color}
              fontWeight={"semibold"}
              textTransform={"capitalize"}
            >
              {data.status}
            </Text>
          </Stack>
        );
      },
    },
  ],
});

export const penaltiesData = (invoices: PenaltyDataType[]) => ({
  invoices,
  columns: [
    {
      name: "Penalty Id",
      selector: "id",
      sortable: false,
    },
    {
      name: "facility",
      selector: "facility",
      cell: (data: PenaltyDataType) => {
        return <Text>{data.facility.name}</Text>;
      },
      sortable: true,
    },
    {
      name: "Date Sent",
      selector: "invoice_date",
      cell: (data: PenaltyDataType) => {
        const date = new Date(data.created_at);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
    },
    {
      name: "Status",
      selector: "paid",
      cell: (data: PenaltyDataType) => {
        return (
          <Text fontWeight={"700"} color={data.paid ? "#48A874" : "#DC2626"}>
            {data.paid ? `Paid with ${data.payment_details}` : "Unpaid"}
          </Text>
        );
      },
      sortable: false,
    },
  ],
});

export const invoiceHistoryData = (
  invoices: InvoiceHistoryType[],
  setSelectedData: (data) => void
) => ({
  invoices,
  columns: [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: false,
      cell: (data: InvoiceHistoryType) => {
        return data.payment_status === "paid" ? (
          <Button
            color={DARK}
            onClick={() => setSelectedData(data)}
            variant={"link"}
            size={"sm"}
          >
            {data.id}
          </Button>
        ) : (
          <Button
            h={"30px"}
            rounded={"4px"}
            colorScheme="brand"
            size={"lg"}
            fontWeight={"500"}
            fontSize={"14px"}
            onClick={() => setSelectedData(data)}
          >
            pay now
          </Button>
        );
      },
    },
    {
      name: "Payment Date",
      selector: "payment_date",
      cell: (data: InvoiceHistoryType) => {
        const date = new Date(data.payment_date);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Amount Paid",
      selector: "amount_paid",
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: "payment_status",
      cell: (data: InvoiceHistoryType) => {
        return (
          <Text
            fontWeight={"700"}
            color={data.payment_status === "paid" ? "#48A874" : "#DC2626"}
          >
            {data.payment_status}
          </Text>
        );
      },
      sortable: false,
    },
  ],
});

export const feeColumns = (
  handleToggleStatus,
  isEditing,
  editId,
  setEditId
) => {
  return [
    {
      name: "Name",
      selector: "category",
      sortable: false,
    },
    {
      name: "Date Created",
      cell: (data: FeeDataType) => {
        const date = new Date(data.created_at);
        return (
          <Text>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        );
      },
      sortable: true,
    },
    {
      name: "Amount (N)",
      cell: (data: FeeDataType) => {
        return <Text>{(+data.amount).toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: false,
    },
    {
      name: "Enable/Disable",
      cell: (data: FeeDataType) => {
        return (
          <Switch
            isChecked={data.status === "active"}
            colorScheme="brand"
            onChange={() => {
              const status = data.status === "active" ? "inactive" : "active";
              handleToggleStatus(data.id, status, data);
            }}
            color={DARK}
            size="md"
            fontWeight="500"
            py={1}
          />
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (item: FeeDataType) => {
        return (
          <IconButton
            _hover={{ bg: "#FFEBC9" }}
            rounded={"full"}
            bg={"#FFEBC9"}
            aria-label="edit"
            isLoading={isEditing && item.id === editId}
            onClick={() => setEditId(item.id)}
            icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
          />
        );
      },
    },
  ];
};
