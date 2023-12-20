/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Icon,
  HStack,
  Input,
  InputLeftElement,
  Spacer,
  Text,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DARK, TEXT_GRAY } from "../../../utils/color";
import CustomTable from "../../../components/tables/CustomTable";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import usePaginatedTableData from "../../../hooks/usePaginatedTableData";
import { useAppSelector } from "../../../store/hook";
import {
  executeGetUserFacilities,
  executeGetUserProfile,
  executeRemoveFacility,
} from "../../../apis/user";
import ModalComponent from "../../../components/modals/CustomModal";
import { useForm } from "react-hook-form";
import ROUTES from "./../../../utils/routeNames";
import { useNavigate } from "react-router-dom";
import { getSlug } from "../../../utils/helpers";
import { useLocation } from "react-router-dom";
import { facilitiesColumns } from "./helpers";
import { SimpleGrid } from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { InputGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import CustomButton from "./../../../components/common/CustomButton";
import { BsPlus } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { executeAssignFacility } from "./../../../apis/user";
import ActionModal from "./../../../components/modals/ActionModal";
import { Stack } from "@chakra-ui/react";
import PermissionList from "../roles/EditForm";
import useGetAllPermissions from "./../../../hooks/useGetAllPermissions";

interface UserProps {}
const UserPermissions: React.FC<UserProps> = () => {
  const location = useLocation();
  const { id, firstname } = location.state;
  const [permissions, setPermissions] = React.useState<string[]>([]);
  // const token = useAppSelector((state) => state.accountStore.tokenStore!.token);

  // const toast = useToast({
  //   position: "bottom",
  //   isClosable: true,
  //   variant: "subtle",
  // });

  const handleAddPermissions = (arr: string[]) => {
    setPermissions(arr);
  };

  const { data } = useGetAllPermissions();

  return (
    <DashboardLayout>
      <Stack spacing={14}>
        <Stack bg="white" p={8} pt={4} spacing={"8"}>
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            {`${firstname}'s PERMISSIONS`}
          </Heading>
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            LIST OF PERMISSIONS
          </Heading>
          <PermissionList
            groupedPermissions={data}
            handleAddPermissions={handleAddPermissions}
            rolePermissions={location.state.permissions}
          />
          {/* <HStack alignSelf={["unset", "flex-end", "flex-end"]}>
            <CustomButton
              onClick={handleSubmit}
              size="md"
              outlineColor={DARK}
              colorScheme="gray"
              width="150px"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSubmit} size="md">
              Update Details
            </CustomButton>
          </HStack> */}
        </Stack>
      </Stack>
    </DashboardLayout>
  );
};

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  onOpen: () => void;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  onOpen,
}) => {
  return (
    <HStack
      flexWrap={"wrap"}
      flexDir={["column-reverse", "column-reverse", "row"]}
      spacing={2}
      alignItems={["flex-start", "flex-start", "center"]}
      w={"full"}
    >
      <InputGroup flex={1} maxW={["full", "full", 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input
          fontSize={"sm"}
          onChange={onFilter}
          value={filterText}
          placeholder="Search"
        />
      </InputGroup>

      <Spacer />
      <CustomButton
        onClick={onOpen}
        alignSelf={["flex-end", "flex-end", "unset"]}
        leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
      >
        Assign a facility{" "}
      </CustomButton>
    </HStack>
  );
};

export default UserPermissions;
