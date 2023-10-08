import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Icon } from "@chakra-ui/react"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import {FiChevronRight} from "react-icons/fi"
import { TEXT_DARK_GRAY } from "../../utils/color"
import { decodeSlug } from "../../utils/helpers"

interface BreadCrumbsProps { }
const BreadCrumbs: React.FC<BreadCrumbsProps> = () => {
  const { pathname } = useLocation()
  const links = [{ name: "Home", link: "/" }]

  pathname.split("/")
    .filter(link => link)
    .forEach(link => {
      const item = `${links[links.length - 1].link}${link}/`
      links.push({ name: link.charAt(0).toUpperCase() + link.slice(1), link: item })
    })

  if(links.length === 1) links.push({ name: "Dashboard", link: "/" })
  if (!links.length) return null
  return (
    <Breadcrumb alignItems={"center"} fontSize="sm" separator={<Center><Icon fontSize={"md"} color={TEXT_DARK_GRAY} as={FiChevronRight}  /></Center>}>
      {links.map((link, index, arr) => (
        <BreadcrumbItem key={link.name} isCurrentPage={index === (arr.length - 1)}>
          <BreadcrumbLink noOfLines={1} fontFamily={"rubik"} textTransform={"capitalize"} as={Link} color={TEXT_DARK_GRAY} to={link.link}>{decodeSlug(link.name)}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default BreadCrumbs