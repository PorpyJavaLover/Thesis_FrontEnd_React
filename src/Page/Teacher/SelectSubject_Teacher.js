import React, { Component, useState, useEffect } from 'react'
import { CardHeader, Box, Card, Grid, Container, Typography, Switch } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PlanAPIServiceTeacher } from '../../Service/PlanAPIService'
import { TimetableAPIServiceTeacher } from '../../Service/TimetableAPIService'
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import FormControlLabel from '@mui/material/FormControlLabel';


export default class SelectSubjectTeacher extends Component {


    constructor(props) {
        super(props);
        this.updatePlanState = this.updatePlanState.bind(this);
        this.state = {
            plans: [],
            timetables: []
        }
    }

    componentDidMount() {
        PlanAPIServiceTeacher.getPlan().then((resPlan) => {
            this.setState({ plans: resPlan.data });
            TimetableAPIServiceTeacher.getTimetable().then((resTimetable) => {
                this.setState({ timetables: resTimetable.data })
                this.tableMapping();
            });
        });
    }

    updatePlanState = () => {
        this.setState({ plans: this.state.plans });
    }

    tableMapping = () => {

        let tempPlans = this.state.plans;
        let tempTimetables = this.state.timetables

        tempPlans.map((plan) => {
            tempTimetables.map((timetable) => {
                if (plan.years + plan.semester + plan.course_id + plan.group_id + JSON.parse(localStorage.getItem('user')).principal === timetable.years + timetable.semester + timetable.course_id + timetable.group_id + timetable.member_id) {
                    if(timetable.course_type == 0){
                        plan.selected_lect = true;
                    }else{
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
                <MenagementBox title={"เมนูจัดการรายการ"} updatePlanState={this.updatePlanState.bind(this)} plans={this.state.plans} timetables={this.state.timetables} />
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


function MenagementBox(props) {

    const [filteredData, setFilteredData] = useState(props.plans);
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    useEffect(() => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        setFilteredData(searchValue === '' ? props.plans : props.plans.filter((data) => {
            return Object.keys(data).some((field) => {
                return searchRegex.test(data[field].toString());
            });

        }))
    }, [searchValue])

    useEffect(() => {
        setFilteredData(props.plans);
    }, [props.plans])

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
            id: 'years',
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

    const handleSwitchLect = (value) => () => {
        const courseType = 0;
        if (value.selected_lect === false) {
            TimetableAPIServiceTeacher.createTimetable(value.years, value.semester, value.course_id , courseType, value.group_id).then(() => {
                value.selected_lect = true;
                props.updatePlanState();
            });
        } else if (value.selected_lect === true) {
            TimetableAPIServiceTeacher.deletTimetable(value.years, value.semester, value.course_id , courseType , value.group_id).then(() => {
                value.selected_lect = false;
                props.updatePlanState();
            });
        }
    };
    const   handleSwitchPerf = (value) => () => {
        const courseType = 1;
        if (value.selected_perf === false) {
            TimetableAPIServiceTeacher.createTimetable(value.years, value.semester, value.course_id , courseType, value.group_id).then(() => {
                value.selected_perf = true;
                props.updatePlanState();
            });
        } else if (value.selected_perf === true) {
            TimetableAPIServiceTeacher.deletTimetable(value.years, value.semester, value.course_id , courseType , value.group_id).then(() => {
                value.selected_perf = false;
                props.updatePlanState();
            });
        }
    };

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 3 }} >
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
                                                <TableRow key={row.years + row.semester + row.course_id + row.group_id} >
                                                    <TableCell id={labelId} scope="row" align="center" >{row.years}</TableCell>
                                                    <TableCell align="center">{row.semester}</TableCell>
                                                    <TableCell align="left">{row.group_name}</TableCell>
                                                    <TableCell align="left">{row.course_code}</TableCell>
                                                    <TableCell align="left">{row.course_title}</TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel control={<Switch checked={row.selected_lect } onClick={handleSwitchLect(row)} />} label="ทฤษฎี" labelPlacement="start" />
                                                        <FormControlLabel control={<Switch checked={row.selected_perf} onClick={handleSwitchPerf(row)} />} label="ปฏิบัติ" labelPlacement="start" />
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