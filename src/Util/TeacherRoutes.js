import { Outlet, Navigate } from 'react-router-dom'

const TeacherRoutes = () => {

    const role = localStorage.getItem('role');

    console.log(role);

    if (role === "Teacher") {
        return (<Outlet />);
    } else {
        return (<Navigate to="/Home" />);
    }
    
}

export default TeacherRoutes