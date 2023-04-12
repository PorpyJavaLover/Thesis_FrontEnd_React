import { Outlet, Navigate } from 'react-router-dom'

const StaffRoutes = () => {

    const role = localStorage.getItem('role');

    console.log(role);

    if (role === "Staff") {
        return (<Outlet />);
    } else {
        return (<Navigate to="/Home" />);
    }
    
}

export default StaffRoutes