import React from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { HStack, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { Link as ReactLink, useNavigate } from "react-router-dom"
import AuthInput from "../../components/common/AuthInput"
import { useForm } from "react-hook-form"
import { IoMailOutline } from "react-icons/io5"
import { MdOutlineLock } from "react-icons/md"
import CustomButton from "../../components/common/CustomButton"
import { TEXT_DARK } from "../../utils/color"
import ROUTES from "../../utils/routeNames"

interface LoginProps { }
const Login: React.FC<LoginProps> = () => {
  const { control, trigger } = useForm({
    mode: "onSubmit"
  })
  const navigate = useNavigate()


  const handleLogin = async () => {
    if(! await trigger()) return
    navigate(ROUTES.SUCCESS_ROUTE("login"))
  }

  return (
    <AuthLayout>
      <Heading fontSize={"1.8rem"} color={"gray.700"} fontWeight={"semibold"} fontFamily={"rubik"}>Sign in</Heading>
      <Stack mt={8} spacing={4} mb={16}>
        {/* FIRSTNAME */}

        {/* EMAIL */}
        <AuthInput
          control={control}
          name="username"
          type="text"
          Icon={IoMailOutline}
          label="Username / Email"
          rules={{
            required: "Username or email is required"
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

        <CustomButton colorScheme="brand"  onClick={handleLogin}>Sign in</CustomButton>
        <HStack alignItems={"center"} justifyContent={"space-between"} spacing={1} flexDir={['column', 'column', 'row']}>
          <HStack alignItems={"center"} spacing={1}>
            <Text fontSize={"sm"} color={TEXT_DARK}>Don't have an account?</Text>
            <Link fontSize={"sm"} as={ReactLink} to={ROUTES.REGISTER_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Create one</Link>
          </HStack>

          <Link fontSize={"sm"} as={ReactLink} to={ROUTES.FORGOT_PASSWORD_ROUTE} fontWeight={"semibold"} color={"brand.500"}>Forgot Password?</Link>
        </HStack>
      </Stack>
    </AuthLayout>
  )
}

export default Login