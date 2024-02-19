import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Heading,
  Text,
  Stack,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { executeVerifyFacilityQR } from "../../apis/facilityData";
import { DARK, TEXT_DARK_GRAY } from "./../../utils/color";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState<FacilityQRData>();

  const handleVerifyQR = async () => {
    const response = await executeVerifyFacilityQR(id);
    setFacility(response.data);
  };

  useEffect(() => {
    handleVerifyQR();
    //eslint-disable-next-line
  }, [id]);

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4} display={"flex"} justifyContent={"center"}>
      <Stack
        spacing={6}
        p={6}
        bg={"white"}
        rounded={"md"}
        w={"full"}
        maxW={600}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
      >
        <Stack spacing={1}>
          <Heading fontFamily={"rubik"} fontSize={"1.2rem"} color={DARK}>
            {facility?.name}
          </Heading>
          <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>
            {facility?.address}.
          </Text>
        </Stack>

        <Stack>
          <HStack>
            <Icon
              color={TEXT_DARK_GRAY}
              fontSize={"xl"}
              as={MdOutlinePhoneEnabled}
            />
            <Link
              href={`tel:${facility?.facility_phone}`}
              fontSize={"sm"}
              color={TEXT_DARK_GRAY}
            >
              {facility?.facility_phone}
            </Link>
          </HStack>
        </Stack>

        {facility?.status && facility.status.approval_date && (
          <>
            <Stack
              border={`2px solid #00BF55`}
              rounded={"md"}
              p={4}
              maxW={"450px"}
              pos={"relative"}
            >
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"700"} color={"brand.500"} fontSize={"sm"}>
                  Accredited
                </Text>
                <Icon
                  color={"#00BF55"}
                  fontSize={"xl"}
                  as={BsCheck2All}
                  pos={"absolute"}
                  top={2}
                  right={2}
                />
              </HStack>
            </Stack>
          </>
        )}
        <Divider mt={6} mb={6} />
        <Heading fontFamily={"rubik"} fontSize={"1.2rem"} color={DARK}>
          Facility Details
        </Heading>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Name: {facility.name}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          CAC Number: {facility.cac_number}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Phone: {facility.facility_phone}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Address: {facility.address}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Landmark: {facility.closest_landmark}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Local Government Area: {facility.local_gov_area}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Building Type: {facility.building_type}
        </Text>
        <Divider mt={6} mb={6} />
        <Heading fontFamily={"rubik"} fontSize={"1.2rem"} color={DARK}>
          Operation Details
        </Heading>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Opening Time: {facility.operationDetails.opening_time}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Closing Time: {facility.operationDetails.closing_time}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Provides Ambulance Services:{" "}
          {facility.operationDetails.provides_ambulance_services ? "Yes" : "No"}
        </Text>
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY} mb={2}>
          Provides Emergency Services:{" "}
          {facility.operationDetails.provides_emergency_services ? "Yes" : "No"}
        </Text>
      </Stack>
    </Box>
  );
};

export default FacilityDetailsPage;
