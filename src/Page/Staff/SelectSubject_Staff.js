import React, { Component, useState, useEffect } from 'react'
import { CardHeader, Box, Card, Grid, Container, Typography, Switch } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MemberAPIServiceStaff } from '../../Service/MemberAPIService';
import { PlanAPIServiceStaff } from '../../Service/PlanAPIService'
import { TimetableAPIServiceStaff } from '../../Service/TimetableAPIService'
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import CardSelect from '../../Component/CardSelect'
import FormControlLabel from '@mui/material/FormControlLabel';


export default class SelectSubjectStaff extends Component {


    constructor(props) {
        super(props);
        this.updatePlanState = this.updatePlanState.bind(this);
        this.getPlanState = this.getPlanState.bind(this);
        this.setMemberSelected = this.setMemberSelected.bind(this);
        this.setGroupSelected = this.setGroupSelected.bind(this);
        this.state = {
            plans: [],
            timetables: [],
            group: [],
            groupSelected: null,
            member: [],
            memberSelected: null,
            yearSelected: null,
            semesterSelected: null,
            disableState: true
        }
    }

    componentDidMount() {
        MemberAPIServiceStaff.getMemberOption().then((res) => {
            this.setState({ member: res.data });
        });
        MemberAPIServiceStaff.getGroupOption().then((res) => { 
            this.setState({ group: res.data });
        });
    }

    updatePlanState = () => {
        this.setState({ plans: this.state.plans });
        console.log("LookOutB", Date.now(), "Wow");
    }

    setGroupSelected = (item) => {
        this.setState({
            groupSelected: item,
        })
    }

