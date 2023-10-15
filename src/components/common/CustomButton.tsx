/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

interface CustomButtonProps extends ButtonProps { 
  to?: any;
}
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <Button h={"45px"} rounded={"4px"} colorScheme="brand" size={"lg"} fontWeight={"500"} fontSize={"14px"} {...props}/>
}

export default CustomButton