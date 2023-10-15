/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormErrorMessage, IconButton, Input, InputGroup, InputProps, InputRightElement, useDisclosure } from "@chakra-ui/react";
import React from "react"
import { useController } from "react-hook-form"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputProps extends InputProps {
  control: any;
  name: string;
  rules: any;
}
const PasswordInput: React.FC<PasswordInputProps> = ({ control, rules, name, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure()
  const { field, fieldState: { error } } = useController({
    control,
    name,
    rules
  })
  return (
    <FormControl isInvalid={Boolean(error)} mt={2}>
      <InputGroup alignItems={"center"}>
        <InputRightElement variant={"link"}
          as={IconButton} h={"full"} w={12} color={isOpen ? "brand.500" : "gray.400"} fontSize={"lg"}
          onClick={onToggle}
          aria-label='Show password' icon={isOpen ? <IoEyeOffOutline /> : <IoEyeOutline />}
        />
        <Input {...field} size="lg" fontSize={"sm"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} type={ isOpen ? "text" : "password"} {...rest} />
      </InputGroup>
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default PasswordInput