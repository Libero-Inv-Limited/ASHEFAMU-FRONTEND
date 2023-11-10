import { Text, HStack, IconButton, Icon, Switch } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { DARK, RED, YELLOW } from "./../../../utils/color";

export const columns = (
  isLoading: boolean,
  deletingRole: number | null,
  setDeletingRole: Dispatch<SetStateAction<number>>,
  isEditing: boolean,
  editId: number | null,
  setEditId: Dispatch<SetStateAction<number>>
) => [
  {
    name: "Name",
    cell: (data: RoleData) => {
      return <Text>{data.name.toLocaleString()}</Text>;
    },
    sortable: true,
  },
  {
    name: "Inactive/Active",
    cell: (data: RoleData) => {
      return (
        <Switch
          isChecked={data.status}
          colorScheme="brand"
          color={DARK}
          size="md"
          fontWeight="500"
          py={1}
        >
          {data.status}
        </Switch>
      );
    },
    sortable: true,
  },
  {
    name: "Actions",
    selector: "",
    sortable: false,
    cell: (item) => {
      return (
        <HStack>
          <IconButton
            _hover={{ bg: "#FFEBC9" }}
            rounded={"full"}
            bg={"#FFEBC9"}
            aria-label="edit"
            isLoading={isEditing && item.id === editId}
            onClick={() => setEditId(item.id)}
            icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
          />
          <IconButton
            bg={"#FEE2E2"}
            _hover={{ bg: "#FEE2E2" }}
            rounded={"full"}
            colorScheme="red"
            aria-label="delete"
            isLoading={item.id === deletingRole && isLoading}
            onClick={() => setDeletingRole(item.id! as number)}
            icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
          />
        </HStack>
      );
    },
  },
];

export const formInputs = () => {
  return [
    {
      label: "Role Name",
      name: "name",
      rules: "Role name is required",
    },
    {
      label: "Description",
      name: "description",
      rules: "Description is required",
    },
  ];
};

export const formInputsForEdit = (role: RoleData) => {
  return [
    {
      label: "Role Name",
      name: "name",
      rules: "Role name is required",
      value: role?.name
    },
    {
      label: "Description",
      name: "description",
      rules: "Description is required",
      value: role?.description
    },
  ];
};

export const getUniqueCategoryNames = (permissions: Permission[]): string[] => {
  const uniqueCategories: Set<string> = new Set();

  permissions.forEach((permission) => {
    uniqueCategories.add(permission.category);
  });

  return Array.from(uniqueCategories);
};

export const groupPermissionsByCategory = (
  permissions: Permission[]
): { [key: string]: Permission[] } => {
  const groupedPermissions: { [key: string]: Permission[] } = {};

  permissions.forEach((permission) => {
    const category = permission.category;

    if (!groupedPermissions[category]) {
      groupedPermissions[category] = [];
    }

    groupedPermissions[category].push(permission);
  });

  return groupedPermissions;
};
