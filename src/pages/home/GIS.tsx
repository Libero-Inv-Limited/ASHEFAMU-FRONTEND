import { Box } from "@chakra-ui/react";
import Header from "../../components/landing/Header";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import GIS from "../../components/landing/GIS";

interface LandingProps {}
const Landing: React.FC<LandingProps> = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Header />
      <GIS />
    </Box>
  );
};

export default Landing;
