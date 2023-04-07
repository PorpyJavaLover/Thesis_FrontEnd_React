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
        this.state = {
            plans: [],
            timetables: [],
            member: [],
            memberSelected: null,
            disableState:true
        }
    }

    componentDidMount() {
        MemberAPIServiceStaff.getAllMember().then((res) => {
            this.setState({ member: res.data });
            console.log(res.data);
        });
    }

    updatePlanState = () => {
        this.setState({ plans: this.state.plans });
    }

    setMemberSelected = (item) => {
        this.setState({
            memberSelected: item,
            disableState:false
        })
    }

    getPlanState = (memberId) => {
        PlanAPIServiceStaff.getPlan().then((resPlan) => {
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
                if ((Number(plan.years_name) - 543) + plan.semester + plan.course_id + plan.group_id === timetable.years + timetable.semester + timetable.course_id + timetable.group_id) {
                    if (timetable.course_type == 0) {
                        plan.selected_lect = true;
                    } else {
                        plan.selected_perf = true;
                    }
                }
                return null;
            });
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
                <SelectTeacherBox title={"เมนูเลือกอาจารย์"} setMemberSelected={this.setMemberSelected.bind(this)} getPlanState={this.getPlanState.bind(this)} member={this.state.member} />
                <ManagementBox title={"เมนูจัดการรายการ"} disableState={this.state.disableState} updatePlanState={this.updatePlanState.bind(this)} memberSelected={this.state.memberSelected} plans={this.state.plans} timetables={this.state.timetables} />
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

    const [member, setMember] = useState(props.member);
    const [memberSelected, setMemberSelected] = useState(null);

    const handleChangeMember = (event) => {
        props.setMemberSelected(event.target.value);
        setMemberSelected(event.target.value);
        props.getPlanState(event.target.value);
    };

    useEffect(() => {
        setMember(props.member);
    }, [props.member])

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 3 }} >
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
                    <Grid item sm={12} xs={12}>
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
        const courseType = 0;
        if (value.selected_lect === false) {
            TimetableAPIServiceStaff.createTimetable(value.years_name, value.semester, value.course_id, courseType, value.group_id , props.memberSelected).then(() => {
                value.selected_lect = true;
                props.updatePlanState();
            });
        } else if (value.selected_lect === true) {
            TimetableAPIServiceStaff.deletTimetable(value.years_name, value.semester, value.course_id, courseType, value.group_id , props.memberSelected).then(() => {
                value.selected_lect = false;
                props.updatePlanState();
            });
        }
    };
    const handleSwitchPerf = (value) => () => {
        const courseType = 1;
        if (value.selected_perf === false) {
            TimetableAPIServiceStaff.createTimetable(value.years_name, value.semester, value.course_id, courseType, value.group_id , props.memberSelected).then(() => {
                value.selected_perf = true;
                props.updatePlanState();
            });
        } else if (value.selected_perf === true) {
            TimetableAPIServiceStaff.deletTimetable(value.years_name, value.semester, value.course_id, courseType, value.group_id , props.memberSelected).then(() => {
                value.selected_perf = false;
                props.updatePlanState();
            });
        }
    };

    //sort and search

    const headCells = [
        {
            id: 'years_name',
            numeric: false,
            label: 'ปีการศึกษา',
        },
        {
            id: 'semester',
            numeric: false,
            label: 'ภาคการศึกษา',
        },
        {
            id: 'group_name',
            numeric: true,
            label: 'กลุ่มเรียน',
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

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //render

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 3 , display: props.disableState ? 'none' : 'block' }} >
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
                                                    <TableCell id={labelId} scope="row" align="center" >{row.years_name}</TableCell>
                                                    <TableCell align="center">{row.semester}</TableCell>
                                                    <TableCell align="left">{row.group_name}</TableCell>
                                                    <TableCell align="left">{row.course_code}</TableCell>
                                                    <TableCell align="left">{row.course_title}</TableCell>
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