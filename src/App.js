import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Page/Home";
import SelectSubjectTeacher from "./Page/Teacher/SelectSubject_Teacher";
import TimetableTeacher from "./Page/Teacher/Timetable_Teacher";
import TimetableStaff from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/NotTeach_Teacher";
import SelectNotTeachStaff from "./Page/Staff/NotTeach_Staff";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import LeaveTeachStaff from "./Page/Staff/LeaveTeach_Staff";
import ReplaceTeachTeacher from "./Page/Teacher/ReplaceTeach_Teacher";
import ReplaceTeachStaff from "./Page/Staff/ReplaceTeach_Staff";
import MenagementMemberStaff from "./Page/Staff/MenagementMember_Staff";
import PDFTeach from "./Component/PDFTeach_Teacher";
import RolePlayAdmin from "./Page/Admin/RolePlay_Admin";
import Replace2 from "./Page/Replace2";
import SignIn from "./Page/SignIn";
import Singup from "./Page/Singup";
import Error404 from "./Page/Error404";
import TableExampleApprove from "./Page/TableExampleApprove";
import PrivateRoutes from './Util/PrivateRoutes';
import TeacherRoutes from './Util/TeacherRoutes';
import StaffRoutes from './Util/StaffRoutes';
import AdminRoutes from './Util/AdminRoutes';
import './App.css';
import Navbor from "./Component/Navbor";
import Norbar from "./Component/Norbar";
import Navbar from "./Component/Navbar";

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
            <Route path="/Staff/NotTeach" element={<SelectNotTeachStaff />} />
            <Route path="/Staff/LeaveStaff" element={<LeaveTeachStaff />} />
            <Route path="/Staff/ReplaceStaff" element={<ReplaceTeachStaff />} />
            <Route path="/Staff/MenagementMemberStaff" element={<MenagementMemberStaff />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/RolePlayAdmin" element={<RolePlayAdmin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Teacher/PDFTeach" element={<PDFTeach />} />
          <Route path="/R2" element={<Replace2 />} />
          <Route path="/T1" element={<TableExampleApprove />} />
        </Route>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<Singup />} />
        <Route path="/Error404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
