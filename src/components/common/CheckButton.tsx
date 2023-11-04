import { Button, ButtonProps, Icon } from "@chakra-ui/react"
import React from "react"
import { BsCheck2 } from "react-icons/bs";
import { TEXT_DARK } from "../../utils/color";

interface CheckButtonProps extends ButtonProps {
  isActive?: boolean;
  value?: string;
  handleClick?: () => void;
}
const CheckButton: React.FC<CheckButtonProps> = ({ isActive, value, handleClick, ...props }) => {
  return (
    <Button
      height={"45px"}
      rounded={"6px"}
      fontSize={"sm"}
      fontWeight={500}
      color={TEXT_DARK}
      _hover={{ bg: isActive && "#E5F3E5"  }}
      rightIcon={(isActive || (value?.toLowerCase() === (props.children as string).toLowerCase())) ? <Icon fontSize={"xl"} color={"brand.500"} as={BsCheck2} /> : undefined}
      onClick={handleClick}
      variant={"outline"} colorScheme="gray"
      bg={isActive ? "#E5F3E5" : "transparent"} {...props} />
  )
}

export default CheckButton