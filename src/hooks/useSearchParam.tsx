import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"


interface IuseSearchParam { 
  queryParam: string | null;
} 

const useSearchParam = (q: string): IuseSearchParam => {
  const [search] = useSearchParams()
  const {pathname} = useLocation()
  const activeTab = search.get(q)
  
  const [queryParam, setQueryParam] = useState<string | null>(activeTab || null)
  
  useEffect(() => {
    const activeTab = search.get(q)
    setQueryParam(activeTab)
  }, [pathname, q, search])

  return{queryParam}
}

export default useSearchParam
