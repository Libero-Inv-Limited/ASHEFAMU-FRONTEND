/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IusePaginatedTableData {
  handlePageChange: (page: number) => void;
  handleReloadData: () => void;
  handlePerRowsChange: (newPerPage: number, page: number) => Promise<void>;
  data: any[];
  loadingData: boolean;
  totalRows: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}
const usePaginatedTableData = (
  dataFunc: (page?: number, perPage?: number) => Promise<ResponseDataType>,
  _perPage: number = 15
): IusePaginatedTableData => {
  const [data, setData] = useState([]);
  const [loadingData, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(_perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleReloadData = () => {
    fetchData(currentPage);
  };

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await dataFunc(page, perPage);
      if (response.status === "error") throw new Error(response.message);
      setData(response.data.data ? response.data.data : response.data);
      setTotalRows(response.data.meta.total);
      setLastPage(response.data.meta.last_page);
    } catch (e: any) {
      console.log("ERROR HOOKKKK: ", e.message);
      // toast({
      //   status: "error",
      //   title: e.message
      // })
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    try {
      setLoading(true);
      const response = await dataFunc(page, newPerPage);
      if (response.status === "error") throw new Error(response.message);
      setData(response.data.data);
      setPerPage(newPerPage);
    } catch (e: any) {
      toast({
        status: "error",
        title: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return {
    handlePageChange,
    handlePerRowsChange,
    handleReloadData,
    data,
    loadingData,
    totalRows,
    currentPage,
    perPage,
    lastPage,
  };
};

export default usePaginatedTableData;
