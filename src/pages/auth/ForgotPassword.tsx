/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { Heading, Stack, Text, VStack, Image, FormControl, InputGroup, InputLeftElement, Center, Input, FormErrorMessage, HStack, Link, Icon, useDisclosure, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { IoMailOutline } from "react-icons/io5"
import CustomButton from "../../components/common/CustomButton"
import { TEXT_GRAY } from "../../utils/color"
import mailIcon from "../../assets/icons/mail.png"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../utils/routeNames"
import { Link as ReactLink } from "react-router-dom"
import {BiArrowBack} from "react-icons/bi"
import useWaitingText from "../../hooks/useWaitingText"
import { executeForgotPassword } from "../../apis/auth"

interface ForgotPasswordProps { }
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const { trigger, register, getValues, formState: { errors } } = useForm<{ email: string; }>({
    mode: "onSubmit"
  })
  const navigate = useNavigate()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()

  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(["Validating", "Submitting", "Finalizing"])
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleContinue = async () => {
    try {
      if(! await trigger()) return
      // MAKE REQUEST
      openLoading()
      startLoadingText()
      const result = await executeForgotPassword(getValues("email"))
      if(result.status === "error") throw new Error(result.message)

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message
      })
      navigate(ROUTES.CHANGE_PASSWORD_ROUTE(getValues("email")))
    }
    catch(error: any) {
      console.log("ERROR:", error.message)
      toast({
        status: "error",
        title: error.message
      })
    }
    finally {
      closeLoading()
      stopLoadingText()
    }
  }



  return (
    <AuthLayout smaller>
      <Stack mt={8} spacing={4} mb={16}>
        <VStack spacing={4}>
          <Image src={mailIcon} maxW={16} objectFit={"contain"} />
          <Heading mt={2} size={"md"}>Enter your email address</Heading>
          <Text textAlign={"center"} fontSize={"14px"} color={TEXT_GRAY}>A password reset OTP code will be sent to your email to continue the reset process</Text>
        </VStack>

        {/* EMAIL */}
        <FormControl isInvalid={Boolean(errors.email)} mt={2}>
          <InputGroup alignItems={"center"}>
            <InputLeftElement as={Center} h={"full"} w={12} color={"gray.400"} fontSize={"lg"}>
              <IoMailOutline />
            </InputLeftElement>

            <Input h={"40px"} {...register("email", { required: "Email is required" })} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} />
          </InputGroup>
          {Boolean(errors.email) && <FormErrorMessage fontSize={"xs"}>{errors.email?.message}</FormErrorMessage>}
        </FormControl>

        <CustomButton isLoading={isLoading} loadingText={loadingText} onClick={handleContinue} colorScheme="brand">Continue</CustomButton>
        <Link as={ReactLink} to={ROUTES.LOGIN_ROUTE} color={"brand.500"}>
          <HStack alignItems={"center"} spacing={1}>
            <Icon as={BiArrowBack} fontSize={"xl"} color={"brand.500"} />
            <Text fontWeight={"semibold"} color={"brand.500"} fontSize={"14px"}>Back to login</Text>
          </HStack>
        </Link>
      </Stack>
    </AuthLayout>
  )
}

export default ForgotPassword