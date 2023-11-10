import { Checkbox, Grid, GridItem, Stack } from "@chakra-ui/react";
import {DARK} from '../../../utils/color'
import React from "react";

export const CheckboxGroup = ({ category, permissions, register }) => {
  const [selectedPermissionIds, setSelectedPermissionIds] = React.useState([]);

  const allChecked = selectedPermissionIds.length === permissions.length;
  const isIndeterminate =
    selectedPermissionIds.length > 0 && selectedPermissionIds.length < permissions.length;

  const handleParentCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedPermissionIds(permissions.map((permission) => permission.id));
    } else {
      setSelectedPermissionIds([]);
    }
  };

  const handleChildCheckboxChange = (permissionId, isChecked) => {
    if (isChecked) {
      setSelectedPermissionIds([...selectedPermissionIds, permissionId]);
    } else {
      setSelectedPermissionIds(
        selectedPermissionIds.filter((id) => id !== permissionId)
      );
    }
  };


  return (
    <div>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleParentCheckboxChange}
        colorScheme="brand"
        color={DARK}
        size="sm"
        fontWeight="500"
      >
        {category} Checkbox
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {permissions.map((permission, index) => (
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

export const PermissionList = ({ groupedPermissions, register }) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
      {Object.keys(groupedPermissions).map((category) => (
        <GridItem colSpan={[6, 3, 2]} key={category}>
          <CheckboxGroup
            category={category}
            permissions={groupedPermissions[category]}
            register={register}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PermissionList;
