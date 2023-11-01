/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import ProfessionalMember from "../../components/facility/ProfessionalMember"
import NonProfessionalMember from "../../components/facility/NonProfessionalMember"

interface FacilityMemberProps { }
const FacilityMember: React.FC<FacilityMemberProps> = () => {
  const [search] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeTab = search.get("tab")
  const isProfessional = activeTab === "professional"

  useEffect(() => {
    if (activeTab) return
    navigate(`${pathname}?tab=professional`)
  })

  const handleTabChange = (event: any) => {
    const text = event.target.innerHTML?.split(" ")[0].toLowerCase()
    navigate(`${pathname}?tab=${text}`)
  }

  return (
    <DashboardLayout>
      { isProfessional ? (
        <ProfessionalMember isProfessional={isProfessional} handleTabChange={handleTabChange} />
      ) : (
        <NonProfessionalMember isProfessional={isProfessional} handleTabChange={handleTabChange} />
      ) }
    </DashboardLayout>
  )
}

export default FacilityMember