import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, Box, TextField, Card, Button, Grid, Container, Typography, Stack, Tooltip } from '@mui/material';
import CardSelect from '../../Component/CardSelect'
import MemberAPIService, { MemberAPIServiceAdmin } from '../../Service/MemberAPIService';


export default class RolePlay extends Component {

    constructor(props) {
        super(props);
        this.updateState.bind(this);
        this.state = {
            faculty: [],
        }
    }

    componentDidMount() {
        MemberAPIService.getAllFaculty().then((res) => {
            this.setState({ faculty: res.data });
        })
    }

    updateState = () => {

    }

    render() {
        return (
            <div>
                <UserCreate title={"ระบบสวมสิทธ์"} faculty={this.state.faculty} />
            </div>
        )
    }
}

function UserCreate(props) {

    const [facultyOption, setFacultyOption] = useState([]);
    const [facultySelected, setFacultySelected] = useState(null);
    const [organizOption, setOrganizOption] = useState([]);
    const [organizSelected, setOrganizSelected] = useState(null);
    const [memberOption, setMemberOption] = useState([]);
    const [memberSelected, setMemberSelected] = useState(null);

    const [organizOptionStatus, setOrganizOptionStatus] = useState(true);
    const [memberOptionStatus, setMemberOptionStatus] = useState(true);
    const [confirmButtonStatus, setConfirmButtonStatus] = useState(true);
    const [cancelButtonStatus, setCancelButtonStatus] = useState(true);

    useEffect(() => {
        setFacultyOption(props.faculty);
    }, [props.faculty]);

    useEffect(() => {
        if(localStorage.getItem('tokenTmp') != null ){
            setCancelButtonStatus(false);
        }
    }, []); 

    const handleChangeFaculty = (event) => {
        setFacultySelected(event.target.value);
        MemberAPIService.getAllOrganiz(event.target.value).then((res) => {
            setOrganizOption(res.data);
        })
        setOrganizOptionStatus(false);
    };

    const handleChangeOrganiz = (event) => {
        setOrganizSelected(event.target.value);
        MemberAPIServiceAdmin.getMemberOption(event.target.value).then((res) => {
            setMemberOption(res.data);
        })
        setMemberOptionStatus(false);
    };

    const handleChangeMember = (event) => {
        setMemberSelected(event.target.value);
        setConfirmButtonStatus(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        MemberAPIServiceAdmin.rolePlay(memberSelected).then(() => {
            setCancelButtonStatus(false);
        })
    };

    const handleCancel = (event) => {
        event.preventDefault();
        if (localStorage.getItem('tokenTmp') != null) {
            localStorage.setItem('token', localStorage.getItem('tokenTmp'));
            localStorage.setItem('member_id', localStorage.getItem('member_idTmp'));
            localStorage.setItem('name', localStorage.getItem('nameTmp'));
            localStorage.setItem('role', localStorage.getItem('roleTmp'));
            localStorage.setItem('exp', localStorage.getItem('expTmp'));
            localStorage.removeItem("tokenTmp");
            localStorage.removeItem("member_idTmp");
            localStorage.removeItem("nameTmp");
            localStorage.removeItem("roleTmp");
            localStorage.removeItem("expTmp");
            window.location.reload(false);
            setCancelButtonStatus(true);
        }

    };

    return (
        <Container sx={{ p: 2 }} maxWidth='false'>
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h6' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ p: 2 }} >
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกคณะ" menuItemPara={facultyOption} onChangePara={handleChangeFaculty} valuePara={facultySelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกสาขา" disabledPara={organizOptionStatus} menuItemPara={organizOption} onChangePara={handleChangeOrganiz} valuePara={organizSelected} />
                    </Grid>
                    <Grid item sm={12} xs={12} >
                        <CardSelect labelPara="เลือกอาจารย์" disabledPara={memberOptionStatus} menuItemPara={memberOption} onChangePara={handleChangeMember} valuePara={memberSelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} dir="ltr" >
                        <Box dir="ltr" sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} disabled={confirmButtonStatus} color="primary" onClick={handleSubmit} variant="contained" >
                                สวมสิทธิ์
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} xs={12} dir="rtl"  >
                        <Box dir="rtl" spacing={2} sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} disabled={cancelButtonStatus} color="primary" onClick={handleCancel} variant="contained" >
                                ถอดสิทธิ์
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container >
    );
}
