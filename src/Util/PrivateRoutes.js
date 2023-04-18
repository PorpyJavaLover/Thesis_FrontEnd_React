import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isExpired = Date.now() / 1000 > JSON.parse(localStorage.getItem("exp"));

  if (isExpired) {
    return <Navigate to="/Home" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
