/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Flex,
  SkeletonText,
  Heading,
  Icon,
  Stack,
  Text,
  HStack,
  Image,
  Link,
  Center,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useJsApiLoader,
} from "@react-google-maps/api";
import Autocomplete from "./AutoComplete";
import { DARK, RED } from "../../utils/color";
import { BookIcon } from "../../components/icons";
import DrawerComponent from "./../common/Drawer";
import CustomButton from "./../common/CustomButton";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { TEXT_DARK_GRAY } from "./../../utils/color";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";
import FilterForm from "../../pages/home/GISFilterForm";
import { useForm } from "react-hook-form";
import useFetchHook from "./hooks/useFetchHook";
import { calculateBoundingBox } from "../../utils/helpers";
import Map from "./Map";

const center = { lat: 6.104541, lng: 7.00192 };
const distance = 1200000000;

const GIS = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB2a8zhc_1LmMerhLFdDO8FpWyJE_W75Xc",
  });

  const [initialState, setInitialState] = React.useState<
    GISPayload | BoundingBox
  >(calculateBoundingBox(center.lat, center.lng, distance));

  const [selectedFacility, setSelectedFacility] =
    React.useState<FacilityData | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useFetchHook(initialState);

  const { control, trigger, getValues, reset } = useForm<GISFilters>({
    mode: "onSubmit",
  });

  const { onClose: closeLoading, onOpen: openLoading } = useDisclosure();

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker);
  // };

  const handleFilters = async () => {
    if (!(await trigger())) return;
    try {
      openLoading();
      const payload: GISFilters = {
        ...getValues(),
      };
      const filters = { [payload.options.type]: payload.options.value };
      const { startLatitude, stopLatitude, startLongitude, stopLongitude } =
        calculateBoundingBox(center.lat, center.lng, distance);

      setInitialState({
        ...filters,
        startLatitude,
        stopLatitude,
        startLongitude,
        stopLongitude,
      });
      reset();
      onClose();
    } catch (error: any) {
      console.log("ERROR: ", error.message);
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      closeLoading();
    }
  };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const markers = data?.map((marker: FacilityData, id: number) => {
    const coordinates = JSON.parse(marker.gps_cordinates);
    return {
      position: { lat: +coordinates.latitude, lng: +coordinates.longitude },
      name: marker,
      id,
    };
  });

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="80vh"
      w="100vw"
      mt={10}
    >
      <div data-aos="fade-in" style={{ textAlign: "center" }}>
        <Icon as={BookIcon} />
        <Heading
          color={DARK}
          fontWeight={"900"}
          size={"md"}
          textTransform="uppercase"
        >
          Facilities in anambra state
        </Heading>
      </div>
      <Box position="absolute" h="100%" w="100%" left={0} top={20} px={8}>
        <HStack justifyContent="space-between" zIndex={2}>
          <Autocomplete
            setSelectedFacility={setSelectedFacility}
            selectedFacility={selectedFacility}
          />
          <CustomButton onClick={onOpen}>Filter</CustomButton>
        </HStack>
        {/* {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={10}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "90vh" }}
          >
            {markers?.map(({ id, name, position }) => (
              <MarkerF
                key={id}
                position={position}
                onMouseOver={() => handleActiveMarker(id)}
                // onMouseOut={() => setActiveMarker(null)}
              >
                {activeMarker === id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <CustomTooltip
                      data={name}
                      setSelectedFacility={setSelectedFacility}
                    />
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : null} */}
        {markers && (
          <Map markers={markers} setSelectedFacility={setSelectedFacility} />
        )}

        <DrawerComponent
          size="xs"
          isOpen={Boolean(selectedFacility)}
          onClose={() => setSelectedFacility(null)}
        >
          <DrawerBox data={selectedFacility} />
        </DrawerComponent>
        <DrawerComponent
          isOpen={isOpen}
          onClose={onClose}
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiFilter size={24} />
              <span style={{ marginLeft: "8px" }}>Filter</span>
            </div>
          }
        >
          <FilterForm control={control} handleFilters={handleFilters} />
        </DrawerComponent>
      </Box>
    </Flex>
  );
};

const DrawerBox = ({ data }) => {
  return (
    <Stack alignItems={"stretch"} gap={4} mt="118px">
      <Heading
        color={DARK}
        fontWeight={"600"}
        size={"20px"}
        textTransform="capitalize"
      >
        {data.name}
      </Heading>
      <CustomButton
        bg={"#E2E6EB"}
        fontSize="14px"
        color={"#76859A"}
        borderRadius="50px"
        width="75px"
      >
        Public
      </CustomButton>
      <HStack>
        <Icon color={TEXT_DARK_GRAY} fontSize={"xl"} as={FaMapMarkerAlt} />
        <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>
          {data?.address}.
        </Text>
      </HStack>
      <HStack>
        <Icon
          color={TEXT_DARK_GRAY}
          fontSize={"xl"}
          as={MdOutlinePhoneEnabled}
        />
        <Link
          href={`tel:${data?.facility_phone}`}
          fontSize={"sm"}
          color={TEXT_DARK_GRAY}
        >
          {data?.facility_phone}
        </Link>
      </HStack>
      <Stack
        border={`2px solid`}
        borderColor={data?.status?.status === "approved" ? "brand.500" : RED}
        rounded={"md"}
        p={4}
        maxW={"200px"}
        pos={"relative"}
      >
        <Center>
          <Text
            fontWeight={"700"}
            color={data?.status?.status === "approved" ? "brand.500" : RED}
            fontSize={"sm"}
          >
            {data?.status?.status === "approved"
              ? "Accredited"
              : "UnAccredited"}
          </Text>
        </Center>
      </Stack>
      <Image src={data?.qr_code} alt={"Qrcode"} maxW={"160px"} />
    </Stack>
  );
};

export default GIS;
