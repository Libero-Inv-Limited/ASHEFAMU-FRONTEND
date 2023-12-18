/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthInput from "../../../components/common/AuthInput";
import CustomButton from "../../../components/common/CustomButton";
import { FaLockOpen } from "react-icons/fa";
import useFetchFacilityData from "../../../hooks/useFetchFacilityData";
import Loader from "../../../components/common/loader/Loader";
import { useLocation } from "react-router-dom";
import useGetAllRoles from "./../../../hooks/useGetAllRoles";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { formInputs, formInputsTwo } from "./helpers";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import ActionModal from "../../../components/modals/ActionModal";
import ResetPasswordModal from "./../../../components/modals/ResetPassword";
import { useToast } from "@chakra-ui/react";
import ROUTES from "./../../../utils/routeNames";
import { useNavigate } from "react-router-dom";
import { executeUpdateProfile } from "./../../../apis/user";
import { useAppSelector } from "../../../store/hook";

const BasicForm = () => {
  const location = useLocation();
  const { data: rolesData } = useGetAllRoles();
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const user = location.state;
  const [active, setActive] = React.useState<boolean>(user.status === "active");

  const { control, watch, trigger, getValues } = useForm<UserUpdatePayload>({
    mode: "onSubmit",
  });
  const prevDatas = watch();
  console.log("PREV DATA:", prevDatas);
  const navigate = useNavigate();

  const {
    isOpen: isEditing,
    onOpen: openEditing,
    onClose: closeEditing,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const { isFetching } = useFetchFacilityData();

  const {
    isOpen: isActionOpen,
    onOpen: openAction,
    onClose: closeAction,
  } = useDisclosure();

  const {
    isOpen: isResetOpen,
    onOpen: openResetModal,
    onClose: closeResetModal,
  } = useDisclosure();

  const handleSubmit = () => {
    toast({
      status: "success",
      title: "success",
    });
  };

  const handleUpdateUser = async () => {
    if (!(await trigger())) return;
    try {
      onOpen();
      const payload = { ...getValues() };
      const response = await executeUpdateProfile(
        {
          ...payload,
          role_id: (getValues("role_id") as any).value,
          status: active ? "active" : "inactive",
          user_id: user.id,
          mobile: user.mobile_number,
        },
        token!
      );
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      onClose();
    }
  };

  const handleToggleStatus = () => {
    setActive((prev) => !prev);
  };

  const handleResetPassword = () => {};
  return (
    <Stack spacing={14}>
      <Stack spacing={6}>
        <Flex justifyContent="space-between">
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            USER INFO
          </Heading>
          <Button onClick={openEditing}>Edit</Button>
        </Flex>
        <Grid templateColumns="repeat(6, 1fr)" gap={4}>
          {formInputs(user).map((item) => (
            <GridItem colSpan={[6, 6, 2]}>
              <AuthInput
                bg={"#F4F7F4"}
                Icon={item.icon}
                control={control}
                fontSize={"sm"}
                label={item.label}
                name={item.name}
                value={item.value}
                rules={{
                  required: item.rules,
                }}
              />
            </GridItem>
          ))}
        </Grid>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          {formInputsTwo(user, isEditing).map((item) => (
            <GridItem colSpan={isEditing ? [12, 12, 12] : [12, 12, 6]}>
              <AuthInput
                bg={"#F4F7F4"}
                data={
                  item.isSelect
                    ? rolesData.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : null
                }
                Icon={item.icon}
                isSelect={item.isSelect}
                control={control}
                fontSize={"sm"}
                label={item.label}
                name={item.name}
                value={item.value}
                rules={{
                  required: item.rules,
                }}
              />
            </GridItem>
          ))}
        </Grid>
        {isEditing && (
          <FormControl>
            <FormLabel htmlFor="isChecked">Activate/Deactivate User</FormLabel>
            <Switch
              id="isChecked"
              isChecked={active}
              mr={2}
              onChange={handleToggleStatus}
            />
            {user.status === "active" ? "Activated" : "Deactivated"}
          </FormControl>
        )}
        {isEditing && (
          <CustomButton
            h={"32px"}
            variant={"outline"}
            fontSize={"xs"}
            maxW={200}
            colorScheme="gray"
            rounded={"full"}
            leftIcon={<FaLockOpen />}
            onClick={openResetModal}
          >
            Reset user password{" "}
          </CustomButton>
        )}
        <HStack>
          <Heading size={"sm"} fontWeight="normal" color="#4E596C">
            FACILITIES(5)
          </Heading>
          <CustomButton
            h={"32px"}
            variant={"outline"}
            fontSize={"xs"}
            maxW={150}
            colorScheme="gray"
            rounded={"full"}
            onClick={() =>
              navigate(ROUTES.VIEW_USER_FACILITIES_ROUTE(`${user.firstname}`), {
                state: user,
              })
            }
          >
            View facilities
          </CustomButton>
        </HStack>
        <HStack>
          <Heading size={"sm"} fontWeight="normal" color="#4E596C">
            PERMISSIONS(5)
          </Heading>
          <CustomButton
            h={"32px"}
            variant={"outline"}
            fontSize={"xs"}
            maxW={150}
            colorScheme="gray"
            rounded={"full"}
          >
            View permissions
          </CustomButton>
        </HStack>
      </Stack>
      <Flex justifyContent="space-between">
        <Text
          fontWeight={"700"}
          color={user.status === "active" ? "brand.500" : "red"}
          fontSize={"sm"}
        >
          {user.status === "active" ? "Activated" : "Deactivated"}
        </Text>
        <HStack>
          {isEditing && (
            <CustomButton onClick={closeEditing} colorScheme="gray">
              Cancel
            </CustomButton>
          )}
          <Button
            bg={isEditing ? "brand.500" : "#E2E6EB"}
            fontSize="14px"
            color={isEditing ? "white" : "#76859A"}
            onClick={handleUpdateUser}
            isDisabled={!isEditing}
            isLoading={isOpen}
          >
            Update details
          </Button>
        </HStack>
      </Flex>
      {isFetching && <Loader />}
      <ResetPasswordModal
        control={control}
        watch={watch}
        handleResetPassword={handleResetPassword}
        onClose={closeResetModal}
        isOpen={isResetOpen}
        openConfirmation={openAction}
        title={`Reset ${user.firstname}'s Password`}
      />
      <ActionModal
        onClose={closeAction}
        status="danger"
        actionBtnText="Yes"
        handleAction={handleSubmit}
        isOpen={isActionOpen}
        title="Are you sure you want to reset this user’s password?"
      />
    </Stack>
  );
};

export default BasicForm;
