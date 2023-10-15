import { HStack, Icon, IconButton, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { DARK, GRAY_BORDER } from "../../utils/color"
import { FiDownload } from "react-icons/fi"

interface DocumentCardProps { 
  name: string;
  src: string;
}
const DocumentCard: React.FC<DocumentCardProps> = ({ name, src }) => {
  return (
    <Stack w={"full"} bg={"white"} p={3} rounded={"md"} border={`1px solid ${GRAY_BORDER}`}>
      <Image px={3} bg={"gray.100"} src={src} rounded={"md"} minH={185} alt="name" />
      <Text fontSize={"sm"} color={DARK}>{name}</Text>
      <HStack justifyContent={"flex-end"}>
        <IconButton 
          variant={"link"}
          size={"sm"}
          colorScheme="brand"
          aria-label="download"
          icon={<Icon fontSize={"xl"} as={FiDownload} />}
        />
      </HStack>
    </Stack>
  )
}

export default DocumentCard