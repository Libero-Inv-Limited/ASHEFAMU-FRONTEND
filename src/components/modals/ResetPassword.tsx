/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import AuthInput from "./../common/AuthInput";
import { MdOutlineLock } from "react-icons/md";
import CustomButton from "./../common/CustomButton";
import { Heading } from "@chakra-ui/react";
import { DARK } from "./../../utils/color";
import { useForm } from "react-hook-form";
import ActionModal from "./ActionModal";
import { useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hook";
import { executeUpdatePassword } from "./../../apis/user";
import { useToast } from "@chakra-ui/react";

interface ResetPasswordModalProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  user_id: number;
}
const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  title,
  user_id,
}) => {
  const [isSmall] = useMediaQuery("(max-width: 640px)");
  const { control, watch, trigger, getValues } = useForm<UpdatePassword>({
    mode: "onSubmit",
  });
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });
  const {
    isOpen: isActionOpen,
    onOpen: openAction,
    onClose: closeAction,
  } = useDisclosure();

  const {
    isOpen: isLoading,
    onOpen: openLoading,
    onClose: closeLoading,
  } = useDisclosure();

  const password = watch("password");

  const handleResetPassword = async () => {
    try {
      openLoading();
      const payload: UpdatePassword = {
        ...getValues(),
        user_id,
      };
      delete (payload as any)["confirm"];
      const response = await executeUpdatePassword(payload, token!);
      if (response.status === "error") throw new Error(response.message);

      toast({
        status: "success",
        title: response.message,
      });
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeLoading();
      closeAction();
    }
  };
  const handleConfirmation = async () => {
    if (!(await trigger())) return;
    onClose();
    openAction();
  };

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={isSmall ? "inside" : "outside"}
        size={"md"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent py={2}>
          <ModalBody mt={4}>
            <SimpleGrid columns={[1]} gap={4}>
              {" "}
              <Heading size={"md"} lineHeight={"7"} color={DARK}>
                {title}
              </Heading>
              <AuthInput
                control={control}
                name="password"
                type="password"
                Icon={MdOutlineLock}
                isPassword
                label="New Password"
                rules={{
                  required: "Password  is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters.",
                  },
                }}
              />
              <AuthInput
                control={control}
                name="confirm"
                type="password"
                Icon={MdOutlineLock}
                isPassword
                label="Confirm Password"
                rules={{
                  validate: (value: string) => {
                    return value !== password
                      ? "Password's do not match"
                      : undefined;
                  },
                }}
              />
              <CustomButton onClick={handleConfirmation}>Reset</CustomButton>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ActionModal
        onClose={closeAction}
        status="danger"
        actionBtnText="Yes"
        isLoading={isLoading}
        handleAction={handleResetPassword}
        isOpen={isActionOpen}
        title="Are you sure you want to reset this user’s password?"
      />
    </>
  );
};

export default ResetPasswordModal;
