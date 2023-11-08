import { FormControl, FormLabel, HStack, Select, Text } from "@chakra-ui/react";
import React from "react"
import CustomButton from "../common/CustomButton";
import { TEXT_DARK } from "../../utils/color";



// COMPONENT FOR THE NEXT, PREV AND PAGE CHANGE (RIGHT SIDE)
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (page: number) => void;
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({ page, count, onChangePage, rowsPerPage }) => {
  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const noOfPages = Math.ceil((count / rowsPerPage))
  return (
    <HStack>
      <CustomButton onClick={handleBackButtonClick} isDisabled={page === 1} fontSize={"xs"} _hover={{ bg: "brand.400", color: "white" }} color={TEXT_DARK} h={"32px"} minW={"75px"} bgColor={"#E5F3E5"}>Previous</CustomButton>

      <HStack>
        <Select size={"xs"} maxW={"61px"} fontSize={"sm"} color={TEXT_DARK} onChange={({ target }) => onChangePage(+target.value)}>
          {new Array(noOfPages).fill(0).map((_, index) => (
            <option 
              value={index + 1} 
              selected={(index + 1) === page}
              key={index}
            >{index + 1}</option>
          ))}
        </Select>
      </HStack>

      <CustomButton onClick={handleNextButtonClick} fontSize={"xs"} h={"32px"} minW={"75px"} isDisabled={noOfPages >= page} _hover={{ bg: "brand.400", color: "white" }} color={TEXT_DARK} bgColor={"#E5F3E5"}>Next</CustomButton>
    </HStack>
  );
}



// COMPONENT FOR THE NO OF ROWS, AND ENTRIES COUNT (LEFT SIDE)
interface TablePaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (perPage: number) => void;
  ActionsComponent: React.FC<TablePaginationActionsProps>;
}
const TablePagination: React.FC<TablePaginationProps> = ({ count, onChangePage, onChangeRowsPerPage, page, rowsPerPage, ActionsComponent }) => {
  const totalToView = rowsPerPage * page
  const totalInView = totalToView > count ? count : totalToView
  return (
    <HStack justifyContent={"space-between"} flexDir={['column', 'column', 'row']} flex={1} py={4} mt={2}>
      <HStack>
        <FormControl as={HStack}>
          <FormLabel whiteSpace={"nowrap"} mb={0} fontWeight={"400"} fontSize={"sm"} color={TEXT_DARK}>Items per page</FormLabel>
          <Select size={"xs"} maxW={"61px"} fontSize={"sm"} color={TEXT_DARK} onChange={({ target }) => onChangeRowsPerPage(+target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15" selected>15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </Select>
        </FormControl>

        <Text whiteSpace={"nowrap"} fontSize={"sm"} color={TEXT_DARK}>{page} - {totalInView} of {count} entries</Text>
      </HStack>

      <ActionsComponent 
        count={count} 
        onChangePage={onChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </HStack>
  )
}




// COMPONENT TO BIND THE ABOUT TWO
interface CustomPaginationProps {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (perPage: number) => void;
  currentPage: number;
}
const CustomPagination: React.FC<CustomPaginationProps> = ({ rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage }) => (
  <TablePagination
    count={rowCount}
    rowsPerPage={rowsPerPage}
    page={currentPage}
    onChangePage={onChangePage}
    onChangeRowsPerPage={onChangeRowsPerPage}
    ActionsComponent={TablePaginationActions}
  />
);

export default CustomPagination