/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TEXT_GRAY } from "../../utils/color";
import CustomButton from "./CustomButton";
import { BsPlus } from "react-icons/bs";
import { checkPermission } from "../../utils/helpers";
import { useAppSelector } from "../../store/hook";

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  buttonLabel: string;
  actionRoute?: string;
}
export const FilterComponentTwo: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
  buttonLabel,
  actionRoute,
}) => {
  const navigate = useNavigate();
  const userPermissions = useAppSelector(
    (state) => state.accountStore.user.permissions
  );
  return (
    <HStack
      flexWrap={"wrap"}
      flexDir={["column-reverse", "column-reverse", "row"]}
      spacing={2}
      alignItems={["flex-start", "flex-start", "center"]}
      w={"full"}
    >
      <InputGroup flex={1} maxW={["full", "full", 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input
          fontSize={"sm"}
          onChange={onFilter}
          value={filterText}
          placeholder="Search"
        />
      </InputGroup>

      <Spacer />
      {checkPermission(userPermissions, "Create role") && (
        <CustomButton
          onClick={() => navigate(actionRoute)}
          alignSelf={["flex-end", "flex-end", "unset"]}
          leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
        >
          {buttonLabel}
        </CustomButton>
      )}
    </HStack>
  );
};
