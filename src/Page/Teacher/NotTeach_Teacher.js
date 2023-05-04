import React, { Component, useState, useEffect } from 'react'
import { CardHeader, Box, Card, Button, Grid, Container, Typography, } from '@mui/material';
import CardSelect from '../../Component/CardSelect'
import { NotTeachAPIServiceTeacher } from '../../Service/NotTeachAPIService'
import SendIcon from '@mui/icons-material/Send';
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

export default class NotTeachTeacher extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.state = {
            dataNotTeach: [],
            yearSelected: null,
            semesterSelected: null,
            disableState: true
        }
    }

    updateState = () => {
        NotTeachAPIServiceTeacher.getAllNotTeach(this.state.yearSelected, this.state.semesterSelected).then((res) => {
            this.setState({ dataNotTeach: res.data });
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
            <div >
                <HeaderBox title={"การจัดการวันที่ไม่ขอสอน"} />
                <SelectTeacherBox title={"เมนูตัวเลือกรายการ"}  setYearSelected={this.setYearSelected.bind(this)}
                    setSemesterSelected={this.setSemesterSelected.bind(this)} setDisable={this.setDisable.bind(this)} />
                <CreationBox title={"เมนูสร้างรายการ"} disableState={this.state.disableState} yearSelected={this.state.yearSelected} 
                semesterSelected={this.state.semesterSelected} updateState={this.updateState}  />
                <MenagementBox title={"เมนูจัดการรายการ"} disableState={this.state.disableState} 
                dataNotTeach={this.state.dataNotTeach} updateState={this.updateState} />
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

function SelectTeacherBox(props) {

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
        setYearsSelected(localStorage.getItem('holderYear'));
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

    const dayOfWeekOptions = [
        { key: '1', value: 1, text: 'วันจันทร์' },
        { key: '2', value: 2, text: 'วันอังคาร' },
        { key: '3', value: 3, text: 'วันพุธ' },
        { key: '4', value: 4, text: 'วันพฤหสับดี' },
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



    const [timeStartOptions, setTimeStartOptions] = useState([...timeStartOptionTemplate]);
    const [timeEndOptions, setTimeEndOptions] = useState([...timeEndOptionTemplate]);
    const [dayOfWeekSelected, setDayOfWeekSelected] = useState(null);
    const [timeStartSelected, setTimeStartSelected] = useState(null);
    const [timeEndSelected, setTimeEndSelected] = useState(null);
    const [buttonState, setButtonState] = useState(true);

    useEffect(() => {
        handleSubmitTiggle();
    }, [dayOfWeekSelected, timeStartSelected, timeEndSelected]);

    const handleChangeDayOfWeek = (event) => {
        setDayOfWeekSelected(event.target.value);
    };

    const handleChangeTimeStart = (event) => {
        setTimeStartSelected(event.target.value);
        const temp = [...timeEndOptionTemplate];
        for (var i = 0; i < timeConvert(event.target.value) - 1; i++) {
            temp.shift();
        }
        setTimeEndOptions(temp);
    };

    const handleChangeTimeEnd = (event) => {
        setTimeEndSelected(event.target.value);
        const temp = [...timeStartOptionTemplate];
        for (var i = 0; i < 15 - timeConvert(event.target.value); i++) {
            temp.pop();
        }
        setTimeStartOptions(temp);
    };

    const handleSubmit = (event, data) => {
        console.log("LookOutA",Date.now(),"Wow");
        NotTeachAPIServiceTeacher.createNotTeach(props.yearSelected, props.semesterSelected, dayOfWeekSelected, timeStartSelected, timeEndSelected).then(() => {
            setDayOfWeekSelected(null);
            setTimeStartSelected(null);
            setTimeEndSelected(null);
            setTimeStartOptions([...timeStartOptionTemplate]);
            setTimeEndOptions([...timeEndOptionTemplate]);
            props.updateState();
        });
    };

    const handleSubmitTiggle = () => {
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

    const handleCancel = () => {
        setDayOfWeekSelected(null);
        setTimeStartSelected(null);
        setTimeEndSelected(null);
        setTimeStartOptions([...timeStartOptionTemplate]);
        setTimeEndOptions([...timeEndOptionTemplate]);
    };

    const timeConvert = (timeEndOptions_Number) => {
        let time;
        switch (timeEndOptions_Number) {
            case '08:00:00':
                time = 1;
                break;
            case '09:00:00':
                time = 2;
                break;
            case '10:00:00':
                time = 3;
                break;
            case '11:00:00':
                time = 4;
                break;
            case '12:00:00':
                time = 5;
                break;
            case '13:00:00':
                time = 6;
                break;
            case '14:00:00':
                time = 7;
                break;
            case '15:00:00':
                time = 8;
                break;
            case '16:00:00':
                time = 9;
                break;
            case '17:00:00':
                time = 10;
                break;
            case '18:00:00':
                time = 11;
                break;
            case '19:00:00':
                time = 12;
                break;
            case '20:00:00':
                time = 13;
                break;
            case '21:00:00':
                time = 14;
                break;
            case '22:00:00':
                time = 15;
                break;
        }
        return time;
    }

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 2, display: props.disableState ? 'none' : 'block'  }} >
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
                    <Grid item sm={4} xs={12}>
                        <CardSelect labelPara="วันที่ไม่สะดวกสอน" menuItemPara={dayOfWeekOptions} onChangePara={handleChangeDayOfWeek} valuePara={dayOfWeekSelected} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <CardSelect labelPara="เลือกเวลาเริ่ม" menuItemPara={timeStartOptions} onChangePara={handleChangeTimeStart} valuePara={timeStartSelected} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <CardSelect labelPara="เลือกเวลาสิ้นสุด" menuItemPara={timeEndOptions} onChangePara={handleChangeTimeEnd} valuePara={timeEndSelected} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box dir="rtl" component="span" sx={{ pt: 2, display: 'flex', alignItems: 'flex-end', }}>
                            <Stack dir="ltr" direction="row" spacing={2}>
                                <Button color="success" disabled={buttonState} endIcon={<SaveIcon />} onClick={handleSubmit} variant="contained"  >บันทึก</Button>
                                <Button color="inherit" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container >
    )
}

function MenagementBox(props) {

    let dayOfWeekOptions = [
        { key: '1', value: 1, text: 'วันจันทร์' },
        { key: '2', value: 2, text: 'วันอังคาร' },
        { key: '3', value: 3, text: 'วันพุธ' },
        { key: '4', value: 4, text: 'วันพฤหสับดี' },
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
    const [timeStartOptions, setTimeStartOptions] = useState([...timeStartOptionTemplate]);
    const [timeEndOptions, setTimeEndOptions] = useState([...timeEndOptionTemplate]);
    const [dayOfWeekSelected, setDayOfWeekSelected] = useState(null);
    const [timeStartSelected, setTimeStartSelected] = useState(null);
    const [timeEndSelected, setTimeEndSelected] = useState(null);
    const [buttonState, setButtonState] = useState(true);

    //function

    useEffect(() => {
        handleConfirmTiggle();
    }, [dayOfWeekSelected, timeStartSelected, timeEndSelected]);

    const handleChangeDayOfWeek = (event) => {
        setDayOfWeekSelected(event.target.value);

    };

    const handleChangeTimeStart = async (event) => {
        setTimeStartSelected(event.target.value);
        const temp = [...timeEndOptionTemplate];
        for (var i = 0; i < timeConvert(event.target.value) - 1; i++) {
            temp.shift();
        }
        setTimeEndOptions(temp);
    };

    const handleChangeTimeEnd = async (event) => {
        setTimeEndSelected(event.target.value);
        const temp = [...timeStartOptionTemplate];
        for (var i = 0; i < 15 - timeConvert(event.target.value); i++) {
            temp.pop();
        }
        setTimeStartOptions(temp);
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
        console.log("LookOutA",Date.now(),"Wow");
        NotTeachAPIServiceTeacher.updateNotTeach(dataInside.notId, dayOfWeekSelected, timeStartSelected, timeEndSelected).then(() => {
            setDayOfWeekSelected(null);
            setTimeStartSelected(null);
            setTimeEndSelected(null);
            setEditTemp(null);
            setTimeStartOptions([...timeStartOptionTemplate]);
            setTimeEndOptions([...timeEndOptionTemplate]);
            props.updateState();
        });
    }

    const handleCancel = () => {
        setDayOfWeekSelected(null);
        setTimeStartSelected(null);
        setTimeEndSelected(null);
        setEditTemp(null);
        setTimeStartOptions([...timeStartOptionTemplate]);
        setTimeEndOptions([...timeEndOptionTemplate]);
    }

    const handleEdit = (dataInside) => () => {
        setEditTemp(dataInside.notId);
        setDayOfWeekSelected(dataInside.dayOfWeek);
        setTimeStartSelected(dataInside.timeStart);
        setTimeEndSelected(dataInside.timeEnd);
        const tempEnd = [...timeEndOptionTemplate];
        for (var i = 0; i < timeConvert(dataInside.timeStart) - 1; i++) {
            tempEnd.shift();
        }
        setTimeEndOptions(tempEnd);
        const tempStart = [...timeStartOptionTemplate];
        for (var i = 0; i < 15 - timeConvert(dataInside.timeEnd); i++) {
            tempStart.pop();
        }
        setTimeStartOptions(tempStart);
    }

    const handleDelete = (dataInside) => () => {
        console.log("LookOutA",Date.now(),"Wow");
        NotTeachAPIServiceTeacher.deleteNotTeach(dataInside.notId).then(() => {
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

    const timeConvert = (timeEndOptions_Number) => {

        let time;
        switch (timeEndOptions_Number) {
            case '08:00:00':
                time = 1;
                break;
            case '09:00:00':
                time = 2;
                break;
            case '10:00:00':
                time = 3;
                break;
            case '11:00:00':
                time = 4;
                break;
            case '12:00:00':
                time = 5;
                break;
            case '13:00:00':
                time = 6;
                break;
            case '14:00:00':
                time = 7;
                break;
            case '15:00:00':
                time = 8;
                break;
            case '16:00:00':
                time = 9;
                break;
            case '17:00:00':
                time = 10;
                break;
            case '18:00:00':
                time = 11;
                break;
            case '19:00:00':
                time = 12;
                break;
            case '20:00:00':
                time = 13;
                break;
            case '21:00:00':
                time = 14;
                break;
            case '22:00:00':
                time = 15;
                break;
        }
        return time;
    }

    //sort and search

    const headCells = [
        {
            id: 'dayOfWeek',
            numeric: true,
            label: 'วันที่ไม่สะกวดสอน',
        },
        {
            id: 'timeStart',
            numeric: true,
            label: 'เวลาเริ่ม',
        },
        {
            id: 'timeEnd',
            numeric: true,
            label: 'ถึง',
        },
        {
            id: 'option',
            numeric: true,
            label: 'ตัวเลือก',
        },
    ];

    const [filteredData, setFilteredData] = useState(props.dataNotTeach);
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    useEffect(() => {
        setFilteredData(props.dataNotTeach);
    }, [props.dataNotTeach])

    useEffect(() => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        setFilteredData(searchValue === '' ? props.dataNotTeach : props.dataNotTeach.filter((data) => {
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

    //render

    return (
        <Container maxWidth='false' sx={{ pb: 2, display: props.disableState ? 'none' : 'block'  }} >
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
                                            if (editTemp !== row.notId) {
                                                return (
                                                    <TableRow key={row.notId} >
                                                        <TableCell width="25%" id={labelId} scope="row" align="left" >{dayConvert(row.dayOfWeek)}</TableCell>
                                                        <TableCell width="25%" align="left">{row.timeStart}</TableCell>
                                                        <TableCell width="25%" align="left">{row.timeEnd}</TableCell>
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
                                                    <TableRow key={row.notId} >
                                                        <TableCell id={labelId} scope="row" align="left">
                                                            <CardSelect labelPara="วันที่ไม่สะดวกสอน" menuItemPara={dayOfWeekOptions} onChangePara={handleChangeDayOfWeek} valuePara={dayOfWeekSelected} />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <CardSelect labelPara="เลือกเวลาเริ่ม" menuItemPara={timeStartOptions} onChangePara={handleChangeTimeStart} valuePara={timeStartSelected} />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <CardSelect labelPara="เลือกเวลาสิ้นสุด" menuItemPara={timeEndOptions} onChangePara={handleChangeTimeEnd} valuePara={timeEndSelected} />
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



