/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Icon, IconButton, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"
import { DARK, GRAY_BORDER } from "../../utils/color"
import { FiDownload } from "react-icons/fi"
import documentImage from "../../assets/doc.png"
import { GET_FACILITY_DOCS_ENDPOINT } from "../../apis"
import { useAppSelector } from "../../store/hook"
import { readFile } from "../../utils/helpers"


interface DocumentCardProps { 
  id: number;
  facility_id: number;
  name: string;
  type: string;
  status: string;
}


const DocumentCard: React.FC<DocumentCardProps> = ({ name }) => {
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)



  const handleDownload = async () => {
    try{
      openLoading()
      const request = await fetch(GET_FACILITY_DOCS_ENDPOINT(name), {
        headers: {
          "Authorization": "Bearer " + token!
        }
      })
      if(!request.ok || request.status !== 200) throw new Error("Failed to download file")

      // GET THE FILE
      const file = await request.blob()
      const data = await readFile(file)
      
      const a = document.createElement("a")
      a.href = data as string
      a.download = name
      a.click()
      a.remove()

      toast({
        status: "info",
        title: "File downloaded"
      })
    }
    catch(e: any){
      toast({
        status: "error",
        title: e.message
      })
    }
    finally{
      closeLoading()
    }
  } 
  return (
    <Stack w={"full"} bg={"white"} p={3} rounded={"md"} border={`1px solid ${GRAY_BORDER}`}>
      <Image px={3} bg={"gray.100"} src={documentImage} rounded={"md"} minH={185} alt="name" />
      <Text fontSize={"sm"} color={DARK}>{name}</Text>
      <HStack justifyContent={"flex-end"}>
        <IconButton 
          variant={"link"}
          size={"sm"}
          onClick={handleDownload}
          colorScheme="brand"
          isLoading={isLoading}
          aria-label="download"
          icon={<Icon fontSize={"xl"} as={FiDownload} />}
        />
      </HStack>
    </Stack>
  )
}

export default DocumentCard