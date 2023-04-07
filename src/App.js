import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Page/Home";
import SelectSubjectTeacher from "./Page/Teacher/SelectSubject_Teacher";
import TimetableStaff from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/NotTeach_Teacher";
import SelectNotTeachStaff from "./Page/Staff/NotTeach_Staff";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import ReplaceTeachTeacher from "./Page/Teacher/ReplaceTeach_Teacher";
import Replace2 from "./Page/Replace2";
import Singin from "./Page/Singin";
import Singup from "./Page/Singup";
import TableExampleApprove from "./Page/TableExampleApprove";
import './App.css';
import Navbor from "./Component/Navbor";
import Norbar from "./Component/Norbar";
import Navbar from "./Component/Navbar";

export default function App() {
  return (
    <BrowserRouter>
    <Norbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Teacher/SelectSubject" element={<SelectSubjectTeacher />} />
        <Route path="/Staff/SelectSubject" element={<SelectSubjectStaff />} />
        <Route path="/Staff/Timetable" element={<TimetableStaff />} />
        <Route path="/Teacher/NotTeach"  element={<SelectNotTeachTeacher />} />
        <Route path="/Staff/NotTeach"  element={<SelectNotTeachStaff />} />
        <Route path="/Teacher/LeaveTeach" element={<LeaveTeachTeacher />} />
        <Route path="/Teacher/ReplaceTeach" element={<ReplaceTeachTeacher />} />
        <Route path="/R2" element={<Replace2 />} />
        <Route path="/T1" element={<TableExampleApprove />} />
        <Route path="/Singin" element={<Singin />} />
        <Route path="/Singup" element={<Singup />} />
      </Routes>
    </BrowserRouter>
  );
}
