import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(number, semester, fat, carbs, protein) {
  return { number, semester, fat, carbs, protein };
}

const rows = [createData(1, 2565, 6.0, 24, 4.0)];

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

export default function TableExampleApprove() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="table">
            <StyledTableCell>ลำดับที่</StyledTableCell>
            <StyledTableCell>ภาคเรียน/ปีการศึกษา&nbsp;</StyledTableCell>
            <StyledTableCell>ช่วงวันที่งดสอน&nbsp;</StyledTableCell>
            <StyledTableCell>เหตุที่ไม่ได้สอน&nbsp;</StyledTableCell>
            <StyledTableCell>วันที่สอนแทน</StyledTableCell>
            <StyledTableCell>วิชาที่ให้สอนแทน</StyledTableCell>
            <StyledTableCell>อาจารย์ที่ให้สอนแทน&nbsp;</StyledTableCell>
            <StyledTableCell>พิมพ์ใบสอนแทน&nbsp;</StyledTableCell>
            <StyledTableCell>จัดการ&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.number}</StyledTableCell>
              <StyledTableCell>{row.semester}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.protein}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="ModeEditSharp">
                    <IconButton>
                      <ModeEditSharpIcon
                        onClick={handleClick}
                        onDelete={handleDelete}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
