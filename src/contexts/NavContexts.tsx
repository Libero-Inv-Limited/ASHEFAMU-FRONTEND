import { createContext, useContext, useState, useEffect } from "react";

const NavigationContext = createContext(undefined);

export const NavigationProvider = ({ children }) => {
  const [selectedPrimaryLink, setSelectedPrimaryLink] = useState(null);
  const [secondaryLinks, setSecondaryLinks] = useState([]);

  useEffect(() => {
    // Retrieve context data from sessionStorage on component mount
    const storedSecondaryLinks = sessionStorage.getItem("secondaryLinks");
    if (storedSecondaryLinks) {
      setSecondaryLinks(JSON.parse(storedSecondaryLinks));
    }
  }, []);

  const updateNavigation = (primaryLink, secondaryLinks) => {
    setSelectedPrimaryLink(primaryLink);
    setSecondaryLinks(secondaryLinks);
    sessionStorage.setItem("secondaryLinks", JSON.stringify(secondaryLinks));
  };

  const clearNavigation = (primaryLink) => {
    setSelectedPrimaryLink(primaryLink);
    setSecondaryLinks([]);
    sessionStorage.removeItem("secondaryLinks");
  };

  const contextValue = {
    selectedPrimaryLink,
    secondaryLinks,
    updateNavigation,
    clearNavigation,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
