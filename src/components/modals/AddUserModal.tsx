/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import AuthInput from "../common/AuthInput";
import { generateYear } from "../../utils/helpers";
import { MdOutlineLock } from "react-icons/md";
import CustomSelect from "./../common/CustomSelect";

interface AddUserModalProps {
  values?: ProffessionalStaffData | null;
  control: any;
  watch: () => void;
  onClose: () => void;
  isOpen: boolean;
  modalFooterButton: ReactNode;
  roles: any;
}
const AddUserModal: React.FC<AddUserModalProps> = ({
  modalFooterButton,
  isOpen,
  onClose,
  control,
  watch,
  roles,
}) => {
  const [isSmall] = useMediaQuery("(max-width: 640px)");
  const password = watch("password");

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={isSmall ? "inside" : "outside"}
      size={"2xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalBody mt={4}>
          <SimpleGrid columns={[1]} gap={4}>
            <AuthInput
              name="firstname"
              control={control}
              label="First Name"
              rules={{ required: "First Name is required" }}
            />

            <AuthInput
              name="lastname"
              control={control}
              label="Last Name"
              rules={{ required: "Last Name is required" }}
            />

            <AuthInput
              name="email"
              control={control}
              label="Email"
              rules={{ required: "Email is required" }}
            />

            <AuthInput
              name="username"
              control={control}
              label="Username"
              rules={{ required: "Username is required" }}
            />
            <AuthInput
              name="mobile"
              control={control}
              label="Mobile"
              rules={{ required: "Username is required" }}
            />
            <AuthInput
              label="User role"
              name="role"
              control={control}
              isSelect
              data={roles}
              rules={{ required: "role is required" }}
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
                  message: "Password should be at least 8 characters.",
                },
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
                  return value !== password ? "Wrong password" : undefined;
                },
              }}
            />
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>{modalFooterButton}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
