/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { HStack, Select, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { notificationSearchData } from "../../utils/data"
import CustomSelect from "../../components/common/CustomSelect";
import NotificationCard from "../../components/common/NotificationCard";
import CustomButton from "../../components/common/CustomButton";

interface NotificationProps { }
const Notification: React.FC<NotificationProps> = () => {
  const [page, setPage] = useState(1)
  const data = ["error", "info", "error", "info", "warning", "warning", "info", "warning"]
  const perPage = 9
  const last = Math.ceil(data.length / perPage ) 
  // const last = div <= perPage ? perPage : div
  return (
    <DashboardLayout>
      <Stack>
        <CustomSelect
          styles={{
            container: (style) => ({
              ...style,
              maxWidth: "280px",
            })
          }}
          className="custom-select"
          placeholder="Search category eg. Invoice"
          options={notificationSearchData}
        />
      </Stack>

      {/* NOTIFICATIONS */}
      <SimpleGrid p={4} mt={6} spacing={4} flexWrap={"wrap"} bg={"white"} columns={[1, 2, 3]} rounded={"md"}>
        {data.map((type) => (
          <NotificationCard type={type as any} />
        ))}
      </SimpleGrid>

      <HStack alignItems={"center"} justifyContent={"center"} mt={10}>
        <CustomButton h={"40px"} colorScheme="primary">Previous</CustomButton>
        <HStack alignItems={"center"} justifyContent={"center"}>
          <Select value={page} onChange={(e) => setPage(+e.target.value)}>
            { (new Array(last)).fill("-").map((_, index) => (
              <option key={`option-${index}`} value={index + 1}>{index + 1}</option>
            )) }
          </Select>
          <Text whiteSpace={"nowrap"}>of {last}</Text>
        </HStack>
        <CustomButton h={"40px"} colorScheme="primary">Next</CustomButton>
      </HStack>
    </DashboardLayout>
  )
}

export default Notification