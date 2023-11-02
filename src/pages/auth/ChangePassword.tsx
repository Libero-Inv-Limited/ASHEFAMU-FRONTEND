/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Stack, Text, VStack, Image, Center, Container, HStack, useDisclosure, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import CustomButton from "../../components/common/CustomButton"
import { TEXT_GRAY } from "../../utils/color"
import lockIcon from "../../assets/icons/lock.png"
import Header from "../../components/common/Header"
import PasswordInput from "../../components/common/PasswordInput"
import { useNavigate, useParams } from "react-router-dom"
import useWaitingText from "../../hooks/useWaitingText"
import TimerComponent from "../../components/common/TimerComponent"
import { executeChangePassword, executeResendOTP } from "../../apis/auth"
import ROUTES from "../../utils/routeNames"

type ChangeData = {
  password: string,
  confirmPassword: string,
  token: string
}


interface ChangePasswordProps { }
const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const { control, watch, trigger, getValues } = useForm<ChangeData>({
    mode: "onSubmit",
  })
  const param = useParams()

  const password = watch("password")
  const { isOpen: isResending, onOpen: openResending, onClose: closeResending } = useDisclosure()
  const navigate = useNavigate()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText(["Validating", "Submitting", "Updating credentials", "Finalizing"], 2000)
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })


  const handleResetPassword = async () => {
    try {
      if(! await trigger()) return
      // MAKE REQUEST
      openLoading()
      startLoadingText()

      const payload: ChangePasswordData = {
        email: param.email!,
        password: getValues("password"),
        token: getValues("token"),
      } 
      const result = await executeChangePassword(payload)
      if(result.status === "error") throw new Error(result.message)

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message
      })
      navigate(ROUTES.LOGIN_ROUTE, { replace: true })
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


  const handleResend = async (start: any) => {
    try {
      openResending()

      const result = await executeResendOTP(param.email!)
      if (result.status === "error") throw new Error(result.message)

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message
      })
      start()
    }
    catch (error: any) {
      console.log("ERROR:", error.message)
      toast({
        status: "error",
        title: "Failed to send OTP, Try again later"
      })
    }
    finally {
      closeResending()
    }
  }



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
                <TimerComponent
                  time={3}
                  isMinute
                  isLoading={isResending}
                  onClick={handleResend}
                />
              </HStack>
            </Stack>

            <CustomButton 
              onClick={handleResetPassword} 
              isLoading={isLoading} mt={2} 
              loadingText={loadingText}
              colorScheme="brand">Reset password</CustomButton>
          </Stack>
        </Container>
      </Center>
    </Stack>
  )
}

export default ChangePassword