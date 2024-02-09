/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import CustomTable from "../../components/tables/CustomTable";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Stack } from "@chakra-ui/react";
import useFetchInvoiceHistory from "./financial/hooks/useFetchInvoiceHistory";
import { invoiceHistoryData } from "./financial/helpers";
import { useAppSelector } from "../../store/hook";
import InvoiceModal from "./../../components/modals/InvoiceModal";
import { executeDownloadInvoice } from "./../../apis/user";

const PaymentHistory = () => {
  const currentFacility = useAppSelector(
    (state) => state.dataStore.currentFacility
  );

  const [selectedData, setSelectedData] =
    React.useState<InvoiceHistoryType | null>(null);

  const { data, loadingData } = useFetchInvoiceHistory(currentFacility!.id);
  const { columns } = invoiceHistoryData(data, setSelectedData);

  const {
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);

  const handleViewInvoice = async () => {
    try {
      openLoading();
      await executeDownloadInvoice(selectedData?.id, token!);
    } catch (e: any) {
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeLoading();
      setSelectedData(null);
    }
  };

  return (
    <DashboardLayout>
      <Stack spacing={4} p={2} px={3} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={columns as any}
          data={data}
          progressPending={loadingData}
        />
      </Stack>
      <InvoiceModal
        invoiceId={selectedData?.id as any}
        isOpen={Boolean(selectedData)}
        onClose={() => setSelectedData(null)}
        status={selectedData?.payment_status as any}
        handleViewInvoice={handleViewInvoice}
      />
    </DashboardLayout>
  );
};

export default PaymentHistory;
