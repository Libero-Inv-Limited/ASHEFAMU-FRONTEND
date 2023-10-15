import { HStack, Heading, HeadingProps, Icon, IconProps } from "@chakra-ui/react"
import React from "react"

interface FormTitleProps extends HeadingProps { }
const FormTitle: React.FC<FormTitleProps> = (props) => {
  return (
    <HStack>
      <TitleIcon />
      <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"} {...props}/>
    </HStack>
  )
}

interface TitleIconProp extends IconProps { }
const TitleIcon: React.FC<TitleIconProp> = (props) => {
  return <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none" {...props}>
    <path d="M10.8916 6.50846C10.8918 6.6 10.8739 6.69068 10.8389 6.77526C10.8039 6.85984 10.7525 6.93664 10.6876 7.00121L6.49175 11.1975C6.3608 11.3276 6.18365 11.4007 5.999 11.4007C5.81435 11.4007 5.63721 11.3276 5.50625 11.1975L1.31262 7.00121C1.18244 6.87026 1.10938 6.69311 1.10938 6.50846C1.10938 6.32381 1.18244 6.14666 1.31262 6.01571L5.50843 1.81946C5.63939 1.68928 5.81654 1.61621 6.00119 1.61621C6.18584 1.61621 6.36298 1.68928 6.49394 1.81946L10.6898 6.01571C10.7542 6.08046 10.8053 6.15733 10.8399 6.24191C10.8746 6.32648 10.8921 6.41707 10.8916 6.50846Z" fill="#02E56B" />
  </Icon>
}

export default FormTitle