/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Icon, List, ListIcon, ListItem, Stack } from "@chakra-ui/react"
import React from "react"
import FormTitle from "../../../components/common/FormTitle"
import { BsDot } from "react-icons/bs"
import { TEXT_DARK_GRAY } from "../../../utils/color"
import { staffCompliment } from "../../../utils/data"
import CustomButton from "../../../components/common/CustomButton"
import { FiDownload } from "react-icons/fi"
import UploadInput from "../../../components/common/UploadInput"
import { useForm } from "react-hook-form"
import NumberInput from "../../../components/common/NumberInput"

interface FacilityStaffFormProps { }
const FacilityStaffForm: React.FC<FacilityStaffFormProps> = () => {
  const { register, setError, setValue, watch, formState: { errors } } = useForm<{ staff_list: File | undefined }>({ mode: "onSubmit" })
  const { control, setValue: setNumberValue } = useForm({ mode: "onSubmit" })
  return (
    <Stack spacing={14}>
      <Stack spacing={6}>
        <FormTitle>PROFESSIONAL STAFF COMPLEMENT</FormTitle>
        <List spacing={1}>
          {staffCompliment.map((item, index) => (
            <ListItem alignItems={"center"} key={`guideline-${index}`} display={"flex"} color={TEXT_DARK_GRAY} fontSize={"sm"}>
              <ListIcon fontSize={"xl"} as={BsDot} color={TEXT_DARK_GRAY} />
              {item}</ListItem>
          ))}
        </List>
        <CustomButton leftIcon={<Icon as={FiDownload} fontSize={"xl"} />} w={"fit-content"}>Download template</CustomButton>
      </Stack>

      <Stack spacing={6}>
        <FormTitle>UPLOAD COMPLETED TEMPLATE (Excel, 10MB maximum size)</FormTitle>

        <UploadInput
          label="Professional staff template document (Excel, 10MB maximum size)"
          register={register}
          setError={setError as any}
          setValue={setValue as any}
          error={errors.staff_list?.message}
          value={watch("staff_list")}
          name="staff_list"
          accept=".csv"
        />
      </Stack>

      <Stack spacing={6}>
        <FormTitle>NON- PROFESSIONAL STAFF COMPLEMENT</FormTitle>
        <Grid gap={4} gridTemplateColumns={"repeat(12, 1fr)"}>
          <GridItem colSpan={[12, 12, 2]}>
            <NumberInput 
              control={control}
              label="Hospital attendants"
              name="hospital_attendants"
              setValue={setNumberValue}
              rules={{ required: "Hospital attendants is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <NumberInput 
              control={control}
              label="Admin staff"
              name="admin_staff"
              setValue={setNumberValue}
              rules={{ required: "Admin staff is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <NumberInput 
              control={control}
              label="Security staff"
              name="security_staff"
              setValue={setNumberValue}
              rules={{ required: "Security staff is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <NumberInput 
              control={control}
              label="others"
              name="others"
              setValue={setNumberValue}
              rules={{  }}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  )
}

export default FacilityStaffForm