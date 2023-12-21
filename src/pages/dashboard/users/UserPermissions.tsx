/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack } from "@chakra-ui/react";
import React from "react";
import { DARK } from "../../../utils/color";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useAppSelector } from "../../../store/hook";
import { useLocation } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import CustomButton from "./../../../components/common/CustomButton";
import { useToast } from "@chakra-ui/react";
import ActionModal from "./../../../components/modals/ActionModal";
import { Stack } from "@chakra-ui/react";
import PermissionList from "./PermissionList";
import useGetAllPossiblePermissions from "./../../../hooks/useGetAllPossiblePermissions";
import { useDisclosure } from "@chakra-ui/react";
import { executeUpdateUserPermission } from "./../../../apis/permission";
import { SkeletonText } from '@chakra-ui/react';

interface UserProps {}
const UserPermissions: React.FC<UserProps> = () => {
  const location = useLocation();
  const { id, firstname } = location.state;
  const [permissions, setPermissions] = React.useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();

  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleAddPermissions = (arr: string[]) => {
    setPermissions(arr);
  };

  const { data, loadingData } = useGetAllPossiblePermissions(id);

  const handleUpdateUserPermissions = async () => {
    try {
      openLoading();
      const payload: UserPermissions = {
        permissions,
        userId: id,
      };
      const response = await executeUpdateUserPermission(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      onClose();
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeLoading();
    }
  };

  console.log({ permissions });

  if (loadingData) {
    return <SkeletonText />;
  }

  return (
    <DashboardLayout>
      <Stack spacing={14}>
        <Stack bg="white" p={8} pt={4} spacing={"8"}>
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            {`${firstname}'s PERMISSIONS`.toUpperCase()}
          </Heading>
          <PermissionList
            groupedPermissions={data}
            handleAddPermissions={handleAddPermissions}
          />
          <HStack alignSelf={["unset", "flex-end", "flex-end"]}>
            <CustomButton
              onClick={() => setPermissions(null)}
              size="md"
              outlineColor={DARK}
              colorScheme="gray"
              width="150px"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={onOpen} size="md">
              Update Details
            </CustomButton>
          </HStack>
        </Stack>
      </Stack>
      <ActionModal
        title={`Are you sure you want to update ${firstname}'s permissions?`}
        text="This action cannot be undone"
        status="danger"
        isLoading={isLoading}
        handleAction={handleUpdateUserPermissions}
        isOpen={isOpen}
        onClose={onClose}
        actionBtnText="Confirm"
      />
    </DashboardLayout>
  );
};

export default UserPermissions;
