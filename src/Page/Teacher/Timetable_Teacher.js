import React, { Component, useState, useEffect } from 'react'
import { CardHeader, Box, Card, Button, Grid, Container, Typography, } from '@mui/material';
import CardSelect from '../../Component/CardSelect'
import { TimetableAPIServiceTeacher , TimetableAPIServiceStaff } from '../../Service/TimetableAPIService';
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
import ToggleButton from '@mui/material/ToggleButton';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TodayIcon from '@mui/icons-material/Today';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export default class TimetableTeacher extends Component {

  constructor(props) {
    super(props);
    this.updateState.bind(this);
    this.state = {
      dataTimetable: []
    }
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    TimetableAPIServiceTeacher.getTimetable().then((res) => {
      this.setState({ dataTimetable: res.data });
    })
  }

  render() {
    return (
      <div >
        <HeaderBox title={"การจัดการรายวิชา"} />
        <ManagementBox title={"เมนูจัดการรายการ"} updateState={this.updateState} dataTimetable={this.state.dataTimetable} />
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

function ManagementBox(props) {

  let dayOfWeekOptions = [
    { key: '1', value: 1, text: 'วันจันทร์' },
    { key: '2', value: 2, text: 'วันอังคาร' },
    { key: '3', value: 3, text: 'วันพุธ' },
    { key: '4', value: 4, text: 'วันพฤหัสบดี' },
    { key: '5', value: 5, text: 'วันศุกร์' },
    { key: '6', value: 6, text: 'วันเสาร์' },
    { key: '7', value: 7, text: 'วันอาทิตย์' }
  ];

  const timeStartOptionTemplate = [
    { key: '1', value: '08:00:00', text: '08:00:00' },
    { key: '2', value: '09:00:00', text: '09:00:00' },
    { key: '3', value: '10:00:00', text: '10:00:00' },
    { key: '4', value: '11:00:00', text: '11:00:00' },
    { key: '5', value: '12:00:00', text: '12:00:00' },
    { key: '6', value: '13:00:00', text: '13:00:00' },
    { key: '7', value: '14:00:00', text: '14:00:00' },
    { key: '8', value: '15:00:00', text: '15:00:00' },
    { key: '9', value: '16:00:00', text: '16:00:00' },
    { key: '10', value: '17:00:00', text: '17:00:00' },
    { key: '11', value: '18:00:00', text: '18:00:00' },
    { key: '12', value: '19:00:00', text: '19:00:00' },
    { key: '13', value: '20:00:00', text: '20:00:00' },
    { key: '14', value: '21:00:00', text: '21:00:00' },
  ];

  const timeEndOptionTemplate = [
    { key: '1', value: '09:00:00', text: '09:00:00' },
    { key: '2', value: '10:00:00', text: '10:00:00' },
    { key: '3', value: '11:00:00', text: '11:00:00' },
    { key: '4', value: '12:00:00', text: '12:00:00' },
    { key: '5', value: '13:00:00', text: '13:00:00' },
    { key: '6', value: '14:00:00', text: '14:00:00' },
    { key: '7', value: '15:00:00', text: '15:00:00' },
    { key: '8', value: '16:00:00', text: '16:00:00' },
    { key: '9', value: '17:00:00', text: '17:00:00' },
    { key: '10', value: '18:00:00', text: '18:00:00' },
    { key: '11', value: '19:00:00', text: '19:00:00' },
    { key: '12', value: '20:00:00', text: '20:00:00' },
    { key: '13', value: '21:00:00', text: '21:00:00' },
    { key: '14', value: '22:00:00', text: '22:00:00' }
  ];

  //state

  const [editTemp, setEditTemp] = useState(null);
  const [timeStartOptions, setTimeStartOptions] = useState([]);
  const [timeEndOptions, setTimeEndOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [dayOfWeekSelected, setDayOfWeekSelected] = useState(null);
  const [timeStartSelected, setTimeStartSelected] = useState(null);
  const [timeEndSelected, setTimeEndSelected] = useState(null);
  const [roomSelected, setRoomSelected] = useState(null);
  const [buttonState, setButtonState] = useState(true);
  
  //function

  useEffect(() => {
    handleConfirmTiggle();
  }, [dayOfWeekSelected, timeStartSelected, timeEndSelected]);

  useEffect(() => {
    console.log(timeEndSelected);
  }, [timeEndSelected]);



  const handleChangeDayOfWeek = (data) => (event) => {
    setDayOfWeekSelected(event.target.value);
    TimetableAPIServiceStaff.getStartTimeOption(data.years, data.semester, data.course_id, data.course_type, data.group_id, event.target.value, null).then((res) => {
      setTimeStartOptions(res.data);
    })
    TimetableAPIServiceStaff.getEndTimeOption(data.years, data.semester, data.course_id, data.course_type, data.group_id, event.target.value, null).then((res) => {
      setTimeEndOptions(res.data);
    })
    if (timeStartSelected !== null && timeEndSelected != null) {
      TimetableAPIServiceStaff.getRoom(data.years, data.semester, data.course_id, data.course_type, data.group_id, event.target.value, timeStartSelected, timeEndSelected).then((res) => {
        setRoomOptions(res.data);
      })
    }
  };

  const handleChangeTimeStart = (data) => (event) => {
    setTimeStartSelected(event.target.value);
    TimetableAPIServiceStaff.getEndTime(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, event.target.value).then((resA) => {
      setTimeEndSelected(resA.data.value);
      TimetableAPIServiceStaff.getRoom(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, event.target.value, resA.data.value).then((resB) => {
        setRoomOptions(resB.data);
      })
    })
    TimetableAPIServiceStaff.getEndTimeOption(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, event.target.value).then((resA) => {
      setTimeEndOptions(resA.data);
    })
  };

  const handleChangeTimeEnd = (data) => (event) => {
    setTimeEndSelected(event.target.value);
    TimetableAPIServiceStaff.getStartTime(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, event.target.value).then((resA) => {
      setTimeStartSelected(resA.data.value);
      TimetableAPIServiceStaff.getRoom(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, resA.data.value, event.target.value).then((resB) => {
        setRoomOptions(resB.data);
      })
    })
    TimetableAPIServiceStaff.getStartTimeOption(data.years, data.semester, data.course_id, data.course_type, data.group_id, dayOfWeekSelected, event.target.value).then((resA) => {
      setTimeStartOptions(resA.data);
    })

  };

  const handleChangeRoom = (data) => (event) => {
    setRoomSelected(event.target.value);

  };

  const handleConfirmTiggle = () => {
    if (dayOfWeekSelected !== null && timeStartSelected !== null && timeEndSelected !== null) {
      if (dayOfWeekSelected === '' || timeStartSelected === '' || timeEndSelected === '') {
        setButtonState(true)
      } else {
        setButtonState(false)
      }
    } else {
      setButtonState(true)
    }
  }

  const handleConfirm = (dataInside) => () => {
    console.log(dayOfWeekSelected, timeStartSelected, timeEndSelected, roomSelected);
    TimetableAPIServiceStaff.update(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dayOfWeekSelected, timeStartSelected, timeEndSelected, roomSelected).then(() => {
      setDayOfWeekSelected(null);
      setTimeStartSelected(null);
      setTimeEndSelected(null);
      setRoomSelected(null);
      setEditTemp(null);
      setTimeStartOptions([]);
      setTimeEndOptions([]);
      setRoomOptions([])
      props.updateState();
    });
  }

  const handleCancel = () => {
    setDayOfWeekSelected(null);
    setTimeStartSelected(null);
    setTimeEndSelected(null);
    setEditTemp(null);
    setTimeStartOptions([]);
    setTimeEndOptions([]);
  }

  const handleEdit = (dataInside) => () => {
    setEditTemp(dataInside.id);
    setDayOfWeekSelected(dataInside.day_of_week);
    setTimeStartSelected(dataInside.start_time);
    setTimeEndSelected(dataInside.end_time);
    setRoomSelected(dataInside.room_id);
    if (dataInside.day_of_week !== null) {
      TimetableAPIServiceStaff.getEndTimeOption(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dataInside.day_of_week, null).then((res) => {
        setTimeEndOptions(res.data);
      })
      TimetableAPIServiceStaff.getStartTimeOption(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dataInside.day_of_week, null).then((res) => {
        setTimeStartOptions(res.data);
      })
    } else {
      setTimeEndOptions([]);
      setTimeStartOptions([]);
    }
    if (dataInside.start_time !== null && dataInside.end_time !== null) {
      TimetableAPIServiceStaff.getRoom(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dataInside.day_of_week, dataInside.start_time, dataInside.end_time).then((res) => {
        setRoomOptions(res.data);
      })
    } else {
      setRoomOptions([]);
    }

  }

  const handleDelete = (dataInside) => () => {
    TimetableAPIServiceStaff.deletTimetable(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dataInside.member_Id).then(() => {
      props.updateState();
    })
  }

  const dayConvert = (dayOfWeek_Number) => {
    let day;
    switch (dayOfWeek_Number) {
      case 1:
        day = "วันจันทร์";
        break;
      case 2:
        day = "วันอังคาร";
        break;
      case 3:
        day = "วันพุธ";
        break;
      case 4:
        day = "วันพฤหัสบดี";
        break;
      case 5:
        day = "วันศุกร์";
        break;
      case 6:
        day = "วันเสาร์";
        break;
      case 7:
        day = "วันอาทิตย์";
        break;
    }
    return day;
  }

  //render

  const [filteredData, setFilteredData] = useState(props.dataTimetable);
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  useEffect(() => {
    setFilteredData(props.dataTimetable);
  }, [props.dataTimetable])

  useEffect(() => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    setFilteredData(searchValue === '' ? props.dataTimetable : props.dataTimetable.filter((data) => {
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

  const headCells = [
    {
      id: 'course_type_name',
      numeric: true,
      label: 'ประเภทวิชา',
    },
    {
      id: 'course_code',
      numeric: true,
      label: 'รหัสวิชา',
    },
    {
      id: 'course_name',
      numeric: true,
      label: 'ชื่อวิชา',
    },

    {
      id: 'group_name',
      numeric: true,
      label: 'กลุ่มเรียน',
    },
    {
      id: 'member_name',
      numeric: true,
      label: 'อาจารย์ผู้สอน',
    },
    {
      id: 'day_of_week',
      numeric: true,
      label: 'วันที่สอน',
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
      id: 'room_id',
      numeric: true,
      label: 'ห้อง',
    },
    {
      id: 'option',
      numeric: true,
      label: 'ตัวเลือก',
    },
  ];

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


  const updateTimeLock = (row) => () => {
    TimetableAPIServiceStaff.updateLocker(row.years, row.semester, row.course_id, row.course_type, row.group_id, row.time_locker == false ? true : false, row.room_locker).then((res) => {
      props.updateState();
    });
  };

  const updateRoomLock = (row) => () => {
    TimetableAPIServiceStaff.updateLocker(row.years, row.semester, row.course_id, row.course_type, row.group_id, row.time_locker, row.room_locker == false ? true : false).then((res) => {
      props.updateState();
    });
  };

  const TableCellTime = (row) => {
    if (row.time_locker === true) {
      return <>
        <TableCell width="8%" align="left">{dayConvert(row.day_of_week)}  🔒</TableCell>
        <TableCell width="8%" align="left">{row.start_time}  🔒</TableCell>
        <TableCell width="8%" align="left">{row.end_time}  🔒</TableCell>
      </>
    } else {
      return <>
        <TableCell width="8%" align="left">{dayConvert(row.day_of_week)}</TableCell>
        <TableCell width="8%" align="left">{row.start_time}</TableCell>
        <TableCell width="8%" align="left">{row.end_time}</TableCell>
      </>
    }
  };

  const CardSelectTime = (row) => {
    if (row.time_locker === true) {
      return <><TableCell align="left">  🔒<CardSelect labelPara="วันที่สอน" menuItemPara={dayOfWeekOptions} onChangePara={handleChangeDayOfWeek(row)} valuePara={dayOfWeekSelected} /></TableCell>
        <TableCell align="left">  🔒<CardSelect labelPara="เริ่มสอน" menuItemPara={timeStartOptions} onChangePara={handleChangeTimeStart(row)} valuePara={timeStartSelected} /></TableCell>
        <TableCell align="left">   🔒<CardSelect labelPara="สิ้นสุด" menuItemPara={timeEndOptions} onChangePara={handleChangeTimeEnd(row)} valuePara={timeEndSelected} /></TableCell></>
    } else {
      return <>
        <TableCell >
          <CardSelect labelPara="วันที่สอน" menuItemPara={dayOfWeekOptions} onChangePara={handleChangeDayOfWeek(row)} valuePara={dayOfWeekSelected} />
        </TableCell>
        <TableCell align="left">
          <CardSelect labelPara="เริ่มสอน" menuItemPara={timeStartOptions} onChangePara={handleChangeTimeStart(row)} valuePara={timeStartSelected} />
        </TableCell>
        <TableCell align="left">
          <CardSelect labelPara="สิ้นสุด" menuItemPara={timeEndOptions} onChangePara={handleChangeTimeEnd(row)} valuePara={timeEndSelected} />
        </TableCell>
      </>
    }
  };

  const TableCellRoom = (row) => {
    if (row.room_locker === true) {
      return <TableCell width="8%" align="left">{row.room_name} 🔒</TableCell>
    } else {
      return <TableCell width="8%" align="left">{row.room_name}</TableCell>
    }
  };

  const CardSelectRoom = (row) => {
    if (row.room_locker === true) {
      return <TableCell width="8%" align="left">  🔒<CardSelect disabledPara={buttonState} labelPara="ห้อง" menuItemPara={roomOptions} onChangePara={handleChangeRoom(row)} valuePara={roomSelected} /></TableCell>
    } else {
      return <TableCell align="left"><CardSelect disabledPara={buttonState} labelPara="ห้อง" menuItemPara={roomOptions} onChangePara={handleChangeRoom(row)} valuePara={roomSelected} /></TableCell>
    }
  };

  const autoPilot = () => {
    TimetableAPIServiceStaff.autoPilot().then((res) => {
      props.updateState();
    });
  };

  const clean = (dataInside) => () => {
    TimetableAPIServiceStaff.clean(dataInside.years, dataInside.semester, dataInside.course_id, dataInside.course_type, dataInside.group_id, dataInside.day_of_week, dataInside.start_time, dataInside.end_time, dataInside.room_id, dataInside.time_locker, dataInside.room_locker).then((res) => {
      props.updateState();
    });
  };

  const cleanAll = () => {
    TimetableAPIServiceStaff.cleanAll().then((res) => {
      props.updateState();
    });
  };

  return (
    
    <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
        
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >

          <Grid item sm={12} xs={12}>
            <TableContainer >
              <Grid container spacing={2} sx={{ pt: 0, pb: 3, pl: 3, pr: 3 }} >
                <Grid item sm={6} xs={12}>
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
                      <Button sx={{ width: 150 }} color="inherit" endIcon={<CleaningServicesIcon />} onClick={cleanAll} variant="contained" >ล้างทั้งหมด</Button>
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
                      if (editTemp !== row.id) {
                        return (
                          <TableRow key={row.id} >
                            <TableCell width="8%" id={labelId} scope="row" align="left" >{row.course_type_name}</TableCell>
                            <TableCell width="10%" align="left">{row.course_code}</TableCell>
                            <TableCell width="25%" align="left">{row.course_name}</TableCell>
                            <TableCell width="8%" align="left">{row.group_name}</TableCell>
                            <TableCell width="15%" align="left">{row.member.map((inMember) => {
                              return  <TableRow key={inMember.member_id}> {inMember.member_name} </TableRow>;
                            })}</TableCell>
                            {TableCellTime(row)}
                            {TableCellRoom(row)}
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <ToggleButton sx={{ width: 40, height: 40 }} value='time' onClick={updateTimeLock(row)} selected={row.time_locker}  ><TodayIcon /></ToggleButton>
                                <ToggleButton sx={{ width: 40, height: 40 }} value='room' onClick={updateRoomLock(row)} selected={row.room_locker}   ><MeetingRoomIcon /></ToggleButton>
                                <Button sx={{ width: 50, height: 40 }} color="inherit" onClick={handleEdit(row)} variant="contained" >แก้ไข</Button>
                                <Button sx={{ width: 50, height: 40 }} color="inherit" endIcon={<CleaningServicesIcon />} onClick={clean(row)} variant="contained"  >ล้าง</Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={row.id} >
                            <TableCell width="8%" id={labelId} scope="row" align="left" >{row.group_name}</TableCell>
                            <TableCell width="10%" align="left">{row.course_code}</TableCell>
                            <TableCell width="25%" align="left">{row.course_name}</TableCell>
                            <TableCell width="8%" align="left">{row.course_type_name}</TableCell>
                            <TableCell width="15%" align="left">{row.member.map((inMember) => {
                              return  <TableRow key={inMember.member_id} > {inMember.member_name} </TableRow>;
                            })}</TableCell>
                            {CardSelectTime(row)}
                            {CardSelectRoom(row)}
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 95, height: 40 }} color="success" endIcon={<SaveIcon />} disabled={buttonState} onClick={handleConfirm(row)} variant="contained" >บันทึก</Button>
                                <Button sx={{ width: 50, height: 40 }} color="inherit" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
                                <Button sx={{ width: 50, height: 40 }} color="error" endIcon={<DeleteForeverIcon />} onClick={handleDelete(row)} variant="contained"  >ลบ</Button>
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
    </Container >
  )
}