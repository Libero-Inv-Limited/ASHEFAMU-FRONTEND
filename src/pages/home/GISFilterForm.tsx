/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import AuthInput from "./../../components/common/AuthInput";
import CustomButton from "./../../components/common/CustomButton";
import CustomSelect from "./../../components/common/CustomSelect";

interface FilterProps {
  control: any;
  handleFilters: () => void;
}

const FilterForm: React.FC<FilterProps> = ({ control, handleFilters }) => {
  const [options, setOptions] = useState([]);

  const facilityOptions = [
    {
      label: "Hospital",
      value: 1,
      type: "category",
    },
    {
      label: "Laboratory",
      value: 2,
      type: "category",
    },
    {
      label: "Clinic",
      value: 3,
      type: "category",
    },
    {
      label: "Mortuary",
      value: 4,
      type: "category",
    },
  ];

  const sectorOptions = [
    {
      label: "Private",
      value: 1,
      type: "sector",
    },
    {
      label: "Public",
      value: 2,
      type: "sector",
    },
  ];

  const categories = [
    {
      label: "Sector Category",
      value: "sector_category",
    },
    {
      label: "Facility Sector",
      value: "facility_sector",
    },
  ];

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory.value === "sector_category") {
      setOptions(sectorOptions);
    } else if (selectedCategory.value === "facility_sector") {
      setOptions(facilityOptions);
    }
  };

  return (
    <SimpleGrid columns={[1]} gap={4}>
      <CustomSelect
        onChange={(value) => handleCategoryChange(value as any)}
        options={categories}
        fontSize="sm"
      />
      <AuthInput
        label="Options"
        name="options"
        control={control}
        isSelect
        data={options}
        rules={{ required: "Options is required" }}
      />
      <CustomButton onClick={handleFilters}>Add Filter</CustomButton>
    </SimpleGrid>
  );
};

export default FilterForm;
