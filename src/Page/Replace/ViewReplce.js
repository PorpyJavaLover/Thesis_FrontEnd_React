import React, { useRef } from "react";
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
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import RefreshIcon from "@mui/icons-material/Refresh";
// import "../Css/TableExampleApprove.css";
import { Link } from "react-router-dom";
//import Link from "@material-ui/core";
// import { PDF } from "./Document/PDF";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useNavigate } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../../Component/PdfExport/PDFReplace";
// import ReactHTMLTableToExcel from "../Component/ExcelExport/Excel";
// import { ReactHTMLTableToExcel } from "../Component/ExcelExport/Excel";
// import PDF from "../Document/PDF.js";

const handlePrint = () => {
  window.print();
};

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

function createData(
  number,
  semester,
  cannot_date,
  note,
  date,
  subject,
  teacher_replace
) {
  return {
    number,
    semester,
    cannot_date,
    note,
    date,
    subject,
    teacher_replace,
  };
}

const rows = [
  createData(1),
  // {
  //   number: $number,
  //   semester: $semester,
  //   cannot_date: $cannot_date,
  //   note: note,
  //   date: date,
  //   subject: subject,
  //   teacher_replace: teacher_replace,
  // },
];

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

export default function TableExampleApprove() {
  const pdfExportComponent = React.useRef(null);
  const excelExportComponent = React.useRef(null);
  const container = React.useRef(null);
  const Navigate = useNavigate();

  const ExportHere = () => {
    const exportPDFWithMethod = () => {
      let element = container.current || document.body;
      savePDF(element, {
        paperSize: "auto",
        margin: 40,
        fileName: `Report for ${new Date().getFullYear()}`,
      });
    };
    const componentRefPdf = useRef();
    const componentRefExcel = useRef();

    const handlePrint = useReactToPrint({
      content: () => componentRefPdf.current,
    });
    const handlePrintExcel = useReactToPrint({
      content: () => componentRefExcel.current,
    });

    return (
      <div>
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRefPdf} />
          {/* <ReactHTMLTableToExcel ref={componentRefExcel} /> */}
        </div>
        <div>
          <Button
            type="ghost"
            onClick={handlePrint}
            variant="contained"
            // onClick={handlePrint}
            // href={PDF}
            // download
            ref={pdfExportComponent}
            paperSize="auto"
            margin={40}
            fileName={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
            // onClick={exportPDFWithMethod}
          >
            PDF
          </Button>
          &nbsp;
          <Button
            onClick={handlePrintExcel}
            variant="contained"
            ref={excelExportComponent}
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="test"
            sheet="tablexls"
            paperSize="auto"
            margin={40}
            fileName={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
          >
            Excel
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Paper sx={{ maxWidth: 1450, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs></Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={() => Navigate("../input-replace")}
              >
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
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
                  <StyledTableCell>{row.cannot_date}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.note}
                  </StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.subject}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.teacher_replace}
                  </StyledTableCell>
                  <StyledTableCell>
                    <ExportHere />
                    &nbsp;
                    {/* <Button variant="contained" href="#contained-buttons">
                      EXCEL
                    </Button> */}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip
                        title="ModeEditSharp"
                        onClick={() => Navigate("../input-replace")}
                      >
                        <IconButton>
                          <ModeEditSharpIcon />
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
      </Typography>
    </Paper>
  );
}
