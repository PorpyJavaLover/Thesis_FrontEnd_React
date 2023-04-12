// import React, { Component, useState } from "react";
// import {
//   Card,
//   Button,
//   TextField,
//   Grid,
//   Typography,
//   Container,
//   Snackbar,
//   CardContent,
//   Divider,
//   Form,
//   Label,
// } from "@mui/material";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";
// import APIService from "../../Service/APIService";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     setLoading(true);
//     APIService.login(username, password).then(
//       (response) => {
//         localStorage.setItem("user", JSON.stringify(response.data));
//         setIsLoggedIn(true);
//         setShowError(false);
//         setLoading(false);
//         navigate("/homepages");
//       },
//       (error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setShowError(true);
//         setErrorMessage(resMessage);
//         setLoading(false);
//       }
//     );
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <Card
//         sx={{
//           // marginTop: 10,
//           borderRadius: 5,
//           border: 1,
//           width: "600px",
//           // height: "300px",
//           paddingLeft: ".75rem",
//           paddingRight: ".75rem",
//           marginLeft: "auto",
//           marginRight: "auto",
//           float: "center",
//           // display: "flex",
//           textAlign: "center",
//           overflow: "hidden",
//           maxWidth: "100%",
//         }}
//       >
//         <CardContent>
//           <Container sx={{ p: 2 }} maxWidth="sm">
//             <div>
//               <Typography
//                 component="h1"
//                 variant="h5"
//                 sx={{ textAlign: "center" }}
//               >
//                 กรุณาเข้าสู่ระบบ
//               </Typography>
//               <form>
//                 <Grid container sx={{ pt: 2 }} spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       type="text"
//                       placeholder="Username"
//                       name="username"
//                       variant="outlined"
//                       required
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       type="password"
//                       placeholder="Password"
//                       name="password"
//                       variant="outlined"
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sx={{ textAlign: "center" }}>
//                     <Button onClick={handleLogin}>เข้าสู่ระบบ</Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </div>
//           </Container>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = { username, password };

    fetch("http://localhost:8080/member/anonymous/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setError(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
export default Login;
