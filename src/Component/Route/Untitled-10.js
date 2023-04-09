import React, { useState } from "react";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menulist from "./components/Menu/Menulist";
import Project from "./pages/Project/Project/index";
import ProjectInput from "./pages/Project/ProjectInput/projectInput";
import ProjectEdit from "./pages/Project/ProjectEdit/projectEdit";
import Map from "./pages/Map/MapCreate/index";
import User from "./pages/User/UserShow/UserShow";
import UserCreate from "./pages/User/UserCreate/UserCreate";
import UserConfig from "./pages/User/UserConfig/UserConfig";
import UserView from "./pages/User/UserView/UserView";
import Dashboard from "./pages/Dashboard/Dashboard";
import Secretary from "./pages/Consider/Secretary/Secretary";
import Director from "./pages/Consider/Director/Director";
import Plans from "./pages/Plans/PlanShow/PlanShow";
import CreatePlan from "./pages/Plans/CreatePlan/CreatePlan";
import EditPlan from "./pages/Plans/EditPlan/EditPlan";
import ViewPlan from "./pages/Plans/ViewPlan/ViewPlan";
import PDFExport from "./components/PdfExport/pdfFileP02";
import TestNa from "./pages/Login/TestForAPI";
import UserContext from "./core/UserContext";
import ProjectView from "./pages/Project/ProjectView/ProjectView";
import UserConfigProfile from "./pages/User/UserConfigProfile/UserConfigProfile";
import UserConfigPassword from "./pages/User/UserConfigPassword/UserConfigPassword";
import Leader from "./pages/Consider/Leader/Leader";
import MapView from "./pages/Map/MapView/MapView";

import ProjectContext from "./core/ProjectContext";

import { PrivateRoute } from "./components/routes/PrivateRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
const App = () => {
  const [userToken, setUserToken] = useState();
  const [projectCont, setProjectCont] = useState();
  // console.log("Token from App", userToken);
  return (
    <BrowserRouter>
      {/* <UserContext.Provider value={{ userToken, setUserToken }}> */}
      <ProjectContext.Provider value={{ projectCont, setProjectCont }}>
        <Routes>
          <Route element={<PrivateRoute />}>
            {/* {localStorage.getItem("token") ? ( */}
            <Route path="/" element={<Navigate to="/menu/project" />} />
            {/* ) : ( */}
            <Route path="/" element={<Navigate to="/" />} />
            {/* )} */}
            <Route path="/menu" element={<Menulist />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="project" element={<Project />} />
              <Route
                path="project/project-current-input"
                element={<ProjectInput />}
              />
              <Route
                path="project/project-current-edit/:id"
                element={<ProjectEdit />}
              />
              <Route
                path="project/project-current-view/:id"
                element={<ProjectView />}
              />
              <Route path="project/own-secretary/:id" element={<Secretary />} />
              <Route path="project/head-secretary/:id" element={<Director />} />
              <Route path="project/leader-approve/:id" element={<Leader />} />
              <Route />
              <Route path="map" element={<Map />} />
              <Route path="mapview" element={<MapView />} />
              <Route path="config-profile" element={<UserConfigProfile />} />
              <Route path="config-password" element={<UserConfigPassword />} />
              <Route path="user" element={<User />} />
              <Route path="user/user-config/:id" element={<UserConfig />} />
              <Route path="user/user-create" element={<UserCreate />} />
              <Route path="user/user-view/:id" element={<UserView />} />
              <Route path="plans" element={<Plans />} />
              <Route path="plans/creact-plan" element={<CreatePlan />} />
              <Route path="plans/view-plan/:id" element={<ViewPlan />} />
              <Route path="plans/edit-plan/:id" element={<EditPlan />} />
              <Route path="pdfna" element={<PDFExport />} />
            </Route>
          </Route>
          <Route path="map" element={<Map />} />
          <Route path="testna" element={<TestNa />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </ProjectContext.Provider>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
};
export default App;