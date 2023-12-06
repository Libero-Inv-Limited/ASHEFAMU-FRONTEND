/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import CustomButton from "../../../components/common/CustomButton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DARK } from "../../../utils/color";
import CustomScheduledTable from "./../../../components/tables/CustomScheduledTable";
import ConductedTable from "./../../../components/tables/ConductedTable";
import { Heading } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { LuFileBarChart2 } from "react-icons/lu";


interface FacilitiesProps {}
const AuditAndCompliance: React.FC<FacilitiesProps> = () => {
  const [search] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeTab = search.get("tab");

  useEffect(() => {
    if (activeTab) return;
    navigate(`${pathname}?tab=scheduled`);
  }, []);

  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase();
    navigate(`${pathname}?tab=${text}`);
  };



  return (
    <DashboardLayout>
      <Heading
        textTransform="uppercase"
        fontWeight={"700"}
        fontSize="20px"
        mb="18px"
      >
        Inspections
      </Heading>
      <Stack spacing={4}>
        <HStack justifyContent="space-between">
          <ButtonGroup
            w={"full"}
            maxW={"400px"}
            p={1}
            bg={"white"}
            rounded={"sm"}
          >
            <CustomButton
              colorScheme={activeTab === "scheduled" ? "primary" : "gray"}
              onClick={handleTabChange}
              bg={activeTab === "scheduled" ? "primary.500" : "white"}
              color={activeTab === "scheduled" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
              variant={"solid"}
            >
              scheduled
            </CustomButton>
            <CustomButton
              colorScheme={activeTab === "conducted" ? "primary" : "gray"}
              onClick={handleTabChange}
              bg={activeTab === "conducted" ? "primary.500" : "white"}
              color={activeTab === "conducted" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
            >
              conducted
            </CustomButton>
          </ButtonGroup>
          <ButtonGroup maxW={"400px"} p={1} rounded={"sm"}>
            <IconButton
              aria-label="result-btn"
              icon={<Icon as={LuFileBarChart2} color={"primary.500"} />}
              w={"40px"}
              h={"40px"}
              bg={"#DBE8FE"}
              rounded={"full"}
              _hover={{ bg: "#DBE8FE" }}
            />
          </ButtonGroup>
        </HStack>
        <Box p={2} px={3} bg={"white"} rounded={"md"}>
          {activeTab === "scheduled" ? (
            <CustomScheduledTable/>
          ) : (
            <ConductedTable />
          )}
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default AuditAndCompliance;