    setMemberSelected = (item) => {
        this.setState({
            memberSelected: item,
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
        this.getPlanState(this.state.memberSelected);
        this.setState({
            disableState: false
        })
    }

    getPlanState = (memberId) => {
        PlanAPIServiceStaff.getPlan(this.state.yearSelected, this.state.semesterSelected, this.state.groupSelected).then((resPlan) => {
            this.setState({ plans: resPlan.data });
            TimetableAPIServiceStaff.getTimetableByMemberId(memberId).then((resTimetable) => {
                this.setState({ timetables: resTimetable.data })
                this.tableMapping();
            });
        });
    }

    tableMapping = () => {

        let tempPlans = this.state.plans;
        let tempTimetables = this.state.timetables

        tempPlans.map((plan) => {
            tempTimetables.map((timetable) => {
                if (plan.years_value + plan.semester + plan.course_id + plan.group_id === timetable.years + timetable.semester + timetable.course_id + timetable.group_id) {
                    if (timetable.course_type == 0) {
                        plan.selected_lect = true;
                    } else {
                        plan.selected_perf = true;
                    }
                }
                return null;
            });
            console.log("LookOutB", Date.now(), "Wow");
            return plan;
        });

        this.setState({
            plans: tempPlans
        });
    }

    render() {
        return (
            <div>
                <HeaderBox title={"การจัดการรายวิชาที่จะเปิดสอน"} />
                <SelectTeacherBox title={"เมนูตัวเลือกรายการ"}
                    setGroupSelected={this.setGroupSelected.bind(this)} group={this.state.group}  //<--
                    setMemberSelected={this.setMemberSelected.bind(this)} member={this.state.member}
                    getPlanState={this.getPlanState.bind(this)}  setYearSelected={this.setYearSelected.bind(this)}
                    setSemesterSelected={this.setSemesterSelected.bind(this)} setDisable={this.setDisable.bind(this)} />
                <ManagementBox title={"เมนูจัดการรายการ"} updatePlanState={this.updatePlanState.bind(this)}
                    disableState={this.state.disableState} plans={this.state.plans} timetables={this.state.timetables}
                    memberSelected={this.state.memberSelected} />
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
    const [group, setGroup] = useState(props.group);
    const [groupSelected, setGroupSelected] = useState(null);
    const [member, setMember] = useState(props.member);
    const [memberSelected, setMemberSelected] = useState(null);

    const handleChangeGroup = (event) => { 
        props.setGroupSelected(event.target.value);
        setGroupSelected(event.target.value);
        localStorage.setItem('holderGroup', event.target.value);
    };

    const handleChangeMember = (event) => {
        props.setMemberSelected(event.target.value);
        setMemberSelected(event.target.value);
        localStorage.setItem('holderMember', event.target.value);
    };

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
        props.setGroupSelected(localStorage.getItem('holderGroup'));
        setGroupSelected(localStorage.getItem('holderGroup'));
        props.setMemberSelected(localStorage.getItem('holderMember'));
        setMemberSelected(localStorage.getItem('holderMember'));
    }, [])

    useEffect(() => {
        if (yearsSelected != null && semesterSelected != null 
            && memberSelected != null && groupSelected != null) {
            props.setDisable();
        }
    }, [yearsSelected, semesterSelected, memberSelected , groupSelected ])

    useEffect(() => {
        setMember(props.member);
    }, [props.member])

    useEffect(() => {
        setGroup(props.group);
    }, [props.group])

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
                    <Grid item sm={6} xs={6}>
                        <CardSelect labelPara="เลือกอาจารย์ผู้สอน" menuItemPara={group} onChangePara={handleChangeGroup} valuePara={groupSelected} />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <CardSelect labelPara="เลือกอาจารย์ผู้สอน" menuItemPara={member} onChangePara={handleChangeMember} valuePara={memberSelected} />
                    </Grid>
                </Grid>
            </Card>
        </Container >
    )
}


function ManagementBox(props) {

    //state

    //function

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleSwitchLect = (value) => () => {
        console.log("LookOutA", Date.now(), "Wow");
        const courseType = 0;
        if (value.selected_lect === false) {
            TimetableAPIServiceStaff.createTimetable(value.years_value, value.semester, value.course_id, courseType, value.group_id, props.memberSelected).then(() => {
                value.selected_lect = true;
                props.updatePlanState();
            });
        } else if (value.selected_lect === true) {
            TimetableAPIServiceStaff.deletTimetable(value.years_value, value.semester, value.course_id, courseType, value.group_id, props.memberSelected).then(() => {
                value.selected_lect = false;
                props.updatePlanState();
            });
        }
    };
    const handleSwitchPerf = (value) => () => {
        console.log("LookOutA", Date.now(), "Wow");
        const courseType = 1;
        if (value.selected_perf === false) {
            TimetableAPIServiceStaff.createTimetable(value.years_value, value.semester, value.course_id, courseType, value.group_id, props.memberSelected).then(() => {
                value.selected_perf = true;
                props.updatePlanState();
            });
        } else if (value.selected_perf === true) {
            TimetableAPIServiceStaff.deletTimetable(value.years_value, value.semester, value.course_id, courseType, value.group_id, props.memberSelected).then(() => {
                value.selected_perf = false;
                props.updatePlanState();
            });
        }
    };

    //sort and search

    const headCells = [
        {
            id: 'course_code',
            numeric: true,
            label: 'รหัสวิชา',
        },
        {
            id: 'course_title',
            numeric: true,
            label: 'ชื่อวิชาภาษาไทย',
        },
        {
            id: 'course_title_en',
            numeric: true,
            label: 'ชื่อวิชาภาษาอังกฤษ',
        },
        {
            id: 'selected',
            numeric: true,
            label: 'ตัวเลือก',
        },
    ];

    const [filteredData, setFilteredData] = useState(props.plans);
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setFilteredData(props.plans);
    }, [props.plans])

    useEffect(() => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        setFilteredData(searchValue === '' ? props.plans : props.plans.filter((data) => {
            return Object.keys(data).some((field) => {
                return searchRegex.test(data[field].toString());
            });

        }))
    }, [searchValue])

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

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
                        <TableCell key={headCell.id} align={headCell.numeric ? 'left' : 'center'} sortDirection={orderBy === headCell.id ? order : false} >
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

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('group_name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //render

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 3, display: props.disableState ? 'none' : 'block' }} >
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
                                            return (
                                                <TableRow key={row.years_name + row.semester + row.course_id + row.group_id} >
                                                    <TableCell align="left">{row.course_code}</TableCell>
                                                    <TableCell align="left">{row.course_title}</TableCell>
                                                    <TableCell align="left">{row.course_title_en}</TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel control={<Switch disabled={row.disable_lect} checked={row.selected_lect} onClick={handleSwitchLect(row)} />} label="ทฤษฎี" labelPlacement="start" />
                                                        <FormControlLabel control={<Switch disabled={row.disable_perf} checked={row.selected_perf} onClick={handleSwitchPerf(row)} />} label="ปฏิบัติ" labelPlacement="start" />
                                                    </TableCell>
                                                </TableRow>
                                            );
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