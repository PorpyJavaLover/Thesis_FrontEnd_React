import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Page/Home";
import SelectSubjectTeacher from "./Page/Teacher/SelectSubject_Teacher";
import TimetableTeacher from "./Page/Teacher/Timetable_Teacher";
import ShowTimeTableStaff from "./Page/Staff/ShowTimeTable_Staff";
import TimetableStaff from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/NotTeach_Teacher";
import SelectNotTeachStaff from "./Page/Staff/NotTeach_Staff";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import LeaveTeachStaff from "./Page/Staff/LeaveTeach_Staff";
import ReplaceTeachTeacher from "./Page/Teacher/ReplaceTeach_Teacher";
import ReplaceTeachStaff from "./Page/Staff/ReplaceTeach_Staff";
import MenagementMemberStaff from "./Page/Staff/MenagementMember_Staff";
import MenagementMemberAdmin from "./Page/Admin/MenagementMember_Admin";
import PDFTeach from "./Component/PDFTeach_Teacher";
import RolePlayAdmin from "./Page/Admin/RolePlay_Admin";
import SignIn from "./Page/SignIn";
import Singup from "./Page/Singup";
import PrivateRoutes from './Util/PrivateRoutes';
import TeacherRoutes from './Util/TeacherRoutes';
import StaffRoutes from './Util/StaffRoutes';
import AdminRoutes from './Util/AdminRoutes';
import Norbar from "./Component/Norbar";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Norbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<TeacherRoutes />}>
            <Route path="/Teacher/SelectSubject" element={<SelectSubjectTeacher />} />
            <Route path="/Teacher/Timetable" element={<TimetableTeacher />} />
            <Route path="/Teacher/NotTeach" element={<SelectNotTeachTeacher />} />
            <Route path="/Teacher/LeaveTeach" element={<LeaveTeachTeacher />} />
            <Route path="/Teacher/ReplaceTeach" element={<ReplaceTeachTeacher />} />
          </Route>
          <Route element={<StaffRoutes />}>
            <Route path="/Staff/SelectSubject" element={<SelectSubjectStaff />} />
            <Route path="/Staff/Timetable" element={<TimetableStaff />} />
            <Route path="/Staff/ShowTimeTable" element={<ShowTimeTableStaff />} />
            <Route path="/Staff/NotTeach" element={<SelectNotTeachStaff />} />
            <Route path="/Staff/LeaveTeach" element={<LeaveTeachStaff />} />
            <Route path="/Staff/ReplaceTeach" element={<ReplaceTeachStaff />} />
            <Route path="/Staff/MenagementMember" element={<MenagementMemberStaff />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/MenagementMember" element={<MenagementMemberAdmin />} />
            <Route path="/Admin/RolePlay" element={<RolePlayAdmin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Teacher/PDFTeach" element={<PDFTeach />} />
        </Route>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<Singup />} />
      </Routes>
    </BrowserRouter>
  );
}
