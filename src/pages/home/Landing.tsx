import { Box } from "@chakra-ui/react"
import Header from "../../components/landing/Header"
import Hero from "../../components/landing/Hero"
import ServiceSection from "../../components/landing/ServiceSection"
import RegisterSection from "../../components/landing/RegisterSection"
import SpeedSection from "../../components/landing/SpeedSection"
import ContactSection from "../../components/landing/ContactSection"
import Footer from "../../components/landing/Footer"
import { useEffect } from "react"
import Aos from "aos"
import 'aos/dist/aos.css';

interface LandingProps { }
const Landing: React.FC<LandingProps> = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    })
  }, [])

  return (
    <Box sx={{ overflowY: "hidden" }}>
      <Header />
      <Hero />
      <ServiceSection />
      <RegisterSection />
      <SpeedSection />
      <ContactSection />
      <Footer />
    </Box>
  )
}

export default Landing