import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

interface CustomButtonProps extends ButtonProps { }
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <Button h={"40px"} rounded={"4px"} colorScheme="brand" size={"lg"} fontWeight={"500"} fontSize={"14px"} {...props}/>
}

export default CustomButton