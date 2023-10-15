/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, ButtonGroup, FormControl, FormLabel, Grid, GridItem, HStack, Icon, IconButton, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React, { useState } from "react"
import FormTitle from "../../../components/common/FormTitle"
import { useForm } from "react-hook-form"
import AuthInput from "../../../components/common/AuthInput"
import { LIGHT_GREEN, RED, TEXT_DARK, TEXT_DARK_GRAY } from "../../../utils/color"
import CheckButton from "../../../components/common/CheckButton"
import { MdOutlinePhoneEnabled } from "react-icons/md"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { FaRegUser } from "react-icons/fa"
import CustomButton from "../../../components/common/CustomButton"
import { facilityScopeData, nationalityData, timeData } from "../../../utils/data"
import { BsPlus } from "react-icons/bs"
import { TbBriefcase2 } from "react-icons/tb"
import { BiTrash } from "react-icons/bi"


interface BasicFormProps { }
const BasicForm: React.FC<BasicFormProps> = () => {
  const { control, watch, setValue } = useForm({
    mode: "onSubmit"
  })
  const { control: propControl, trigger: propTrigger, getValues: propGetValues, reset: propReset } = useForm<Proprietor>({
    mode: "onSubmit"
  })
  const [proprietors, setProprietors] = useState<Proprietor[]>([])
  const hasMultipleFacility = watch("has_multiple_facility")
  const hasUseOfPremesis = watch("any_other_use_of_premises")
  const hasEmergency = watch("emergency_service")
  const hasAmbulance = watch("ambulance_service")

  const handleAddProprietors = async () => {
    if (!await propTrigger()) return
    const data: Proprietor = {
      ...propGetValues(),
      nationality: (propGetValues("nationality") as any).value
    }

    console.log("DATA:", data)
    setProprietors(prev => [data, ...prev])
    propReset()
  }

  const handleDeleteProprietor = async (index: number) => {
    setProprietors(prev => prev.filter((_, idx) => idx !== index ))
  }

  return (
    <Stack spacing={14}>

      {/* FACILITY DETAILS */}
      <Stack spacing={6}>
        <FormTitle>FACILITY DETAILS</FormTitle>
        <Grid templateColumns='repeat(5, 1fr)' gap={5}>

          <GridItem colSpan={[5, 5, 3]}>
            <AuthInput
              bg={"#F4F7F4"}
              placeholder="Engineering"
              control={control}
              fontSize={"sm"}
              label="Facility name"
              name="facility_name"
              rules={{
                required: "Facility name is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[5, 5, 1]}>
            <AuthInput
              bg={"#F4F7F4"}
              placeholder="Public"
              control={control}
              fontSize={"sm"}
              label="Facility sector category"
              name="facility_sector"
              rules={{
                required: "Facility sector is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[5, 5, 1]}>
            <AuthInput
              bg={"#F4F7F4"}
              placeholder="Clinic"
              control={control}
              fontSize={"sm"}
              label="Facility category"
              name="facility_category"
              rules={{
                required: "Facility category is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[5, 5, 1]}>
            <AuthInput
              bg={"#F4F7F4"}
              control={control}
              fontSize={"sm"}
              label="CAC Number"
              name="cac_number"
              rules={{
                required: "CAC Number is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[5, 5, 3]}>
            <FormControl>
              <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"}>Does the facility have multiple branches?</FormLabel>
              <ButtonGroup>
                <CheckButton
                  handleClick={() => setValue("has_multiple_facility", "yes")}
                  isActive={hasMultipleFacility === "yes"}>Yes</CheckButton>

                <CheckButton
                  handleClick={() => setValue("has_multiple_facility", "no")}
                  isActive={hasMultipleFacility === "no"}>No</CheckButton>
              </ButtonGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </Stack>


      {/* CONTACT DETAILS */}
      <Stack spacing={6}>
        <FormTitle>CONTACT DETAILS</FormTitle>
        <Grid
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >

          <GridItem colSpan={[5, 5, 2]}>
            <AuthInput
              Icon={MdOutlinePhoneEnabled}
              control={control}
              fontSize={"sm"}
              label="Facility phone"
              name="facility_phone"
              rules={{
                required: "Facility phone is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[5, 5, 3]}>
            <AuthInput
              Icon={HiOutlineLocationMarker}
              control={control}
              fontSize={"sm"}
              label="Address"
              name="address"
              rules={{
                required: "Address is required"
              }}
            />
          </GridItem>
        </Grid>


        <Grid
          templateColumns='repeat(12, 1fr)'
          gap={4}
        >

          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              isSelect
              Icon={MdOutlinePhoneEnabled}
              control={control}
              fontSize={"sm"}
              label="Local Government Area"
              name="local_gov_area"
              rules={{
                required: "Local Government Area is required"
              }}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 3]}>
            <AuthInput
              control={control}
              fontSize={"sm"}
              label="Closest landmark"
              name="closet_landmark"
              rules={{
                required: "Closest landmark is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={control}
              isSelect
              fontSize={"sm"}
              label="Building type"
              name="building_type"
              rules={{
                required: "Building type is required"
              }}
            />
          </GridItem>
        </Grid>


        <Grid
          templateColumns='repeat(12, 1fr)'
          gap={4}
        >

          <GridItem colSpan={[12, 12, 3]}>
            <AuthInput
              isSelect
              Icon={MdOutlinePhoneEnabled}
              control={control}
              fontSize={"sm"}
              label="Local council development area"
              name="local_council_dev_area"
              rules={{
                required: "Local council development area is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={0} fontWeight={"500"} fontFamily={"body"}>GPS Coordinates</FormLabel>
            <HStack>
              <AuthInput
                control={control}
                fontSize={"sm"}
                label=""
                placeholder="X: Latitude"
                name="closet_landmark"
                rules={{
                  required: "Closest landmark is required"
                }}
              />
              <AuthInput
                control={control}
                fontSize={"sm"}
                label=""
                placeholder="Y: Longitude"
                name="closet_landmark"
                rules={{
                  required: "Closest landmark is required"
                }}
              />
            </HStack>
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <FormControl>
              <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"}>Any other use of the premises?</FormLabel>
              <ButtonGroup>
                <CheckButton
                  handleClick={() => setValue("any_other_use_of_premises", "yes")}
                  isActive={hasUseOfPremesis === "yes"}>Yes</CheckButton>

                <CheckButton
                  handleClick={() => setValue("any_other_use_of_premises", "no")}
                  isActive={hasUseOfPremesis === "no"}>No</CheckButton>
              </ButtonGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </Stack>
      

      {/* PROPRIETOR */}
      <Stack spacing={6}>
        <FormTitle>PROPRIETORS</FormTitle>
        <Grid
          templateColumns='repeat(12, 1fr)'
          gap={4}
        >

          <GridItem colSpan={[12, 12, 6]}>
            <AuthInput
              control={propControl}
              Icon={FaRegUser}
              fontSize={"sm"}
              iconProp={{ fontSize: "xl" }}
              label="Full Name"
              name="name"
              rules={{
                required: "Full name is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 6]}>
            <AuthInput
              control={propControl}
              Icon={HiOutlineLocationMarker}
              fontSize={"sm"}
              label="Address"
              name="address"
              rules={{
                required: "Address is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={propControl}
              Icon={TbBriefcase2}
              fontSize={"sm"}
              label="Occupation"
              name="occupation"
              rules={{
                required: "Occupation is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <AuthInput
              control={propControl}
              fontSize={"sm"}
              isSelect
              data={nationalityData}
              label="Nationality"
              name="nationality"
              rules={{
                required: "Nationality is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 4]} as={HStack} alignItems={"flex-end"} h={"full"}>
            <CustomButton leftIcon={<Icon fontSize={"2xl"} color={"white"} as={BsPlus} />}  onClick={handleAddProprietors}>Add Proprietor</CustomButton>
          </GridItem>
        </Grid>

        <Box overflowX={"auto"}>
          <Table>
            <Thead bg={LIGHT_GREEN}>
              <Tr>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Occupation</Th>
                <Th>Nationality</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody bg={"#F7FAF7"}>
              {proprietors.length ? proprietors.map((prop, index) => (
                <Tr key={`prop-${index}`}>
                  <Td fontSize={"sm"} whiteSpace={"nowrap"} color={TEXT_DARK_GRAY} p={4}>{ prop.name }</Td>
                  <Td fontSize={"sm"} whiteSpace={"nowrap"} color={TEXT_DARK_GRAY} p={4}>{ prop.address }</Td>
                  <Td fontSize={"sm"} whiteSpace={"nowrap"} color={TEXT_DARK_GRAY} p={4}>{ prop.occupation }</Td>
                  <Td fontSize={"sm"} whiteSpace={"nowrap"} color={TEXT_DARK_GRAY} p={4}>{ prop.nationality }</Td>
                  <Td fontSize={"sm"} whiteSpace={"nowrap"} color={TEXT_DARK_GRAY} p={4}>
                    <IconButton 
                      onClick={() => handleDeleteProprietor(index)}
                      aria-label="delete-proprietor"
                      variant={"ghost"}
                      _hover={{ bg: "#FEE2E2" }}
                      bg={"#FEE2E2"}
                      rounded={"full"}
                      size={"sm"}
                      icon={<Icon color={RED} fontSize={"xl"} as={BiTrash} />} 
                    />
                  </Td>
                </Tr>
              )) : (
                <Tr>
                  <Td fontSize={"sm"} color={TEXT_DARK_GRAY} colSpan={5} p={4} textAlign={"center"}>No proprietor added</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Stack>


      {/* OPERATIONS DETAILS */}
      <Stack spacing={6}>
        <FormTitle>OPERATIONS DETAILS</FormTitle>
        <Grid
          templateColumns='repeat(12, 1fr)'
          gap={4}
        >

          <GridItem colSpan={[12, 12, 3]}>
            <AuthInput
              control={control}
              fontSize={"sm"}
              isSelect
              data={timeData}
              iconProp={{ fontSize: "xl" }}
              label="Opening time"
              name="opening_time"
              rules={{
                required: "Full name is required"
              }}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 3]}>
            <AuthInput
              control={control}
              fontSize={"sm"}
              isSelect
              data={timeData}
              label="Closing time"
              name="closing_time"
              rules={{
                required: "Closing time is required"
              }}
            />
          </GridItem>


          <GridItem colSpan={[12, 12, 6]}>
            
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <FormControl>
              <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"}>Does facility provide ambulance services?</FormLabel>
              <ButtonGroup>
                <CheckButton
                  handleClick={() => setValue("ambulance_service", "yes")}
                  isActive={hasAmbulance === "yes"}>Yes</CheckButton>

                <CheckButton
                  handleClick={() => setValue("ambulance_service", "no")}
                  isActive={hasAmbulance === "no"}>No</CheckButton>
              </ButtonGroup>
            </FormControl>
          </GridItem>

          <GridItem colSpan={[12, 12, 4]}>
            <FormControl>
              <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"}>Does facility provide emergency services?</FormLabel>
              <ButtonGroup>
                <CheckButton
                  handleClick={() => setValue("emergency_service", "yes")}
                  isActive={hasEmergency === "yes"}>Yes</CheckButton>

                <CheckButton
                  handleClick={() => setValue("emergency_service", "no")}
                  isActive={hasEmergency === "no"}>No</CheckButton>
              </ButtonGroup>
            </FormControl>
          </GridItem>

          <GridItem colSpan={[12]}>
            <AuthInput
              control={control}
              fontSize={"sm"}
              isSelect
              selectProps={{ isMulti: true }}
              data={facilityScopeData}
              label="Scope of the services in the facility"
              name="facility_scope"
              rules={{}}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  )
}

export default BasicForm