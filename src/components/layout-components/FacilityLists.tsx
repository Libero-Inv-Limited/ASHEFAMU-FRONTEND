import { Center, Collapse, Flex, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"
import React from "react"
import { DARK, LIGHT_GRAY, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color"
import { facilities } from "../../utils/data"
import useIsFacility from "../../hooks/useIsFacility"
import {AiOutlineSearch} from "react-icons/ai"
import FacilityListItem from "./FacilityListItem"

interface FacilityListsProps { }
const FacilityLists: React.FC<FacilityListsProps> = () => {
  const { isFacility } = useIsFacility()
  return (
    <Collapse in={isFacility}>
      <Stack w={"250px"} px={3} borderRight={"1px solid " + LIGHT_GRAY}>
        <Flex alignItems={"center"} fontFamily={"rubik"} color={DARK} fontWeight={600} borderBottom={"1px solid " + LIGHT_GRAY} justifyContent={"center"} minH={"90px"}>
          <InputGroup>
            <InputLeftElement as={Center}>
              <Icon fontSize={"2xl"} color={TEXT_GRAY} as={AiOutlineSearch} />
            </InputLeftElement>
            <Input fontSize={"sm"} color={TEXT_DARK_GRAY} />
          </InputGroup>
        </Flex>
        <Stack mt={2}>
          {facilities.map((sidebarContents, index) => <FacilityListItem key={`facility-${sidebarContents.name}-${index}`} {...sidebarContents} />)}
        </Stack>
      </Stack>
    </Collapse>
  )
}

export default FacilityLists