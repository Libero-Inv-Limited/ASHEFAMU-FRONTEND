import { FormControl, FormLabel, HStack, Icon, Input, SimpleGrid, Stack } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK } from "../../utils/color"
import CustomButton from "./CustomButton";
import { BiTrash } from "react-icons/bi";

interface StaffComplimentProps extends StaffComplimentType {
  setStaffs: React.Dispatch<React.SetStateAction<StaffComplimentType[]>>;
  staffs: StaffComplimentType[];
  index: number;
}
const StaffCompliment: React.FC<StaffComplimentProps> = ({setStaffs, staffs, index, ...props}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    const prev = [...staffs]
    const prevData = {...prev[index]}
    prevData[(name as keyof StaffComplimentType)] = value
    prev[index] = prevData
    setStaffs(prev)
  }

  const handleDelete = () => {
    const prev = [...staffs]
    prev.splice(index, 1)
    setStaffs(prev)
  }
  return (
    <Stack spacing={3}>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        {Object.entries(props).map(([key, value]) => (
          <FormControl key={key}>
            <FormLabel color={TEXT_DARK} fontSize={"14px"} mb={1} fontWeight={"500"} textTransform={"capitalize"} fontFamily={"body"}>{key}</FormLabel>
            <Input onChange={handleChange} h={"45px"} color={TEXT_DARK} size="lg" name={key} fontSize={"md"} rounded={6} fontFamily={"body"} boxShadow="none !important" value={value as string} _focus={{ borderColor: "brand.500", boxShadow: "none" }} />
          </FormControl>
        ))}
      </SimpleGrid>
      <HStack justifyContent={"flex-end"}>
        <CustomButton onClick={handleDelete} bg={"red.50"} leftIcon={<Icon as={BiTrash} fontSize={"md"} />} variant={"ghost"} fontSize={"xs"} h={"34px"} width={"fit-content"} rounded={"full"} colorScheme="red">Delete</CustomButton>
      </HStack>
    </Stack>
  )
}

export default StaffCompliment