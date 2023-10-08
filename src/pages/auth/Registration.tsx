import React from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { HStack, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { Link as ReactLink, useNavigate } from "react-router-dom"
import AuthInput from "../../components/common/AuthInput"
import { useForm } from "react-hook-form"
import {IoPersonOutline, IoMailOutline} from "react-icons/io5"
import {MdOutlinePhoneEnabled, MdOutlineLock} from "react-icons/md"
import CustomButton from "../../components/common/CustomButton"
import { TEXT_DARK } from "../../utils/color"
import ROUTES from "../../utils/routeNames"

interface RegistrationProps { }
const Registration: React.FC<RegistrationProps> = () => {
  const { control, watch, trigger, getValues } = useForm({
    mode: "onSubmit"
  })
  const navigate = useNavigate()
  const password = watch("password")


  const handleRegister = async () => {
    if(! await trigger()) return
    sessionStorage.setItem("REG_USER", JSON.stringify({ 
      email: getValues("email"), 
      phone: getValues("mobile") 
    }))
    navigate(ROUTES.VERIFY_CONTACT_ROUTE(getValues("email")))
  }

  return (
    <AuthLayout>
      <Heading fontSize={"1.8rem"} color={"gray.700"} fontWeight={"semibold"} fontFamily={"rubik"}>Create an account</Heading>
      <Stack mt={8} spacing={4} mb={16}>
        {/* FIRSTNAME */}
        <AuthInput 
          control={control}
          name="firstname"
          Icon={IoPersonOutline}
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
          Icon={IoPersonOutline}
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
          Icon={IoPersonOutline}
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
        <CustomButton colorScheme="brand" onClick={handleRegister}>Create account</CustomButton>
        <HStack alignItems={"center"} spacing={1}>
          <Text fontSize={"sm"} color={TEXT_DARK}>Already have an account?</Text>
          <Link fontSize={"sm"} as={ReactLink} to={ROUTES.LOGIN_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Sign in</Link>
        </HStack>
      </Stack>
    </AuthLayout>
  )
}

export default Registration