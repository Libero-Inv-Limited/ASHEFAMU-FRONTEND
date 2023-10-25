/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"
import FormTitle from "../../../components/common/FormTitle"
import { useForm } from "react-hook-form"
import AuthInput from "../../../components/common/AuthInput"
import { FaRegFileAlt, FaRegUser } from "react-icons/fa"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { TbBuilding } from "react-icons/tb"
// import { useAppSelector } from "../../../store/hook"
import { generateYear, getSlug } from "../../../utils/helpers"
import UploadInput from "../../../components/common/UploadInput"
import useFetchFacilityData from "../../../hooks/useFetchFacilityData"
import FileSkeleton from "../../../components/common/FileSkeleton"
import { countries } from "../../../utils/data"
import FormFooter from "../../../components/layout-components/FormFooter"
import { useAppSelector } from "../../../store/hook"
import useWaitingText from "../../../hooks/useWaitingText"
import { useDispatch } from "react-redux"
import { executeAddProIncharge, executeUploadFacilityDocs } from "../../../apis/facility"
import { STEPS, updateLevel } from "../../../store/slice/createFacility"


interface FacilityDocumentFormProps { 
  setActiveStep: (no: any) => void;
  activeStep: number;
}
const FacilityDocumentForm: React.FC<FacilityDocumentFormProps> = ({ activeStep, setActiveStep }) => {
  const allData = useAppSelector(state => state.createFacilityStore.data)
  const defaultValues = allData['DOCUMENT'] || {}

  const { control, trigger, getValues } = useForm<MedicalProfessional>({
    mode: "onSubmit"
  })
  const { register, watch, formState: { errors }, setError, setValue, trigger:fileTrigger, getValues:getFileValues } = useForm({
    mode: "onSubmit"
  })
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(['Validating', 'Submitting', 'Proccessing'], 2000)
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  const dispatch = useDispatch()

  const {requiredDocs, isFetching} = useFetchFacilityData()
  const yearOption = generateYear().map(year => ({ label: year, value: year }))

  const handleSaveInfo = async () => {
    if(!await trigger() || ! await fileTrigger()) return false
    let result = false
    try {
      startLoadingText()
      openLoading()
      const facilityId = sessionStorage.getItem("FACILITY_ID")
      const data: MedicalProfessional = {
        ...getValues(),
        facility_id: +facilityId!,
        nationality: (getValues("nationality") as any).value,
        year_of_qualification: (getValues("year_of_qualification") as any).value,
        year_of_registration: (getValues("year_of_registration") as any).value,
      }
      
      const resultData = await executeAddProIncharge(data, token!)
      if(resultData.status === "error") throw new Error(resultData.message)
      
      // UPLOAD FILES
      const files = Object.entries(getFileValues()).map(([, value]) => value)
      console.log("FILES:", files)

      const formData = new FormData()
      formData.append("facility_id", facilityId!)
      files.forEach(file => {
        formData.append("documents", file)
      })

      const uploadResultData = await executeUploadFacilityDocs(formData, token!)
      if(uploadResultData.status === "error") throw new Error(uploadResultData.message)

      // SHOW MESSAGE
      toast({
        title: resultData.message,
        status: "success"
      })

      // SAVE PROGRESS
      dispatch(updateLevel({
        step: STEPS.STAFFS,
        data: {
          ["DOCUMENT"]: getValues()
        }
      }))
      // MOVE TO NEXT
      result = true
    }
    catch (e: any) {
      toast({
        status: "error",
        title: e.message
      })
    }
    finally {
      closeLoading()
      stopLoadingText()
    }

    return result
  }

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
              value={defaultValues?.['fullname']}
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
              value={defaultValues?.['address']}
              rules={{ required: "Address is required" }}
              Icon={HiOutlineLocationMarker}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              data={countries.map(item => ({label: item, value: item}))}
              fontSize={"sm"}
              label={"Nationality"}
              name="nationality"
              value={defaultValues?.['nationality']}
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
              value={defaultValues?.['qualification']}
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
              value={defaultValues?.['institution']}
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
              value={defaultValues?.['registration_number']}
              rules={{ required: "Registration number is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <AuthInput
              control={control}
              label={"Year of qualification"}
              fontSize={"sm"}
              isSelect
              data={yearOption as any}
              name="year_of_qualification"
              value={defaultValues?.['year_of_qualification']}
              rules={{ required: "Year of qualification is required" }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 2]}>
            <AuthInput
              control={control}
              label={"Year of registration"}
              fontSize={"sm"}
              data={yearOption as any}
              isSelect
              name="year_of_registration"
              value={defaultValues?.['year_of_registration']}
              rules={{ required: "Year of registration is required" }}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              label={"Approving authority"}
              fontSize={"sm"}
              // isSelect
              name="approving_authority"
              value={defaultValues?.['approving_authority']}
              rules={{ required: "Approving authority is required" }}
            />
          </GridItem>


        </Grid>
      </Stack>


      <Stack spacing={6}>
        <FormTitle>UPLOAD DOCUMENTS (PDF, file size should not exceed 200KB)</FormTitle>
        <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
          {isFetching ?  (new Array(8).fill("-")).map((_, index) => <FileSkeleton key={`file-skeleton-${index}`} />): requiredDocs.map(doc => (
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

export default FacilityDocumentForm