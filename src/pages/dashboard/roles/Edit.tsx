/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import AuthInput from "../../../components/common/AuthInput";
import { Heading } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { formInputs, formInputsForEdit } from "./helpers";
import useGetAllPermissions from "./../../../hooks/useGetAllPermissions";
import { PermissionList } from "./Form";
import CustomButton from "../../../components/common/CustomButton";
import { executeCreateRole } from "../../../apis/role";
import { useToast } from "@chakra-ui/react";
import { useAppSelector } from "../../../store/hook";
import { useLocation } from "react-router-dom";

interface BasicFormProps {}

const CreateRole: React.FC<BasicFormProps> = () => {
  const { data } = useGetAllPermissions();
  const location = useLocation()
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const roleDetails = location.state
  const toast = useToast();
  const { onClose, onOpen } = useDisclosure();

  const { register, control, trigger, getValues, reset } = useForm<RolePayload>(
    { mode: "onChange" }
  );

  const handleSubmit = async () => {
    if (!(await trigger())) return;
    try {
      onOpen();
      const payload: RolePayload = {
        ...getValues(),
      };
      const response = await executeCreateRole(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });

      reset();
      onClose();
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

  return (
    <DashboardLayout>
      <Stack spacing={14}>
        <Stack bg="white" p={8} pt={4} spacing={"8"}>
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            CREATE ROLE
          </Heading>
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            {formInputsForEdit(roleDetails).map((item, idx) => (
              <GridItem colSpan={[6, 6, 6]} key={idx}>
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
          <PermissionList groupedPermissions={data} register={register} />
          <CustomButton
            onClick={handleSubmit}
            alignSelf={["unset", "flex-end", "flex-end"]}
            size="md"
          >
            Create Role
          </CustomButton>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
};

export default CreateRole;
