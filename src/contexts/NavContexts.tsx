import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(undefined);

export const NavigationProvider = ({ children }) => {
  const [selectedPrimaryLink, setSelectedPrimaryLink] = useState(null);
  const [secondaryLinks, setSecondaryLinks] = useState([]);

  const updateNavigation = (primaryLink, secondaryLinks) => {
    setSelectedPrimaryLink(primaryLink);
    setSecondaryLinks(secondaryLinks);
  };

  const clearNavigation = (primaryLink) => {
    setSelectedPrimaryLink(primaryLink);
    setSecondaryLinks([]);
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
//eslint-disable-next-line
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
