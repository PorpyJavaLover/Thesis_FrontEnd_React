import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Menu/Navbar";
import Login from "./Page/Login/Login";
import Logup from "./Page/Logup/Logup";
import Homepages from "./Page/Homepages/index";
import Menu from "./Component/Menu/Menu";
import TimetableTeacher from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/SelectSubject_Teacher";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import ViewReplace from "./Page/Replace/ViewReplce";
import InputReplace from "./Page/Replace/InputReplace";
import Menuadmin from "./Page/UserReplace/admin/Menuadmin";
import { useDispatch } from "react-redux";
import { currentUser } from "./Component/functions/auth";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch(false);
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err);
      });
  }

  return (
    <div className="App">
      <ToastContainer />
      <Menu />
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/logup" element={<Logup />} />
        <Route path="/login" element={<Login />} />
        {/* 
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        /> */}

        {/* <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        /> */}
      </Routes>
    </div>
  );
};
export default App;

// const HomeAdmin = () => {
//   return <h1>Home Admin</h1>;
// };
// const ManageAdmin = () => {
//   return <h1>Manage Admin</h1>;
// };
// const HomeUser = () => {
//   return <h1>Home User</h1>;
// };
// const AdminRoute = ({ children }) => {
//   const [role, setRole] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const token = localStorage.token;
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU1YTZlMzYyY2IyNTIwMzBlMjY0Y2U2IiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE1OTMzNDA1MjZ9.kt8C_W5g5E-hfN5N5Q8M5Wf-hXd_gL0bpvZz8WxlhEo";
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU1YTZlMzYyY2IyNTIwMzBlMjY0Y2U2IiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE1OTMzNDA1MjZ9.kt8C_W5g5E-hfN5N5Q8M5Wf-hXd_gL0bpvZz8WxlhEo";
//     console.log(token);
//     currentUser(token)
//       .then((res) => {
//         code;
//         console.log(res.data);
//         dispatch({
//           type: "LOGIN",
//           payload: {
//             token: token,
//             username: res.data.username,
//             role: res.data.role,
//           },
//         });
//         setRole(res.data.role);
//       })
//       .catch((err) => {
//         err;
//         console.log(err);
//       });
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       {/* {role == "admin" ? children : <Navigate to="/" />} */}
//       {children}
//     </div>
//   );
// };
// const UserRoute = ({ children }) => {
//   const [role, setRole] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const token = localStorage.token;
//     const token =
//       "eyJhbGU2IiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE1OTMzNDA1MjZ9.kt8C_W5g5E-hfN5N5Q8M5Wf-hXd_gL0bpvZz8WxlhEo";
//     console.log(token);
//     currentUser(token)
//       .then((res) => {
//         code;
//         console.log(res.data);
//         dispatch({
//           type: "LOGIN",
//           payload: {
//             token: token,
//             username: res.data.username,
//             role: res.data.role,
//           },
//         });
//         setRole(res.data.role);
//       })
//       .catch((err) => {
//         err;
//         console.log(err);
//       });
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       {/* {role == "user" ? children : <Navigate to="/" />} */}
//       {children}
//     </div>
//   );
// };
