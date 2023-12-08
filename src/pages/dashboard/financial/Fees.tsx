/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { DARK } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import FilterComponent from "../../../components/common/FilterComponent";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import InvoiceModal from "../../../components/modals/InvoiceModal";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import CustomSelect from "../../../components/common/CustomSelect";
import { executeDownloadInvoice, executePayInvoice } from "../../../apis/user";
import { executeGetAllFees } from "./../../../apis/finances";
import { Switch } from "@chakra-ui/react";
import { executeUpdateFee } from "./../../../apis/finances";

interface PaymentProps {}
const Fees: React.FC<PaymentProps> = () => {
  const [selectedData, setSelectedData] = useState<FeeDataType | null>(null);
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const { onOpen: openEditing, onClose: closeEditing } = useDisclosure();
  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    handleReloadData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetAllFees(token!, page, perPage)
  );
  const [fees, setFees] = useState<FeeDataType[]>(data);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
    const filteredItems = fees.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase().includes(filterText.toLowerCase())
    );
  

  const handleToggleStatus = async (
    id: number,
    status: string,
    data: FeeDataType
  ) => {
    try {
      openEditing();
      const response = await executeUpdateFee({ ...data, id, status }, token!);
      if (response.status === "error") throw new Error(response.message);
      toast({
        title: response.message,
        status: response.status,
      });
      handleReloadData();
      closeEditing();
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  };

  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const columns = [
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
      name: "Description",
      selector: "description",
      sortable: false,
    },
    {
      name: "Amount (N)",
      cell: (data: FeeDataType) => {
        return <Text>{(+data.amount).toLocaleString()}</Text>;
      },
      sortable: true,
    },
    {
      name: "Due date",
      selector: "due_date",
      cell: (data: FeeDataType) => {
        const date = new Date(+data.updates_at);
        return <Text>{date.toDateString()}</Text>;
      },
      sortable: true,
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
  ];

 

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const filterData = [
      { label: "All", value: "*" },
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" },
    ];

    const handleChange = (item: { label: string; value: string }) => {
      const val = item.value;
      if (!val || val === "*") return setFees(data);
      const filtered = (data as FeeDataType[]).filter(
        (elem) => elem.category.toLowerCase() === val.toLowerCase()
      );
      setFees(filtered);
    };

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

  React.useEffect(() => {
    setFees(data);
  }, [data]);

  // HANDLE PAYMENT
  const handlePayment = async (method: PayOptions) => {
    try {
      openLoading();
      const payload: PayInvoice = {
        paymentMethod: method,
        invoiceId: selectedData!.id,
      };
      const result = await executePayInvoice(payload, token!);
      if (result.status === "error") throw new Error(result.message);

      // REDIRECT
      window.open(result.data.url, "_blank");
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

  //executeDownloadInvoice
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
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={columns as any}
          data={filteredItems}
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
        handleAction={handlePayment}
        handleViewInvoice={handleViewInvoice}
      />
    </DashboardLayout>
  );
};

export default Fees;
