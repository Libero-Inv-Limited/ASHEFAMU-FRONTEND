/* eslint-disable @typescript-eslint/no-explicit-any */
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
import React, { useState } from "react";
import FormTitle from "../../../components/common/FormTitle";
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

interface BasicFormProps {
  setActiveStep: (no: any) => void;
  activeStep: number;
}

const BasicForm: React.FC<BasicFormProps> = ({ setActiveStep, activeStep }) => {
  const location = useLocation();
  const { data: rolesData } = useGetAllRoles();
  const [user, setUser] = useState(location.state);
  const { control, watch, setValue, trigger, getValues } = useForm({
    mode: "onSubmit",
  });
  const prevDatas = watch();
  console.log("PREV DATA:", prevDatas);

  const {
    isOpen: isEditing,
    onOpen: openEditing,
    onClose: closeEditing,
  } = useDisclosure();

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const { isFetching, facilityCategory, sectorCategory, serviceScope } =
    useFetchFacilityData();

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
          <FormControl control={control} columns={{ base: 2, lg: 4 }}>
            <FormLabel htmlFor="isChecked">Activate/Deactivate User</FormLabel>
            <Switch id="isChecked" isChecked mr={2} />
            Deactivated
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
        <Text fontWeight={"700"} color={"brand.500"} fontSize={"sm"}>
          Activated
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
