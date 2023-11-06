/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  FormControl,
  FormErrorMessage,
  Icon as ChakraIcon,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useDisclosure,
  FormLabelProps,
  IconProps,
} from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import { useController } from "react-hook-form";
import { IconType } from "react-icons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TEXT_DARK } from "../../utils/color";
import Select from "react-select";
import CustomSelect from "./CustomSelect";

interface AuthInputProps extends InputProps {
  label: string;
  control: any;
  Icon?: any;
  isIconComponent?: boolean;
  name: string;
  rules: any;
  isPassword?: boolean;
  iconProp?: IconProps;
  isSelect?: boolean;
  labelStyles?: FormLabelProps;
  data?: { label: string; value: string }[];
  selectProps?: ComponentProps<Select> & { isCreatable?: boolean };
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  value,
  iconProp,
  isIconComponent,
  rules,
  labelStyles,
  selectProps,
  control,
  data,
  isPassword,
  isSelect,
  name,
  Icon,
  onChange,
  ...rest
}) => {
  const { fontSize } = rest;
  const {
    field,
    fieldState: { error },
  } = useController({
    defaultValue: value || "",
    control,
    name,
    rules,
  });

  const { isOpen, onToggle } = useDisclosure();

  if (isSelect)
    return (
      <FormControl isInvalid={Boolean(error)}>
        <FormLabel
          color={TEXT_DARK}
          fontSize={"14px"}
          mb={1}
          fontWeight={"500"}
          fontFamily={"body"}
          {...labelStyles}
        >
          {label}
        </FormLabel>
        <CustomSelect
          classNamePrefix={"custom"}
          className="custom-select"
          isSearchable={true}
          options={data}
          onChange={onChange}
          fontSize={fontSize as any}
          {...selectProps}
          {...field}
        />
        {Boolean(error) && (
          <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>
        )}
      </FormControl>
    );

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel
        color={TEXT_DARK}
        fontSize={"14px"}
        mb={1}
        fontWeight={"500"}
        fontFamily={"body"}
        {...labelStyles}
      >
        {label}
      </FormLabel>
      <InputGroup alignItems={"center"}>
        {Icon && (
          <InputLeftElement
            as={Center}
            h={"full"}
            w={12}
            color={"gray.400"}
            fontSize={"lg"}
          >
            {isIconComponent ? (
              Icon
            ) : (
              <ChakraIcon
                as={Icon as IconType}
                fontSize={"24px"}
                {...iconProp}
              />
            )}
          </InputLeftElement>
        )}

        {isPassword && (
          <InputRightElement
            variant={"link"}
            as={IconButton}
            h={"full"}
            w={12}
            color={isOpen ? "brand.500" : "gray.400"}
            fontSize={"lg"}
            onClick={onToggle}
            aria-label="Show password"
            icon={
              isOpen ? (
                <ChakraIcon fontSize={"20px"} as={IoEyeOffOutline} />
              ) : (
                <ChakraIcon fontSize={"20px"} as={IoEyeOutline} />
              )
            }
          />
        )}
        <Input
          h={"45px"}
          color={TEXT_DARK}
          size="lg"
          fontSize={"md"}
          rounded={6}
          fontFamily={"body"}
          boxShadow="none !important"
          _focus={{ borderColor: "brand.500", boxShadow: "none" }}
          {...rest}
          type={isPassword ? (isOpen ? "text" : "password") : rest.type}
          {...field}
        />
      </InputGroup>
      {Boolean(error) && (
        <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default AuthInput;
