import { Text } from "@chakra-ui/react";
import { HStack, Switch } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineFileText } from "react-icons/ai";
import { DARK, RED, YELLOW } from "../../../utils/color";
import { BiEdit, BiTrash } from "react-icons/bi";

export const registrationData = (invoices: InvoiceDataType[]) => ({
  invoices,
  columns: [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: false,
      cell: (data: InvoiceDataType) => {
        return <Text>{data.id}</Text>;
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
        const date = new Date(+data.invoice_date);
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
        const date = new Date(+data.due_date);
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
      name: "Action",
      cell: (item: InvoiceDataType) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              bg={"#FEE2E2"}
              _hover={{ bg: "#FEE2E2" }}
              rounded={"full"}
              colorScheme="red"
              aria-label="delete"
              // isLoading={item.id === deletingFacility && isLoading}
              // onClick={() => setDeletingFacility(item.id! as number)}
              onClick={() => console.log("Click me", item)}
              icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
            />
            <IconButton
              _hover={{ bg: "#FFEBC9" }}
              rounded={"full"}
              bg={"#FFEBC9"}
              colorScheme="red"
              aria-label="submit"
              onClick={() => console.log("Click me", item)}
              // isLoading={item.id === deletingFacility && isLoading}
              // onClick={() => setInspectionId(item.id! as number)}
              icon={
                <Icon fontSize={"xl"} as={AiOutlineFileText} color={YELLOW} />
              }
            />
          </HStack>
        );
      },
    },
  ],
});

export const feeColumns = (handleToggleStatus, isEditing, editId, setEditId) => {
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
