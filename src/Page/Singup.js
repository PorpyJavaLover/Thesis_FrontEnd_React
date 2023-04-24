import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, Box, TextField, Card, Button, Grid, Container, Typography, Stack } from '@mui/material';
import CardTextField from '../Component/CardTextField'
import CardSelect from '../Component/CardSelect'
import MemberAPIService from '../Service/MemberAPIService';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.updateState.bind(this);
        this.state = {
            oganiz: [],
            titleName: []
        }
    }

    componentDidMount() {
        MemberAPIService.getAllOrganization().then((res) => {
            this.setState({ oganiz: res.data });
        })
    }

    updateState = () => {

    }

    render() {
        return (
            <div>
                <UserCreate title={"สมัครสมาชิก"} oganiz={this.state.oganiz} titleName={this.state.titleName} />
            </div>
        )
    }
}

function UserCreate(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        MemberAPIService.login(username, password);
    };

    const [titleNameOption, setTitleNameOption] = useState([]);
    const [titleNameSelected, setTitleNameSelected] = useState(null);
    const [organizOption, setOrganizOption] = useState([]);
    const [organizSelected, setOrganizSelected] = useState(null);
    const [firstNameTH, setFirstNameTH] = useState(null);
    const [lastNameTH, setLastNameTH] = useState(null);
    const [firstNameEN, setFirstNameEN] = useState(null);
    const [lastNameEN, setLastNameEN] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmpassword] = useState(null);

    useEffect(() => {
        setTitleNameOption(props.titleName);
    }, [props.titleName]);

    useEffect(() => {
        setOrganizOption(props.oganiz);
    }, [props.oganiz]);

    const handleChangeTitle = (event) => {
        setTitleNameSelected(event.target.value);
    };

    const handleChangeOrganiz = (event) => {
        setOrganizSelected(event.target.value);
    };

    return (
        <Container sx={{ p: 2 }} maxWidth="md">
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h6' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ p: 2 }} >

                    <Grid item sm={12} >
                        <CardSelect labelPara="สาขา" menuItemPara={organizOption} onChangePara={handleChangeOrganiz} valuePara={organizSelected} />
                    </Grid>
                    <Grid item sm={12} >
                        <CardSelect labelPara="คำนำหน้า" menuItemPara={titleNameOption} onChangePara={handleChangeTitle} valuePara={titleNameSelected} />
                    </Grid>
                    <Grid item sm={6} >
                        <CardTextField labelPara="ชื่อภาษาไทย" onChangePara={(e) => setFirstNameTH(e.target.value)} required valuePara={firstNameTH} />
                    </Grid>
                    <Grid item sm={6} >
                        <CardTextField labelPara="นามสกุลภาษาไทย" onChangePara={(e) => setLastNameTH(e.target.value)} required valuePara={lastNameTH} />
                    </Grid>
                    <Grid item sm={6} >
                        <CardTextField labelPara="ชื่อภาษาอังกฤษ" onChangePara={(e) => setFirstNameEN(e.target.value)} required valuePara={firstNameEN} />
                    </Grid>
                    <Grid item sm={6} >
                        <CardTextField labelPara="นามสกุลภาษาอังกฤษ" onChangePara={(e) => setLastNameEN(e.target.value)} required valuePara={lastNameEN} />
                    </Grid>
                    <Grid item sm={12} >
                        <CardTextField labelPara="ชื่อสมาชิก" onChangePara={(e) => setUsername(e.target.value)} required valuePara={username} />
                    </Grid>
                    <Grid item sm={12} >
                        <CardTextField labelPara="รหัสสมาชิก" onChangePara={(e) => setPassword(e.target.value)} required valuePara={password} />
                    </Grid>
                    <Grid item sm={12} >
                        <CardTextField labelPara="ยืนยันรหัสสมาชิก" onChangePara={(e) => setConfirmpassword(e.target.value)} required valuePara={confirmpassword} />
                    </Grid>

                    <Grid item sm={6} dir="ltr" >
                        <Box dir="ltr" sx={{ pb: 2, display: 'flex', alignItems: 'flex-end', }}>  //@todo <---check point  --> pd
                            <Button sx={{ width: 125 }} color="primary" onClick={handleSubmit} variant="contained" > เข้าสู่ระบบ </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} dir="rtl" >
                        <Box dir="rtl" spacing={2} sx={{ pt: 2, display: 'flex', alignItems: 'flex-end', }}> //@todo <--- check point  --> pt
                            
                            <Button sx={{ width: 125 }} color="inherit" variant="contained" >
                                <Link style={{ textDecoration: "none", color: "black" }} to={"/Singup"} > สมัครสมาชิก </Link>
                            </Button>

                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container >
    );
}
