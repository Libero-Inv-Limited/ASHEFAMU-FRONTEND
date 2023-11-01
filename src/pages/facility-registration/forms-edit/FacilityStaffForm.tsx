/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Icon, List, ListIcon, ListItem, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
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
import { convertToSnakecase, handleConvertCSVToArray, readFile } from "../../../utils/helpers"
import StaffCompliment from "../../../components/common/StaffCompliment"
import { executeAddNonProfessional, executeAddProfessional } from "../../../apis/facility"
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { clearLevelState } from "../../../store/slice/createFacility"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../../utils/routeNames"
import { useAppContext } from "../../../contexts/AppContext"

interface FacilityStaffFormProps {
  setActiveStep: (no: any) => void;
  activeStep: number;
}
const FacilityStaffForm: React.FC<FacilityStaffFormProps> = ({ activeStep, setActiveStep }) => {
  const { register, setError, setValue, watch, formState: { errors } } = useForm<{ staff_list: File | undefined }>({ mode: "onSubmit" })
  const { control, setValue: setNumberValue, getValues, trigger } = useForm({ mode: "onSubmit" })
  const { currentFacility } = useAppContext()
  const [ staffs, setStaffs ] = useState<StaffComplimentType[]>(currentFacility?.staffs || [])
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(['Validating', 'Submitting', 'Proccessing'], 2000)
  const { nonComplimentList } = useFetchFacilityData()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleDownloadFile = () => {
    const a = document.createElement("a")
    a.href = "/files/staff_complementss.xlsx"
    a.download = "sample_template.xlsx"
    a.click()
    a.remove()
  }

  const handleSaveInfo = async () => {
    if(! await trigger()) return
    try {
      openLoading()
      startLoadingText()
      // ADD PROF STAFFS
      const facilityId = sessionStorage.getItem("FACILITY_ID")
      const profStaffPayload:ProfessionStaff = {
        facility_id: +facilityId!,
        staff_csv: staffs.map(item => {
          const newItem: StaffComplimentType | any = {}
          Object.entries(item).forEach(([key, val]) => {
            newItem[convertToSnakecase(key) as keyof StaffComplimentType] = val
          })
          return newItem
        })
      }
      const resultProf = await executeAddProfessional(profStaffPayload, token!)
      if(resultProf.status === "error") throw new Error(resultProf.message)

      const values = getValues()
      const mappedValue = Object.entries(values).map(([key, value]) => {
        const mainKey = +key.split("-")[1]
        return { non_prof_staff_complement_id: mainKey, value }
      })
      // console.log("MAPPED VAL:", mappedValue)
      const nonProfPayload:NonProfessionStaff = {
        facility_id: +facilityId!,
        complements: mappedValue
      }
      const resultNonProf = await executeAddNonProfessional(nonProfPayload, token!)
      if(resultNonProf.status === "error") throw new Error(resultNonProf.message)

      // SHOW ALERT
      toast({
        title: "Facility Created!",
        status: "success"
      })

      // CLEAR STORAGES
      sessionStorage.clear()
      dispatch(clearLevelState())
      navigate(ROUTES.FACILITY_ROUTE)

    }
    catch (e: any) {
      console.log("ERROR:", e.message)
      toast({
        title: e.message,
        status: "error"
      })
    }
    finally {
      closeLoading()
      stopLoadingText()
    }
  }
  const file = watch("staff_list")
  const handleFileUpload = async () => {
    if(!file) return
    const csvText = await readFile(file)
    const arr = handleConvertCSVToArray(csvText as string)
    setStaffs(arr)
  }
  
  useEffect(() => {
    handleFileUpload()
  }, [file])


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
        <CustomButton onClick={handleDownloadFile} leftIcon={<Icon as={FiDownload} fontSize={"xl"} />} w={"fit-content"}>Download template</CustomButton>
      </Stack>

      <Stack spacing={6}>
        <FormTitle>UPLOAD COMPLETED TEMPLATE (Excel, 10MB maximum size)</FormTitle>

        <UploadInput
          label="Professional staff template document (Excel, 10MB maximum size)"
          register={register}
          setError={setError as any}
          setValue={setValue as any}
          error={errors.staff_list?.message}
          value={file}
          name="staff_list"
          accept=".csv"
        />
      </Stack>


      <Stack>
        { staffs.map((staff, index) => <StaffCompliment staffs={staffs} index={index} setStaffs={setStaffs} key={`val-${index}`} {...staff}/>) }
      </Stack>

      <Stack spacing={6}>
        <FormTitle>NON- PROFESSIONAL STAFF COMPLEMENT</FormTitle>
        <Grid gap={4} gridTemplateColumns={"repeat(12, 1fr)"}>
          {nonComplimentList.map((list) => (
            <GridItem colSpan={[12, 12, 2]}>
              <NumberInput
                control={control}
                label={list.name}
                name={`nonstaff-${list.id}`}
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