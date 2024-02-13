/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, ButtonGroup, HStack, Icon, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import CustomButton from "../common/CustomButton";
import { DARK } from "../../utils/color";
import { BsPlus } from "react-icons/bs";
import { useAppSelector } from "../../store/hook";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { executeAddNonProfessionalMember, executeDeleteNonProffessionalStaff, executeGetNonFacilityProffessionalMembers } from "../../apis/facility";
import { useAppContext } from "../../contexts/AppContext";
import { useForm } from "react-hook-form";
import ActionModal from "../modals/ActionModal";
import CustomNonProMemberTable from "../tables/CustomNonProMemberTable";
import AddNonProfessionalModal from "../modals/AddNonProfessionalModal";

interface NonProfessionalMemberProps {
  isProfessional: boolean;
  handleTabChange: (event: any) => void;
}
const NonProfessionalMember: React.FC<NonProfessionalMemberProps> = ({ isProfessional, handleTabChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isLoadingAction, onOpen: openLoadingAction, onClose: closeLoadingAction } = useDisclosure()
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null)
  const [editingMember, setEditingMember] = useState<NonProfessionalStaffData | null>(null)
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { currentFacility } = useAppContext()
  const {
    data: loadedData,
    loadingData, handlePageChange,
    handlePerRowsChange,
    totalRows, handleReloadData
  } = usePaginatedTableData((page, perPage) => executeGetNonFacilityProffessionalMembers(currentFacility!.id, token!, page, perPage))

  const { control, trigger, getValues, reset } = useForm<NonProfessionalStaffData>({
    mode: "onSubmit"
  })

  const { control: controlEdit, trigger: triggerEdit, getValues: getEditValues, reset: resetEdit } = useForm<NonProfessionalStaffData>({
    mode: "onSubmit"
  })

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })


  const handleDeleteMember = async () => {
    try {
      openLoadingAction()
      const response = await executeDeleteNonProffessionalStaff(deletingMemberId!, token!)
      if (response.status === "error") throw new Error(response.message)

      toast({
        status: "success",
        title: response.message
      })

      // UPDATE TABLE
      handleReloadData()
      // CLOSE MODAL
      setDeletingMemberId(null)
    }
    catch (error: any) {
      toast({
        status: "error",
        title: error.message
      })
    }
    finally {
      closeLoadingAction()
    }
  }

  const handleEditMember = async () => {
    if (!await triggerEdit()) return
    try {
      openLoading()
      const payload: NonProfessionalStaffData & { facility_id: number } = {
        ...getEditValues(),
        facility_id: currentFacility!.id!,
        id: editingMember!.id
      }
      const response = await executeAddNonProfessionalMember(payload, token!)
      if (response.status === "error") throw new Error(response.message)

      toast({
        status: "success",
        title: response.message,
      })

      resetEdit()
      setEditingMember(null)
      handleReloadData()
    }
    catch (error: any) {
      console.log("ERROR: ", error.message)
      toast({
        status: "error",
        title: error.message,
      })
    }
    finally {
      closeLoading()
    }
  }

  const handleAddMember = async () => {
    if (!await trigger()) return
    try {
      openLoading()
      const payload: NonProfessionalStaffData & { facility_id: number } = {
        ...getValues(),
        facility_id: currentFacility!.id!
      }
      const response = await executeAddNonProfessionalMember(payload, token!)
      if (response.status === "error") throw new Error(response.message)

      toast({
        status: "success",
        title: response.message,
      })

      reset()
      onClose()
      handleReloadData()
    }
    catch (error: any) {
      console.log("ERROR: ", error.message)
      toast({
        status: "error",
        title: error.message,
      })
    }
    finally {
      closeLoading()
    }
  }

  useEffect(() => {
    console.log("MEM:", editingMember)
    resetEdit()
  }, [editingMember])

  
  React.useEffect(() => {
    handleReloadData();
    //eslint-disable-next-line
  }, [currentFacility]);

  return (
    <Stack spacing={4}>
      <HStack justifyContent={"space-between"} flexDir={['column', 'column', 'row']} alignItems={"center"}>
        <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
          <CustomButton colorScheme={isProfessional ? "primary" : "gray"} onClick={handleTabChange} bg={isProfessional ? "primary.500" : "white"} color={isProfessional ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} >Professional staff</CustomButton>

          <CustomButton colorScheme={!isProfessional ? "primary" : "gray"} onClick={handleTabChange} bg={!isProfessional ? "primary.500" : "white"} color={!isProfessional ? "white" : DARK} textTransform={"capitalize"} flex={1}>Non-professional staff</CustomButton>
        </ButtonGroup>

        <CustomButton onClick={onOpen} alignSelf={['flex-end', 'flex-end', 'unset']} leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}>Add member</CustomButton>
      </HStack>

      <Box p={2} px={3} bg={"white"} rounded={"md"}>
        <CustomNonProMemberTable
          data={loadedData}
          deletingMemberId={deletingMemberId}
          isLoading={isLoadingAction}
          loadingData={loadingData}
          handleDeleteMember={(id) => setDeletingMemberId(id)}
          handleEditMember={(item) => setEditingMember(item)}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
          totalRows={totalRows}
        />
      </Box>

      {/* ADD MEMBER MODAL  */}
      <AddNonProfessionalModal
        control={control}
        modalFooterButton={
          <HStack>
            <CustomButton isDisabled={isLoading} onClick={onClose} colorScheme="gray">Cancel</CustomButton>
            <CustomButton isLoading={isLoading} onClick={handleAddMember}>Add member</CustomButton>
          </HStack>
        }
        onClose={onClose}
        isOpen={isOpen}
      />

      {/* EDIT MODAL */}
      <AddNonProfessionalModal
        control={controlEdit}
        values={editingMember!}
        modalFooterButton={
          <HStack>
            <CustomButton isDisabled={isLoading} onClick={() => setEditingMember(null)} colorScheme="gray">Cancel</CustomButton>
            <CustomButton isLoading={isLoading} onClick={handleEditMember}>Update data</CustomButton>
          </HStack>
        }
        onClose={() => setEditingMember(null)}
        isOpen={Boolean(editingMember)}
      />


      {/* DELETE MODAL */}
      <ActionModal
        title="Are you sure you want to delete this member?"
        text="This action cannot be undone"
        status="danger"
        isLoading={isLoadingAction}
        handleAction={handleDeleteMember}
        isOpen={Boolean(deletingMemberId)}
        onClose={() => setDeletingMemberId(null)}
        actionBtnText="Confirm"
      />
    </Stack>
  )
}

export default NonProfessionalMember