import { Button, ButtonProps, Icon } from "@chakra-ui/react"
import React from "react"
import { BsCheck2 } from "react-icons/bs";
import { DARK } from "../../utils/color";

interface CheckButtonProps extends ButtonProps {
  isActive?: boolean;
  handleClick?: () => void;
}
const CheckButton: React.FC<CheckButtonProps> = ({ isActive, handleClick, ...props }) => {
  return (
    <Button
      height={"45px"}
      rounded={"6px"}
      fontSize={"sm"}
      fontWeight={500}
      color={DARK}
      _hover={{ bg: isActive && "#E5F3E5"  }}
      rightIcon={isActive ? <Icon fontSize={"xl"} color={"brand.500"} as={BsCheck2} /> : undefined}
      onClick={handleClick}
      variant={"outline"} colorScheme="gray"
      bg={isActive ? "#E5F3E5" : "transparent"} {...props} />
  )
}

export default CheckButton