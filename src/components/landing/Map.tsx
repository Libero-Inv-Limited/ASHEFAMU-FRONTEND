import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Heading, Stack, HStack, Icon, Text } from "@chakra-ui/react";
import CustomButton from "./../common/CustomButton";
import { FaPhoneAlt } from "react-icons/fa";
import { formatTimeRange } from "../../utils/helpers";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { BuildingIcon } from "../../components/icons";
import { TEXT_DARK_GRAY, DARK } from "./../../utils/color";

interface MarkerProps {
  markers: MarkerDataType[];
  setSelectedFacility: React.Dispatch<React.SetStateAction<FacilityData>>
}

const Map: React.FC<MarkerProps> = ({ markers, setSelectedFacility }) => {
  return (
    <MapContainer
      style={{ width: "100%", height: "90vh", zIndex: 0 }}
      center={[6.104541, 7.00192]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(({ id, position, name }) => (
        <Marker position={position} key={id} >
          <Popup>
            <CustomTooltip
              data={name}
              setSelectedFacility={setSelectedFacility}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const CustomTooltip = ({ data, setSelectedFacility }) => {
  return (
    <Box width={"240px"} p={4}>
      <Heading color={DARK} fontWeight={"600"} fontSize={"14px"} mb={4}>
        {data.name}
      </Heading>
      <Stack alignItems={"flex-start"} bg={"white"} gap={4}>
        <HStack>
          <Icon as={BuildingIcon} />{" "}
          <Text fontSize={"12px"} fontWeight={"400"} color={TEXT_DARK_GRAY}>
            {data.categorySelection.category.name}
          </Text>
        </HStack>
        <HStack>
          <Icon as={FiMapPin} />{" "}
          <Text fontSize={"12px"} fontWeight={"400"} color={TEXT_DARK_GRAY}>
            {data.address}
          </Text>
        </HStack>
        <HStack>
          <Icon as={AiOutlineClockCircle} />{" "}
          <Text fontSize={"12px"} fontWeight={"400"} color={TEXT_DARK_GRAY}>
            {formatTimeRange(data.operationDetails)}
          </Text>
        </HStack>
        <HStack>
          <Icon as={FaPhoneAlt} />{" "}
          <Text fontSize={"12px"} fontWeight={"400"} color={TEXT_DARK_GRAY}>
            {data.facility_phone}
          </Text>
        </HStack>
        <CustomButton
          variant={"outline"}
          w={"full"}
          rounded={"full"}
          fontSize={"md"}
          fontWeight={"600"}
          colorScheme="#C9CFD8"
          display={["none", "none", "flex"]}
          onClick={() => setSelectedFacility(data)}
        >
          See More
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default Map;
