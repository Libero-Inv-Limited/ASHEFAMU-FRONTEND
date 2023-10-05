import React from "react"
import AuthLayout from "../components/layouts/AuthLayout"
import { Heading, Stack, Text, VStack, Image, FormControl, InputGroup, InputLeftElement, Center, Input, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { IoMailOutline } from "react-icons/io5"
import CustomButton from "../components/common/CustomButton"
import { TEXT_GRAY } from "../utils/color"
import mailIcon from "../assets/icons/mail.png"
import { useNavigate } from "react-router-dom"
import ROUTES from "../utils/routeNames"

interface ForgotPasswordProps { }
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const { trigger, register, getValues, formState: { errors } } = useForm<{ email: string; }>({
    mode: "onTouched"
  })
  const navigate = useNavigate()

  const handleContinue = async () => {
    // CALL FUNCTION HERE
    if (!await trigger()) return
    navigate(ROUTES.CHANGE_PASSWORD_ROUTE(getValues("email")))
  }

  return (
    <AuthLayout smaller>
      <Stack mt={8} spacing={4} mb={16}>
        <VStack spacing={4}>
          <Image src={mailIcon} maxW={16} objectFit={"contain"} />
          <Heading mt={2} size={"md"}>Enter your email address</Heading>
          <Text textAlign={"center"} fontSize={"sm"} color={TEXT_GRAY}>A password reset OTP code will be sent to your email to continue the reset process</Text>
        </VStack>

        {/* EMAIL */}
        <FormControl isInvalid={Boolean(errors.email)} mt={2}>
          <InputGroup alignItems={"center"}>
            <InputLeftElement as={Center} h={"full"} w={12} color={"gray.400"} fontSize={"lg"}>
              <IoMailOutline />
            </InputLeftElement>

            <Input {...register("email", { required: "Email is required" })} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }}/>
          </InputGroup>
          {Boolean(errors.email) && <FormErrorMessage fontSize={"xs"}>{errors.email?.message}</FormErrorMessage>}
        </FormControl>

        <CustomButton mt={2} onClick={handleContinue} colorScheme="brand">Continue</CustomButton>
      </Stack>
    </AuthLayout>
  )
}

export default ForgotPassword