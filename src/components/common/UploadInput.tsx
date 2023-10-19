/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useRef } from "react"
import { DARK, TEXT_DARK } from "../../utils/color"
import CustomButton from "./CustomButton";

interface UploadInputProps {
  register: (...args: any[]) => any;
  error?: string;
  name: string;
  label: string;
  setValue: (name: string, value: File) => void;
  setError: (name: string, value: any) => void;
  value?: File;
  accept?: string;
}

const UploadInput:React.FC<UploadInputProps> = ({ error, setError, accept, name, label, setValue, register, value }) => {
  const fileRef = useRef<HTMLInputElement>(null)
  return(
    <FormControl isInvalid={Boolean(error)}>
    <FormLabel noOfLines={1} color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} fontFamily={"body"}>{label}</FormLabel>
    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(!file) return setError(name, {
        message: "Please select a file",
        type: "required"
      })
      setValue(name, file)
    }} type="file" hidden ref={fileRef} accept={accept || ".pdf, .docx"} />
    <InputGroup alignItems={"center"}>
      <Input readOnly value={value?.name} color={DARK} h={"40px"} size="lg" fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" _focus={{ borderColor: "brand.500", boxShadow: "none" }} {...register(name, { required: "Please upload a document" })}/>
      <InputRightElement fontSize={"sm"} as={CustomButton} minW={"fit-content"} onClick={() => fileRef.current?.click()} colorScheme={"primary"}> Choose file </InputRightElement>
    </InputGroup>
    {Boolean(error) && <FormErrorMessage fontSize={"xs"}>{(error)}</FormErrorMessage>}
  </FormControl>
  )
}

export default UploadInput