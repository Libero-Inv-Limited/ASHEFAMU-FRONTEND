import React, { useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Center, Checkbox, Circle, FormControl, FormLabel, HStack, Heading, Icon, List, ListIcon, ListItem, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { DARK, LIGHT_BG, LIGHT_GRAY, LIGHT_GREEN, RED, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color"
import { BsArrowRight, BsDot } from "react-icons/bs"
import { condinateGuideline, warnings } from "../../utils/data"
import { FaRegFileAlt } from "react-icons/fa"
import { LuInfo } from "react-icons/lu"
import { PiBookOpenTextLight } from "react-icons/pi"
import CustomButton from "../../components/common/CustomButton"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../utils/routeNames"
import { executeGetRequiredDocs } from "../../apis/facilityData"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { populateRequiredDocs } from "../../store/slice/facilityData"
import FileSkeleton from "../../components/common/FileSkeleton"
import { STEPS, updateLevel } from "../../store/slice/createFacility"

interface CreateFacilityProps { }
const CreateFacility: React.FC<CreateFacilityProps> = () => {
  const { register, formState: { errors }, watch, getValues } = useForm<{ accept: boolean; }>({ mode: "onChange" })
  const isChecked = watch("accept")
  const navigate = useNavigate()
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const currentStep = useAppSelector(state => state.createFacilityStore.currentStep)
  const facilityData = useAppSelector(state => state.facilityDataStore)
  const dispatch = useAppDispatch()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()

  const handleFetchData = async () => {
    openLoading()
    const [docsResult] = await Promise.all([executeGetRequiredDocs(token!)])
    if (docsResult.status === "success") dispatch(populateRequiredDocs(docsResult.data))
    closeLoading()
  }

  const handleBegin = () => {
    dispatch(updateLevel({
      step: STEPS.INTENT,
      data: {
        [currentStep]: getValues()
      }
    }))
    navigate(ROUTES.CREATE_INTENT_ROUTE)
  }

  // TODO GET ALL FACILITY DATA
  useEffect(() => {
    handleFetchData()
  }, [])

  // TODO CREATE STATE TO STORE IT
  return (
    <DashboardLayout>
      <Stack p={8} spacing={8} bg={"white"} rounded={"md"} mb={10}>
        <Heading textTransform={"uppercase"} pb={6} borderBottom={`1px solid ${LIGHT_GREEN}`} color={"#444B5A"} fontWeight={"700"} fontSize={"xl"}>Guide to registering a medical facility on ASHEFAMU Platform</Heading>

        <Stack spacing={3}>
          <Heading color={"#146BD1"} fontSize={"xl"}>Obtain GPS co-ordinates</Heading>
          <Text color={"#444B5A"} fontWeight={"600"} fontSize={"sm"}>Download any GPS Application on your device to be able to obtain the GPS Coordinates of your medical facility. <br />This process must be done at the physical venue of the facility</Text>
          <List spacing={1}>
            {condinateGuideline.map((item, index) => (
              <ListItem alignItems={"center"} key={`guideline-${index}`} display={"flex"} color={TEXT_DARK_GRAY} fontSize={"sm"}>
                <ListIcon fontSize={"xl"} as={BsDot} color={TEXT_DARK_GRAY} />
                {item}</ListItem>
            ))}
          </List>
        </Stack>


        <Stack spacing={3}>
          <Heading color={"#146BD1"} fontSize={"xl"}>Compulsory Documents</Heading>
          <Text color={"#444B5A"} fontWeight={"600"} fontSize={"sm"}>You are required to scan and upload the following documents as they’ll be required for upload during the registration process. <br />They must be in PDF format and not more than 200KB in size to be accepted for upload.</Text>
          <Stack mt={2}>
            {
              isLoading ?
                (new Array(8).fill("-")).map((_, index) => <FileSkeleton key={`file-skeleton-${index}`} />) :
                facilityData.requiredDocs.map((doc, index) => (
                  <HStack py={4} maxW={600} px={2} rounded={"md"} bg={LIGHT_BG} key={`doc-${index}`}>
                    <Icon as={FaRegFileAlt} color={RED} fontSize={"lg"} />
                    <Text fontSize={"sm"} color={DARK} fontWeight={"500"}>{doc.name}</Text>
                  </HStack>
                ))
            }

          </Stack>
        </Stack>


        <HStack border={`1px solid ${RED}`} boxShadow={"0px 7px 20px 0px rgba(211, 31, 31, 0.10)"} bg={"#FEF2F2"} p={4} alignItems={"center"} rounded={"md"}>
          <Center as={Circle} w={10} h={10} bg={"#FFE5E5"}>
            <Icon as={LuInfo} fontSize={"xl"} color={RED} />
          </Center>
          <Stack spacing={1} flex={1}>
            <Heading fontSize={"sm"} fontWeight={"700"}>NOTE!</Heading>
            <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>All documents should be scanned in PDF Format and maximum file size of 200KB</Text>
          </Stack>
        </HStack>


        <Stack spacing={3}>
          <Heading color={"#146BD1"} fontSize={"xl"}>Staff List</Heading>
          <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>Ensure you have your staff list with their respective credentials scanned in single PDF documents for each staff. Maximum file size for each staff documents is 2MB.</Text>
        </Stack>


        <List spacing={1}>
          {warnings.map((item, index) => (
            <ListItem alignItems={"center"} fontWeight={600} key={`warning-${index}`} display={"flex"} color={RED} fontSize={"sm"}>
              <ListIcon fontSize={"xl"} as={BsDot} color={RED} />
              {item}</ListItem>
          ))}
        </List>


        <Stack spacing={3}>
          <HStack spacing={3}>
            <Heading color={"#146BD1"} fontSize={"xl"}>Manual</Heading>
            <Center as={Circle} w={"44px"} borderWidth={1} borderColor={LIGHT_GRAY} h={"44px"}>
              <Icon as={PiBookOpenTextLight} fontSize={"24px"} color={TEXT_GRAY} />
            </Center>
          </HStack>
          <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>A comprehensive user manual can be found on the ASHEFAMU website and at the bottom of the side navigation bar in the ASHEFAMU system. Locate the 'resources' button at the top right corner of each page.</Text>
        </Stack>

        <HStack alignItems={"center"} spacing={4} flexDir={['column', 'column', 'row']} justifyContent={"space-between"}>
          <FormControl alignItems={"center"} flex={1} isInvalid={Boolean(errors.accept)} as={HStack}>
            <Checkbox size={"lg"} colorScheme="brand" {...register("accept", { required: true })} />
            <FormLabel cursor={"pointer"} color={TEXT_DARK_GRAY} m={0} fontWeight={500} fontSize={"sm"}>I have all requirements to proceed</FormLabel>
          </FormControl>

          <CustomButton onClick={handleBegin} isDisabled={!isChecked} w={['full', 'full', 'fit-content']} rightIcon={<Icon as={BsArrowRight} color={"white"} fontSize={"xl"} />}>Next</CustomButton>
        </HStack>
      </Stack>
    </DashboardLayout>
  )
}

export default CreateFacility