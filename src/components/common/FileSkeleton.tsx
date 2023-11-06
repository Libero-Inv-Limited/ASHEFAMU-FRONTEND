import { HStack, Skeleton, SkeletonText } from "@chakra-ui/react"
import React from "react"
import { LIGHT_BG } from "../../utils/color";

interface FileSkeletonProps { 
  isSingle?: boolean;
}
const FileSkeleton: React.FC<FileSkeletonProps> = ({ isSingle }) => {
  if (isSingle) return (
    <HStack p={4} flex={1} w={"full"} rounded={"md"} maxW={600} bg={LIGHT_BG}>
      <SkeletonText noOfLines={1} flex={1} />
    </HStack>
  )
  return (
    <HStack p={4} rounded={"md"} maxW={600} bg={LIGHT_BG}>
      <Skeleton w={6} h={6} />
      <SkeletonText noOfLines={2} flex={1} />
    </HStack>
  )
}

export default FileSkeleton