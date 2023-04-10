import { Outlet, Navigate } from 'react-router-dom'

const StaffRoutes = () => {

    const role = JSON.parse(localStorage.getItem('role'));

    console.log(role);

    if (role === 2) {
        return (<Outlet />);
    } else {
        return (<Navigate to="/Home" />);
    }
    
}

export default StaffRoutes