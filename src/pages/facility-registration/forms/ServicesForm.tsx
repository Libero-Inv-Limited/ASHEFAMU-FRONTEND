/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack } from "@chakra-ui/react"
import React from "react"
import FormTitle from "../../../components/common/FormTitle"
import NumberInput from "../../../components/common/NumberInput"
import { useForm } from "react-hook-form"
import AuthInput from "../../../components/common/AuthInput"

interface ServicesFormProps { }
const ServicesForm: React.FC<ServicesFormProps> = () => {
  const { control, setValue } = useForm<ServiceData>({
    mode: "onSubmit"
  })
  
  return (
   <Stack spacing={14}>
    <Stack spacing={6}>
      <FormTitle>SERVICES OFFERED</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={[12, 12, 3, 2]}>
          <NumberInput
            setValue={setValue as any}
            label="Couches"
            fontSize={"sm"}
            control={control}
            name="number_of_couches"
            rules={{ required: "No of couche is required" }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 3, 2]}>
          <NumberInput
            setValue={setValue as any}
            label="Observation beds"
            fontSize={"sm"}
            control={control}
            name="number_of_observation_beds"
            rules={{ required: "No of observation bed is required" }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 3, 2]}>
          <NumberInput
            setValue={setValue as any}
            label="Admission beds"
            control={control}
            fontSize={"sm"}
            name="number_of_admission_beds"
            rules={{ required: "No of admission bed is required" }}
          />
        </GridItem>
      </Grid>
    </Stack>


    <Stack spacing={6}>
      <FormTitle>WATER AND POWER SOURCES</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Water sources are required" }} 
            control={control}
            label="Water source"
            name="waterSources"
            fontSize={"sm"}
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Power sources are required" }} 
            control={control}
            label="Power source"
            fontSize={"sm"}
            name="powerSources"
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
      </Grid>
    </Stack>


    <Stack spacing={6}>
      <FormTitle>METHODS OF WASTE DISPOSAL</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Water sources are required" }} 
            control={control}
            fontSize={"sm"}
            label="Human waste disposal"
            name="waterSources"
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Power sources are required" }} 
            control={control}
            fontSize={"sm"}
            label="Refuse disposal"
            name="powerSources"
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 9]}>
          <AuthInput
            rules={{ required: "Power sources are required" }} 
            control={control}
            label="Medical waste disposal"
            fontSize={"sm"}
            name="powerSources"
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
      </Grid>
    </Stack>


    <Stack spacing={6}>
      <FormTitle>BASIC PROTECTIVE ITEMS</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={12}>
          <AuthInput
            rules={{ required: "Water sources are required" }} 
            control={control}
            label=""
            fontSize={"sm"}
            name="waterSources"
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
      </Grid>
    </Stack>
   </Stack>
  )
}

export default ServicesForm