/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, SimpleGrid, useMediaQuery } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import AuthInput from "../common/AuthInput";

interface AddNonProfessionalModalProps {
  values?: NonProfessionalStaffData | null;
  control: any;
  onClose: () => void;
  isOpen: boolean;
  modalFooterButton: ReactNode;
}
const AddNonProfessionalModal: React.FC<AddNonProfessionalModalProps> = ({values,  modalFooterButton, isOpen, onClose, control }) => {
 const [isSmall] = useMediaQuery("(max-width: 640px)")
  return (
    <Modal onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={isSmall ? "inside" : "outside"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalBody mt={4}>
          <SimpleGrid columns={[1]} gap={4}>
            <AuthInput 
              name="name"
              control={control}
              label="Full name"
              value={values?.name}
              rules={{ required: "Fullname is required" }}
            />

            <AuthInput 
              label="Complement"
              name="complement"
              value={values?.complement}
              control={control}
              rules={{ required: "Complement is required" }}
            />

            <AuthInput 
              label="Type of staff"
              name="staff_type"
              control={control}
              value={values?.staff_type}
              placeholder="Security staff...etc"
              rules={{ required: "Type of staff is required" }}
            />
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
        {modalFooterButton}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddNonProfessionalModal