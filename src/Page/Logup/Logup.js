import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function UserCreate() {
  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      position: position,
      idcard: idcard,
      title: title,
      fname: fname,
      lname: lname,
      username: username,
      phonenumber: phonenumber,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    };
    fetch("https://www.mecallapi.com/api/users/create", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "./L1";
        }
      });
  };

  const [position, setPosition] = useState("");
  const [idcard, setIdcard] = useState("");
  const [title, setTitle] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
      // scroll={{ y: 800 }}
    >
      <CardContent>
        <Container sx={{ p: 2 }} maxWidth="sm">
          {/* <Container sx={{ p: 5 }} maxWidth="sm"> */}
          <div>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              กรุณาสมัครสมาชิก
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="demo-simple-select">สถานะการสมัคร</InputLabel>
              <Select
                Complete="position"
                labelId="demo-simple-select-label"
                id="สถานะการสมัคร"
                required
                fullWidth
                variant="outlined"
                label="สถานะการสมัคร"
                onChange={(e) => setPosition(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>ผู้ดูแลระบบ</MenuItem>
                <MenuItem value={20}>เจ้าหน้าที่</MenuItem>
                <MenuItem value={30}>อาจารย์ประจำ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ marginTop: 2 }}
              Complete="idcard"
              name="รหัสบัตรประจำตัว"
              variant="outlined"
              required
              fullWidth
              id="รหัสบัตรประจำตัว"
              label="รหัสบัตรประจำตัว"
              onChange={(e) => setIdcard(e.target.value)}
              //autoFocus
            />
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select">คำนำหน้า</InputLabel>
              <Select
                Complete="title"
                labelId="demo-simple-select-label"
                id="คำนำหน้า"
                required
                fullWidth
                variant="outlined"
                label="คำนำหน้า"
                onChange={(e) => setTitle(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>นาย</MenuItem>
                <MenuItem value={20}>นาง</MenuItem>
                <MenuItem value={30}>นางสาว</MenuItem>
                <MenuItem value={40}>ดร.</MenuItem>
                <MenuItem value={50}>ศาสตราจารย์</MenuItem>
                <MenuItem value={60}>รองศาสตราจารย์</MenuItem>
                <MenuItem value={70}>ผู้ช่วยศาสตราจารย์</MenuItem>
                <MenuItem value={80}>ผู้ช่วยศาสตราจารย์ ดร.</MenuItem>
                <MenuItem value={90}>รองศาสตราจารย์ ดร.</MenuItem>
                <MenuItem value={100}>น.อ.ศ.</MenuItem>
                <MenuItem value={110}>เจ้าหน้าที่</MenuItem>
                <MenuItem value={120}>ว่าที่ร้อยตรีหญิง</MenuItem>
                <MenuItem value={130}>อาจารย์</MenuItem>
                <MenuItem value={140}>อาจารย์ ดร.</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ marginTop: 2 }}
              Complete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              onChange={(e) => setFname(e.target.value)}
              //autoFocus
            />
            <TextField
              sx={{ marginTop: 2 }}
              Complete="lname"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              onChange={(e) => setLname(e.target.value)}
            />{" "}
            <TextField
              sx={{ marginTop: 2 }}
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ marginTop: 2 }}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginTop: 2 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>{" "}
            <FormControl fullWidth sx={{ marginTop: 2 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmpassword
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmpassword"
              />
            </FormControl>
            <Grid container sx={{ pt: 2 }} spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
}
