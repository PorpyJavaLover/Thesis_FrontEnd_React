import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Page/Homepages/index";
import SelectSubjectTeacher from "./Page/Teacher/SelectSubject_Teacher";
import TimetableTeacher from "./Page/Teacher/Timetable_Teacher";
import TimetableStaff from "./Page/Staff/Timetable_Staff";
import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
import SelectNotTeachTeacher from "./Page/Teacher/NotTeach_Teacher";
import SelectNotTeachStaff from "./Page/Staff/NotTeach_Staff";
import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
import ReplaceTeachTeacher from "./Page/Teacher/ReplaceTeach_Teacher";
import PDFTeach from "./Component/PdfExport/PDFReplace";
// import Replace2 from "./Page/Replace2";
import SignIn from "./Page/SignIn";
import Error404 from "./Page/Error404";
import PrivateRoutes from "./Util/PrivateRoutes";
import TeacherRoutes from "./Util/TeacherRoutes";
import StaffRoutes from "./Util/StaffRoutes";
import Navbar from "./Component/Menu/Menu";
import ViewReplace from "./Page/Replace/ViewReplce";
import InputReplace from "./Page/Replace/InputReplace";
import EditReplace from "./Page/Replace/EditReplace";
import Login from "./Page/Login/Login";
import PDFSubject from "./Component/PdfExport/PDFSubject";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/Teacher" element={<TeacherRoutes />}>
            <Route
              path="/Teacher/SelectSubject"
              element={<SelectSubjectTeacher />}
            />
            <Route path="/Teacher/Timetable" element={<TimetableTeacher />} />
            <Route
              path="/Teacher/NotTeach"
              element={<SelectNotTeachTeacher />}
            />
            <Route path="/Teacher/LeaveTeach" element={<LeaveTeachTeacher />} />
            <Route path="/Teacher/view-replace" element={<ViewReplace />} />
            <Route path="/Teacher/input-replace" element={<InputReplace />} />
            <Route path="/Teacher/edit-replace" element={<EditReplace />} />
            <Route path="/Teacher/PDFTeach" element={<PDFSubject />} />

            <Route
              path="/Teacher/ReplaceTeach"
              element={<ReplaceTeachTeacher />}
            />
          </Route>
          <Route element={<StaffRoutes />}>
            <Route
              path="/Staff/SelectSubject"
              element={<SelectSubjectStaff />}
            />
            <Route path="/Staff/Timetable" element={<TimetableStaff />} />
            <Route path="/Staff/NotTeach" element={<SelectNotTeachStaff />} />
          </Route>
          <Route path="/" element={<Navbar />} />

          {/* <Route path="/T1" element={<TableExampleApprove />} /> */}
        </Route>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Singup" element={<Singup />} /> */}
        <Route path="/Error404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
