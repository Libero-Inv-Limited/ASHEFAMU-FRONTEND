/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, FormControl, FormErrorMessage, Icon as ChakraIcon, FormLabel, Input, InputGroup, InputLeftElement, InputProps, useTheme, FormLabelProps, FormControlProps } from "@chakra-ui/react";
import React from "react"
import { IconType } from "react-icons";
import { TEXT_DARK, TEXT_DARK_GRAY } from "../../utils/color";
import Select from 'react-select';
import { StylesConfig } from "react-select";


interface FormInputProps extends InputProps {
  label: string;
  Icon?: IconType;
  name: string;
  isSelect?: boolean
  labelStyles?: FormLabelProps;
  controlProps?: FormControlProps;
  error?: string;
  data?: {label: string; value: string;}[];

}

const FormInput: React.FC<FormInputProps> = ({ label, data, error, isSelect, labelStyles, controlProps, Icon, ...rest }) => {
  const theme = useTheme()
  // console.log("THEME:", theme)

  const customSelect: StylesConfig = {
    control: () => ({
      height: "40px",
      display: "flex",
      alignItems: "center",
      padding: theme.sizes['1'],
      borderRadius: "6px",
      border: `1px solid ${theme.colors.gray['200']}`,
      ":hover": {
        borderColor: theme.colors.gray['300']
      },
      ":focus": {
        borderColor: theme.colors.brand['500']
      }
    }),
  }

  if (isSelect) return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} fontFamily={"body"} {...labelStyles}>{label}</FormLabel>
      <Select
        classNamePrefix={"custom"}
        styles={customSelect}
        className="custom-select"
        isSearchable={true} options={data} 
        {...rest as any}
      />
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>}
    </FormControl>
  )

  return (
    <FormControl isInvalid={Boolean(error)} {...controlProps}>
      <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} fontFamily={"body"} {...labelStyles}>{label}</FormLabel>
      <InputGroup alignItems={"center"}>
        {Icon && <InputLeftElement as={Center} h={"full"} w={12} color={"gray.400"} fontSize={"lg"}>
          <ChakraIcon as={Icon} fontSize={"24px"} />
        </InputLeftElement>}
        <Input h={"40px"} color={TEXT_DARK_GRAY} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} {...rest}/>
      </InputGroup>
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default FormInput