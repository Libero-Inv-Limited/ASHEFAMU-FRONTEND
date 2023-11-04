/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { HStack, Heading, Link, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { Link as ReactLink, useNavigate } from "react-router-dom"
import AuthInput from "../../components/common/AuthInput"
import { useForm } from "react-hook-form"
import { IoMailOutline } from "react-icons/io5"
import { MdOutlinePhoneEnabled, MdOutlineLock } from "react-icons/md"
import CustomButton from "../../components/common/CustomButton"
import { TEXT_DARK } from "../../utils/color"
import ROUTES from "../../utils/routeNames"
import { executeRegistration } from "../../apis/auth"
import useWaitingText from "../../hooks/useWaitingText"
import { useAppContext } from "../../contexts/AppContext"
import { UserIcon } from "../../components/icons"

interface RegistrationProps { }
const Registration: React.FC<RegistrationProps> = () => {
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const { checkIncompleteReg } = useAppContext()
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(["Validating", "Submitting", "Finalizing"])
  const { control, watch, trigger, getValues } = useForm<RegisterData>({
    mode: "onSubmit"
  })
  const navigate = useNavigate()
  const password = watch("password")
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleRegister = async () => {
    try {
      if (! await trigger()) return
      // MAKE REQUEST
      openLoading()
      startLoadingText()
      const payload: RegisterData = {
        ...getValues()
      }
      delete (payload as any)['confirm']

      const result = await executeRegistration(payload)
      if (result.status === "error") throw new Error(result.message)

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message
      })

      sessionStorage.setItem("REG_USER", JSON.stringify({
        email: getValues("email"),
        phone: getValues("mobile")
      }))
      navigate(ROUTES.VERIFY_CONTACT_ROUTE(getValues("email")))
    }
    catch (error: any) {
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

  useEffect(() => {
    checkIncompleteReg()
  }, [])

  return (
    <AuthLayout>
      <Heading fontSize={"1.8rem"} color={"gray.700"} fontWeight={"semibold"} fontFamily={"rubik"}>Create an account</Heading>
      <Stack mt={8} spacing={4} mb={16}>
        {/* FIRSTNAME */}
        <AuthInput
          control={control}
          name="firstname"
          isIconComponent
          Icon={<UserIcon w={"26px"} h={"26px"} fill={"#A3AEBD"} />}
          label="First Name"
          rules={{
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name should be at least 3 characters "
            }
          }}
        />

        {/* LASTNAME */}
        <AuthInput
          control={control}
          name="lastname"
          isIconComponent
          Icon={<UserIcon w={"26px"} h={"26px"} fill={"#A3AEBD"} />}
          label="Last Name"
          rules={{
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name should be at least 3 characters "
            }
          }}
        />

        {/* USERNAME */}
        <AuthInput
          control={control}
          name="username"
          isIconComponent
          Icon={<UserIcon w={"26px"} h={"26px"} fill={"#A3AEBD"} />}
          label="Username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters "
            }
          }}
        />

        {/* EMAIL */}
        <AuthInput
          control={control}
          name="email"
          type="email"
          Icon={IoMailOutline}
          label="Email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address"
            }
          }}
        />

        {/* PHONE */}
        <AuthInput
          control={control}
          name="mobile"
          type="tel"
          Icon={MdOutlinePhoneEnabled}
          label="Phone no"
          rules={{
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "Please enter a valid phone number"
            },
            maxLength: {
              value: 15,
              message: "Please enter a valid phone number"
            },
          }}
        />

        {/* PASSWORD */}
        <AuthInput
          control={control}
          name="password"
          type="password"
          Icon={MdOutlineLock}
          isPassword
          label="Password"
          rules={{
            required: "Password  is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters."
            }
          }}
        />

        {/* C PASWORD */}
        <AuthInput
          control={control}
          name="confirm"
          type="password"
          Icon={MdOutlineLock}
          isPassword
          label="Confirm Password"
          rules={{
            validate: (value: string) => {
              return value !== password ? "Wrong password" : undefined
            }
          }}
        />
        <CustomButton isLoading={isLoading} loadingText={loadingText} colorScheme="brand" onClick={handleRegister}>Create account</CustomButton>
        <HStack alignItems={"center"} spacing={1}>
          <Text fontSize={"sm"} color={TEXT_DARK}>Already have an account?</Text>
          <Link fontSize={"sm"} as={ReactLink} to={ROUTES.LOGIN_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Sign in</Link>
        </HStack>
      </Stack>
    </AuthLayout>
  )
}

export default Registration