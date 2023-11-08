import { HStack, InputGroup, InputLeftElement, Icon, Input, Spacer, Center } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TEXT_GRAY } from "../../utils/color";
import CustomButton from "./CustomButton";
import ROUTES from './../../utils/routeNames';
import { BsPlus } from "react-icons/bs";

interface FilterComponentProp {
  onFilter: (e: React.FormEvent) => void;
  onClear: () => void;
  filterText: string;
  buttonLabel: string;
  actionRoute?: string;
}
export const FilterComponentTwo: React.FC<FilterComponentProp> = ({ onFilter, filterText, buttonLabel, actionRoute }) => {
  const navigate = useNavigate()
  return (
    <HStack flexWrap={"wrap"} flexDir={['column-reverse', 'column-reverse', 'row']} spacing={2} alignItems={["flex-start", "flex-start", "center"]} w={"full"}>
      <InputGroup flex={1} maxW={['full', 'full', 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" />
      </InputGroup>

      <Spacer />
      <CustomButton onClick={() => navigate(actionRoute)} alignSelf={['flex-end', 'flex-end', 'unset']} leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}>{buttonLabel}</CustomButton>
    </HStack>
  )
}