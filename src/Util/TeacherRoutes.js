import { Outlet, Navigate } from 'react-router-dom'

const TeacherRoutes = () => {

    const role = localStorage.getItem('role');
    const roleTmp = localStorage.getItem('roleTmp') ;

    if (role === "Teacher" || role === 'Admin' || roleTmp === 'Admin') {
        return (<Outlet />);
    } else {
        return (<Navigate to= "/Home" />);
    }
    
}

export default TeacherRoutes