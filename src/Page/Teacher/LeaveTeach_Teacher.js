import React, { Component, useState, useEffect } from 'react' 
import { CardHeader, Box, Card, Button, Grid, Container, Typography } from '@mui/material';
import { LeaveTeachAPIServiceTeacher, LeaveTeachAPIServiceStaff } from '../../Service/LeaveTeachAPIService';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import CardDatePicker from '../../Component/CardDatePicker';
import CardSelect from '../../Component/CardSelect'
import CardTextField from '../../Component/CardTextField'
import FullFeaturedCrudGrid from '../../Component/CardDataGrid';
import Moment from 'react-moment';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';


//@todo 1.ฟังก์ชัน update  2.การแสดงผล วันที่ วว/ดด/ปปปป
export default class LeaveTeach extends Component {

  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      dataLeaveTeach: [],
      yearSelected: null,
      semesterSelected: null,
      disableState: true
    }
  }

  componentDidMount() {

  }

  updateState = () => {
    LeaveTeachAPIServiceTeacher.getAllTeacherLeaveTeach(this.state.yearSelected,this.state.semesterSelected).then((res) => {
      this.setState({ dataLeaveTeach: res.data });
      console.log("LookOutB",Date.now(),"Wow");
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

        <HeaderBox title={"การจัดการวันงดสอน"} />

        <SelectionBox title={"เมนูตัวเลือกรายการ"} setYearSelected={this.setYearSelected.bind(this)}
          setSemesterSelected={this.setSemesterSelected.bind(this)} setDisable={this.setDisable.bind(this)} />

        <CreationBox title={"เมนูสร้างรายการ"} updateState={this.updateState.bind(this)} disableState={this.state.disableState}
          yearSelected={this.state.yearSelected} semesterSelected={this.state.semesterSelected} />

        <MenagementBox title={"เมนูจัดการรายการ"} updateState={this.updateState.bind(this)} dataLeaveTeach={this.state.dataLeaveTeach}
          disableState={this.state.disableState} yearSelected={this.state.yearSelected} semesterSelected={this.state.semesterSelected} />

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
    if (yearsSelected != null && semesterSelected != null ) {
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

function CreationBox(props) {

  const currentYear = new Date().getFullYear();

  //state
  const [confirmButtonState, setConfirmButtonState] = useState(true);
  const [dateStartSelected, setDateStartSelected] = useState(null);
  const [dateEndSelected, setDateEndSelected] = useState(null);
  const [semesterSelected, setSemesterSelected] = useState(null);
  const [reasonNote, setReasonNote] = useState(null);
  const [yearSelected, setYearSelected] = useState(null);



  //function
  useEffect(() => {
    confirmTiggleUseEffect();
  }, [dateStartSelected, dateEndSelected, props.semesterSelected, reasonNote]);


  const handleChangYear = (event) => {
    setYearSelected(event.target.value);
  };

  const handleChangSemester = (event) => {
    setSemesterSelected(event.target.value);
  };

  const handleChangDateStart = (value) => {
    setDateStartSelected(format(new Date(value), 'yyyy-MM-dd').toString());

  };

  const handleChangDateEnd = (value) => {
    setDateEndSelected(format(new Date(value), 'yyyy-MM-dd').toString());
  };

  const handleChangNote = (event) => {
    setReasonNote(event.target.value);
  };

  const handleCancel = () => {
    setYearSelected(null);
    setDateStartSelected(null);
    setDateEndSelected(null);
    setSemesterSelected(null);
    setReasonNote(null);
  };

  const handleSubmit = () => {
    console.log("LookOutA",Date.now(),"Wow");
    LeaveTeachAPIServiceTeacher.createLeaveTeach(props.semesterSelected, props.yearSelected, dateStartSelected, dateEndSelected, reasonNote).then(() => {
      props.updateState();
      setYearSelected(null);
      setDateStartSelected(null);
      setDateEndSelected(null);
      setSemesterSelected(null);

    });
  };

  const confirmTiggleUseEffect = () => {
    if (dateStartSelected !== null && dateEndSelected !== null && props.semesterSelected !== null && reasonNote !== null) {
      if (dateStartSelected === null || dateEndSelected === null || props.semesterSelected === '' || reasonNote === '') {
        setConfirmButtonState(true)
      } else {
        setConfirmButtonState(false)
      }
    } else {
      setConfirmButtonState(true)
    }
  }

  return (
    <Container maxWidth='false' sx={{ display: props.disableState ? 'none' : 'block' }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ p: 2 }} >
          <Grid item xs={12} sm={6} >
            <CardDatePicker labelPara="วันที่งดสอน" onChangePara={handleChangDateStart} valuePara={dateStartSelected} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDatePicker labelPara="ถึงวันที่" onChangePara={handleChangDateEnd} valuePara={dateEndSelected} />
          </Grid>
          <Grid item xs={12}>
            <CardTextField labelPara="เหตุผลที่งดสอน" onChangePara={handleChangNote} required valuePara={reasonNote} />
          </Grid>
          <Grid item xs={12}>
            <Box component="span" sx={{ pr: 2 }}>
              <Button color="error" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
            </Box>
            <Box component="span" sx={{ pr: 2 }} >
              <Button color="success" endIcon={<SendIcon />} onClick={handleSubmit} variant="contained"  >บันทึก</Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container >
  )
}

function MenagementBox(props) {

  const currentYear = new Date().getFullYear();

  const yearOptions = [
    { key: '1', value: currentYear, text: currentYear + 543 },
    { key: '2', value: currentYear - 1, text: currentYear + 543 - 1 },
    { key: '3', value: currentYear - 2, text: currentYear + 543 - 2 },
    { key: '3', value: currentYear - 3, text: currentYear + 543 - 3 }
  ];

  const semester = [
    { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
    { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
    { key: '3', value: '3', text: 'ภาคการศึกษาฤดูร้อน' }
  ]

  //state

  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [yearSelected, setYearSelected] = useState(null);
  const [semesterSelected, setSemesterSelected] = useState(null);
  const [dateStartSelected, setDateStartSelected] = useState(null);
  const [dateEndSelected, setDateEndSelected] = useState(null);
  const [reasonNote, setReasonNote] = useState(null);
  const [editTemp, setEditTemp] = useState(null);
  const [buttonState, setButtonState] = useState(true);

  //function

  useEffect(() => {
    confirmTiggleUseEffect();
  }, [dateStartSelected, dateEndSelected, semesterSelected, reasonNote]);


  const handleChangYear = (event) => {
    setYearSelected(event.target.value);
  };

  const handleChangSemester = (event) => {
    setSemesterSelected(event.target.value);
  };

  const handleChangDateStart = (value) => {
    setDateStartSelected(format(new Date(value), 'yyyy-MM-dd').toString());

  };

  const handleChangDateEnd = (value) => {
    setDateEndSelected(format(new Date(value), 'yyyy-MM-dd').toString());
  };

  const handleChangNote = (event) => {
    setReasonNote(event.target.value);
  };

  const handleCancel = () => {
    setYearSelected(null);
    setSemesterSelected(null);
    setDateStartSelected(null);
    setDateEndSelected(null);
    setReasonNote(null);
    setEditTemp(null);
  };

  const convertDate = (dateStr) => {
    const dateArr = dateStr.split('-');
    const yearNum = parseInt(dateArr[0]);
    const year = yearNum;
    return year + "-" + dateArr[1] + "-" + dateArr[2];
  }

  const handleEdit = (dataInside) => () => {
    setEditTemp(dataInside.id);
    setYearSelected(dataInside.years_value);
    setSemesterSelected(dataInside.semester);
    setDateStartSelected(format(new Date(convertDate(dataInside.dateStart_value)), 'yyyy-MM-dd').toString());
    setDateEndSelected(format(new Date(convertDate(dataInside.dateEnd_value)), 'yyyy-MM-dd').toString());
    setReasonNote(dataInside.note);
  }

  const handleDelete = (dataInside) => () => {
    console.log("LookOutA",Date.now(),"Wow");
    LeaveTeachAPIServiceTeacher.deleteTeacherLeaveTeach(dataInside.id).then(() => {
      props.updateState();
    });
  }

  const handleConfirm = (dataInside) => () => {
    console.log("LookOutA",Date.now(),"Wow");
    LeaveTeachAPIServiceTeacher.updateTeacherLeaveTeach(dataInside.id, yearSelected, semesterSelected, dateStartSelected, dateEndSelected, reasonNote).then(() => {
      setEditTemp(null);
      setYearSelected(null);
      setSemesterSelected(null);
      setDateStartSelected(null);
      setDateEndSelected(null);
      setReasonNote(null);
      props.updateState();
    });
  }

  const confirmTiggleUseEffect = () => {
    if (dateStartSelected !== null && dateEndSelected !== null && semesterSelected !== null && reasonNote !== null) {
      if (dateStartSelected === null || dateEndSelected === null || semesterSelected === '' || reasonNote === '') {
        setSubmitButtonState(true)
      } else {
        setSubmitButtonState(false)
      }
    } else {
      setSubmitButtonState(true)
    }
  }

  //sort and search

  const headCells = [
    {
      id: 'id',
      numeric: true,
      label: 'รหัส รายการงดสอน',
    },
    {
      id: 'dateStart',
      numeric: true,
      label: 'วันที่งดสอน',
    },
    {
      id: 'dateEnd',
      numeric: true,
      label: 'ถีงวันที่',
    },
    {
      id: 'note',
      numeric: true,
      label: 'เหตุผลที่งดสอน',
    },
    {
      id: 'option',
      numeric: true,
      label: 'ตัวเลือก',
    },
  ];

  const [filteredData, setFilteredData] = useState(props.dataLeaveTeach);
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
    setFilteredData(props.dataLeaveTeach);
  }, [props.dataLeaveTeach])

  useEffect(() => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    setFilteredData(searchValue === '' ? props.dataLeaveTeach : props.dataLeaveTeach.filter((data) => {
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

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

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
              <Box dir="rtl" sx={{ pb: 3, display: 'flex', alignItems: 'flex-end', }}>
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
                      if (editTemp !== row.id) {
                        return (
                          <TableRow key={row.id} >
                            <TableCell width="15%" id={labelId} scope="row" align="left" >{row.id}</TableCell>
                            <TableCell width="20%" align="left">
                              {new Date(row.dateStart).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </TableCell>
                            <TableCell width="20%" align="left">
                              {new Date(row.dateEnd).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </TableCell>
                            <TableCell width="15%" align="left">{row.note}</TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 75 }} color="inherit" onClick={handleEdit(row)} variant="contained" >แก้ไข</Button>
                                <Button sx={{ width: 75 }} color="error" endIcon={<DeleteForeverIcon />} onClick={handleDelete(row)} variant="contained"  >ลบ</Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={row.id} >
                            <TableCell id={labelId} scope="row" align="left">
                              {row.id}
                            </TableCell>
                            <TableCell align="left">
                              <CardDatePicker labelPara="วันที่งดสอน" onChangePara={handleChangDateStart} valuePara={dateStartSelected} />
                            </TableCell>
                            <TableCell align="left">
                              <CardDatePicker labelPara="ถึงวันที่" onChangePara={handleChangDateEnd} valuePara={dateEndSelected} />
                            </TableCell>
                            <TableCell align="left">
                              <CardTextField labelPara="เหตุผลที่งดสอน" onChangePara={handleChangNote} required valuePara={reasonNote} />
                            </TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 75 }} color="success" endIcon={<SaveIcon />} disabled={submitButtonState} onClick={handleConfirm(row)} variant="contained" >ยืนยัน</Button>
                                <Button sx={{ width: 75 }} color="inherit" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
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