import React, { useEffect } from "react"
import { Heading, Stack, Text, VStack, Image, Center, Container, HStack, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import CustomButton from "../components/common/CustomButton"
import { TEXT_GRAY } from "../utils/color"
import lockIcon from "../assets/icons/lock.png"
import Header from "../components/common/Header"
import PasswordInput from "../components/common/PasswordInput"
import useTimer from "../hooks/useTimer"

type ChangePasswordData = {
  password: string,
  confirmPassword: string,
  token: string
}


interface ChangePasswordProps { }
const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const { currentTime, start, isDone } = useTimer(5)
  useEffect(() => {
    start()
  }, [])
  const { control, watch } = useForm<ChangePasswordData>({
    mode: "onTouched",
  })
  const password = watch("password")

  return (
    <Stack h={"100vh"}>
      <Header />
      <Center flex={1} >
        <Container maxW={"sm"}>
          <Stack spacing={4}>
            <VStack spacing={4}>
              <Image src={lockIcon} maxW={16} objectFit={"contain"} />
              <Heading mt={2} size={"md"}>Generate new password</Heading>
              <Text textAlign={"center"} fontSize={"sm"} color={TEXT_GRAY}>Get the OTP sent to your email and enter your new password details</Text>
            </VStack>

            <Stack>
              {/* PASSWORD */}
              <PasswordInput 
                name="password"
                placeholder="New password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
              />

              {/* CONFIRM PASSWORD */}
              <PasswordInput 
                name="confirmPassword"
                control={control}
                placeholder="Confirm password"
                rules={{
                  required: "Password is required",
                  validate: (value: string) => {
                    return value !== password ? "Passwords do not match" : null
                  }
                }}
              />

              {/* Token */}
              <PasswordInput 
                name="token"
                control={control}
                placeholder="Token"
                rules={{
                  required: "Token is required"
                }}
              />

              <HStack mt={2} alignItems={"center"}>
                <Button size={"sm"} colorScheme="blue" isDisabled={!isDone} variant={"link"}>Resend code</Button>
                <Text color={TEXT_GRAY} fontSize={"sm"}>in {`${(currentTime.minutes).toString().padStart(2, "0")}:${currentTime.seconds.toString().padStart(2, "0")}`}</Text>
              </HStack>
            </Stack>

            <CustomButton mt={2} colorScheme="brand">Reset password</CustomButton>
          </Stack>
        </Container>
      </Center>
    </Stack>
  )
}

export default ChangePassword