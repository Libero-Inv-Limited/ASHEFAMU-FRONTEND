import React from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Center, HStack, Heading, Icon, Image, Link, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"
import { MdLocalPrintshop, MdOutlinePhoneEnabled } from "react-icons/md"
import { BsCheck2All, BsDot } from "react-icons/bs"
import CustomButton from "../../components/common/CustomButton"
import { FiDownload } from "react-icons/fi"
import { useAppContext } from "../../contexts/AppContext"
import FacilityUpgrade from "../../components/modals/FacilityUpgrade"



interface FacilityProfileProps { }
const FacilityProfile: React.FC<FacilityProfileProps> = () => {
  const { currentFacility } = useAppContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const downloadImage = () => {
    const a = document.createElement("a")
    a.href = currentFacility!.qr_code
    a.download = "qr-code.png"
    a.click()
    a.remove()
  }

  const printImage = () => {
      const printWindow = window.open('', '', 'width=600,height=600')!
      printWindow.document.open();
      printWindow.document.write('<html><body style="margin:0;"><img src="' + currentFacility?.qr_code + '" alt="Image to Print"></body></html>');
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
  }
  return (
    <DashboardLayout>
      <HStack alignItems={"stretch"} gap={4} flexDir={['column', 'column', 'row']}>
        <Stack spacing={6} p={6} bg={"white"} rounded={"md"} w={"full"} maxW={600}>
          <Stack spacing={1}>
            <Heading fontFamily={"rubik"} fontSize={"1.2rem"} color={DARK}>{currentFacility?.name}</Heading>
            <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>{currentFacility?.address}.</Text>
          </Stack>

          <Stack>
            <HStack>
              <Icon color={TEXT_DARK_GRAY} fontSize={"xl"} as={MdOutlinePhoneEnabled} />
              <Link href={`tel:${currentFacility?.facility_phone}`} fontSize={"sm"} color={TEXT_DARK_GRAY}>{currentFacility?.facility_phone}</Link>
            </HStack>
          </Stack>

          {(currentFacility?.status && currentFacility.status.approval_date) && (
            <>
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
              <CustomButton onClick={onOpen} h={"32px"} variant={"outline"} fontSize={"xs"} maxW={150} colorScheme="gray" rounded={"full"}>Edit facility's details</CustomButton>
            </>
          )}
        </Stack>

        <Stack spacing={6} p={6} bg={"white"} rounded={"md"} maxW={250}>
          <Center>
            <Image src={currentFacility?.qr_code} alt={"Qrcode"} maxW={"160px"} />
          </Center>
          <HStack>
            <CustomButton onClick={printImage} h={"32px"} colorScheme="gray" color={DARK} borderColor={"#C9CFD8"} fontSize={"sm"} leftIcon={<Icon fontSize={"xl"} as={MdLocalPrintshop} />} variant={"outline"} size={"sm"}>Print</CustomButton>
            <CustomButton onClick={downloadImage} h={"32px"} colorScheme="gray" color={DARK} borderColor={"#C9CFD8"} fontSize={"sm"} leftIcon={<Icon fontSize={"xl"} as={FiDownload} />} variant={"outline"} size={"sm"}>Download</CustomButton>
          </HStack>
        </Stack>
      </HStack>

      <FacilityUpgrade 
        isOpen={isOpen}
        onClose={onClose} 
      />
    </DashboardLayout>
  )
}

export default FacilityProfile