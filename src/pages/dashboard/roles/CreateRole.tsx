/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthInput from "../../../components/common/AuthInput";
import { useLocation } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { formInputs } from "./helpers";
import useGetAllPermissions from "./../../../hooks/useGetAllPermissions";
import { PermissionList } from "./Form";

interface BasicFormProps {}

const CreateRole: React.FC<BasicFormProps> = () => {
  const location = useLocation();
  const { data } = useGetAllPermissions();
  const [user, setUser] = useState(location.state);
  const { control, watch, setValue, trigger, getValues } = useForm({
    mode: "onSubmit",
  });
  const prevDatas = watch();
  console.log("PREV DATA:", prevDatas);

  return (
    <DashboardLayout>
      <Stack spacing={14}>
        <Stack bg="white" p={8} pt={4} spacing={"8"}>
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            CREATE ROLE
          </Heading>
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            {formInputs(user).map((item) => (
              <GridItem colSpan={[6, 6, 6]}>
                <AuthInput
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
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            LIST OF PERMISSIONS
          </Heading>
          <PermissionList groupedPermissions={data} />
        </Stack>
      </Stack>
    </DashboardLayout>
  );
};

export default CreateRole;
