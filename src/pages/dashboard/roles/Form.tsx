import { Checkbox, Grid, GridItem, Stack } from "@chakra-ui/react";
import React from "react";

export const CheckboxGroup = ({ category, permissions }) => {
  const [checkedItems, setCheckedItems] = React.useState(
    permissions.map((permission) => !permission)
  );

  const allChecked = checkedItems.every((isChecked) => isChecked);
  const isIndeterminate =
    checkedItems.some((isChecked) => isChecked) && !allChecked;

  const handleParentCheckboxChange = (e) => {
    setCheckedItems(checkedItems.map(() => e.target.checked));
  };

  return (
    <div>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleParentCheckboxChange}
      >
        {category} Checkbox
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {permissions.map((permission, index) => (
          <Checkbox
            key={permission.id}
            isChecked={checkedItems[index]}
            onChange={(e) => {
              setCheckedItems([
                ...checkedItems.slice(0, index),
                e.target.checked,
                ...checkedItems.slice(index + 1),
              ]);
            }}
          >
            {" "}
            {permission.name}
          </Checkbox>
        ))}
      </Stack>
    </div>
  );
};

export const PermissionList = ({ groupedPermissions }) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
      {Object.keys(groupedPermissions).map((category) => (
        <GridItem colSpan={2} key={category}>
          <CheckboxGroup
            category={category}
            permissions={groupedPermissions[category]}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PermissionList;
