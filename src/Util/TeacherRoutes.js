import { Outlet, Navigate } from 'react-router-dom'

const TeacherRoutes = () => {

    const role = JSON.parse(localStorage.getItem('role'));

    console.log(role);

    if (role === 1) {
        return (<Outlet />);
    } else {
        return (<Navigate to="/Error404" />);
    }
    
}

export default TeacherRoutes