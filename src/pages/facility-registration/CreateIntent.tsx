/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heading,
  Icon,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { DARK, LIGHT_GREEN } from "../../utils/color";
import AuthInput from "../../components/common/AuthInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/common/CustomButton";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { STEPS, updateLevel } from "../../store/slice/createFacility";
import { useAppSelector } from "../../store/hook";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../utils/routeNames";
import UploadInput from "../../components/common/UploadInput";
import { labelValueMap, log } from "../../utils/helpers";
import { executeCreateIntent } from "../../apis/facility";
import useWaitingText from "../../hooks/useWaitingText";
import Loader from "../../components/common/loader/Loader";
import useFetchFacilityData from "../../hooks/useFetchFacilityData";

type IntentType = {
  facility_name: string;
  sector_category: string;
  facility_category: string;
  area_category: string;
  letter_of_intent: File;
};

interface CreateIntentProps {}
const CreateIntent: React.FC<CreateIntentProps> = () => {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    trigger,
    watch,
    setValue,
    setError,
  } = useForm<IntentType>({
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentStep = useAppSelector(
    (state) => state.createFacilityStore.currentStep
  );
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(
    ["Checking validity", "Submitting", "Proccessing"],
    3000
  );
  const { isFetching, facilityCategory, sectorCategory } =
    useFetchFacilityData();

  const area_category = [
    { id: "urban", name: "urban" },
    { id: "rural", name: "rural" },
  ];

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleSave = async () => {
    try {
      if (!(await trigger())) return;
      log(getValues());
      openLoading();
      startLoadingText();

      const data = getValues();
      const formData = new FormData();
      formData.append("name", data.facility_name);
      formData.append("category_id", (data.facility_category as any).value);
      formData.append("sector_id", (data.sector_category as any).value);
      formData.append("area_category", (data.area_category as any).value);
      formData.append(
        "letter_of_intent",
        data.letter_of_intent,
        data.letter_of_intent.name
      );

      const resultData = await executeCreateIntent(formData, token!);
      if (resultData.status === "error") throw new Error(resultData.message);

      // SET FACILITY ID
      const result = resultData.data as IntentResultType;
      sessionStorage.setItem("FACILITY_ID", result.id + "");

      // SHOW MESSAGE
      toast({
        title: resultData.message,
        status: "success",
      });

      // SAVE PROGRESS
      dispatch(
        updateLevel({
          step: STEPS.FILL_FORM,
          data: {
            [currentStep]: getValues(),
          },
        })
      );

      // MOVE TO NEXT
      navigate(ROUTES.FILL_FORM_ROUTE);
    } catch (e: any) {
      toast({
        title: e.message,
        status: "error",
      });
    } finally {
      closeLoading();
      stopLoadingText();
    }
  };

  return (
    <DashboardLayout>
      <Stack rounded={"md"} p={9} spacing={6} bg={"white"} maxW={647}>
        <Heading
          textTransform={"uppercase"}
          pb={6}
          borderBottom={`1px solid ${LIGHT_GREEN}`}
          color={"#444B5A"}
          fontWeight={"700"}
          fontSize={"xl"}
        >
          submit your letter of intent
        </Heading>

        <Stack spacing={4}>
          <AuthInput
            labelStyles={{
              fontWeight: "500",
            }}
            color={DARK}
            name="facility_name"
            control={control}
            label="Facility name"
            rules={{
              required: "Facility name is required",
              minLength: {
                value: 3,
                message: "Please enter a valid name",
              },
            }}
          />

          <AuthInput
            labelStyles={{
              fontWeight: "500",
            }}
            name="sector_category"
            control={control}
            isSelect
            label="Sector category"
            data={labelValueMap<SectorCategoryType>(sectorCategory)}
            rules={{
              required: "Sector category is required",
            }}
          />
          <AuthInput
            labelStyles={{
              fontWeight: "500",
            }}
            name="area_category"
            control={control}
            isSelect
            label="Area category"
            data={labelValueMap<AreaCategoryType>(area_category)}
            rules={{
              required: "Area category is required",
            }}
          />

          <AuthInput
            labelStyles={{
              fontWeight: "500",
            }}
            name="facility_category"
            control={control}
            isSelect
            placeholder="Select"
            label="Facility category"
            data={labelValueMap<FacilityCategoryType>(facilityCategory)}
            rules={{
              required: "Facility category is required",
            }}
          />

          <UploadInput
            label="Upload letter of intent"
            name="letter_of_intent"
            register={register}
            setError={setError as any}
            setValue={setValue as any}
            error={errors?.letter_of_intent?.message}
            value={watch("letter_of_intent")}
          />

          <CustomButton
            onClick={handleSave}
            alignSelf={"flex-end"}
            w={"fit-content"}
            isLoading={isLoading}
            loadingText={loadingText}
            rightIcon={<Icon fontSize={"xl"} as={HiArrowNarrowRight} />}
          >
            Save & proceed
          </CustomButton>

          {isFetching && <Loader />}
        </Stack>
      </Stack>
    </DashboardLayout>
  );
};

export default CreateIntent;
