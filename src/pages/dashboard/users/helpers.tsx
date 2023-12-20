/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { HStack, Tag, Text, IconButton, Icon } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import { RED } from "./../../../utils/color";

export const statusTypes = [
  { value: "approved", color: "green", bg: "", label: "Approved" },
  { value: "pending", color: "red", bg: "#FEE2E2", label: "Pending" },
];

export const getStatusTag = (value: string | undefined) => {
  let color;
  statusTypes.forEach((status) => {
    if (status.value === value) {
      color = (
        <Tag
          variant="solid"
          bg={status.bg}
          color={status.color}
          borderRadius={20}
          size="md"
        >
          {status.label}
        </Tag>
      );
    }
  });
  return color;
};
export const formInputs = (values) => {
  return [
    {
      label: "First Name",
      name: "firstname",
      rules: "First name is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.firstname,
    },
    {
      label: "Last Name",
      name: "lastname",
      rules: "Last name is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.lastname,
    },
    {
      label: "Username",
      name: "username",
      rules: "Username is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.username,
    },
  ];
};

export const formInputsTwo = (values, isEditing: boolean) => {
  if (isEditing) {
    return [
      {
        label: "User role",
        name: "role_id",
        rules: "Role is requires",
        icon: MdOutlinePhoneEnabled,
        isSelect: true,
      },
    ];
  }
  return [
    {
      label: "User role",
      name: "role_id",
      rules: "Role is required",
      icon: MdOutlinePhoneEnabled,
      isSelect: true,
    },
    {
      label: "Email",
      name: "email",
      rules: "Email is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.email,
      isSelect: false,
    },
  ];
};

export const facilitiesColumns = (setDeleteId: (id: number | null) => void) => [
  {
    name: "Name",
    cell: (data: FacilityData) => {
      return <Text>{data.name}</Text>;
    },
    sortable: true,
  },
  {
    name: "Accreditation Date",
    cell: (data: FacilityData["status"]) => {
      return <Text>{data.approval_date ? data.approval_date : "N/A"}</Text>;
    },
    sortable: true,
  },
  {
    name: "Category",
    cell: (data: FacilityData) => {
      const category = data.categorySelection?.category;
      return <Text>{category ? category.name : "N/A"}</Text>;
    },
    sortable: true,
  },
  {
    name: "Status",
    cell: (data: FacilityData) => {
      const status = data.status?.status;
      return getStatusTag(status);
    },
    sortable: true,
  },
  {
    name: "Actions",
    selector: "",
    sortable: false,
    cell: (item: any) => {
      return (
        <HStack>
          <IconButton
            bg={"#FEE2E2"}
            _hover={{ bg: "#FEE2E2" }}
            rounded={"full"}
            colorScheme="red"
            aria-label="delete"
            onClick={() => setDeleteId(item.id! as number)}
            icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
          />
        </HStack>
      );
    },
  },
];
