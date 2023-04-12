import React, { Component, Fragment, useContext } from "react";
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
import AdminRoute from "./Component/Route/AdminRoute";
import UserRoute from "./Component/Route/UserRoute";
import HomeAdmin from "./Component/Premission/HomeAdmin";
import HomeUser from "./Component/Premission/HomeUser";
import ManageAdmin from "./Component/Premission/ManageAdmin";
import { currentUser } from "./Component/functions/auth";
import MyContext from "./Component/Premission/MyContext";

const App = () => {
  const { basename } = useContext(MyContext);
  // console.log(basename);
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Menu />
        <br />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/logup" element={<Logup />} />
          <Route path="/login" element={<Login />} />
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
          />
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomeUser />
              </UserRoute>
            }
          />
          <Route
            path="/staff/select-subject"
            element={<SelectSubjectStaff />}
          />
          <Route path="/staff/timetable" element={<TimetableTeacher />} />
          <Route
            path="/teacher/select-subject"
            element={<SelectNotTeachTeacher />}
          />
          <Route path="/teacher/leave-teach" element={<LeaveTeachTeacher />} />
          <Route path="/replace/view" element={<ViewReplace />} />
          <Route path="/replace/input" element={<InputReplace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
