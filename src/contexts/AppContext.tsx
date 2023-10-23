import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearAccount } from "../store/slice/accountSlice";
import { executeGetFacilities } from "../apis/facility";
import { populateFacilities } from "../store/slice/dataSlice";
import { useDisclosure } from "@chakra-ui/react";

interface AppContextProps {
  logoutAccount: () => void;
  isLoadingData: boolean; 
}
const AppContext = createContext({} as AppContextProps)


interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const tokenStore = useAppSelector(state => state.accountStore.tokenStore)
  const dispatch = useAppDispatch()
  const { facilities } = useAppSelector(state => state.dataStore)
  const { isOpen: isLoadingData, onOpen: openLoadingData, onClose: closeLoadingData } = useDisclosure()

  // TOKEN EXPIRATION CHECK
  const checkTokenExpiration = () => {
    if (!tokenStore) return
    const id = setInterval(() => {
      const date = new Date(tokenStore.expires_at as string)
      const now = new Date()

      if (now < date) return
      logoutAccount()
      clearInterval(id)
    }, 2000)

  }

  // LOGOUT ACCOUNT
  const logoutAccount = () => {
    dispatch(clearAccount())
  }

  useEffect(() => {
    checkTokenExpiration()
  }, [])

  const handleGetFacilities = async () => {
    openLoadingData()
    const result = await executeGetFacilities(tokenStore!.token)
    if(result.status === "error") return 
    dispatch(populateFacilities(result.data.data))
    closeLoadingData()
  }

  useEffect(() => {
    if(facilities.length) return
    handleGetFacilities()
  }, [])

  return (
    <AppContext.Provider value={{ logoutAccount, isLoadingData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)