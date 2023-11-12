import { Checkbox, Grid, GridItem, Stack } from "@chakra-ui/react";
import { DARK } from "../../../utils/color";
import React from "react";
import { useForm } from "react-hook-form";

export const CheckboxGroup = ({
  category,
  permissions,
  register,
  setValue,
  getAllPermissionIds,
  rolePermissions,
}) => {
  const [selectedPermissionIds, setSelectedPermissionIds] = React.useState([]);

  React.useEffect(() => {
    // Set the initial state based on rolePermissions
    const initialSelectedIds = rolePermissions.map(
      (permission) => permission.permission
    );
    setSelectedPermissionIds(initialSelectedIds);
    setValue("permissions", initialSelectedIds);
    getAllPermissionIds(initialSelectedIds, true);
  }, [rolePermissions]);

  const handleParentCheckboxChange = (e) => {
    if (e.target.checked) {
      const newSelectedIds = permissions.map((permission) => permission.id);
      setSelectedPermissionIds(newSelectedIds);
      setValue("permissions", newSelectedIds);
      getAllPermissionIds(newSelectedIds, true);
    } else {
      const uncheckedIds = permissions.map((permission) => permission.id);
      setSelectedPermissionIds([]);
      setValue("permissions", uncheckedIds);
      getAllPermissionIds(uncheckedIds, false);
    }
  };

  const handleChildCheckboxChange = (permissionId, isChecked) => {
    const childCheckboxId = permissionId;
    const newSelectedIds = isChecked
      ? [...selectedPermissionIds, childCheckboxId]
      : selectedPermissionIds.filter((id) => id !== childCheckboxId);

    setSelectedPermissionIds(newSelectedIds);
    setValue("permissions", newSelectedIds);

    // Call the function with the array of selected IDs and the checked state
    getAllPermissionIds(
      isChecked ? [childCheckboxId] : [childCheckboxId],
      isChecked
    );
  };

  return (
    <div>
      <Checkbox
        isChecked={selectedPermissionIds.length === permissions.length}
        isIndeterminate={
          selectedPermissionIds.length > 0 &&
          selectedPermissionIds.length < permissions.length
        }
        onChange={handleParentCheckboxChange}
        colorScheme="brand"
        color={DARK}
        size="sm"
        fontWeight="500"
      >
        {category} Checkbox
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {permissions.map((permission) => (
          <Checkbox
            key={permission.id}
            isChecked={selectedPermissionIds.includes(permission.id)}
            colorScheme="brand"
            color={DARK}
            size="sm"
            fontWeight="500"
            {...register("permissions", { required: true })}
            py={1}
            value={permission.id}
            onChange={(e) => {
              handleChildCheckboxChange(permission.id, e.target.checked);
            }}
          >
            {permission.name}
          </Checkbox>
        ))}
      </Stack>
    </div>
  );
};

interface PermissionProps {
  groupedPermissions: { [key: string]: Permission[] };
  handleAddPermissions: (arr: string[]) => void;
  rolePermissions: { permission: number }[];
}
export const PermissionList: React.FC<PermissionProps> = ({
  groupedPermissions,
  handleAddPermissions,
  rolePermissions,
}) => {
  const { register, setValue } = useForm();
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    string[]
  >([]);

  console.log({ selectedPermissions });

  React.useEffect(() => {
    handleAddPermissions(selectedPermissions);
  }, [selectedPermissions]);

  const getAllPermissionIds = (arr: string[], isChecked: boolean) => {
    if (isChecked) {
      if (selectedPermissions.length > 0) {
        const newSelectedPermissions = Array.from(
          new Set([...selectedPermissions, ...arr])
        );
        setSelectedPermissions(newSelectedPermissions);
      } else {
        setSelectedPermissions(arr);
      }
    } else {
      const updatedSelectedPermissions = selectedPermissions.filter(
        (id) => !arr.includes(id)
      );
      setSelectedPermissions(updatedSelectedPermissions);
    }
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
      {Object.keys(groupedPermissions).map((category) => (
        <GridItem colSpan={[6, 3, 2]} key={category}>
          <CheckboxGroup
            category={category}
            permissions={groupedPermissions[category]}
            register={register}
            setValue={setValue}
            getAllPermissionIds={getAllPermissionIds}
            rolePermissions={rolePermissions}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PermissionList;
