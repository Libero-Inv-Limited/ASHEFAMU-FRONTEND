import React from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Center, HStack, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"
import { MdLocalPrintshop, MdOutlineMarkunread, MdOutlinePhoneEnabled } from "react-icons/md"
import { BsCheck2All, BsDot } from "react-icons/bs"
import qrCode from "../../assets/qr.png"
import CustomButton from "../../components/common/CustomButton"
import { FiDownload } from "react-icons/fi"



interface FacilityProfileProps { }
const FacilityProfile: React.FC<FacilityProfileProps> = () => {
  return (
    <DashboardLayout>
      <HStack alignItems={"stretch"} gap={4} flexDir={['column', 'column', 'row']}>
        <Stack spacing={6} p={6} bg={"white"} rounded={"md"} w={"full"} maxW={600}>
          <Stack spacing={1}>
            <Heading fontFamily={"rubik"} fontSize={"1.2rem"} color={DARK}>Dummy facility</Heading>
            <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>St. Mary's Hospital, 123 Elm Street, Cityville, State 12345, United States.</Text>
          </Stack>

          <Stack>
            <HStack>
              <Icon color={TEXT_DARK_GRAY} fontSize={"xl"} as={MdOutlinePhoneEnabled} />
              <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>08165465445</Text>
            </HStack>
            <HStack>
              <Icon color={TEXT_DARK_GRAY} fontSize={"xl"} as={MdOutlineMarkunread} />
              <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>dummydummy@gmail.com</Text>
            </HStack>
          </Stack>

          <Stack border={`2px solid #00BF55`} rounded={"md"} p={4} maxW={"300px"} pos={"relative"}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"700"} color={"brand.500"} fontSize={"sm"}>Accredited</Text>
              <Icon color={"#00BF55"} fontSize={"xl"} as={BsCheck2All} pos={"absolute"} top={2} right={2} />
            </HStack>
            <HStack>
              <Text whiteSpace={"nowrap"} flex={1} color={TEXT_DARK_GRAY} fontSize={"sm"}>Renewal in <span style={{ fontWeight: "600" }}>208 days</span></Text>
              <Icon color={TEXT_DARK_GRAY} as={BsDot} fontSize={"xl"} />
              <Text flex={1} color={TEXT_DARK_GRAY} fontSize={"sm"}>Jun 01, 2023</Text>
            </HStack>
          </Stack>
        </Stack>

        <Stack spacing={6} p={6} bg={"white"} rounded={"md"} maxW={250}>
          <Center>
            <Image src={qrCode} maxW={"160px"} />
          </Center>
          <HStack>
            <CustomButton h={"32px"} colorScheme="gray" color={DARK} borderColor={"#C9CFD8"} fontSize={"sm"} leftIcon={<Icon fontSize={"xl"} as={MdLocalPrintshop} />} variant={"outline"} size={"sm"}>Print</CustomButton>
            <CustomButton h={"32px"} colorScheme="gray" color={DARK} borderColor={"#C9CFD8"} fontSize={"sm"} leftIcon={<Icon fontSize={"xl"} as={FiDownload} />} variant={"outline"} size={"sm"}>Download</CustomButton>
          </HStack>
        </Stack>
      </HStack>
    </DashboardLayout>
  )
}

export default FacilityProfile