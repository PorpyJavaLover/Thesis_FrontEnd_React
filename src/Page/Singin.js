import React, { Component, useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import APIService from '../Service/APIService';

export default class Singin extends Component {

    render() {
        return (
            <div>
                <div>
                    <UserCreate />
                </div>
            </div>)
    }
}

function UserCreate() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        APIService.login(username, password);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container sx={{ p: 2 }} maxWidth="sm">
            <div>
                <Typography component="h1" variant="h5">
                    Singup
                </Typography>
                <form >
                    <Grid container sx={{ pt: 2 }} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Log in
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                href="/L2"
                            >
                                Sing up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
