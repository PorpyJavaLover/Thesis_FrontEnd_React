import React, { Component, useState, useEffect } from 'react'
import APIService from '../../Service/FernAPIService'
import { CardHeader, Box, Card, Button, Grid, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import CardDatePicker from '../../Component/CardDatePicker';
import CardSelect from '../../Component/CardSelect'
import CardTextField from '../../Component/CardTextField'
import FullFeaturedCrudGrid from '../../Component/CardDataGrid';
import Moment from 'react-moment';

export default class LeaveTeach extends Component {

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
      this.setState({ dataLeaveTeach: res.data });
    })
  }

  render() {
    return (
      <div>
        <HeaderBox title={"การจัดการการลา"} />
        <CreationBox title={"เมนูสร้างรายการ"} updateState={this.updateState.bind(this)} />
        <ManagementBox title={"เมนูจัดการรายการ"} updateState={this.updateState.bind(this)} dataLeaveTeach={this.state.dataLeaveTeach} />
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
  const [dateStartSelected, setDateStartSelected] = useState(null);
  const [dateEndSelected, setDateEndSelected] = useState(null);
  const [semesterSelected, setSemesterSelected] = useState(null);
  const [reasonNote, setReasonNote] = useState(null);
  const [yearSelected, setYearSelected] = useState(null);


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
    setDateStartSelected(null);
    setDateEndSelected(null);
    setSemesterSelected(null);
    setReasonNote(null);
  };

  const handleSubmit = () => {
    APIService.createLeaveTeach(semesterSelected, yearSelected , dateStartSelected, dateEndSelected, reasonNote).then(() => {
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
          <Grid item xs={12} sm={6} >
            <CardSelect labelPara="ปีการศึกษา" menuItemPara={yearOptions} onChangePara={handleChangYear} valuePara={yearSelected} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CardSelect labelPara="ภาคการศึกษา" menuItemPara={semester} onChangePara={handleChangSemester} valuePara={semesterSelected} />
          </Grid>
          <Grid item xs={12} sm={6} >
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

function ManagementBox(props) {

  const columns = [
    { flex: 1, field: 'semester', headerName: 'ภาคการศึกษา', editable: true, minWidth: 200 },
    { flex: 1, field: 'years', headerName: 'ปีการศึกษา', minWidth: 200 },
    { flex: 1, field: 'dateStart', headerName: 'วันที่ลา', editable: true, minWidth: 200 , type: 'date' },
    { flex: 1, field: 'dateEnd', headerName: 'ถึงวันที่', editable: true, minWidth: 200 },
    { flex: 1, field: 'note', headerName: 'หมายเหตุ', editable: true, minWidth: 200 },
  ];

  const callDeleteAPI = (leaveTeachId) => {
    APIService.deleteTeacherLeaveTeach(leaveTeachId).then((res) => {
      props.updateState();
    })
  };

  const callPutAPI = (value) => {
    APIService.updateTeacherLeaveTeach(value.id, value.years, value.semester, value.dateStart, value.dateEnd, value.note).then((res) => {
      props.updateState();
    })
  };

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(props.dataLeaveTeach);
  }, [props.dataLeaveTeach])

  return (
    <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ p: 2, pt: 4, pl: 4, }} >
          <FullFeaturedCrudGrid rowsPara={rows} columnsPara={columns} callDeleteAPI={callDeleteAPI} callPutAPI={callPutAPI} />
        </Grid>
      </Card>
    </Container >
  )
}