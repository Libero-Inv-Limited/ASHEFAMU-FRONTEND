/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Box, ButtonGroup, HStack, Icon, IconButton, Stack, Text } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { DARK, RED, YELLOW } from "../../utils/color"
import CustomRegTable from "../../components/common/CustomRegTable"
import CustomAccredTable from "../../components/common/CustomAccredTable"
import { facilities } from "../../utils/data"
import { BiEdit, BiTrash } from "react-icons/bi"




interface FacilitiesProps { }
const Facilities: React.FC<FacilitiesProps> = () => {
  const [search] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeTab = search.get("tab")

  useEffect(() => {
    if (activeTab) return
    navigate(`${pathname}?tab=registration`)
  }, [])


  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase()
    navigate(`${pathname}?tab=${text}`)
  }


  const colorMap = {
    pending: "#FCBB4D",
    awaiting: "#62C28D",
    payment: "#146BD1"
  }


  const accreditedData = {
    data: facilities.map(item => ({ name: item.name, date: item.date, category: item.category, status: item.status })),
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: false,
      },
      {
        name: "Accreditation Date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Category",
        selector: "category",
        sortable: false,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
      },
      {
        name: "Actions",
        cell: () => {
          return (
            <HStack>
              <IconButton
                _hover={{ bg: "#FFEBC9" }}
                rounded={"full"}
                bg={"#FFEBC9"}
                aria-label="edit"
                icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
              />
              <IconButton
                bg={"#FEE2E2"}
                _hover={{ bg: "#FEE2E2" }}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete"
                icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
              />
            </HStack>
          )
        },
      },
    ]
  }


  const registrationData = {
    data: facilities.map(item => ({ name: item.name, date: item.date, category: item.category, status: item.status })),
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: false,
      },
      {
        name: "Date Started",
        selector: "date",
        sortable: true,
      },
      {
        name: "Category",
        selector: "category",
        sortable: false,
      },
      {
        name: "Status",
        selector: "status",
        cell: (data: any) => {
          const status = data.status.toLowerCase()
          const isActive = status.includes("pending") ? "pending" :
            status.includes("awaiting") ? "awaiting" : "payment"

          return (
            <HStack>
              <Box w={2} h={2} rounded={"full"} bg={colorMap[isActive]} />
              <Text>{data.status}</Text>
            </HStack>
          )
        },
        sortable: true,
      },
      {
        name: "Actions",
        cell: () => {
          return (
            <HStack>
              <IconButton
                _hover={{ bg: "#FFEBC9" }}
                rounded={"full"}
                bg={"#FFEBC9"}
                aria-label="edit"
                icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
              />
              <IconButton
                bg={"#FEE2E2"}
                _hover={{ bg: "#FEE2E2" }}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete"
                icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
              />
            </HStack>
          )
        },
      },
    ]
  }
  return (
    <DashboardLayout>
      <Stack spacing={4}>
        <ButtonGroup w={"400px"} p={1} bg={"white"} rounded={"sm"}>
          <CustomButton colorScheme={activeTab === "registration" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "registration" ? "primary.500" : "white"} color={activeTab === "registration" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >registration</CustomButton>
          <CustomButton colorScheme={activeTab === "accredited" ? "primary" : "gray"} onClick={handleTabChange} bg={activeTab === "accredited" ? "primary.500" : "white"} color={activeTab === "accredited" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Accredited facilities</CustomButton>
        </ButtonGroup>

        <Box p={2} px={3} bg={"white"} rounded={"md"}>
          {activeTab === "accredited" ? (
            <CustomAccredTable {...accreditedData} />
          ) : (
            <CustomRegTable {...registrationData} />
          )}
        </Box>
      </Stack>


    </DashboardLayout>
  )
}

export default Facilities