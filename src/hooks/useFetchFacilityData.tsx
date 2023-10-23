import { useEffect, useState } from "react"
import { executeGetDisposalMethods, executeGetFacilityCategory, executeGetFacilitySectors, executeGetNonCompliments, executeGetProtectiveItems, executeGetRequiredDocs, executeGetServiceScope } from "../apis/facilityData"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { populateFacilityCategory, populateNonCompliment, populateProtectiveItems, populateRequiredDocs, populateSectorCategory, populateServiceScope, populateWasteDisposalMethod } from "../store/slice/facilityData"


interface IuseFetchFacilityData { 
  isFetching: boolean;
  facilityCategory: FacilityCategoryType[];
  requiredDocs: RequireDocumentType[];
  sectorCategory: SectorCategoryType[];
  serviceScope: SectorCategoryType[];
  protectiveItems: ProctectiveItemType[];
  wasteDisposalMethods: WasteDisposalType[];
  nonComplimentList: NonComplimentListType[];
}

const useFetchFacilityData = (): IuseFetchFacilityData => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { facilityCategory, requiredDocs, serviceScope, sectorCategory, protectiveItems, wasteDisposalMethods, nonComplimentList } = useAppSelector(state => state.facilityDataStore)
  const dispatch = useAppDispatch()

  const handleFetchData = async () => {
    setIsFetching(true)
    const [requiredDocsResult, facilityCategoryResult, facilitySectorResult, serviceScopeResult, wasteMethodResult, protectiveItemsResult, nonCompList] = await Promise.all([
      executeGetRequiredDocs(token!),
      executeGetFacilityCategory(token!),
      executeGetFacilitySectors(token!),
      executeGetServiceScope(token!),
      executeGetDisposalMethods(token!),
      executeGetProtectiveItems(token!),
      executeGetNonCompliments(token!),
    ])

    if (requiredDocsResult.status === "success") dispatch(populateRequiredDocs(requiredDocsResult.data))
    if (facilityCategoryResult.status === "success") dispatch(populateFacilityCategory(facilityCategoryResult.data))
    if (facilitySectorResult.status === "success") dispatch(populateSectorCategory(facilitySectorResult.data))
    if (serviceScopeResult.status === "success") dispatch(populateServiceScope(serviceScopeResult.data))
    if (wasteMethodResult.status === "success") dispatch(populateWasteDisposalMethod(wasteMethodResult.data))
    if (protectiveItemsResult.status === "success") dispatch(populateProtectiveItems(protectiveItemsResult.data))
    if (protectiveItemsResult.status === "success") dispatch(populateProtectiveItems(protectiveItemsResult.data))
    if (nonCompList.status === "success") dispatch(populateNonCompliment(nonCompList.data))
    setIsFetching(false)
  }

  // TODO GET ALL FACILITY DATA
  useEffect(() => {
    // if(requiredDocs.length) return
    // if(facilityCategory.length) return
    // if(sectorCategory.length) return
    // if(serviceScope.length) return
    // if(protectiveItems.length) return
    // if(wasteDisposalMethods.length) return
    // if(nonComplimentList.length) return
    handleFetchData()
  }, [])

  return { isFetching, facilityCategory, requiredDocs, sectorCategory, serviceScope, protectiveItems, wasteDisposalMethods, nonComplimentList }
}

export default useFetchFacilityData
