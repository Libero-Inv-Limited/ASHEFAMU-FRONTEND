/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ModalComponent from "./../../../components/modals/CustomModal";
import CustomButton from "./../../../components/common/CustomButton";
import { Box, ButtonGroup, HStack, Heading } from "@chakra-ui/react";
import AllFacilitiesInvoiceForm from "./AllFacilitiesInvoiceForm";
import SomeFacilitiesInvoiceForm from "./SomeFacilitiesInvoiceForm";

const GenerateInvoiceModal = ({
  onClose,
  isOpen,
}) => {
  const [activeTab, setActiveTab] = React.useState("specific");
  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase();
    setActiveTab(() => {
      return text === "all" ? "all" : "specific";
    });
  };

  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} size={"3xl"}>
      <Heading fontWeight="700" fontSize="16px" textTransform="uppercase" mb={9}>
        Generate Invoice
      </Heading>
      <HStack justifyContent="space-between" mb={7}>
        <ButtonGroup
          w={"full"}
          maxW={"400px"}
          border="1px solid"
          borderColor="#E3EBE2"
          borderRadius={"4px"}
          p={1}
          bg={"#F4F7F4"}
          rounded={"sm"}
        >
          <CustomButton
            onClick={handleTabChange}
            bg={activeTab === "specific" ? "white" : "transparent"}
            fontWeight = {activeTab ==="specific" ?  700: 500}
            color={"#363A43"}
            textTransform={"capitalize"}
            sx={{ boxShadow: activeTab === "specific" && "0px 4px 10px 0px rgba(0, 0, 0, 0.10)"}}
            flex={1}
            variant={"solid"}
            _hover={{bg: activeTab === "specific" ? "white" : "transparent"}}
          >
            Specific Facility
          </CustomButton>
          <CustomButton
            onClick={handleTabChange}
            fontWeight = {activeTab ==="all" ?  700: 500}
            sx={{ boxShadow: activeTab === "all" && "0px 4px 10px 0px rgba(0, 0, 0, 0.10)"}}
            bg={activeTab === "all" ? "white" : "transparent"}
            color={"#363A43"}
            textTransform={"capitalize"}
            flex={1}
            _hover={{bg: activeTab === "all" ? "white" : "transparent"}}
          >
            All Facilities
          </CustomButton>
        </ButtonGroup>
      </HStack>
      <Box p={2} px={3} bg={"white"} rounded={"md"}>
        {activeTab === "all" ? (
          <AllFacilitiesInvoiceForm onClose={onClose}/>
        ) : (
          <SomeFacilitiesInvoiceForm onClose={onClose}/>
        )}
      </Box>
    </ModalComponent>
  );
};

export default GenerateInvoiceModal;
