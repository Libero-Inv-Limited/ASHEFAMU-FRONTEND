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
import { UseFormWatch } from "react-hook-form/dist/types";

interface ResetPasswordModalProps {
  control: any;
  watch: UseFormWatch<UserPayload>;
  onClose: () => void;
  isOpen: boolean;
  handleResetPassword: () => void;
  openConfirmation: () => void;
  title: string;
}
const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  control,
  watch,
  title,
  openConfirmation,
}) => {
  const [isSmall] = useMediaQuery("(max-width: 640px)");
  const password = watch("password");
  const handleResetPassword = () => {
    onClose()
    openConfirmation()
  };

  return (
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
                  return value !== password ? "Wrong password" : undefined;
                },
              }}
            />
            <CustomButton onClick={handleResetPassword}>Reset</CustomButton>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
