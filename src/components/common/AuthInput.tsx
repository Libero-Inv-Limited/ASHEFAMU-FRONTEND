/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputProps, InputRightElement, useDisclosure } from "@chakra-ui/react";
import React from "react"
import { useController } from "react-hook-form";
import { IconType } from "react-icons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TEXT_DARK } from "../../utils/color";

interface AuthInputProps extends InputProps {
  label: string;
  control: any;
  Icon?: IconType;
  name: string;
  rules: any;
  isPassword?: boolean;
}
const AuthInput: React.FC<AuthInputProps> = ({ label, rules, control, isPassword, name, Icon, ...rest }) => {
  const { field, fieldState: { error } } = useController({
    control, 
    name,
    rules
  })
  const { isOpen, onToggle } = useDisclosure()

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel color={TEXT_DARK} fontSize={".9rem"} mb={1} fontWeight={"400"} fontFamily={"body"}>{label}</FormLabel>
      <InputGroup alignItems={"center"}>
        {Icon && <InputLeftElement as={Center} h={"full"} w={12} color={"gray.400"} fontSize={"lg"}>
          <Icon />
        </InputLeftElement>}

        {isPassword && (
          <InputRightElement variant={"link"}
            as={IconButton} h={"full"} w={12} color={isOpen ? "brand.500" : "gray.400"} fontSize={"lg"}
            onClick={onToggle}
            aria-label='Show password' icon={isOpen ? <IoEyeOffOutline /> : <IoEyeOutline />}
          />
        )}
        <Input {...field} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} {...rest} type={isPassword ? isOpen ? "text" : "password" : rest.type} />
      </InputGroup>
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default AuthInput