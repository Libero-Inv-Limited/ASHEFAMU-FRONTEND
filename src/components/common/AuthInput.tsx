/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, FormControl, FormErrorMessage, Icon as ChakraIcon, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputProps, InputRightElement, useDisclosure, useTheme, FormLabelProps, IconProps } from "@chakra-ui/react";
import React, { ComponentProps } from "react"
import { useController } from "react-hook-form";
import { IconType } from "react-icons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TEXT_DARK, TEXT_DARK_GRAY } from "../../utils/color";
import Select from 'react-select';
import { StylesConfig } from "react-select";


interface AuthInputProps extends InputProps {
  label: string;
  control: any;
  Icon?: IconType;
  name: string;
  rules: any;
  isPassword?: boolean;
  iconProp?: IconProps;
  isSelect?: boolean
  labelStyles?: FormLabelProps;
  data?: { label: string; value: string; }[]
  selectProps?: ComponentProps<Select>
}


const AuthInput: React.FC<AuthInputProps> = ({ label, iconProp, rules, labelStyles, selectProps, control, data, isPassword, isSelect, name, Icon, ...rest }) => {
  const theme = useTheme()

  const { field, fieldState: { error } } = useController({
    defaultValue: "",
    control,
    name,
    rules
  })
  const { isOpen, onToggle } = useDisclosure()

  const customSelect: StylesConfig = {
    control: () => ({
      height: "45px",
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
      },
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: theme.colors.brand['500'],
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "white",
      ':hover': {
        backgroundColor: theme.colors.brand['800'],
        color: 'white',
      },
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
        {...selectProps}
        {...field}
      />
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>}
    </FormControl>
  )

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} fontFamily={"body"} {...labelStyles}>{label}</FormLabel>
      <InputGroup alignItems={"center"}>
        {Icon && <InputLeftElement as={Center} h={"full"} w={12} color={"gray.400"} fontSize={"lg"}>
          <ChakraIcon as={Icon} fontSize={"24px"} {...iconProp} />
        </InputLeftElement>}

        {isPassword && (
          <InputRightElement variant={"link"}
            as={IconButton} h={"full"} w={12} color={isOpen ? "brand.500" : "gray.400"} fontSize={"lg"}
            onClick={onToggle}
            aria-label='Show password' icon={isOpen ? <ChakraIcon fontSize={"20px"} as={IoEyeOffOutline} /> : <ChakraIcon fontSize={"20px"} as={IoEyeOutline} />}
          />
        )}
        <Input h={"45px"} color={TEXT_DARK_GRAY} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} {...rest} type={isPassword ? isOpen ? "text" : "password" : rest.type}  {...field} />
      </InputGroup>
      {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default AuthInput