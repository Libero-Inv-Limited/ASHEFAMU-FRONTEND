import { Text } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { AiOutlineFileText } from 'react-icons/ai';
import { RED, YELLOW } from '../../../utils/color';
import { BiTrash } from 'react-icons/bi';



export const registrationData = (invoices: InvoiceDataType[]) => ({
  invoices,
  columns: [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: false,
      cell: (data: InvoiceDataType) => {
        console.log(data);
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
        const date = new Date(parseInt(data.invoice_date) * 1000);
        const readableDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <Text>{readableDate}</Text>;
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
        const date = new Date(parseInt(data.due_date) * 1000);
        const readableDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <Text>{readableDate}</Text>;
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
              onClick = {() => console.log("Click me", item)}
              icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
            />
            <IconButton
              _hover={{ bg: "#FFEBC9" }}
              rounded={"full"}
              bg={"#FFEBC9"}
              colorScheme="red"
              aria-label="submit"
              onClick = {() => console.log("Click me", item)}
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
