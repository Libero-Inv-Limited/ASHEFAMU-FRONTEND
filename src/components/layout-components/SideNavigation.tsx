import React, { useEffect, useState } from "react";
import Sidebar from "../layout-components/Sidebar";
import SecondarySidebar from "../layout-components/SecondarySidebar";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import FacilityLists from "./FacilityLists";
import { useAppContext } from "../../contexts/AppContext";
import { decodeSlug } from "../../utils/helpers";
import { useAppSelector } from "../../store/hook";
import ROUTES from "../../utils/routeNames";
import { executeGetOneFacility } from "../../apis/facility";

interface SideNavigationProps {
  onClose?: () => void;
}
const SideNavigation: React.FC<SideNavigationProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { setCurrentFacility } = useAppContext();
  const navigate = useNavigate();

  const onToggle = () => setIsOpen((prev) => !prev);
  const facilities = useAppSelector((state) => state.dataStore.facilities);
  const token = useAppSelector((state) => state.accountStore.tokenStore?.token);
  const param = useParams();
  const isFacility = !!param.name;

  // GET THE CURRENT FACILITY
  const handleGetCurrentFacility = async () => {
    const name = decodeSlug(param.name!);
    const facility = facilities.find((state) =>
      state.name?.toLowerCase().includes(name.toLocaleLowerCase())
    );

    // GET FACILITY
    if (!facility) return navigate(ROUTES.FACILITY_ROUTE);
    const response = await executeGetOneFacility(facility.id, token!);
    if (response.status === "error") return navigate(ROUTES.FACILITY_ROUTE);
    setCurrentFacility(response.data);
  };
  useEffect(() => {
    if (!isFacility) return;
    handleGetCurrentFacility();
  }, [param]);

  return (
    <Flex h={"full"}>
      <Sidebar
        isSecondaryBarOpen={isOpen}
        toggleSecondaryBar={onToggle}
        onClose={onClose}
      />
      {!isFacility ? (
        <SecondarySidebar onToggle={onToggle} isOpen={isOpen} />
      ) : (
        <FacilityLists onToggle={onToggle} isOpen={isOpen} />
      )}
    </Flex>
  );
};

export default SideNavigation;
