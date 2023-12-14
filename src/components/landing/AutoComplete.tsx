/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { Box, Text } from "@chakra-ui/react";
import { executeSearchFacilities } from "./../../apis/facility";
import { DARK } from "../../utils/color";
import { TEXT_DARK_GRAY } from "./../../utils/color";

interface FacilityOption {
  readonly value: string;
  readonly label: string;
  readonly address: string;
  readonly data: FacilityData;
}

const CustomOption = (props: any) => (
  <Box mb={"4px"} p={"8px"} onClick={() => props.onSelect(props.data)}>
    <Text fontSize={"16px"} color={DARK} fontWeight={"600"}>
      {props.data.label}
    </Text>
    <Text color={TEXT_DARK_GRAY}>{props.data.address}</Text>
  </Box>
);

const AutoComplete = ({setSelectedFacility, selectedFacility}) => {
  const [query, setQuery] = useState<string>("");
  
  const [facilities, setFacilities] = useState<FacilityOption[]>([]);

  const filterFacilities = (inputValue: string) => {
    return facilities.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: FacilityOption[]) => void
  ) => {
    setTimeout(() => {
      setQuery(inputValue);
      callback(filterFacilities(inputValue));
    }, 1000);
  };

  const fetchFacilities = async (value: string) => {
    const result = await executeSearchFacilities(value);
    const facilityOptions = result?.data?.data?.map((item: FacilityData) => ({
      label: item.name,
      value: item.id,
      address: item.address,
      data: item,
    }));
    setFacilities(facilityOptions);
  };

  const handleSelectChange = (selectedOption: FacilityOption | null) => {
    if (selectedOption) {
      setSelectedFacility(selectedOption.data);
    }
  };

  React.useEffect(() => {
    fetchFacilities(query);
  }, [query]);

  return (
    <Box width={"412px"} mb={4}>
      <AsyncSelect
        components={{
          Option: (props: any) => <CustomOption {...props} onSelect={handleSelectChange} />,
        }}
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Search"
      />
      {selectedFacility && (
        <Box mt={4}>
          <Text>
            Selected Facility: {selectedFacility.label} - {selectedFacility.address}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default AutoComplete;
