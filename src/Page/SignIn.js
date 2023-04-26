import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, Box, TextField, Card, Button, Grid, Container, Typography, Stack } from '@mui/material';
import CardTextField from '../Component/CardTextField'
import MemberAPIService from '../Service/MemberAPIService';


export default class SignIn extends Component {
    render() {
        return (
            <div>
                <UserSignIn title={"เข้าสู่ระบบ"} />
            </div>
        )
    }
}

function UserSignIn(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        MemberAPIService.login(username, password);
    };

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <Container sx={{ p: 2 }} maxWidth="sm">
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h6' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ p: 2 }} >

                    <Grid item xs={12}>
                        <CardTextField labelPara="ชื่อสมาชิก" onChangePara={(e) => setUsername(e.target.value)} required valuePara={username} />
                    </Grid>
                    <Grid item xs={12}>
                        <CardTextField labelPara="รหัสผ่าน" typePara="password" onChangePara={(e) => setPassword(e.target.value)} required valuePara={password} />
                    </Grid>
                    <Grid item sm={6} dir="ltr" >
                        <Box dir="ltr" sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} color="primary" onClick={handleSubmit} variant="contained" >
                                เข้าสู่ระบบ
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} dir="rtl" >
                        <Box dir="rtl" spacing={2} sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <Button sx={{ width: 125 }} color="inherit" variant="contained" >
                                <Link style={{ textDecoration: "none", color: "black" }} to={"/SignUp"} >
                                    สมัครสมาชิก
                                </Link>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container >
    );
}
