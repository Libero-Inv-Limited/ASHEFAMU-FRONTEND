import { Badge, Box, Link, Container, Heading, Icon, SimpleGrid, Stack, Text, VStack, Wrap, WrapItem, useMediaQuery, HStack } from "@chakra-ui/react"
import { serviceCards, services } from "../../utils/data"
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi"
import { DARK } from "../../utils/color"
import ServiceCard from "./ServiceCard"
import { Link as ReactLink } from "react-router-dom"

interface ServiceSectionProps { }
const ServiceSection: React.FC<ServiceSectionProps> = () => {
  const [isMobile] = useMediaQuery('(max-width: 640px)')

  const items = isMobile ? services.slice(0, 2) : services
  return (
    <Box as={"section"} py={12} bg={"#F1F7F0"} zIndex={2} pos={"relative"}>
      <Container maxW={"container.lg"}>
        <Stack shadow={"sm"} px={[10, 16, 20]} spacing={4} bg={"white"} py={6} rounded={"md"} mt={-28} position={"relative"}>
          <Heading textAlign={"center"} fontSize={"lg"} fontWeight={"600"}>What kind of health facility do you wish to register?</Heading>
          <Wrap>
            {items.map((service, index) => (
              <WrapItem as={"div"} key={service} data-aos-delay={index * 100} data-aos="zoom-in">
                <Badge px={4} py={2} textTransform={"none"} color={DARK} fontWeight={"500"} rounded={"full"} bg={"#E5F3E5"}>{service}</Badge>
              </WrapItem>
            ))}
            <WrapItem as={"div"} data-aos="zoom-in" data-aos-delay={items.length * 100}>
              <Badge variant={"outline"} px={4} py={2} textTransform={"none"} color={DARK} display={"flex"} alignItems={"center"} fontWeight={"500"} rounded={"full"}>
                <Text>Others</Text>
                <Icon fontSize={"lg"} as={FiArrowUpRight} />
              </Badge>
            </WrapItem>
          </Wrap>
        </Stack>

        <SimpleGrid gap={[4, 5, 6]} columns={[1, 2, 3]} mt={[12, 16, 20]}>
          {serviceCards.map((card, index) => (
            <div data-aos="fade-in" data-aos-delay={index * 100} key={index}>
              <ServiceCard key={`card-service-${index}`} {...card} />
            </div>
          ))}
        </SimpleGrid>

        <VStack mt={[12, 16, 20]}>
          <div data-aos="fade-up">
            <Link as={ReactLink} _hover={{ textDecor: "none" }} color={DARK} rounded={"full"} >
              <HStack alignItems={"center"} rounded={"full"} fontSize={"sm"} w={"fit-content"} p={0} px={3} border={"1px solid #C9CFD8"}>
                <Text>Download our Quick Guide to accreditation </Text>
                <Icon as={FiChevronRight} fontSize={"md"} />
              </HStack>
            </Link>
          </div>
        </VStack>
      </Container>
    </Box>
  )
}

export default ServiceSection