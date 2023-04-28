import React, { Component, useState, useEffect } from 'react'
import { CardHeader, Box, Card, Button, Grid, Container, Typography, } from '@mui/material';
import CardSelect from '../../Component/CardSelect'
import CardTextField from '../../Component/CardTextField'
import { MemberAPIServiceStaff , MemberAPIServiceAdmin } from '../../Service/MemberAPIService';
import { NotTeachAPIServiceStaff } from '../../Service/NotTeachAPIService'
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
import MemberAPIService from '../../Service/MemberAPIService';



export default class MenagementMemberAdmin extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.setFacultySelected = this.setFacultySelected.bind(this);
        this.setOrganizSelected = this.setOrganizSelected.bind(this);
        this.state = {
            member: [],
            titleName: [],
            faculty : [],
            facultySelected: null,
            organizSelected: null,
            disableState: true
        }
    }

    componentDidMount() {
        MemberAPIService.getAllTitleName().then((res) => {
            this.setState({ titleName: res.data });
        })
        MemberAPIService.getAllFaculty().then((res) => {
            this.setState({ faculty: res.data });
        })
    }

    updateState = (dataA) => {
        MemberAPIServiceAdmin.getMember(dataA).then((res) => {
            this.setState({ member: res.data });
        });
    }

    setFacultySelected = (item) => {
        this.setState({
            facultySelected: item,
        })
    }

    setOrganizSelected = (item) => {
        this.setState({
            organizSelected: item,
        })
    }

    setDisable = (data) => {
        this.updateState(data);
        this.setState({
            disableState: false
        })
    }

    render() {
        return (
            <div >
                <HeaderBox title={"การจัดการบัญชีสมาชิก"} />
                <SelectionBox title={"เมนูเลือกสาขา"} faculty={this.state.faculty} setDisable={this.setDisable.bind(this)}
                setFacultySelected={this.setFacultySelected.bind(this)} setOrganizSelected={this.setOrganizSelected.bind(this)} />
                <MenagementBox titleName={this.state.titleName} title={"เมนูจัดการรายการ"} disableState={this.state.disableState} 
                updateState={this.updateState} member={this.state.member} organizSelecte={this.state.organizSelected} dataNotTeach={this.state.dataNotTeach} />
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


    const [facultyOption, setFacultyOption] = useState([]);
    const [facultySelected, setFacultySelected] = useState(null);
    const [organizOption, setOrganizOption] = useState([]);
    const [organizSelected, setOrganizSelected] = useState(null);

    const [organizOptionStatus, setOrganizOptionStatus] = useState(true);

    useEffect(() => {
        setFacultyOption(props.faculty);
    }, [props.faculty]);

    const handleChangeFaculty = (event) => {
        setFacultySelected(event.target.value);
        MemberAPIService.getAllOrganiz(event.target.value).then((res) => {
            setOrganizOption(res.data);
        })
        setOrganizOptionStatus(false);
    };

    const handleChangeOrganiz = (event) => {
        setOrganizSelected(event.target.value);
        props.setOrganizSelected(event.target.value);
        props.setDisable(event.target.value);
    };

    return (
        <Container sx={{ p: 2 }} maxWidth='false'>
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ p: 2 }} >
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกคณะ" menuItemPara={facultyOption} onChangePara={handleChangeFaculty} valuePara={facultySelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกสาขา" disabledPara={organizOptionStatus} menuItemPara={organizOption} onChangePara={handleChangeOrganiz} valuePara={organizSelected} />
                    </Grid>
                </Grid>
            </Card>
        </Container >
    );
}

