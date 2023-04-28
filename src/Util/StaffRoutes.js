import { Outlet, Navigate } from 'react-router-dom'

const StaffRoutes = () => {

    const role = localStorage.getItem('role');
    const roleTmp = localStorage.getItem('roleTmp') ;

    if (role === "Staff" || role == 'Admin' || roleTmp == 'Admin') {
        return (<Outlet />);
    } else {
        return (<Navigate to="/Home" />);
    }
    
}

export default StaffRoutes