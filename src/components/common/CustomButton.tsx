import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

interface CustomButtonProps extends ButtonProps { }
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <Button colorScheme="brand" size={"lg"} fontWeight={"500"} fontSize={".9rem"} {...props}/>
}

export default CustomButton