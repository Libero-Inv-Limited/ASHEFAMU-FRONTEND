/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Box, ButtonGroup, SimpleGrid } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import useSearchParam from "../../hooks/useSearchParam"
import { useLocation, useNavigate } from "react-router-dom"
import { DARK } from "../../utils/color"
// import { Document, Page } from 'react-pdf';
import DocumentCard from "../../components/common/DocumentCard"
import { documentContents } from "../../utils/data"
import CustomInvoiceTable from "../../components/tables/CustomInvoiceTable"

interface FacilityDocumentProps { }
const FacilityDocument: React.FC<FacilityDocumentProps> = () => {
  const { queryParam: activeTab } = useSearchParam("tab")
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(activeTab) return
    navigate(`${pathname}?tab=document`)
  }, [])

  const handleTabChange = (e: ChangeEvent<HTMLButtonElement>) => {
    navigate(`${pathname}?tab=${e.target.name.toLowerCase()}`)
  }

  const isInvoice = activeTab?.toLowerCase() === "invoice"

  return (
    <DashboardLayout>
      <Box mb={10}>
        <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
          <CustomButton colorScheme={activeTab === "document" ? "primary" : "gray"} onClick={handleTabChange as any} bg={activeTab === "document" ? "primary.500" : "white"} color={activeTab === "document" ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} name="document" >Uploaded documents</CustomButton>
          <CustomButton colorScheme={activeTab === "invoice" ? "primary" : "gray"} onClick={handleTabChange as any} bg={activeTab === "invoice" ? "primary.500" : "white"} name="invoice" color={activeTab === "invoice" ? "white" : DARK} textTransform={"capitalize"} flex={1}>Invoices</CustomButton>
        </ButtonGroup>
      </Box>

      {!isInvoice ? (
        <SimpleGrid spacing={2} columns={[1, 2, 3, 4]}>
          { documentContents.map(content => <DocumentCard key={content.name} {...content} />) }
        </SimpleGrid>
      ): (
       <CustomInvoiceTable />
        ) }
    </DashboardLayout>
  )
}

export default FacilityDocument