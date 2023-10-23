/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Icon, List, ListIcon, ListItem, Stack, useDisclosure } from "@chakra-ui/react"
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
import FormFooter from "../../../components/layout-components/FormFooter"
import useWaitingText from "../../../hooks/useWaitingText"
import useFetchFacilityData from "../../../hooks/useFetchFacilityData"
import { getSlug } from "../../../utils/helpers"

interface FacilityStaffFormProps {
  setActiveStep: (no: any) => void;
  activeStep: number;
}
const FacilityStaffForm: React.FC<FacilityStaffFormProps> = ({ activeStep, setActiveStep }) => {
  const { register, setError, setValue, watch, formState: { errors } } = useForm<{ staff_list: File | undefined }>({ mode: "onSubmit" })
  const { control, setValue: setNumberValue, getValues } = useForm({ mode: "onSubmit" })

  const { isOpen: isLoading } = useDisclosure()
  const { loadingText } = useWaitingText(['Validating', 'Submitting', 'Proccessing'], 2000)
  const { nonComplimentList } = useFetchFacilityData()
  const handleSaveInfo = async () => {
    try {
      const data = {...getValues()}
      console.log("DATA:", data)
    }
    catch (e: any) {
      console.log("ERROR:", e.message)
    }
    finally {
      // closeLoading()
    }
  }
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
          {nonComplimentList.map((list) => (
            <GridItem colSpan={[12, 12, 2]}>
              <NumberInput
                control={control}
                label={list.name}
                name={getSlug(list.name)}
                setValue={setNumberValue}
                rules={{ required: list.name + " is required" }}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>

      <FormFooter
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleAction={handleSaveInfo as any}
        nextButtonProps={{
          isLoading,
          loadingText
        }}
        prevButtonProps={{ isDisabled: isLoading }}
      />
    </Stack>
  )
}

export default FacilityStaffForm