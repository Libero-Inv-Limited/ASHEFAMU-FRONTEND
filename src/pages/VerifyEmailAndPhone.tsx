import React, { useState } from "react"
import AuthLayout from "../components/layouts/AuthLayout"
import { Heading, Stack, Text, VStack, Image } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import CustomButton from "../components/common/CustomButton"
import { TEXT_GRAY } from "../utils/color"
import mailIcon from "../assets/icons/mail.png"
import { hideString } from "../utils/helpers"
import AuthInput from "../components/common/AuthInput"
import TimerComponent from "../components/common/TimerComponent"
import { useNavigate } from "react-router-dom"
import ROUTES from "../utils/routeNames"

interface VerifyEmailAndPhoneProps { }
const VerifyEmailAndPhone: React.FC<VerifyEmailAndPhoneProps> = () => {
  const [state,] = useState(() => {
    const { phone, email } = JSON.parse(sessionStorage.getItem("REG_USER")!)
    return { phone, email }
  })
  const { control, trigger } = useForm<{ emailOTP: string; phoneOTP: string; }>({
    mode: "onSubmit"
  })
  const navigate = useNavigate()

  const handleVerify = async () => {
    if(!await trigger()) return
    sessionStorage.removeItem("REG_USER")
    navigate(ROUTES.SUCCESS_ROUTE("register"))
  }
  return (
    <AuthLayout smaller>
      <Stack mt={8} spacing={4} mb={16}>
        <VStack spacing={4}>
          <Image src={mailIcon} maxW={16} objectFit={"contain"} />
          <Heading mt={2} size={"md"}>OTP sent to you</Heading>
          <Text textAlign={"center"} fontSize={"sm"} color={TEXT_GRAY}>An OTP was sent to {hideString(state.email)} and {hideString(state.phone)}. Enter the code into the field below</Text>
        </VStack>

        {/* Phone */}
        <Stack>
          <AuthInput
            control={control}
            label="Phone OTP"
            name="mobileotp"
            rules={{
              required: "Phone OTP is required",
            }}
          />
          <TimerComponent
            time={30}
            onClick={() => { }}
          />
        </Stack>

        {/* Email */}
        <Stack>
          <AuthInput
            control={control}
            label="Email OTP"
            name="emailotp"
            rules={{
              required: "Email OTP is required",
            }}
          />
          <TimerComponent
            time={30}
            onClick={() => { }}
          />
        </Stack>

        <CustomButton onClick={handleVerify} colorScheme="brand">Verify Contact</CustomButton>
      </Stack>
    </AuthLayout>
  )
}

export default VerifyEmailAndPhone