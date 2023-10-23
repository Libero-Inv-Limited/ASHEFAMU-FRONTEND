import { Center, Collapse, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Stack, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, LIGHT_GRAY, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color"
// import { facilities } from "../../utils/data"
import useIsFacility from "../../hooks/useIsFacility"
import { AiOutlineSearch } from "react-icons/ai"
import FacilityListItem from "./FacilityListItem"
import SidebarToggleIcon from "../common/SidebarToggleIcon"
import { useAppSelector } from "../../store/hook"
import { useAppContext } from "../../contexts/AppContext"
import FileSkeleton from "../common/FileSkeleton"

interface FacilityListsProps {
  isOpen?: boolean;
  onToggle: () => void;
}
const FacilityLists: React.FC<FacilityListsProps> = ({ isOpen, onToggle }) => {
  const { isFacility } = useIsFacility()
  const { isLoadingData } = useAppContext()
  const { facilities } = useAppSelector(state => state.dataStore)

  return (
    <Collapse in={isFacility && isOpen}>
      <Stack h={"full"} w={"250px"} px={3} pos={"relative"} borderRight={"1px solid " + LIGHT_GRAY}>
        <Flex alignItems={"center"} fontFamily={"rubik"} color={DARK} fontWeight={600} borderBottom={"1px solid " + LIGHT_GRAY} justifyContent={"center"} minH={"90px"}>
          <InputGroup>
            <InputLeftElement as={Center}>
              <Icon fontSize={"2xl"} color={TEXT_GRAY} as={AiOutlineSearch} />
            </InputLeftElement>
            <Input fontSize={"sm"} color={TEXT_DARK_GRAY} />
          </InputGroup>
        </Flex>
        {isOpen && (
          <VStack pos={"absolute"} zIndex={40} right={0} bottom={10}>
            <IconButton
              onClick={onToggle}
              aria-label="toggle"
              variant={"unstyled"}
              px={0} py={4}
              display={"flex"} alignItems={"center"}
              width={"fit-content"}
              shadow={"lg"}
              size={"xs"} rounded={"full"}
              icon={<SidebarToggleIcon vertical color={"primary.500"} />}
            />
          </VStack>)}
        <Stack mt={2}>
          {
            isLoadingData ?
              (new Array(8).fill("-")).map((_, index) => <FileSkeleton isSingle key={`facilities-skeleton-${index}`} />) :
              facilities.map((sidebarContents, index) => <FacilityListItem key={`facility-${sidebarContents.name}-${index}`} {...sidebarContents} />)
          }
        </Stack>
      </Stack>
    </Collapse>
  )
}

export default FacilityLists