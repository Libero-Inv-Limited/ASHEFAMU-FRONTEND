/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import DashboardLayout from "../../../components/layouts/DashboardLayout"
import { Stack } from "@chakra-ui/react"
import BasicForm from "./Form"
import { useAppSelector } from "../../../store/hook"


interface FacilityFormEditProps { }
const FacilityFormEdit: React.FC<FacilityFormEditProps> = () => {

  return (
    <DashboardLayout>
      <Stack bg={"white"} p={8} pt={4} spacing={"14"}>
        <BasicForm  />
      </Stack>
    </DashboardLayout>
  )
}

export default FacilityFormEdit