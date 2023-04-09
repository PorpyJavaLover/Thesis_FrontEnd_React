// function App() {
    //   const [data, setData] = useState({});
    //   const [role, setRole] = useState("");
    
    //   const idtoken = localStorage.token;
    //   if (idtoken) {
    //     currentUser(idtoken)
    //       .then((res) => {
    //         //code
    //         console.log(res.data);
    //         setData(res.data);
    //         setRole(res.data.role);
    //       })
    //       .catch((err) => {
    //         //err
    //         console.log(err);
    //       });
    //   }
    //   return (
    //     <div className="App">
    //       <Navbar />
    //       <BrowserRouter>
    //         {role === "admin" && (
    //           <Navigate to="/admin/index">
    //             <Menuadmin />
    //           </Navigate>
    //         )}
    //         {role === "staff" && (
    //           <Navigate to="/staff/timetable">
    //             <TimetableTeacher />
    //           </Navigate>
    //         )}
    //         {role === "teacher" && (
    //           <Navigate to="/teacher/select-subject">
    //             <SelectNotTeachTeacher />
    //           </Navigate>
    //         )}
    //         {role === "" && (
    //           <>
    //             <Routes>
    //               <Route path="/" element={<Homepages />} />
    //               <Route path="/logup" element={<Logup />} />
    //               <Route path="/login" element={<Login />} />
    //               <Route
    //                 path="/admin/index"
    //                 element={
    //                   <AdminRoute>
    //                     <HomeAdmin />
    //                   </AdminRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/admin/manage-admin"
    //                 element={
    //                   <AdminRoute>
    //                     <ManageAdmin />
    //                   </AdminRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/user/index"
    //                 element={
    //                   <UserRoute>
    //                     <HomeUser />
    //                   </UserRoute>
    //                 }
    //               />
    //               {/* <Route path="/staff/select-subject" element={<SelectSubjectStaff />} /> */}
    //               {/* <Route path="/staff/timetable" element={<TimetableTeacher />} /> */}
    //               {/* <Route path="/teacher/select-subject" element={<SelectNotTeachTeacher />} /> */}
    //               {/* <Route path="/teacher/leave-teach" element={<LeaveTeachTeacher />} /> */}
    //               {/* <Route path="/replace/view" element={<ViewReplace />} />
    //               <Route path="/replace/input" element={<InputReplace />} /> */}
    //             </Routes>
    //           </>
    //         )}
    //       </BrowserRouter>
    //     </div>
    //   );
    // }
    
    // export default App;