import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function UserCreate() {
  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      semester: semester,
      subject: subject,
      teacher: teacher,
    };
  };
  const [semester, setSemester] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [teacher, setTeacher] = React.useState("");

  const handleChangesemester = (event) => {
    setSemester(event.target.value);
  };

  const handleChangesubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeteacher = (event) => {
    setTeacher(event.target.value);
  };

  const d = new Date();

  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [value3, setValue3] = React.useState(null);

  return (
    <Paper sx={{ maxWidth: 1000, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography component="h1" variant="h5">
                ใบอนุมัติสอนแทน
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <TableContainer component={Paper}>
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ pt: 2 }} spacing={2}>
              <Grid sx={{ minWidth: 160 }} item xs={2}>
                <Box>
                  <label>ภาคการศึกษา</label>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-select-small">ภาคการศึกษา</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select"
                      value={semester}
                      label="ภาคการศึกษา"
                      onChange={handleChangesemester}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>ภาคการศึกษาที่ 1</MenuItem>
                      <MenuItem value={20}>ภาคการศึกษาที่ 2</MenuItem>
                      <MenuItem value={30}>ภาคการศึกษาที่ฤดูร้อน</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ minWidth: 160 }} item xs={2}>
                <Box>
                  <label>ปีการศึกษา</label>
                  <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    {d.getFullYear()}
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ minWidth: 160 }} item xs={3}>
                <Box>
                  <label>วันที่งดสอน</label>
                  <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="DD/MM/YYYY"
                        inputFormat="DD/MM/YYYY"
                        value={value1}
                        onChange={(newValue) => {
                          setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
                <Box>
                  <label>ถึง</label>
                  <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="DD/MM/YYYY"
                        inputFormat="DD/MM/YYYY"
                        value={value2}
                        onChange={(newValue) => {
                          setValue2(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ minWidth: 160 }} item xs={1}>
                <Box>
                  <label>เหตุที่ไม่ได้สอน</label>
                  <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder="Empty"
                      style={{ width: 200 }}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </form>
          &nbsp;
        </TableContainer>
      </Typography>
      &nbsp;
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "0px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography component="h6" variant="h6">
                เพิ่มข้อมูลการสอนแทน
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <TableContainer component={Paper}>
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ pt: 2 }} spacing={2}>
              <Grid sx={{ minWidth: 160 }} item xs={3}>
                <Box>
                  <label>วันที่สอนแทน</label>
                  <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="วันที่สอนแทน"
                        inputFormat="DD/MM/YYYY"
                        value={value3}
                        onChange={(newValue) => {
                          setValue3(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ minWidth: 10 }} item xs={3}>
                <label>วิชา</label>
                <Box>
                  <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="demo-select-small">เลือก</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select"
                      value={subject}
                      label="วิชา"
                      onChange={handleChangesubject}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>1</MenuItem>
                      <MenuItem value={20}>2</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ minWidth: 10 }} item xs={2}>
                <Box>
                  <label>&nbsp;อาจารย์</label>
                  <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="demo-select-small">เลือก</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select"
                      value={teacher}
                      label="อาจารย์"
                      onChange={handleChangeteacher}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>1</MenuItem>
                      <MenuItem value={20}>2</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </form>
          &nbsp;
        </TableContainer>
      </Typography>
      <Typography>
        <Stack direction="row" spacing={2} sx={{ m: 1, minWidth: 160 }}>
          <Button variant="contained" color="success">
            บันทึก
          </Button>
          <Button variant="contained" color="success">
            ยกเลิก
          </Button>
          <Button variant="contained" color="success">
            รีเซ็ต
          </Button>
        </Stack>
      </Typography>
    </Paper>
  );
}
