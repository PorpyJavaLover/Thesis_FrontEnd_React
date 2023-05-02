import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, Box, TextField, Card, Button, Grid, Container, Typography, Stack, Tooltip } from '@mui/material';
import CardTextField from '../Component/CardTextField'
import CardSelect from '../Component/CardSelect'
import MemberAPIService from '../Service/MemberAPIService';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.updateState.bind(this);
        this.state = {
            faculty: [],
            titleName: []
        }
    }

    componentDidMount() {
        MemberAPIService.getAllFaculty().then((res) => {
            this.setState({ faculty: res.data });
        })
        MemberAPIService.getAllTitleName().then((res) => {
            this.setState({ titleName: res.data });
        })

    }

    updateState = () => {

    }

    render() {
        return (
            <div>
                <UserCreate title={"สมัครสมาชิก"} faculty={this.state.faculty} titleName={this.state.titleName} />
            </div>
        )
    }
}

function UserCreate(props) {

    const roleOption = [
        { key: '1', value: 1, text: "อาจารย์" },
        { key: '2', value: 2, text: "เจ้าหน้าที่" },
    ];

    const [titleNameOption, setTitleNameOption] = useState([]);
    const [titleNameSelected, setTitleNameSelected] = useState(null);
    const [facultyOption, setFacultyOption] = useState([]);
    const [facultySelected, setFacultySelected] = useState(null);
    const [organizOption, setOrganizOption] = useState([]);
    const [organizSelected, setOrganizSelected] = useState(null);
    const [firstNameTH, setFirstNameTH] = useState(null);
    const [lastNameTH, setLastNameTH] = useState(null);
    const [firstNameEN, setFirstNameEN] = useState(null);
    const [lastNameEN, setLastNameEN] = useState(null);
    const [usernameRe, setUsername] = useState(null);
    const [passwordRe, setPassword] = useState(null);
    const [confirmPasswordRe, setConfirmPassword] = useState(null);
    const [roleSelected, setRoleSelected] = useState(null);

    const [confirmButtonStatus, setConfirmButtonStatus] = useState(true);
    const [organizOptionStatus, setOrganizOptionStatus] = useState(true);

    const [errerPassword, setErrerPassword] = useState(false);
    const [errerConfirmPassword, setErrerConfirmPassword] = useState(false);

    const [errerUsernameSame, setErrerUsernameSame] = useState(false);

    useEffect(() => {
        setTitleNameOption(props.titleName);
    }, [props.titleName]);

    useEffect(() => {
        setFacultyOption(props.faculty);
    }, [props.faculty]);

    useEffect(() => {
        setErrerUsernameSame(false);
    }, [usernameRe]);

    useEffect(() => {

        if (titleNameSelected != null && organizSelected != null && firstNameTH != null && lastNameTH != null && firstNameEN != null &&
            lastNameEN != null && usernameRe != null && passwordRe != null && confirmPasswordRe != null && !errerPassword && !errerConfirmPassword) {
            setConfirmButtonStatus(false);
        }
        else {
            setConfirmButtonStatus(true);
        }
    }, [titleNameSelected, organizSelected, firstNameTH, lastNameTH, firstNameEN, lastNameEN, usernameRe, passwordRe, confirmPasswordRe, errerPassword, errerConfirmPassword]);

    useEffect(() => {
        if (passwordRe == null || passwordRe == "") {
            setErrerPassword(false);
        }
        if (passwordRe == confirmPasswordRe || confirmPasswordRe == null) {
            setErrerConfirmPassword(false);
        }
        else {
            setErrerConfirmPassword(true);
        }
    }, [passwordRe, confirmPasswordRe]);

    const regexA = /^[ก-ฺเ-ๅ็-ํ]*$/;

    const regexB = /^[a-zA-Z.]*$/;

    const regexC = /^[a-zA-Z.0-9]*$/;

    var regexD = { capital: /(?=.*[A-Z])/, length: /(?=.{8,12}$)/, specialChar: /[ -\/:-@\[-\`{-~]/, digit: /(?=.*[0-9])/, };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        if ((regexD.capital.test(event.target.value) && regexD.length.test(event.target.value) &&
            regexD.specialChar.test(event.target.value) && regexD.digit.test(event.target.value))) {
            setErrerPassword(false);
        } else {
            setErrerPassword(true);
        }
    };


    const handleChangeRole = (event) => {
        setRoleSelected(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setTitleNameSelected(event.target.value);
    };

    const handleChangeFaculty = (event) => {
        setFacultySelected(event.target.value);
        MemberAPIService.getAllOrganiz(event.target.value).then((res) => {
            setOrganizOption(res.data);
        })
        setOrganizOptionStatus(false);
    };

    const handleChangeOrganiz = (event) => {
        setOrganizSelected(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        MemberAPIService.register(titleNameSelected, organizSelected, firstNameTH, lastNameTH, firstNameEN, lastNameEN, usernameRe, passwordRe, roleSelected).then((response) => {
            window.location.href = '/SignIn';
        }).catch((err) => {
            if (err.response.data.error = "Member.login.username.NotFound") {
                setErrerUsernameSame(true);
            }
        }).finally(() => {

        })
    };

    return (
        <Container sx={{ p: 2 }} maxWidth="md">
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h6' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ p: 2 }} >

                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกคณะ" menuItemPara={facultyOption} onChangePara={handleChangeFaculty} valuePara={facultySelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกสาขา" disabledPara={organizOptionStatus} menuItemPara={organizOption} onChangePara={handleChangeOrganiz} valuePara={organizSelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกระดับสิทธิ์" menuItemPara={roleOption} onChangePara={handleChangeRole} valuePara={roleSelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardSelect labelPara="เลือกคำนำหน้า" menuItemPara={titleNameOption} onChangePara={handleChangeTitle} valuePara={titleNameSelected} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardTextField labelPara="ชื่อภาษาไทย" onChangePara={(e) => regexA.test(e.target.value) ? setFirstNameTH(e.target.value) : null} required valuePara={firstNameTH} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardTextField labelPara="นามสกุลภาษาไทย" onChangePara={(e) => regexA.test(e.target.value) ? setLastNameTH(e.target.value) : null} required valuePara={lastNameTH} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardTextField labelPara="ชื่อภาษาอังกฤษ" onChangePara={(e) => regexB.test(e.target.value) ? setFirstNameEN(e.target.value) : null} required valuePara={firstNameEN} />
                    </Grid>
                    <Grid item sm={6} xs={12} >
                        <CardTextField labelPara="นามสกุลภาษาอังกฤษ" onChangePara={(e) => regexB.test(e.target.value) ? setLastNameEN(e.target.value) : null} required valuePara={lastNameEN} />
                    </Grid>
                    <Grid item sm={12} xs={12} >
                        <CardTextField labelPara="ชื่อบัญชีสมาชิก" errorPara={errerUsernameSame} helperTextPara={errerUsernameSame == false ? "ตัวอักษร a-Z และตัวเลข 0-9" : "**ชื่อบัญชีสมาชิกซ้ำ**"} onChangePara={(e) => regexC.test(e.target.value) ? setUsername(e.target.value) : null} required valuePara={usernameRe} />
                    </Grid>
                    <Grid item sm={12} xs={12} >
                        <CardTextField labelPara="รหัสผ่าน" errorPara={errerPassword} helperTextPara={"ต้องความยาว 8-12 ตัวอักษร และต้องมีตัวอักษรพิเศษ, ตัวพิมพ์ใหญ่, ตัวเลข อย่างน้อยอย่างละ 1 ตัวษร "} typePara="password" onChangePara={handleChangePassword} required valuePara={passwordRe} />
                    </Grid>
                    <Grid item sm={12} xs={12} >
                        <CardTextField labelPara="ยืนยันรหัสผ่าน" errorPara={errerConfirmPassword} typePara="password" onChangePara={(e) => e.target.value ? setConfirmPassword(e.target.value) : null} required valuePara={confirmPasswordRe} />
                    </Grid>
                    <Grid item sm={6} xs={12} dir="ltr" >
                        <Box dir="ltr" sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} color="inherit" variant="contained" >
                                <Link style={{ textDecoration: "none", color: "black" }} to={"/SignIn"} > เข้าสู่ระบบ </Link>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} xs={12} dir="rtl" >
                        <Box dir="rtl" spacing={2} sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} disabled={confirmButtonStatus} onClick={handleSubmit} color="primary" variant="contained" >
                                สมัครสมาชิก
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container >
    );
}
