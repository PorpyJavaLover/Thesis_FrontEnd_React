import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Menu/Navbar";
import Login from "./Page/Login/Login";
import Logup from "./Page/Logup/Logup";
import Hompages from "./Page/Homepages/index";
import Menu from "./Component/Menu/Menu";
import TimetableTeacher from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/SelectSubject_Teacher";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import ViewReplace from "./Page/Replace/ViewReplce";
import InputReplace from "./Page/Replace/InputReplace";
import Menuadmin from "./Page/UserReplace/admin/Menuadmin";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Route element={<PrivateRoute />}></Route> */}
      {/* <Navbar /> <br /> <br /> <br /> <br /> */}
      {/* <Menu /> */}
      <Menuadmin />
      <br /> <br />
      <Routes>
        <Route path="/home" element={<Menu />} />
        <Route path="/home1" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logup" element={<Logup />} />
        <Route path="/homepages" element={<Hompages />} />
        <Route path="/Teacher/SelectSubject" element={<SelectSubjectStaff />} />
        <Route path="/Teacher/Timetable" element={<TimetableTeacher />} />
        <Route path="/Teacher/NotTeach" element={<SelectNotTeachTeacher />} />
        <Route path="/Teacher/LeaveTeach" element={<LeaveTeachTeacher />} />
        <Route path="/view-replace" element={<ViewReplace />} />
        <Route path="/input-replace" element={<InputReplace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
