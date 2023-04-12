<<<<<<< HEAD
import React, { Component, Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
// import React, { Component, Fragment, useContext } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./Component/Menu/Navbar";
// import Login from "./Page/Login/Login";
// import Logup from "./Page/Logup/Logup";
// import Homepages from "./Page/Homepages/index";
// import Menu from "./Component/Menu/Menu";
// import TimetableTeacher from "./Page/Staff/Timetable_Staff";
// import SelectSubjectStaff from "./Page/Staff/SelectSubject_Staff";
// import SelectNotTeachTeacher from "./Page/Teacher/SelectSubject_Teacher";
// import LeaveTeachTeacher from "./Page/Teacher/LeaveTeach_Teacher";
// import ViewReplace from "./Page/Replace/ViewReplce";
// import InputReplace from "./Page/Replace/InputReplace";
// import Menuadmin from "./Page/UserReplace/admin/Menuadmin";
// import AdminRoute from "./Component/Route/AdminRoute";
// import UserRoute from "./Component/Route/UserRoute";
// import HomeAdmin from "./Component/Premission/HomeAdmin";
// import HomeUser from "./Component/Premission/HomeUser";
// import ManageAdmin from "./Component/Premission/ManageAdmin";
// import { currentUser } from "./Component/functions/auth";
// import MyContext from "./Component/Premission/MyContext";
// import PrivateRoute from "./Component/Route/PrivateRoute";
// import { PublicRoute } from "./Component/Route/PublicRoute";

// const App = () => {
//   const { basename } = useContext(MyContext);
//   // console.log(basename);
//   return (
//     <div className="App">
//       <BrowserRouter basename={basename}>
//         <Navbar />
//         <br />
//         <br />
//         <br />
//         <br />

//         <Routes>
//         <Route element={<PrivateRoute />}>
//             <Route path="/" element={<Homepages />} />
//             <Route path="/logup" element={<Logup />} />

//             <Route
//               path="/admin/index"
//               element={
//                 <AdminRoute>
//                   <HomeAdmin />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/manage-admin"
//               element={
//                 <AdminRoute>
//                   <ManageAdmin />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/user/index"
//               element={
//                 <UserRoute>
//                   <HomeUser />
//                 </UserRoute>
//               }
//             />
//             <Route
//               path="/staff/select-subject"
//               element={<SelectSubjectStaff />}
//             />
//             <Route path="/staff/timetable" element={<TimetableTeacher />} />
//             <Route
//               path="/teacher/select-subject"
//               element={<SelectNotTeachTeacher />}
//             />
//             <Route
//               path="/teacher/leave-teach"
//               element={<LeaveTeachTeacher />}
//             />
//             <Route path="/replace/view" element={<ViewReplace />} />
//             <Route path="/replace/input" element={<InputReplace />} />
//           </Route>
//           <Route element={<PublicRoute />}>
//             <Route path="/login" element={<Login />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// const App = () => {
//   const user = currentUser();
//   const { basename } = useContext(MyContext);
//   //   console.log(basename);
//   return (
//     <div className="App">
//       <BrowserRouter basename={basename}>
//         <Navbar />
//         <br />
//         <br />
//         <br />
//         <br />

//         <Routes>
//           {user && user.role === "admin" ? (
//             <Fragment>
//               <Route element={<PrivateRoute />}>
//                 <Route path="/" element={<Homepages />} />
//                 <Route path="/logup" element={<Logup />} />

//                 <Route
//                   path="/admin/index"
//                   element={
//                     <AdminRoute>
//                       <HomeAdmin />
//                     </AdminRoute>
//                   }
//                 />
//                 <Route
//                   path="/admin/manage-admin"
//                   element={
//                     <AdminRoute>
//                       <ManageAdmin />
//                     </AdminRoute>
//                   }
//                 />
//                 <Route
//                   path="/user/index"
//                   element={
//                     <UserRoute>
//                       <HomeUser />
//                     </UserRoute>
//                   }
//                 />
//                 <Route
//                   path="/staff/select-subject"
//                   element={<SelectSubjectStaff />}
//                 />
//                 <Route path="/staff/timetable" element={<TimetableTeacher />} />
//                 <Route
//                   path="/teacher/select-subject"
//                   element={<SelectNotTeachTeacher />}
//                 />
//                 <Route
//                   path="/teacher/leave-teach"
//                   element={<LeaveTeachTeacher />}
//                 />
//                 <Route path="/replace/view" element={<ViewReplace />} />
//                 <Route path="/replace/input" element={<InputReplace />} />
//               </Route>
//               <Route element={<PublicRoute />}>
//                 <Route path="/login" element={<Login />} />
//               </Route>
//             </Fragment>
//           ) : user && user.role === "teacher" ? (
//             <Fragment>
//               {/* <Route path="/menu" element={<Menu />} /> */}
//               <Route element={<PrivateRoute />}>
//                 <Route path="/teacher/index" element={<HomeUser />} />
//               </Route>
//               <Route element={<PublicRoute />}>
//                 <Route path="/" element={<Homepages />} />
//                 <Route path="/login" element={<Login />} />
//               </Route>
//             </Fragment>
//           ) : (
//             <Fragment>
//               {/* <Route path="/menu" element={<Menu />} /> */}
//               <Route element={<PrivateRoute />}>
//                 <Route path="/" element={<Homepages />} />
//               </Route>
//               <Route element={<PublicRoute />}>
//                 <Route path="/login" element={<Login />} />
//               </Route>
//             </Fragment>
//           )}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
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
<<<<<<< HEAD

const App = () => {
  const { basename } = useContext(MyContext);
  // console.log(basename);
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Menu />
=======
import PrivateRoute from "./Component/Route/PrivateRoute";
import { PublicRoute } from "./Component/Route/PublicRoute";

const App = () => {
  const { basename } = useContext(MyContext);
  console.log(basename);
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Navbar />
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
        <br />
        <br />
        <br />
        <br />
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/logup" element={<Logup />} />
          <Route path="/login" element={<Login />} />
          <Route
=======

        <Routes>
          <PrivateRoute path="/" element={<Homepages />} />
          <PrivateRoute path="/logup" element={<Logup />} />

          <PrivateRoute
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
            path="/admin/index"
            element={
              <AdminRoute>
                <HomeAdmin />
              </AdminRoute>
            }
          />
<<<<<<< HEAD
          <Route
=======
          <PrivateRoute
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
            path="/admin/manage-admin"
            element={
              <AdminRoute>
                <ManageAdmin />
              </AdminRoute>
            }
          />
<<<<<<< HEAD
          <Route
=======
          <PrivateRoute
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
            path="/user/index"
            element={
              <UserRoute>
                <HomeUser />
              </UserRoute>
            }
          />
<<<<<<< HEAD
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
=======
          <PrivateRoute
            path="/staff/select-subject"
            element={<SelectSubjectStaff />}
          />
          <PrivateRoute
            path="/staff/timetable"
            element={<TimetableTeacher />}
          />
          <PrivateRoute
            path="/teacher/select-subject"
            element={<SelectNotTeachTeacher />}
          />
          <PrivateRoute
            path="/teacher/leave-teach"
            element={<LeaveTeachTeacher />}
          />
          <PrivateRoute path="/replace/view" element={<ViewReplace />} />
          <PrivateRoute path="/replace/input" element={<InputReplace />} />
          <PublicRoute path="/login" element={<Login />} />
>>>>>>> da7db6c6787631172f075a755a05d49ef3e6e65f
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
