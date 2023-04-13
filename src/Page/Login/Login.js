import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Snackbar,
  CardContent,
  Divider,
  Form,
  Label,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";
import APIService from "../../Service/APIService";
import axios from "axios";
import jwt_decode from "jwt-decode";

const API_REST_URL = "http://192.168.91.120:8080";
// const API_REST_URL = "http://192.168.3.248:8080";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // console.log(username,password)
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    axios
      .post(API_REST_URL + "/member/anonymous/login", body)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "user",
          JSON.stringify(jwt_decode(JSON.parse(localStorage.getItem("token"))))
        );
        <Navigate to="/login" />;
      })
      .then((res) => {
        message.success("ชื่อผู้ใช้ถูกต้อง");
        navigate("/homepages");
      })
      .catch((error) => {
        // message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      });
  };

  return (
    <div>
      <Card
        sx={{
          // marginTop: 10,
          borderRadius: 5,
          border: 1,
          width: "600px",
          // height: "300px",
          paddingLeft: ".75rem",
          paddingRight: ".75rem",
          marginLeft: "auto",
          marginRight: "auto",
          float: "center",
          // display: "flex",
          textAlign: "center",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <CardContent>
          <Container sx={{ p: 2 }} maxWidth="sm">
            <div>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                กรุณาเข้าสู่ระบบ
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container sx={{ pt: 2 }} spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Username"
                      name="username"
                      variant="outlined"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      placeholder="Password"
                      name="password"
                      variant="outlined"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button type="success">เข้าสู่ระบบ</Button>
                  </Grid>
                </Grid>
              </form>
              {message && <p>{message}</p>}
              {error && <p>Error: {error}</p>}
            </div>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
