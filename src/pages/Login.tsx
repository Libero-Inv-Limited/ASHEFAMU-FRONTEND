import React from "react"
import AuthLayout from "../components/layouts/AuthLayout"
import { HStack, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react"
import { Link as ReactLink, useNavigate } from "react-router-dom"
import AuthInput from "../components/common/AuthInput"
import { useForm } from "react-hook-form"
import { IoMailOutline } from "react-icons/io5"
import { MdOutlineLock } from "react-icons/md"
import CustomButton from "../components/common/CustomButton"
import { TEXT_DARK } from "../utils/color"
import ROUTES from "../utils/routeNames"

interface LoginProps { }
const Login: React.FC<LoginProps> = () => {
  const { control, trigger } = useForm({
    mode: "onTouched"
  })
  const navigate = useNavigate()


  const handleLogin = async () => {
    if(! await trigger()) return
    navigate(ROUTES.SUCCESS_ROUTE("login"))
  }

  return (
    <AuthLayout>
      <Heading fontSize={"1.8rem"} textShadow={["none", "none", "0 5px rgba(0, 0, 0, .1)"]} color={"gray.700"} fontWeight={"semibold"} fontFamily={"rubik"}>Sign in</Heading>
      <Stack mt={8} spacing={4} mb={16}>
        {/* FIRSTNAME */}

        {/* EMAIL */}
        <AuthInput
          control={control}
          name="email"
          type="email"
          Icon={IoMailOutline}
          label="Email"
          rules={{
            required: "Email is required"
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
            required: "Password is required"
          }}
        />

        <CustomButton mt={6} colorScheme="brand" onClick={handleLogin}>Sign in</CustomButton>
        <HStack alignItems={"center"} mt={2} spacing={1}>
          <HStack alignItems={"center"} spacing={1}>
            <Text fontSize={"sm"} color={TEXT_DARK}>Don't have an account?</Text>
            <Link fontSize={"sm"} as={ReactLink} to={ROUTES.REGISTER_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Create one</Link>
          </HStack>
          <Spacer />
          <Link fontSize={"sm"} as={ReactLink} to={ROUTES.FORGOT_PASSWORD_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Forgot Password?</Link>
        </HStack>
      </Stack>
    </AuthLayout>
  )
}

export default Login