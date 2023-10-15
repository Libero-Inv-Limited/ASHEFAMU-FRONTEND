import { useLocation } from "react-router-dom"


interface IuseIsFacility { 
  isFacility: boolean;
}

const useIsFacility = (): IuseIsFacility => {
  const { pathname } = useLocation()
  const isFacility = pathname.includes("facilities")
  return { isFacility }
}

export default useIsFacility
