import { Text, HStack, IconButton,  Icon} from '@chakra-ui/react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { RED, YELLOW } from './../../../utils/color';


export  const columns = (navigate) =>  [
  {
    name: "Name",
    cell: (data: RoleData) => {
      return (
        <Text>{(data.name).toLocaleString()}</Text>
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
            onClick={() => navigate(item.id)}
            icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
          />
          <IconButton
            bg={"#FEE2E2"}
            _hover={{ bg: "#FEE2E2" }}
            rounded={"full"}
            colorScheme="red"
            aria-label="delete"
            icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
          />
        </HStack>
      );
    },
  },
];

export const formInputs = (values) => {
  return [
    {
      label: "Role Name",
      name: "name",
      rules: "Role name is required",
      value: values?.name,
    },
    {
      label: "Description",
      name: "description",
      rules: "Description is required",
      value: values?.description,
    },
  ];
};


export const getUniqueCategoryNames = (permissions: Permission[]): string[] => {
  const uniqueCategories: Set<string> = new Set();

  permissions.forEach((permission) => {
    uniqueCategories.add(permission.category);
  });

  return Array.from(uniqueCategories);
}

export const groupPermissionsByCategory = (permissions: Permission[]): { [key: string]: Permission[] }  =>{
  const groupedPermissions: { [key: string]: Permission[] } = {};

  permissions.forEach((permission) => {
    const category = permission.category;

    if (!groupedPermissions[category]) {
      groupedPermissions[category] = [];
    }

    groupedPermissions[category].push(permission);
  });

  return groupedPermissions;
} 
