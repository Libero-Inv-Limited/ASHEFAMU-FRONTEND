/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, SimpleGrid, useMediaQuery } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import AuthInput from "../common/AuthInput";
import { generateYear } from "../../utils/helpers";

interface AddProfessionalModalProps {
  values?: ProffessionalStaffData | null,
  control: any;
  onClose: () => void;
  isOpen: boolean;
  modalFooterButton: ReactNode;
}
const AddProfessionalModal: React.FC<AddProfessionalModalProps> = ({ values, modalFooterButton, isOpen, onClose, control }) => {
 const [isSmall] = useMediaQuery("(max-width: 640px)")
  return (
    <Modal onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={isSmall ? "inside" : "outside"}
      size={"5xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalBody mt={4}>
          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            <AuthInput 
              name="fullname"
              control={control}
              value={values?.fullname}
              label="Full name"
              rules={{ required: "Fullname is required" }}
            />
            
            <AuthInput 
              label="Address"
              name="address"
              value={values?.address}
              control={control}
              rules={{ required: "Address is required" }}
            />

            <AuthInput 
              label="Complement"
              name="complement"
              value={values?.complement}
              control={control}
              rules={{ required: "Complement is required" }}
            />

            <AuthInput 
              label="Full-time/Part-time"
              name="employment_type"
              value={[
                { label: "Full time", value: "full-time" },
                { label: "Part time", value: "part-time" },
              ].find(item => item.value === values?.employment_type) as any}
              control={control}
              isSelect
              data={[
                { label: "Full time", value: "full-time" },
                { label: "Part time", value: "part-time" },
              ]}
              rules={{ required: "Employment type is required" }}
            />

            <AuthInput 
              label="Basic Qualification"
              name="basic_qualification"
              control={control}
              value={values?.basic_qualification}
              rules={{ required: "Basic Qualification is required" }}
            />

            <AuthInput 
              label="Institution Attended"
              name="institution_attended"
              value={values?.institution_attended}
              control={control}
              rules={{ required: "Institution Attended is required" }}
            />

            <AuthInput
              label="Year of Qualification"
              name="year_of_qualification"
              isSelect
              value={generateYear(1970).map(item => ({ label: String(item), value: String(item) })).find(item => item.value === values?.year_of_qualification) as any}
              data={generateYear(1970).map(item => ({ label: String(item), value: String(item) }))}
              control={control}
              rules={{ required: "Year of Qualification is required" }}
            />

            <AuthInput
              label="Registration Number"
              name="registration_number"
              value={values?.registration_number}
              control={control}
              rules={{ required: "Registration Number is required" }}
            />

            <AuthInput
              label="Post Qualification"
              name="post_graduate_qualification"
              value={values?.post_graduate_qualification}
              control={control}
              rules={{ required: "Post Qualification is required" }}
            />

            <AuthInput
              label="Post Institution Attended"
              name="post_institution_attended"
              value={values?.post_institution_attended}
              control={control}
              rules={{ required: "Post Institution Attended is required" }}
            />
            
            <AuthInput 
              label="Post Year of Qualification"
              name="post_year_of_qualification"
              control={control}
              value={generateYear(1970).map(item => ({ label: String(item), value: String(item) })).find(item => item.value === values?.post_year_of_qualification) as any}
              isSelect
              data={generateYear(1970).map(item => ({ label: String(item), value: String(item) }))}
              rules={{ required: "Post Year of Qualification is required" }}
            />

            <AuthInput
              label="Post Registration Number"
              name="post_registration_number"
              value={values?.post_registration_number}
              control={control}
              rules={{ required: "Post Registration Number is required" }}
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

export default AddProfessionalModal