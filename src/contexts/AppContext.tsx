import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearAccount } from "../store/slice/accountSlice";

interface AppContextProps {
  setContainerWidth: (value: number | undefined) => void;
  containerWidth: number | undefined;
  logoutAccount: () => void;
}
const AppContext = createContext({} as AppContextProps)


interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)
  const tokenStore = useAppSelector(state => state.accountStore.tokenStore)
  const dispatch = useAppDispatch()

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

  const logoutAccount = () => {
    dispatch(clearAccount())
  }

  useEffect(() => {
    checkTokenExpiration()
  }, [])

  return (
    <AppContext.Provider value={{ containerWidth, setContainerWidth, logoutAccount }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)