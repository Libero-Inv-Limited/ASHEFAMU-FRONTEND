/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormLabel, HStack, Heading, Icon, ModalBody, ModalContent, ModalFooter, ModalHeader, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { LIGHT_BG, TEXT_DARK, TEXT_GRAY } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { populateDashboardCards } from "../../store/slice/dataSlice";
import { executeUpdateDashboardCards } from "../../apis/user";

interface DashboardSortProps {
  onCancel: () => void;
}
const DashboardSort: React.FC<DashboardSortProps> = ({ onCancel }) => {
  const dashboardCards = useAppSelector(state => state.dataStore.dashboardCards)
  const [tempState, setTempState] = useState<DashboardCardType[]>(dashboardCards.filter(card => card.visibility))
  const dispatch = useAppDispatch()
  const { isOpen: isSaving, onOpen: openSaving, onClose: closeSaving } = useDisclosure()
  const token = useAppSelector(state => state.accountStore.tokenStore!.token)
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;
    // CANCEL IF NO DESTINATION
    if (!destination) return;

    // CANCEL IF THERE WAS NO CHANGE OF POSITION
    if ( destination.droppableId === source.droppableId && destination.index === source.index ) return

    const item = tempState.find(item => item.name === draggableId.split("-")[1])
    if(!item) return

    const newPosition = [...tempState]
    newPosition.splice(source.index, 1)
    newPosition.splice(destination.index, 0, item)
    setTempState(newPosition)
  };

  const handleSaveChange = async () => {
    const sortedData = [...tempState, ...dashboardCards.filter(card => !card.visibility)].map((card, index) => ({ ...card, position: index + 1 }))
    try{
      openSaving()
      const payload: UpdateDashboardCard = {
        card_records: sortedData
      } 
      const response = await executeUpdateDashboardCards(payload, token)
      if(response.status === "error") throw new Error(response.message)
      dispatch(populateDashboardCards(sortedData))
     
      toast({
        status: "success",
        title: response.message
      })
      onCancel()
    }
    catch(err: any){
      console.log("ERROR:", err.message)
      toast({
        status: "error",
        title: err.message
      })
    }
    finally{
      closeSaving()
    }
  }

  return (
    <ModalContent>
      <ModalHeader as={HStack}>
        <Heading fontSize={"md"} fontWeight={700}>REORDER DASHBOARD</Heading>
      </ModalHeader>
      <DragDropContext
        onDragEnd={handleDragEnd as any}
      >
        <Droppable direction="vertical" droppableId="dash-sort">
          {(dropProps, snapshot) => { 
            console.log("SNAP:", snapshot)
            return (
            <ModalBody as={VStack} minH={360} spacing={4} pt={6} textAlign={"center"} {...dropProps.droppableProps} ref={dropProps.innerRef}>
              {tempState.map((item, index) => (
                <Draggable index={index} draggableId={`item-${item.name}`}>
                  {(drapProp) => (
                    <FormControl
                      key={item.id} as={HStack}
                      alignItems={"center"} p={4}
                      rounded={"md"} bg={LIGHT_BG}
                      {...drapProp.draggableProps}
                      {...drapProp.dragHandleProps}
                      ref={drapProp.innerRef}
                    >
                      <Icon color={TEXT_GRAY} fontSize={"xl"} as={MdOutlineDragIndicator} />
                      <FormLabel mb={0} flex={1} color={TEXT_DARK} fontSize={"sm"}>{item.name}</FormLabel>
                    </FormControl>
                  )}
                </Draggable>
              ))}
              {dropProps.placeholder}
            </ModalBody>
          )}}
        </Droppable>
      </DragDropContext>

      <ModalFooter as={HStack} spacing={3}>
        <CustomButton variant={"outline"} colorScheme="gray" onClick={onCancel}>Cancel</CustomButton>
        <CustomButton isLoading={isSaving} colorScheme="brand" onClick={handleSaveChange}>Save</CustomButton>
      </ModalFooter>
    </ModalContent >
  )
}

export default DashboardSort