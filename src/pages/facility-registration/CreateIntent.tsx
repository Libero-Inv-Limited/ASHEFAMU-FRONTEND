/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Icon, Stack } from "@chakra-ui/react"
import React from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { DARK, LIGHT_GREEN } from "../../utils/color"
import AuthInput from "../../components/common/AuthInput"
import { useForm } from "react-hook-form"
import CustomButton from "../../components/common/CustomButton"
import { HiArrowNarrowRight } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { FORM_STEPS, updateLevel } from "../../store/slice/createFacility"
import { useAppSelector } from "../../store/hook"
import { facilityCategories, sectorCategories } from "../../utils/data"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../utils/routeNames"
import UploadInput from "../../components/common/UploadInput"

type IntentType = {
  facility_name: string,
  sector_category: string,
  facility_category: string,
  letter_of_intent: File,
}

interface CreateIntentProps { }
const CreateIntent: React.FC<CreateIntentProps> = () => {
  const { control, register, formState: { errors }, getValues, trigger, watch, setValue, setError } = useForm<IntentType>({ mode: "onSubmit" })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentStep = useAppSelector(state => state.createFacilityStore.currentStep)


  const handleSave = async () => {
    if(! await trigger()) return

    // SAVE PROGRESS
    dispatch(updateLevel({
      step: FORM_STEPS.FILL_FORM,
      data: {
        [currentStep]: getValues()
      }
    }))

    // MOVE TO NEXT
    navigate(ROUTES.FILL_FORM_ROUTE)
  }

  return (
    <DashboardLayout> 
      <Stack rounded={"md"} p={9} spacing={6} bg={"white"} maxW={647}>
        <Heading textTransform={"uppercase"} pb={6} borderBottom={`1px solid ${LIGHT_GREEN}`} color={"#444B5A"} fontWeight={"700"} fontSize={"xl"}>submit your letter of intent</Heading>


        <Stack spacing={4}>
          <AuthInput
            labelStyles={{
              fontWeight: "500"
            }}
            color={DARK}
            name="facility_name"
            control={control}
            label="Facility name"
            rules={{
              required: "Facility name is required",
              minLength: {
                value: 3,
                message: "Please enter a valid name"
              }
            }}
          />


          <AuthInput
            labelStyles={{
              fontWeight: "500"
            }}
            name="sector_category"
            control={control}
            isSelect
            label="Sector category"
            data={sectorCategories}
            rules={{
              required: "Facility name is required"
            }}
          />


          <AuthInput
            labelStyles={{
              fontWeight: "500"
            }}
            name="facility_category"
            control={control}
            isSelect
            placeholder="Select"
            label="Facility category"
            data={facilityCategories}
            rules={{
              required: "Sector category is required"
            }}
          />


            <UploadInput 
              label="Upload letter of intent"
              name="letter_of_intent"
              register={register}
              setError={setError as any}
              setValue={setValue as any}
              error={errors?.letter_of_intent?.message}
              value={watch('letter_of_intent')}
            />

        </Stack>
        <CustomButton onClick={handleSave} alignSelf={"flex-end"} w={"fit-content"} rightIcon={<Icon fontSize={"xl"} as={HiArrowNarrowRight} />}>Save & proceed</CustomButton>
      </Stack>
    </DashboardLayout>
  )
}

export default CreateIntent