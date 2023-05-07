import React, { Component, useState, useEffect, useRef } from 'react'
import { CardHeader, Box, Card, Button, Grid, Container, Typography } from '@mui/material';
import { ReplaceTeachAPIServiceTeacher, ReplaceTeachAPIServiceStaff } from '../../Service/ReplaceTeachAPIService';
import MemberAPIService, { MemberAPIServiceTeacher, MemberAPIServiceStaff } from '../../Service/MemberAPIService';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import CardDatePicker from '../../Component/CardDatePicker';
import CardSelect from '../../Component/CardSelect'
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../../Component/PDFTeach_Teacher";

export default class ReplaceTeach extends Component {

  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      dataReplaceTeach: [],
      faculty: [],
      yearSelected: null,
      semesterSelected: null,
      disableState: true
    }
  }

  componentDidMount() {
    MemberAPIService.getAllFaculty().then((res) => {
      this.setState({ faculty: res.data });
    })
  }

  updateState = () => {
    ReplaceTeachAPIServiceTeacher.getAll(this.state.yearSelected, this.state.semesterSelected).then((res) => {
      this.setState({ dataReplaceTeach: res.data });
      console.log("LookOutB", Date.now(), "Wow");
    })
  }

  setYearSelected = (item) => {
    this.setState({
      yearSelected: item,
    })
  }

  setSemesterSelected = (item) => {
    this.setState({
      semesterSelected: item,
    })
  }

  setDisable = () => {
    this.updateState();
    this.setState({
      disableState: false
    })
  }

  render() {
    return (
      <div>
        <HeaderBox title={"การจัดการสอนแทน"} />
        <SelectionBox title={"เมนูตัวเลือกรายการ"} setYearSelected={this.setYearSelected.bind(this)}
          setSemesterSelected={this.setSemesterSelected.bind(this)} setDisable={this.setDisable.bind(this)} />
        <MenagementBox title={"เมนูจัดการรายการ"} faculty={this.state.faculty} updateState={this.updateState.bind(this)}
          disableState={this.state.disableState} dataReplaceTeach={this.state.dataReplaceTeach} />
      </div>
    )
  }
}

function HeaderBox(props) {
  return (
    <Box sx={{ pt: 2, pl: 3, pr: 2 }}>
      <Typography variant="h3" component="h3" fontWeight="bold" > {props.title} </Typography>
    </Box>
  )
}

