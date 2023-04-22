import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CardHeader,
  Box,
  TextField,
  Card,
  Button,
  Grid,
  Container,
  Typography,
  Stack,
  CardContent,
} from "@mui/material";
import CardTextField from "../../Component/Card/CardTextField";
import MemberAPIService from "../../Service/MemberAPIService";

export default class Login extends Component {
  render() {
    return (
      <div>
        <UserSignIn title={"เข้าสู่ระบบ"} />
      </div>
    );
  }
}

function UserSignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    MemberAPIService.login(username, password);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            {/* <CardHeader
              title={props.title}
              titleTypographyProps={{ fontWeight: "bold", variant: "h5" }}
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                p: 1,
              }}
            /> */}
            <div>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                กรุณาเข้าสู่ระบบ
              </Typography>
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                  <CardTextField
                    labelPara="ชื่อสมาชิก"
                    onChangePara={(e) => setUsername(e.target.value)}
                    required
                    valuePara={username}
                    type="text"
                    placeholder="Username"
                    variant="outlined"
                    value={username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CardTextField
                    labelPara="รหัสสมาชิก"
                    typePara="password"
                    onChangePara={(e) => setPassword(e.target.value)}
                    required
                    valuePara={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      sx={{ textAlign: "center", float: "right" }}
                      color="primary"
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}
