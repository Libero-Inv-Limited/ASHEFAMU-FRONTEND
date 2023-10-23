/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormLabel, FormLabelProps, Icon, IconButton, Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { useController } from "react-hook-form";
import { TEXT_DARK, TEXT_DARK_GRAY } from "../../utils/color";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

interface NumberInputProps extends InputProps {
  control: any;
  name: string;
  rules: any;
  setValue: (name: string, value: any, options?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
  }> | undefined) => void
  label: string;
  labelStyles?: FormLabelProps
}
const NumberInput: React.FC<NumberInputProps> = ({ name, rules, control, setValue, label, labelStyles, ...rest }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [numberValue, setNumberValue] = useState<number>(0)
  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules,
    defaultValue: 0
  })
  const handleClick = (type: "minus" | "plus") => {
    if(type === "plus") {
      const newValue = numberValue + 1
      setValue(name, newValue)
      setNumberValue(newValue)
      setIsDisabled(false)
      return
    }
    if(numberValue <= 0) return setIsDisabled(true)
    const newValue =  numberValue - 1
    if(newValue === 0) setIsDisabled(true)
    setValue(name, newValue)
    setNumberValue(newValue)
  }

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} fontFamily={"body"} {...labelStyles}>{label}</FormLabel>
      <InputGroup 
        maxW={"200px"}
      >

        <InputLeftElement>
          <IconButton
            // bg={"#E3EBE2"}
            onClick={() => handleClick("minus")}
            isDisabled={isDisabled}
            name="minus"
            aria-label="increase"
            colorScheme="brand"
            icon={<Icon as={BiMinus} fontSize={"xl"} />}
          />
        </InputLeftElement>

        <Input textAlign={"center"} type="number" h={"40px"} color={TEXT_DARK_GRAY} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} {...field} {...rest} />

        <InputRightElement>
          <IconButton
            // bg={"#E3EBE2"}
            aria-label="increase"
            name="plus"
            onClick={() => handleClick("plus")}
            colorScheme="brand"
            icon={<Icon as={BsPlus} fontSize={"xl"} />}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}

export default NumberInput