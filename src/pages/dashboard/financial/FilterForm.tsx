/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { executeGetAllFees } from "../../../apis/finances";
import AuthInput from "./../../../components/common/AuthInput";
import CustomButton from "./../../../components/common/CustomButton";
import { useAppSelector } from "../../../store/hook";

interface FilterProps {
  control: any;
  handleFilters: () => void;
}

const FilterForm: React.FC<FilterProps> = ({ control, handleFilters }) => {
  const [fees, setFees] = React.useState([]);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const status = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Unpaid",
      value: "unpaid",
    },
  ];

  const fetchFees = async () => {
    try {
      const fees = await executeGetAllFees(token);
      setFees(fees.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  React.useEffect(() => {
    fetchFees();
    //eslint-disable-next-line
  }, []);
  return (
    <SimpleGrid columns={[1]} gap={4}>
      <AuthInput
        label="Status"
        name="status"
        control={control}
        isSelect
        data={status}
        rules={{ required: "status is required" }}
      />
      <AuthInput
        label="Fee category"
        name="fee_category"
        control={control}
        isSelect
        data={fees.map((fee) => ({ value: fee.id, label: fee.category }))}
      />
      <CustomButton onClick={handleFilters}>Add Filter</CustomButton>
    </SimpleGrid>
  );
};

export default FilterForm;
