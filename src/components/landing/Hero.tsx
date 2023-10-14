import { Box, Container, Grid, GridItem, Heading, Icon, IconProps, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { TEXT_DARK_GRAY } from "../../utils/color"
import hero from "../../assets/hero.png"
import CustomButton from "../common/CustomButton"
import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../utils/routeNames"



interface HeroProps { }
const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate()
  return (
    <Box as={"section"} py={[20, 24, 28, 32]}>
      <Grid as={Container} maxW={"container.xl"} gridTemplateColumns={"repeat(12, 1fr)"}>
        <GridItem colSpan={[12, 12, 6, 4]} pos={"relative"}>
          <Blob fontSize={400} top={['80%', '70%', 0]} pos={"absolute"} />
          <Stack ml={[0, 0, 0, 12]} spacing={6}>
            <Heading fontFamily={"rubik"} fontSize={["2rem", "2.5rem"]} fontWeight={"700"}>Register all <Text as={"span"} color={"brand.500"}>Health Facilities</Text> in Anambra State</Heading>
            <Text fontSize={["md", "lg"]} color={TEXT_DARK_GRAY}>Welcome to the Anambra State Health Facilities Accreditation and Management Unit (ASHEFAMU) Digital Platform, your gateway to a healthier Anambra State!</Text>
            <CustomButton onClick={() => navigate(ROUTES.REGISTER_ROUTE)} h={["45px", 50]} size={"md"} w={"fit-content"} px={10} fontWeight={"600"} rightIcon={<Icon fontSize={"lg"} as={FiChevronRight} />}>Get started</CustomButton>
          </Stack>
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 8]} pos={'relative'}>
          <Image maxW={['120%', '120%', 900]} pos={['static', 'relative', 'absolute']} src={hero} left={[0, 0, -20, -12]} />
        </GridItem>
      </Grid>
    </Box>
  )
}


interface BlobProp extends IconProps {}
const Blob:React.FC<BlobProp> = (prop) => (
  <Icon w={"500"} objectFit={"contain"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 622 893" fill="none" {...prop}>
    <g filter="url(#filter0_f_500_18274)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M98.633 350.804C144.655 345.754 182.755 383.644 214.485 417.36C245.023 449.81 277.743 489.279 270.292 533.211C263.252 574.716 211.203 586.256 180.885 615.464C151.703 643.578 139.083 696.165 98.633 698.588C57.8861 701.029 32.3917 657 5.89785 625.946C-17.6242 598.376 -42.4188 569.453 -42.4589 533.211C-42.4991 496.94 -16.4998 468.961 5.69227 440.271C33.0429 404.911 54.1967 355.68 98.633 350.804Z" fill="#29B748" fill-opacity="0.2" />
    </g>
    <defs>
      <filter id="filter0_f_500_18274" x="-392.459" y="0.348633" width="1013.82" height="1048.34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="175" result="effect1_foregroundBlur_500_18274" />
      </filter>
    </defs>
  </Icon>
)

export default Hero