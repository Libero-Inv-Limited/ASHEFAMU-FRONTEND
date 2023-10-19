/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@chakra-ui/react";
import React, { ComponentProps } from "react"
import Select, { StylesConfig } from 'react-select';

interface CustomSelectProps extends ComponentProps<Select> { 
  fontSize?: "sm" | "md";
  styles?: StylesConfig
}
const CustomSelect: React.FC<CustomSelectProps> = ({ fontSize, styles, ...rest }) => {
  const theme = useTheme()

  const customSelect: StylesConfig = {
    control: (styles) => ({
      ...styles,
      height: "45px",
      display: "flex",
      alignItems: "center",
      padding: theme.sizes['1'],
      borderRadius: "6px",
      fontSize: fontSize === "sm" ? ".9rem" : "1rem",
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
    ...styles
  }
  return (
    <Select
      classNamePrefix={"custom"}
      styles={customSelect}
      className="custom-select"
      isSearchable={true}
      {...rest}
    />
  )
}

export default CustomSelect