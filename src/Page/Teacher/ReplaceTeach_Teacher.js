import React, { Component, useState, useEffect } from 'react'
import APIService from '../../Service/FernAPIService'
import { CardHeader, Box, Card, Button, Grid, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import CardDatePicker from '../../Component/CardDatePicker';
import CardSelect from '../../Component/CardSelect'
import CardTextField from '../../Component/CardTextField'
import FullFeaturedCrudGrid from '../../Component/CardDataGrid';
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

export default class ReplaceTeach extends Component {

  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      dataLeaveTeach: []
    }
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    APIService.showAllTeacherLeaveTeach().then((res) => {
     
    })
  }

  render() {
    return (
      <div>
        <HeaderBox title={"การจัดการสอนแทน"} />
        <CreationBox  title={"เมนูสร้างรายการ"} updateState={this.updateState.bind(this)} />
        <MenagementBox title={"เมนูจัดการรายการ"} updateState={this.updateState.bind(this)} dataLeaveTeach={this.state.dataLeaveTeach} />
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

function CreationBox(props) {

  const semester = [
    { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
    { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
    { key: '3', value: '3', text: 'ภาคการศึกษาที่ฤดูร้อน' }
  ]

  //state
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [dateStartSelected, setDateStartSelected] = useState(null);
  const [dateEndSelected, setDateEndSelected] = useState(null);
  const [semesterSelected, setSemesterSelected] = useState(null);
  const [reasonNote, setReasonNote] = useState(null);
  const [yearSelected, setYearSelected] = useState(new Date, 'YYYY');


  //function
  useEffect(() => {
    confirmTiggleUseEffect();
  }, [dateStartSelected, dateEndSelected, semesterSelected, reasonNote]);

  const handleChangDateStart = (value) => {
    setDateStartSelected(format(new Date(value), 'yyyy-MM-dd').toString());
  };

  const handleChangDateEnd = (value) => {
    setDateEndSelected(format(new Date(value), 'yyyy-MM-dd').toString());
  };

  const handleChangSemester = (event) => {
    setSemesterSelected(event.target.value);
  };

  const handleChangNote = (event) => {
    setReasonNote(event.target.value);
  };

  const handleCancel = () => {
    setDateStartSelected(null);
    setDateEndSelected(null);
    setSemesterSelected(null);
    setReasonNote(null);
  };

  const handleSubmit = () => {
    APIService.createLeaveTeach(semesterSelected, yearSelected.getFullYear() + 543, dateStartSelected, dateEndSelected, reasonNote).then(() => {
      props.updateState();
      setDateStartSelected(null);
      setDateEndSelected(null);
      setSemesterSelected(null);
      setReasonNote(null);
    });
  };

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

  return (
    <Container maxWidth='false' sx={{ pt: 2, }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ p: 2 }} >
          <Grid item sm={6} xs={12}>
            <CardSelect labelPara="ภาคการศึกษา" menuItemPara={semester} onChangePara={handleChangSemester} valuePara={semesterSelected} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <CardTextField labelPara="ปีการศึกษา" valuePara={yearSelected.getFullYear()} readOnlyPara={true} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDatePicker labelPara="วันที่งดสอน" onChangePara={handleChangDateStart} valuePara={dateStartSelected} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDatePicker labelPara="ถึงวันที่" onChangePara={handleChangDateEnd} valuePara={dateEndSelected} />
          </Grid>
          <Grid item xs={12}>
            <CardTextField labelPara="เหตุผลที่ไม่ได้สอน" onChangePara={handleChangNote} required valuePara={reasonNote} />
          </Grid>
          <Grid item xs={12}>
            <Box component="span" sx={{ pr: 2 }}>
              <Button color="error" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
            </Box>
            <Box component="span" sx={{ pr: 2 }} >
              <Button color="success" disabled={submitButtonState} endIcon={<SendIcon />} onClick={handleSubmit} variant="contained"  >บันทึก</Button>
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
    setDateStartSelected(null);
    setDateEndSelected(null);
    setSemesterSelected(null);
    setReasonNote(null);
    setEditTemp(null);
  };

  const handleEdit = (dataInside) => () => {
    setEditTemp(dataInside.id); 
    setYearSelected(dataInside.years); // แก้การแสดงผลปี
    setDateStartSelected(dataInside.semester);
    setDateEndSelected(dataInside.dateStart);
    setSemesterSelected(dataInside.dateEnd);
    setReasonNote(dataInside.note);
  }

  const handleDelete = (dataInside) => () => {

  }

  const handleConfirm = (dataInside) => () => {

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
      id: 'years',
      numeric: true,
      label: 'ปีการศึกษา',
    },
    {
      id: 'semester',
      numeric: true,
      label: 'ภาคการศึกษา',
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

  const handleChange = (e) => {
    setSearchValue(e.target.value)
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
    <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
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
                            <TableCell width="20%" id={labelId} scope="row" align="left" >{row.years}</TableCell>
                            <TableCell width="20%" align="left">{row.semester}</TableCell>
                            <TableCell width="20%" align="left">{row.dateStart}</TableCell>
                            <TableCell width="20%" align="left">{row.dateEnd}</TableCell>
                            <TableCell width="20%" align="left">{row.note}</TableCell>
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
                              <CardSelect labelPara="ปีการศึกษา" menuItemPara={yearOptions} onChangePara={handleChangYear} valuePara={yearSelected} />
                            </TableCell>
                            <TableCell align="left">
                              <CardSelect labelPara="ภาคการศึกษา" menuItemPara={semester} onChangePara={handleChangSemester} valuePara={semesterSelected} />
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
                                <Button sx={{ width: 75 }} color="success" endIcon={<SaveIcon />} disabled={buttonState} onClick={handleConfirm(row)} variant="contained" >ยืนยัน</Button>
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
