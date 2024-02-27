/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppSelector } from "../../../store/hook";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  executeGetSettings,
  executeUpdateSettings,
} from "../../../apis/settings";
import {
  Stack,
  Grid,
  GridItem,
  Switch,
  FormLabel,
  HStack,
  ButtonGroup,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import AuthInput from "../../../components/common/AuthInput";
import { useForm } from "react-hook-form";
import { DARK } from "../../../utils/color";
import CustomButton from "../../../components/common/CustomButton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LuFileBarChart2 } from "react-icons/lu";
import { executeGetRequiredDocs } from "../../../apis/facilityData";

interface AnalyticsProps {}
const Settings: React.FC<AnalyticsProps> = () => {
  const token = useAppSelector((state) => state.accountStore.tokenStore.token);
  const [settings, setSettings] = React.useState<SettingsData[]>();
  const [documents, setDocuments] = React.useState<DocumentData[]>();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = search.get("tab");

  React.useEffect(() => {
    if (activeTab) return;
    navigate(`${pathname}?tab=settings`);
  }, []);

  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase();
    navigate(`${pathname}?tab=${text}`);
  };
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const { control, trigger } = useForm();

  const handleGetSettings = async () => {
    if (!token) return;
    try {
      const result = await executeGetSettings(token);
      if (result.status === "error") throw new Error(result.message);
      setSettings(result.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const handleGetRequiredDoduments = async () => {
    if (!token) return;
    try {
      const result = await executeGetRequiredDocs(token);
      if (result.status === "error") throw new Error(result.message);
      setDocuments(result.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  React.useEffect(() => {
    handleGetSettings();
    handleGetRequiredDoduments();
  }, []);

  const handleUpdateSetting = (id: number, newValue: string) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, value: newValue } : setting
    );
    setSettings(updatedSettings);
  };

  const handleUpdateDocuments = (id: number, newStatus: string) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === id ? { ...doc, status: newStatus } : doc
    );
    setDocuments(updatedDocuments);
  };

  const handleSubmit = async () => {
    
    if (!(await trigger())) return false;
    try {
      const payload = settings.map((setting) => ({
        slug: setting.slug,
        value: setting.value,
      }));
      const updateSettingsData = await executeUpdateSettings({setting: payload}, token!);
      if (updateSettingsData.status === "error")
        throw new Error(updateSettingsData.message);
  
      // SHOW MESSAGE
      toast({
        title: updateSettingsData.message,
        status: "success",
      });
    }
    catch (error) {
      toast({
        status: "error",
        title: error.message
      })
    }
    }
    

  console.log({ documents });

  if (settings && documents) {
    return (
      <DashboardLayout>
        <HStack justifyContent="space-between" mb={8}>
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
              bg={activeTab === "settings" ? "primary.500" : "white"}
              color={activeTab === "settings" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
              variant={"solid"}
            >
              settings
            </CustomButton>
            <CustomButton
              colorScheme={activeTab === "documents" ? "primary" : "gray"}
              onClick={handleTabChange}
              bg={activeTab === "documents" ? "primary.500" : "white"}
              color={activeTab === "documents" ? "white" : DARK}
              textTransform={"capitalize"}
              flex={1}
            >
              documents
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
        <Stack spacing={"8"} bg={"white"} p={6}>
          {activeTab === "settings" ? (
            <>
              <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                {settings.map((item, idx) =>
                  item.input_type === "boolean" ? (
                    <GridItem colSpan={[12, 12, 6]} key={idx}>
                      <FormLabel htmlFor="email-alerts" mb="0">
                        {item.name}
                      </FormLabel>
                      <Switch
                        isChecked={item.value === "true"}
                        colorScheme="brand"
                        onChange={() =>
                          handleUpdateSetting(
                            item.id,
                            item.value === "true" ? "false" : "true"
                          )
                        }
                        color={DARK}
                        size="md"
                        fontWeight="500"
                        py={1}
                      />
                    </GridItem>
                  ) : (
                    <GridItem colSpan={[12, 12, 6]}>
                      <AuthInput
                        key={idx}
                        control={control}
                        fontSize={"sm"}
                        label={item.name}
                        name={item.name}
                        value={item.value}
                        onChange={(e) =>
                          handleUpdateSetting(item.id, e.target.value)
                        }
                      />
                    </GridItem>
                  )
                )}
              </Grid>
              <CustomButton
                onClick={handleSubmit}
                alignSelf={["unset", "flex-end", "flex-end"]}
                size="md"
              >
                Save settings
              </CustomButton>
            </>
          ) : (
            <>
              <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                {documents.map((item, idx) => (
                  <GridItem
                    colSpan={[12, 12, 6]}
                    key={idx}
                    // display={"flex"}
                    mb={4}
                  >
                    <FormLabel htmlFor="email-alerts" mb="0">
                      {item.name}
                    </FormLabel>
                    <Switch
                      isChecked={item.status === "active"}
                      colorScheme="brand"
                      onChange={() =>
                        handleUpdateDocuments(
                          item.id,
                          item.status === "active" ? "inactive" : "active"
                        )
                      }
                      color={DARK}
                      size="md"
                      fontWeight="500"
                      py={1}
                    />
                  </GridItem>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      </DashboardLayout>
    );
  }
};

export default Settings;