function MenagementBox(props) {


    const roleOption = [
        { key: '1', value: 1, text: "อาจารย์" },
        { key: '2', value: 2, text: "เจ้าหน้าที่" },
        { key: '3', value: 3, text: "ผู้ดูแลระบบ" },
    ];

    const activeStatusOption = [
        { key: '0', value: false, text: 'ปิดใช้งาน' },
        { key: '1', value: true, text: 'เปิดใช้งาน' },
    ];

    //state

    const [editTemp, setEditTemp] = useState(null);
    const [confirmButtonStatus, setConfirmButtonStatus] = useState(true);
    const [titleNameOption, setTitleNameOption] = useState([]);
    const [titleNameSelected, setTitleNameSelected] = useState(null);
    const [firstNameTH, setFirstNameTH] = useState(null);
    const [lastNameTH, setLastNameTH] = useState(null);
    const [firstNameEN, setFirstNameEN] = useState(null);
    const [lastNameEN, setLastNameEN] = useState(null);
    const [usernameRe, setUsername] = useState(null);
    const [passwordRe, setPassword] = useState(null);
    const [roleSelected, setRoleSelected] = useState(null);
    const [activeStatusSelected, setActiveStatusSelected] = useState(null);

    const [errerPassword, setErrerPassword] = useState(false);

    const regexA = /^[ก-ฺเ-ๅ็-ํ]*$/;

    const regexB = /^[a-zA-Z.]*$/;

    const regexC = /^[a-zA-Z.0-9]*$/;

    var regexD = { capital: /(?=.*[A-Z])/, length: /(?=.{8,12}$)/, specialChar: /[ -\/:-@\[-\`{-~]/, digit: /(?=.*[0-9])/, };

    //function

    useEffect(() => {
        setTitleNameOption(props.titleName);
    }, [props.titleName]);

    useEffect(() => {

        if (passwordRe == null || passwordRe == "") {
            setErrerPassword(false);
        }

    }, [passwordRe]);

    useEffect(() => {
        if (titleNameSelected != null && firstNameTH != null && lastNameTH != null && firstNameEN != null &&
            lastNameEN != null && usernameRe != null && passwordRe != null &&
            roleSelected != null && activeStatusSelected != null && !errerPassword) {
            setConfirmButtonStatus(false);
        }
        else {
            setConfirmButtonStatus(true);
        }
    }, [titleNameSelected, firstNameTH, lastNameTH, firstNameEN, lastNameEN, usernameRe, passwordRe, roleSelected, activeStatusSelected, errerPassword]);


    const handleChangeTitle = (event) => {
        setTitleNameSelected(event.target.value);
    };

    const handleChangeRole = (event) => {
        setRoleSelected(event.target.value);
    };

    const handleChangeActiveStatus = (event) => {
        setActiveStatusSelected(event.target.value);
    };

    const handleChangePassword = (event) => {

        setPassword(event.target.value);

        if ((regexD.capital.test(event.target.value) && regexD.length.test(event.target.value) &&
            regexD.specialChar.test(event.target.value) && regexD.digit.test(event.target.value))) {
            setErrerPassword(false);
        } else {
            setErrerPassword(true);
        }

    };

    const roleConvert = (dataInside) => {
        if (dataInside.role == 1) {
            return "อาจารย์";
        } else if (dataInside.role == 2) {
            return "เจ้าหน้าที่";
        } else if (dataInside.role == 3) {
            return "ผู้ดูแลระบบ";
        }
    }

    const activeStatusConvert = (dataInside) => {
        if (dataInside.activeStatus) {
            return "เปิดใช้งาน";
        } else {
            return "ปิดใช้งาน";
        }
    }

    const handleEdit = (dataInside) => () => {

        setEditTemp(dataInside.memberId);
        setFirstNameTH(dataInside.firstNameTH);
        setLastNameTH(dataInside.lastNameTH);
        setFirstNameEN(dataInside.firstNameEN);
        setLastNameEN(dataInside.lastNameEN);
        setUsername(dataInside.username);
        setPassword(dataInside.password);
        setTitleNameSelected(dataInside.titleId);
        setRoleSelected(dataInside.role);
        setActiveStatusSelected(dataInside.activeStatus);

        if ((regexD.capital.test(dataInside.password) && regexD.length.test(dataInside.password) &&
            regexD.specialChar.test(dataInside.password) && regexD.digit.test(dataInside.password))) {
            setErrerPassword(false);
        } else {
            setErrerPassword(true);
        }
    }

    const handleConfirm = (dataInside) => () => {
        MemberAPIServiceStaff.update(dataInside.memberId, titleNameSelected, firstNameTH, lastNameTH,
            firstNameEN, lastNameEN, usernameRe, passwordRe, roleSelected, activeStatusSelected).then(() => {
                props.updateState(props.organizSelecte);
                setEditTemp(null);
                setFirstNameTH(null);
                setLastNameTH(null);
                setFirstNameEN(null);
                setLastNameEN(null);
                setUsername(null);
                setPassword(null);
                setTitleNameSelected(null);
                setRoleSelected(null);
                setActiveStatusSelected(null);
            })
    }

    const handleDelete = (dataInside) => () => {
        MemberAPIServiceStaff.delete(dataInside.memberId).then(() => {
            props.updateState(props.organizSelecte);
        })
    }

    const handleCancel = () => {
        setEditTemp(null);
    }

    //sort and search

    const headCells = [
        {
            id: 'titleName',
            numeric: true,
            label: 'คำนำหน้า',
        },
        {
            id: 'firstNameTH',
            numeric: true,
            label: 'ชื่อภาษาไทย',
        },
        {
            id: 'lastNameTH',
            numeric: true,
            label: 'นามสกุลภาษาไทย',
        },
        {
            id: 'firstNameEN',
            numeric: true,
            label: 'ชื่อภาษาอังกฤษ',
        },
        {
            id: 'lastNameEN',
            numeric: true,
            label: 'นามสกุลภาษาอังกฤษ',
        },
        {
            id: 'username',
            numeric: true,
            label: 'ชื่อบัญชีสมาชิก',
        },
        {
            id: 'password',
            numeric: true,
            label: 'รหัสผ่าน',
        },
        {
            id: 'role',
            numeric: true,
            label: 'ระดับสิทธิ์',
        },
        {
            id: 'activeStatus',
            numeric: true,
            label: 'สถานะบัญชี',
        },
        {
            id: 'option',
            numeric: true,
            label: 'ตัวเลือก',
        },
    ];

    const [filteredData, setFilteredData] = useState(props.member);
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    useEffect(() => {
        setFilteredData(props.member);
    }, [props.member])

    useEffect(() => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        setFilteredData(searchValue === '' ? props.member : props.member.filter((data) => {
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
        <Container maxWidth='false' sx={{ pt: 2, pb: 2, }}   >
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
                                            if (editTemp !== row.memberId) {
                                                return (
                                                    <TableRow key={row.memberId} >
                                                        <TableCell id={labelId} scope="row" align="left" >{row.titleName}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.firstNameTH}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.lastNameTH}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.firstNameEN}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.lastNameEN}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.username}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{row.password}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{roleConvert(row)}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >{activeStatusConvert(row)}</TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <Stack direction="row" spacing={2}>
                                                                <Button sx={{ width: 75 }} color="inherit" onClick={handleEdit(row)} variant="contained" >แก้ไข</Button>
                                                                <Button sx={{ width: 75 }} color="error" endIcon={<DeleteForeverIcon />} onClick={handleDelete(row)} variant="contained"  >ลบ</Button>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            } else {
                                                return (
                                                    <TableRow key={row.memberId} >
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardSelect minWidthPara={80} labelPara="เลือกคำนำหน้า" menuItemPara={titleNameOption} onChangePara={handleChangeTitle} valuePara={titleNameSelected} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField labelPara="ชื่อภาษาไทย" onChangePara={(e) => regexA.test(e.target.value) ? setFirstNameTH(e.target.value) : null} required valuePara={firstNameTH} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField labelPara="นามสกุลภาษาไทย" onChangePara={(e) => regexA.test(e.target.value) ? setLastNameTH(e.target.value) : null} required valuePara={lastNameTH} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField labelPara="ชื่อภาษาอังกฤษ" onChangePara={(e) => regexB.test(e.target.value) ? setFirstNameEN(e.target.value) : null} required valuePara={firstNameEN} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField labelPara="นามสกุลภาษาอังกฤษ" onChangePara={(e) => regexB.test(e.target.value) ? setLastNameEN(e.target.value) : null} required valuePara={lastNameEN} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField tooltipTitle="ตัวอักษร a-Z และตัวเลข 0-9" labelPara="ชื่อบัญชีสมาชิก" onChangePara={(e) => regexC.test(e.target.value) ? setUsername(e.target.value) : null} required valuePara={usernameRe} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardTextField tooltipTitle="ต้องความยาว 8-12 ตัวอักษร และต้องมีตัวอักษรพิเศษ, ตัวพิมพ์ใหญ่, ตัวเลข อย่างน้อยอย่างละ 1 ตัวษร" labelPara="รหัสผ่าน" errorPara={errerPassword} onChangePara={handleChangePassword} required valuePara={passwordRe} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardSelect minWidthPara={80} labelPara="เลือกคำนำหน้า" menuItemPara={roleOption} onChangePara={handleChangeRole} valuePara={roleSelected} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <CardSelect minWidthPara={80} labelPara="เลือกคำนำหน้า" menuItemPara={activeStatusOption} onChangePara={handleChangeActiveStatus} valuePara={activeStatusSelected} />
                                                        </TableCell>
                                                        <TableCell id={labelId} scope="row" align="left" >
                                                            <Stack direction="row" spacing={2}>
                                                                <Button sx={{ width: 75 }} color="success" endIcon={<SaveIcon />} disabled={confirmButtonStatus} onClick={handleConfirm(row)} variant="contained" >ยืนยัน</Button>
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



