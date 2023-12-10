import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuccessLayout from "../../components/layouts/SuccessLayout";
import CustomButton from "../../components/common/CustomButton";
import { Text } from "@chakra-ui/react";
import { TEXT_GRAY } from "../../utils/color";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ROUTES from "../../utils/routeNames";
import { useAppSelector } from "../../store/hook";

interface SuccessPageProps {}
const SuccessPage: React.FC<SuccessPageProps> = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.accountStore);
  
  useEffect(() => {
    setTimeout(() => {
      if (type === "register") return navigate(ROUTES.LOGIN_ROUTE);
      if (type === "login") {
        if (user.user.login_count === 1) {
          return navigate(ROUTES.FACILITY_FORM_INTRO);
        } else {
          return navigate(ROUTES.DASHBOARD_ROUTE);
        }
      }
    }, 1000);
  }, []);
  return (
    <SuccessLayout
      title={
        type === "reset"
          ? "Password successfully changed"
          : "Welcome to ASHEFAMU"
      }
    >
      {type === "reset" ? (
        <CustomButton leftIcon={<IoReturnDownBackOutline />}>
          Back to login
        </CustomButton>
      ) : (
        <Text color={TEXT_GRAY} textAlign={"center"} fontSize={"sm"}>
          Anambra State Health Facilities Accreditation and Monitoring Unit
        </Text>
      )}
    </SuccessLayout>
  );
};

export default SuccessPage;
