/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeUpdateFee } from './../../../../apis/finances';
import { useToast } from '@chakra-ui/react';

const useFeeHook = (openEditing, token, handleReloadData, closeEditing) => {
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

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

  return {
    handleToggleStatus,
  }
  
}

export default useFeeHook