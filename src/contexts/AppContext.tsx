import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps { 
  setContainerWidth: (value: number | undefined) => void;
  containerWidth: number | undefined;
}
const AppContext = createContext({} as AppContextProps)


interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)

  return(
    <AppContext.Provider value={{ containerWidth, setContainerWidth }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)