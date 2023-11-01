/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"
import FormTitle from "../../../components/common/FormTitle"
import NumberInput from "../../../components/common/NumberInput"
import { useForm } from "react-hook-form"
import AuthInput from "../../../components/common/AuthInput"
import FormFooter from "../../../components/layout-components/FormFooter"
import Loader from "../../../components/common/loader/Loader"
import useWaitingText from "../../../hooks/useWaitingText"
import useFetchFacilityData from "../../../hooks/useFetchFacilityData"
import { powerSources, waterSources } from "../../../utils/data"
import { executeSaveFacilityService } from "../../../apis/facility"
import { useAppSelector } from "../../../store/hook"
import { useDispatch } from "react-redux"
import { STEPS, updateLevel } from "../../../store/slice/createFacility"
import { useAppContext } from "../../../contexts/AppContext"

interface ServicesFormProps { 
  setActiveStep: (no: any) => void;
  activeStep: number;
}
const ServicesForm: React.FC<ServicesFormProps> = ({ activeStep, setActiveStep }) => {
  const { currentFacility } = useAppContext()

  const { isFetching, wasteDisposalMethods, protectiveItems } = useFetchFacilityData()
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(['Validating', 'Submitting', 'Proccessing'], 2000)
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  const dispatch = useDispatch()

  const { control, setValue, getValues, trigger } = useForm<ServiceData | any>({ mode: "onSubmit" })
  const handleSaveInfo = async () => {
    if(!await trigger()) return false
    let result = false
    try {
      startLoadingText()
      openLoading()
      const facilityId = sessionStorage.getItem("FACILITY_ID")

      const data: any = {
        facility_id: +facilityId!,
        number_of_couches: getValues("number_of_couches"),
        number_of_observation_beds: getValues("number_of_observation_beds"),
        number_of_admission_beds: getValues("number_of_admission_beds"),
        waterSources: getValues("waterSources").map((item: any) => ({ water_source: item.label })),
        powerSources: getValues("powerSources").map((item: any) => ({ power_source: item.label })),
        protectiveItems: JSON.stringify((getValues("protectiveItems") as any).map((item: any) => item.label)),
        wasteDisposalMethods: JSON.stringify({
          human_waste: (getValues("human_waste") as any).map((item: any) => item.label),
          medical_waste: (getValues("medical_waste") as any).map((item: any) => item.label),
          refuse_disposal: (getValues("refuse_disposal") as any).map((item: any) => item.label),
        }),
      }
      const resultData = await executeSaveFacilityService(data, token!)
      if(resultData.status === "error") throw new Error(resultData.message)
      console.log("RESULT:", resultData)

      // SHOW MESSAGE
      toast({
        title: resultData.message,
        status: "success"
      })

      // SAVE PROGRESS
      dispatch(updateLevel({
        step: STEPS.DOCUMENT,
        data: {
          ["SERVICES"]: getValues()
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
      <FormTitle>SERVICES OFFERED</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={[12, 12, 3, 2]}>
          <NumberInput
            setValue={setValue as any}
            label="Couches"
            fontSize={"sm"}
            control={control}
            name="number_of_couches"
            value={currentFacility?.ServicesOffered.number_of_couches}
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
            value={currentFacility?.ServicesOffered.number_of_observation_beds}
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
            value={currentFacility?.ServicesOffered.number_of_admission_beds}
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
            value={currentFacility?.waterSources as any}
            fontSize={"sm"}
            data={waterSources}
            isSelect
            selectProps={{ isMulti: true, isCreatable: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Power sources are required" }} 
            control={control}
            label="Power source"
            fontSize={"sm"}
            data={powerSources}
            name="powerSources"
            value={currentFacility?.powerSources as any}
            isSelect
            selectProps={{ isMulti: true, isCreatable: true }}
          />
        </GridItem>
      </Grid>
    </Stack>


    <Stack spacing={6}>
      <FormTitle>METHODS OF WASTE DISPOSAL</FormTitle>
      <Grid gridTemplateColumns={"repeat(12, 1fr)"} gap={4}>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Human waste disposal method is required" }} 
            control={control}
            fontSize={"sm"}
            label="Human waste disposal"
            name="human_waste"
            value={currentFacility?.waste_disposal_methods.human_waste as any}
            data={wasteDisposalMethods.map(item => ({ label: item.name, value: item.name }))}
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 5]}>
          <AuthInput
            rules={{ required: "Refuse disposal method is required" }} 
            control={control}
            fontSize={"sm"}
            label="Refuse disposal"
            data={wasteDisposalMethods.map(item => ({ label: item.name, value: item.name }))}
            name="refuse_disposal"
            value={currentFacility?.waste_disposal_methods.refuse_disposal}
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
        <GridItem colSpan={[12, 12, 9]}>
          <AuthInput
            rules={{ required: "Medical waste disposal method is required" }} 
            control={control}
            label="Medical waste disposal"
            fontSize={"sm"}
            data={wasteDisposalMethods.map(item => ({ label: item.name, value: item.name }))}
            name="medical_waste"
            value={currentFacility?.waste_disposal_methods.medical_waste}
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
            rules={{ required: "Protective items are required" }} 
            control={control}
            label=""
            fontSize={"sm"}
            data={protectiveItems.map(item => ({ label: item.name, value: item.name }))}
            name="protectiveItems"
            value={currentFacility?.protective_items as any}
            isSelect
            selectProps={{ isMulti: true }}
          />
        </GridItem>
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

      { isFetching && <Loader /> }
   </Stack>
  )
}

export default ServicesForm