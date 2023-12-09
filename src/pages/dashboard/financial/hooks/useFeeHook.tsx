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

  const handleEdit = async (id: number) => {
    try {
      openEditing();
      console.log({ id });
      // const response = await executeGetPermissionDetails(id, token!);
      // if (response.status === "error") throw new Error(response.message);

      // const name = response.data.role.name;
      // navigate(ROUTES.EDIT_ROLE_ROUTE(getSlug(name)), {
      //   state: response?.data?.user,
      // });
    } catch (e: any) {
      console.log("Error:", e.meesage);
    } finally {
      closeEditing();
      // setEditId(undefined);
    }
  };
  return {
    handleToggleStatus,
    handleEdit
  }
  
}

export default useFeeHook