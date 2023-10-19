/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack } from "@chakra-ui/react"
import React from "react"
import FormTitle from "../../../components/common/FormTitle"
import { useForm } from "react-hook-form"
import AuthInput from "../../../components/common/AuthInput"
import { FaRegFileAlt, FaRegUser } from "react-icons/fa"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { TbBuilding } from "react-icons/tb"
import { useAppSelector } from "../../../store/hook"
import { getSlug } from "../../../utils/helpers"
import UploadInput from "../../../components/common/UploadInput"


interface FacilityDocumentFormProps { }
const FacilityDocumentForm: React.FC<FacilityDocumentFormProps> = () => {
  const { control } = useForm<MedicalProfessional>({
    mode: "onSubmit"
  })

  const { register, watch, formState: { errors }, setError, setValue } = useForm({
    mode: "onSubmit"
  })

  const requiredDocs = useAppSelector(state => state.facilityDataStore.requiredDocs)

  return (
    <Stack spacing={14}>
      <Stack spacing={6}>
        <FormTitle>MEDICAL PROFESSIONAL IN CHARGE</FormTitle>
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
          <GridItem colSpan={[12, 12, 5]}>
            <AuthInput
              control={control}
              label={"Full name"}
              fontSize={"sm"}
              iconProp={{ fontSize: "xl" }}
              name="fullname"
              rules={{ required: "Full name is required" }}
              Icon={FaRegUser}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 5]}>
            <AuthInput
              control={control}
              label={"Address"}
              fontSize={"sm"}
              name="address"
              rules={{ required: "Address is required" }}
              Icon={HiOutlineLocationMarker}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              fontSize={"sm"}
              label={"Nationality"}
              name="nationality"
              isSelect
              rules={{ required: "Nationality is required" }}
            />
          </GridItem>
        </Grid>
      </Stack>


      <Stack spacing={6}>
        <FormTitle>QUALIFICATIONS OF MEDICAL PROFESSIONAL IN CHARGE</FormTitle>
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
          <GridItem colSpan={[12, 12, 5]}>
            <AuthInput
              control={control}
              label={"Qualification"}
              fontSize={"sm"}
              iconProp={{ fontSize: "xl" }}
              name="qualification"
              rules={{ required: "Qualification is required" }}
              Icon={FaRegFileAlt}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 7]}>
            <AuthInput
              control={control}
              label={"Institution"}
              fontSize={"sm"}
              name="institution"
              rules={{ required: "Institution is required" }}
              Icon={TbBuilding}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              label={"Registration number"}
              fontSize={"sm"}
              name="registration_number"
              rules={{ required: "Registration number is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <AuthInput
              control={control}
              label={"Year of qualification"}
              fontSize={"sm"}
              isSelect
              name="year_of_qualification"
              rules={{ required: "Year of qualification is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <AuthInput
              control={control}
              label={"Year of registration"}
              fontSize={"sm"}
              isSelect
              name="year_of_registration"
              rules={{ required: "Year of registration is required" }}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              label={"Approving authority"}
              fontSize={"sm"}
              isSelect
              name="approving_authority"
              rules={{ required: "Approving authority is required" }}
            />
          </GridItem>


        </Grid>
      </Stack>


      <Stack spacing={6}>
        <FormTitle>UPLOAD DOCUMENTS (PDF, file size should not exceed 200KB)</FormTitle>
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
          {requiredDocs.map(doc => (
            <GridItem colSpan={[12, 12, 6]}>
              <UploadInput
                label={doc.name}
                setError={setError as any}
                setValue={setValue as any}
                error={errors[getSlug(doc.name) as any]?.message as any}
                register={register}
                value={watch(getSlug(doc.name))}
                name={getSlug(doc.name)}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default FacilityDocumentForm