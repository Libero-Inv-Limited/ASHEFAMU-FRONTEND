/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface AddUserModalProps {
  values?: ProffessionalStaffData | null;
  onClose: () => void;
  isOpen: boolean;
  modalFooterButton?: ReactNode;
  children?: ReactNode;
  size?: string;
  title?: string;
}
const FormModal: React.FC<AddUserModalProps> = ({
  modalFooterButton,
  isOpen,
  onClose,
  children,
  size,
  title,
}) => {
  const [isSmall] = useMediaQuery("(max-width: 640px)");

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={isSmall ? "inside" : "outside"}
      size={size ?? "md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py={4}>
        {title && (
          <ModalHeader pb={0} fontSize={16} fontWeight={500}>
            {title.toUpperCase()}
          </ModalHeader>
        )}
        <ModalBody mt={4}>
          <SimpleGrid columns={[1]} gap={4}>
            {children}
          </SimpleGrid>
        </ModalBody>
        {modalFooterButton && <ModalFooter>{modalFooterButton}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
