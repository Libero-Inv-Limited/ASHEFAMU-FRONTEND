/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/common/CustomButton";
import { TEXT_GRAY } from "../../utils/color";
import mailIcon from "../../assets/icons/mail.png";
import { hideString } from "../../utils/helpers";
import AuthInput from "../../components/common/AuthInput";
import TimerComponent from "../../components/common/TimerComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../utils/routeNames";
import useWaitingText from "../../hooks/useWaitingText";
import { executeResendOTP, executeVerifyContact } from "../../apis/auth";

interface VerifyEmailProps {}
const VerifyEmailAndPhone: React.FC<VerifyEmailProps> = () => {
  const [state] = useState(() => {
    const { phone, email } = JSON.parse(localStorage.getItem("REG_USER")!);
    return { phone, email };
  });
  const { control, trigger, getValues } = useForm<VerifyEmailData>({
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();
  const {
    isOpen: isResending,
    onOpen: openResending,
    onClose: closeResending,
  } = useDisclosure();
  const { loadingText, startLoadingText, stopLoadingText } = useWaitingText([
    "Validating",
    "Submitting",
    "Comparing",
  ]);
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleVerify = async () => {
    try {
      if (!(await trigger())) return;
      // MAKE REQUEST
      openLoading();
      startLoadingText();

      // GET USER FROM SESSION
      const payload: VerifyEmailData = {
        ...getValues(),
        email: state.email,
      };

      const result = await executeVerifyContact(payload);
      if (result.status === "error") throw new Error(result.message);

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message,
      });

      localStorage.removeItem("REG_USER");
      navigate(ROUTES.SUCCESS_ROUTE("register"));
    } catch (error: any) {
      console.log("ERROR:", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeLoading();
      stopLoadingText();
    }
  };

  const handleResend = async (start: any) => {
    try {
      openResending();

      const result = await executeResendOTP(state.email);
      if (result.status === "error") throw new Error(result.message);

      // SHOW SUCCESS TOAST
      toast({
        status: "success",
        title: result.message,
      });
      start();
    } catch (error: any) {
      console.log("ERROR:", error.message);
      toast({
        status: "error",
        title: "Failed to send OTP, Try again later",
      });
    } finally {
      closeResending();
    }
  };

  return (
    <AuthLayout smaller>
      <Stack mt={8} spacing={4} mb={16}>
        <VStack spacing={4}>
          <Image src={mailIcon} maxW={16} objectFit={"contain"} />
          <Heading mt={2} size={"md"}>
            OTP sent to you
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"} color={TEXT_GRAY}>
            An OTP was sent to {hideString(state.email)}. Enter the code into
            the field below
          </Text>
        </VStack>

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
            time={3}
            isMinute
            isLoading={isResending}
            onClick={handleResend}
          />
        </Stack>

        <CustomButton
          isLoading={isLoading}
          loadingText={loadingText}
          onClick={handleVerify}
          colorScheme="brand"
        >
          Verify Contact
        </CustomButton>
      </Stack>
    </AuthLayout>
  );
};

export default VerifyEmailAndPhone;
