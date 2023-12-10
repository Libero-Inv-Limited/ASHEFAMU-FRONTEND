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
import { HStack } from "@chakra-ui/react";
import { LuFileBarChart2 } from "react-icons/lu";
import CustomInvoicesTable from './../../../components/tables/CustomInvoices';
import CustomPenaltiesTable from './../../../components/tables/CustomPenalties';


interface FacilitiesProps {}
const AuditAndCompliance: React.FC<FacilitiesProps> = () => {
  const [search] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeTab = search.get("tab");

  useEffect(() => {
    if (activeTab) return;
    navigate(`${pathname}?tab=invoices`);
    //eslint-disable-next-line
  }, []);

  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase();
    navigate(`${pathname}?tab=${text}`);
  };



  return (
    <DashboardLayout>
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
              colorScheme={activeTab === "invoices" ? "primary" : "gray"}
              onClick={handleTabChange}
              bg={activeTab === "invoices" ? "primary.500" : "white"}
              color={activeTab === "invoices" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
              variant={"solid"}
            >
              Invoices
            </CustomButton>
            <CustomButton
              colorScheme={activeTab === "penalties" ? "primary" : "gray"}
              onClick={handleTabChange}
              bg={activeTab === "penalties" ? "primary.500" : "white"}
              color={activeTab === "penalties" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
            >
              Penalties
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
          {activeTab === "invoices" ? (
            <CustomInvoicesTable/>
          ) : (
            <CustomPenaltiesTable />
          )}
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default AuditAndCompliance;
