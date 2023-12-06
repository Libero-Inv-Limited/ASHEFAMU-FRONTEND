/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CustomTable from "./../../../components/tables/CustomTable";
import ModalComponent from "../../../components/modals/CustomModal";
import { SimpleGrid } from "@chakra-ui/react";
import useFetchHistory from "./hooks/useFetchHistory";

interface FacilitiesProps {}
const UserActivities: React.FC<FacilitiesProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [log, setLog] = React.useState(null);

  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
  } = useFetchHistory();

  const handleOpenModal = (data) => {
    setLog(data);
    onOpen();
  };

  const options: {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "short" | "long";
    day: "numeric" | "2-digit";
  } = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const columns = [
    {
      name: "User",
      selector: "refUser",
      sortable: false,
      cell: (data: LogData) => {
        return (
          <Text onClick={() => handleOpenModal(data)} cursor="pointer">
            {`${data.refUser.firstname} ${data.refUser.lastname}` }
          </Text>
        );
      },
    },
    {
      name: "Activity",
      selector: "description",
      cell: (data: any) => {
        return <Text>{data.description}</Text>;
      },
      sortable: true,
    },
    {
      name: "Time Stamp",
      selector: "timestamp",
      cell: (data: any) => {
        const date = new Date(parseInt(data.timestamp));
        return <Text>{date.toLocaleDateString("en-US", options)}</Text>;
      },
      sortable: false,
    },
  ] as const;

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
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
        <ModalComponent isOpen={isOpen} onClose={onClose}>
          <SimpleGrid gap={4}>
            <Text
              fontSize={"20px"}
              textTransform="uppercase"
              fontWeight={"600"}
            >
              {log?.log_type}
            </Text>
            <Text fontSize="14px">
              {new Date(log?.timestamp).toLocaleDateString("en-US", options)}
            </Text>
            <Text fontSize="14px">{log?.description}</Text>
          </SimpleGrid>
        </ModalComponent>
      </Box>
    </DashboardLayout>
  );
};

export default UserActivities;