function SelectionBox(props) {

  const currentYear = new Date().getFullYear();

  const yearOptions = [
    { key: '1', value: currentYear, text: currentYear + 543 },
    { key: '2', value: currentYear - 1, text: currentYear + 543 - 1 },
    { key: '3', value: currentYear - 2, text: currentYear + 543 - 2 },
    { key: '4', value: currentYear - 3, text: currentYear + 543 - 3 },
  ];

  const semesterOptions = [
    { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
    { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
    { key: '3', value: '3', text: 'ภาคการศึกษาฤดูร้อน' }
  ]

  const [yearsSelected, setYearsSelected] = useState(null);
  const [semesterSelected, setSemesterSelected] = useState(null);

  const handleChangeYear = (event) => {
    props.setYearSelected(event.target.value);
    setYearsSelected(event.target.value);
    localStorage.setItem('holderYear', event.target.value);
  };

  const handleChangeSemester = (event) => {
    props.setSemesterSelected(event.target.value);
    setSemesterSelected(event.target.value);
    localStorage.setItem('holderSemester', event.target.value);
  };

  useEffect(() => {
    props.setYearSelected(localStorage.getItem('holderYear'));
    setYearsSelected(localStorage.getItem('holderYear'));
    props.setSemesterSelected(localStorage.getItem('holderSemester'));
    setSemesterSelected(localStorage.getItem('holderSemester'));
  }, [])

  useEffect(() => {
    if (yearsSelected != null && semesterSelected != null) {
      props.setDisable();
    }
  }, [yearsSelected, semesterSelected])

  return (
    <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
          <Grid item sm={6} xs={6}>
            <CardSelect labelPara="เลือกปีการศึกษา" menuItemPara={yearOptions} onChangePara={handleChangeYear} valuePara={yearsSelected} />
          </Grid>
          <Grid item sm={6} xs={6}>
            <CardSelect labelPara="เลือกภาคการศึกษา" menuItemPara={semesterOptions} onChangePara={handleChangeSemester} valuePara={semesterSelected} />
          </Grid>
        </Grid>
      </Card>
    </Container >
  )
}

function MenagementBox(props) {

  //state

  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [editButtonState, setEditButtonState] = useState(true);
  const [memberReplaceOptions, setMemberReplaceOptions] = useState([]);
  const [memberReplaceSelected, setMemberReplaceSelected] = useState(null);
  const [OrganizOptions, setOrganizOption] = useState([]);
  const [OrganizSelected, setOrganizSelected] = useState(null);
  const [facultyOption, setFacultyOption] = useState([]);
  const [facultySelected, setFacultySelected] = useState(null);
  const [editTemp, setEditTemp] = useState(null);
  const [organizOptionStatus, setOrganizOptionStatus] = useState(true);

  //function

  useEffect(() => {
    confirmTiggleUseEffect();
  }, [memberReplaceSelected]);

  useEffect(() => {
    editTiggleUseEffect();
  }, [OrganizSelected]);

  useEffect(() => {

    MemberAPIServiceTeacher.getMemberOrganiz().then((res) => {
      setFacultySelected(res.data.faculty);
      MemberAPIService.getAllOrganiz(res.data.faculty).then((resB) => {
        setOrganizOption(resB.data);
        setOrganizSelected(res.data.organiz);
      })
    })
    setOrganizOptionStatus(false);

  }, []);

  useEffect(() => {
    setFacultyOption(props.faculty);
  }, [props.faculty]);

  const handleChangeFaculty = (event) => {
    setFacultySelected(event.target.value);
    MemberAPIService.getAllOrganiz(event.target.value).then((res) => {
      setOrganizOption(res.data);
    })
    setOrganizOptionStatus(false);
    setOrganizSelected(null)
  };

  const handleChangOrganizSelected = (event) => {
    console.log("LookOutA", Date.now(), "Wow");
    setOrganizSelected(event.target.value);
    setMemberReplaceSelected(null);
    setEditTemp(null);
    console.log("LookOutB", Date.now(), "Wow");
  };

  const handleChangMemberReplace = (event) => {
    setMemberReplaceSelected(event.target.value);
  };

  const handleCancel = () => {
    setMemberReplaceSelected(null);
    setEditTemp(null);
  };

  const handleEdit = (dataInside) => () => {
    setEditTemp(dataInside.replaceTeachId);
    setMemberReplaceSelected(dataInside.memberReplaceId);
    ReplaceTeachAPIServiceTeacher.getMemberReplaceOption(dataInside.replaceTeachId, OrganizSelected).then((res) => {
      setMemberReplaceOptions(res.data);
    });
  }

  const handleConfirm = (dataInside) => () => {
    console.log("LookOutA", Date.now(), "Wow");
    ReplaceTeachAPIServiceTeacher.update(dataInside.replaceTeachId, memberReplaceSelected).then(() => {
      setMemberReplaceOptions([]);
      setMemberReplaceSelected(null);
      setEditTemp(null);
      props.updateState();
    });

  }

  const confirmTiggleUseEffect = () => {
    if (memberReplaceSelected !== null) {
      setSubmitButtonState(false)
    } else {
      setSubmitButtonState(true)
    }
  }

  const editTiggleUseEffect = () => {
    if (OrganizSelected !== null) {
      setEditButtonState(false)
    } else {
      setEditButtonState(true)
    }
  }

  const pdfExportComponent = React.useRef(null);

  const ExportHere = (data) => {


    const componentRefPdf = useRef();

    const [dataAA, setDataAA] = useState([]);
    const [dataBB, setDataBB] = useState([]);

    const test = () => {
      console.log("LookOutA", Date.now(), "Wow");
      ReplaceTeachAPIServiceTeacher.getPDFHead(data.data.replaceTeachId).then((dataA) => {
        setDataAA(dataA.data);
        ReplaceTeachAPIServiceTeacher.getPDFBody(data.data.leaveTeachId, data.data.replaceTeachId).then((dataB) => {
          setDataBB(dataB.data);
          handlePrint();
          console.log("LookOutB", Date.now(), "Wow");
        });
      });
    }

    const handlePrint = useReactToPrint({
      content: () => componentRefPdf.current,
    });

    return (
      <div>
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRefPdf} dataAAA={dataAA} dataBBB={dataBB} />
        </div>
        <div>
          <Button
            type="ghost"
            onClick={test}
            variant="contained"
            ref={pdfExportComponent}
            papersize="auto"
            margin={40}
            filename={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
          >
            PDF
          </Button>
        </div>
      </div>
    );
  };

  //sort and search
  const headCells = [
    {
      id: 'leaveTeachId',
      numeric: true,
      label: 'รหัสอ้างอิงรายการงดสอน',
    },
    {
      id: 'course_code',
      numeric: true,
      label: 'รหัสวิชา',
    },
    {
      id: 'course_title',
      numeric: true,
      label: 'ชื่อวิชา',
    },
    {
      id: 'group_name',
      numeric: true,
      label: 'กลุ่มเรียน',
    },
    {
      id: 'start_time',
      numeric: true,
      label: 'เริ่มสอน',
    },
    {
      id: 'end_time',
      numeric: true,
      label: 'สิ้นสุด',
    },
    {
      id: 'date',
      numeric: true,
      label: 'วันที่งดสอน',
    },
    {
      id: 'memberTechingName',
      numeric: true,
      label: 'ชื่ออาจารย์งดสอน',
    },
    {
      id: 'memberReplaceName',
      numeric: true,
      label: 'ชื่ออาจารย์สอนแทน',
    },
    {
      id: 'option',
      numeric: true,
      label: 'ตัวเลือก',
    },
  ];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');

  const [filteredData, setFilteredData] = useState(props.dataReplaceTeach);
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  useEffect(() => {
    setFilteredData(props.dataReplaceTeach);
  }, [props.dataReplaceTeach])

  useEffect(() => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    setFilteredData(searchValue === '' ? props.dataReplaceTeach : props.dataReplaceTeach.filter((data) => {
      return Object.keys(data).some((field) => {
        return searchRegex.test(data[field].toString());
      });

    }))
  }, [searchValue])

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }



  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //render

  return (
    <Container maxWidth='false' sx={{ pt: 2, pb: 2, display: props.disableState ? 'none' : 'block' }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
          <Grid item sm={12} xs={12}>
            <TableContainer >
              <Grid container spacing={2} sx={{ pt: 0, pb: 3, pl: 3, pr: 3 }} >
                <Grid item sm={6} xs={6}>
                  <Box dir="ltr" sx={{ pb: 2, display: 'flex', alignItems: 'flex-end', }}>
                    <TextField
                      dir="ltr"
                      sx={{ width: 300, }}
                      fullWidth
                      id="filled-flexible"
                      label="ค้นหา"
                      value={searchValue || ''}
                      onChange={handleChange}
                      variant="standard"
                    />
                    <SearchIcon />
                  </Box>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <Box dir="rtl" spacing={2} sx={{ pt: 2, display: 'flex', alignItems: 'flex-end', }}>
                    <Stack dir="ltr" direction="row" spacing={2}>
                      <CardSelect labelPara="เลือกคณะของผู้สอนแทน" minWidthPara={200} menuItemPara={facultyOption} onChangePara={handleChangeFaculty} valuePara={facultySelected} />
                      <CardSelect labelPara="เลือกสาขาของผู้สอนแทน" minWidthPara={200} disabledPara={organizOptionStatus} menuItemPara={OrganizOptions} onChangePara={handleChangOrganizSelected} valuePara={OrganizSelected} />
                    </Stack >
                  </Box>
                </Grid>
              </Grid>
              <Table sx={{ minWidth: 650, }} aria-label="simple table">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredData.length}
                />
                <TableBody>
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .map((row, index) => {
                      const labelId = index;
                      if (editTemp !== row.replaceTeachId) {
                        return (
                          <TableRow key={row.replaceTeachId} >
                            <TableCell id={labelId} scope="row" width="8%" align="left" >{row.leaveTeachId}</TableCell>
                            <TableCell width="10%" align="left">{row.course_code}</TableCell>
                            <TableCell width="15%" align="left">{row.course_title}</TableCell>
                            <TableCell width="5%" align="left">{row.group_name}</TableCell>
                            <TableCell width="8%" align="left">{row.start_time}</TableCell>
                            <TableCell width="8%" align="left">{row.end_time}</TableCell>
                            <TableCell width="8%" align="left">
                              {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </TableCell>
                            <TableCell width="15%" align="left">{row.memberTechingName}</TableCell>
                            <TableCell width="15%" align="left">{row.memberReplaceName}</TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 50 }} disabled={editButtonState} color="inherit" onClick={handleEdit(row)} variant="contained" >แก้ไข</Button>
                                <ExportHere data={row} />
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={row.replaceTeachId} >
                            <TableCell width="8%" id={labelId} scope="row" align="left">
                              {row.leaveTeachId}
                            </TableCell>
                            <TableCell width="15%" align="left">
                              {row.course_code}
                            </TableCell>
                            <TableCell width="20%" align="left">
                              {row.course_title}
                            </TableCell>
                            <TableCell width="5%" align="left">
                              {row.group_name}
                            </TableCell>
                            <TableCell width="8%" align="left">
                              {row.start_time}
                            </TableCell>
                            <TableCell width="8%" align="left">
                              {row.end_time}
                            </TableCell>
                            <TableCell width="8%" align="left">
                              {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </TableCell>
                            <TableCell width="15%" align="left">
                              {row.memberTechingName}
                            </TableCell>
                            <TableCell width="15%" align="left">
                              <CardSelect minWidthPara={150} labelPara="เลือกอาจารย์สอนแทน" menuItemPara={memberReplaceOptions} onChangePara={handleChangMemberReplace} valuePara={memberReplaceSelected} />
                            </TableCell>
                            <TableCell align="left">
                              <Stack key={row.replaceTeachId} direction="row" spacing={2}>
                                <Button key={row.replaceTeachId + 1} sx={{ width: 50 }} color="success" endIcon={<SaveIcon />} disabled={submitButtonState} onClick={handleConfirm(row)} variant="contained" >ยืนยัน</Button>
                                <Button key={row.replaceTeachId + 2} sx={{ width: 50 }} color="inherit" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}