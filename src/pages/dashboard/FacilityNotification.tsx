/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Box, Center, HStack, Select, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { notificationSearchData } from "../../utils/data"
import CustomSelect from "../../components/common/CustomSelect";
import NotificationCard from "../../components/common/NotificationCard";
import CustomButton from "../../components/common/CustomButton";
import DataLoader from "../../components/common/loader/DataLoader";
import { useAppSelector } from "../../store/hook";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { executeGetFacilityNotification } from "../../apis/facility";
import { useAppContext } from "../../contexts/AppContext";
import EmptyTable from "../../components/states/EmptyTable";

interface FacilityNotificationProps { }
const FacilityNotification: React.FC<FacilityNotificationProps> = () => {
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { currentFacility } = useAppContext()
  const { currentPage, data, loadingData, handlePageChange, handleReloadData, lastPage } = usePaginatedTableData((page, perPage) => executeGetFacilityNotification(currentFacility!.id, token!, page, perPage), 9)
  // const last = div <= perPage ? perPage : div
  return (
    <DashboardLayout>
      <Stack flexDir={['column', 'column', 'row']}>
        <CustomSelect
          fontSize="sm"
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
      <Box p={4} mt={6} bg={"white"} rounded={"md"}>
        {
          loadingData ? (
            <Center>
              <DataLoader />
            </Center>
          ) : data.length ?
            <SimpleGrid alignItems={"flex-start"} minH={`calc(100vh - 150px)`} spacing={4} flexWrap={"wrap"} columns={[1, 2, 3]}>
              {data.map((type: NotificationDataType) => (
                <NotificationCard key={type.id} handleReload={handleReloadData} {...type} />
              ))}
            </SimpleGrid> :
            <EmptyTable text={"No notifications found"} />
        }
      </Box>

      {!!data.length && (
        <HStack bg={"white"} py={3} position={"sticky"} bottom={0} left={0} alignItems={"center"} justifyContent={"center"} mt={10}>
          <CustomButton h={"40px"} isDisabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} colorScheme="primary">Previous</CustomButton>
          <HStack alignItems={"center"} justifyContent={"center"}>
            <Select value={currentPage} onChange={(e) => handlePageChange(+e.target.value)}>
              {(new Array(lastPage)).fill("-").map((_, index) => (
                <option key={`option-${index}`} selected={(index + 1) === currentPage} value={index + 1}>{index + 1}</option>
              ))}
            </Select>
            <Text whiteSpace={"nowrap"}>of {lastPage}</Text>
          </HStack>
          <CustomButton isDisabled={currentPage >= lastPage} onClick={() => handlePageChange(currentPage + 1)} h={"40px"} colorScheme="primary">Next</CustomButton>
        </HStack>
      )}
    </DashboardLayout>
  )
}

export default FacilityNotification