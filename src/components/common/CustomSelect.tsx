/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@chakra-ui/react";
import { ComponentProps } from "react";
import Select, { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { TEXT_DARK, TEXT_DARK_GRAY } from "../../utils/color";

interface CustomSelectProps extends ComponentProps<Select> {
  fontSize?: "sm" | "md";
  styles?: StylesConfig;
  isCreatable?: boolean;
}


const CustomSelect: React.FC<CustomSelectProps> = ({
  fontSize,
  isCreatable,
  styles,
  onChange,
  ...rest
}) => {
  const theme = useTheme();

  const customSelect: StylesConfig = {
    control: (styles) => ({
      ...styles,
      minHeight: "45px",
      display: "flex",
      alignItems: "center",
      color: TEXT_DARK,
      padding: theme.sizes["1"],
      borderRadius: "6px",
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
      border: `1px solid ${theme.colors.gray["200"]}`,
      ":hover": {
        borderColor: theme.colors.gray["300"],
      },
      ":focus": {
        borderColor: theme.colors.brand["500"],
      },
    }),
    menu: (style) => ({
      ...style,
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
      color: TEXT_DARK,
    }),
    menuList: (style) => ({
      ...style,
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
      color: TEXT_DARK,
    }),
    input: (style) => ({
      ...style,
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
      color: TEXT_DARK_GRAY,
    }),
    valueContainer: (style) => ({
      ...style,
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
      color: TEXT_DARK_GRAY,
    }),
    singleValue: (styles) => ({
      ...styles,
      fontSize: fontSize === "sm" ? ".875rem" : "1rem",
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: theme.colors.brand["500"],
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: theme.colors.brand["800"],
        color: "white",
      },
    }),
    ...styles,
  };

  if (isCreatable)
    return (
      <CreatableSelect
        classNamePrefix={"custom"}
        styles={customSelect}
        className="custom-select"
        isSearchable={true}
        {...rest}
      />
    );
  return (
    <Select
      classNamePrefix={"custom"}
      styles={customSelect}
      className="custom-select"
      isSearchable={true}
      onChange={onChange}
      {...rest}
    />
  );
};

export default CustomSelect;
