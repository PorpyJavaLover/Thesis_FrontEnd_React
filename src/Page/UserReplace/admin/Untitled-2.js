import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Menu/Navbar";
import Login from "./pages/Login/Login";
import Logup from "./pages/Logup/Logup";
import Hompages from "./pages/Homepages/index";
import Menu from "./Component/Menu/Menu";
import TimetableTeacher from "./pages/Staff/Timetable_Staff";
import SelectSubjectStaff from "./pages/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./pages/Teacher/NotTeach_Teacher";
import LeaveTeachTeacher from "./pages/Teacher/LeaveTeach_Teacher";
import ViewReplace from "./pages/Replace/ViewReplce";
import InputReplace from "./pages/Replace/InputReplace";
import Menuadmin from "./pages/UserReplace/admin/Menuadmin";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Route element={<PrivateRoute />}></Route> */}
      {/* <Navbar /> <br /> <br /> <br /> <br /> */}
      <Menu />
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
        <Route path="/menu" element={<Menuadmin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
