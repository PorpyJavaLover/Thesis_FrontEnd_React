import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const pages = [
    { key: 1, name: 'การจัดการรายวิชาที่จะเปิดสอน', path: '/Teacher/SelectSubject' },
    { key: 2, name: 'การจัดการรายวิชาที่จะเปิดสอน(เจ้าหน้าที่)', path: '/Staff/SelectSubject' },
    { key: 3, name: 'การจัดการวันเวลาที่ไม่ขอสอน', path: '/Teacher/NotTeach' },
    { key: 4, name: 'การจัดการวันเวลาที่ไม่ขอสอน(เจ้าหน้าที่)', path: '/Staff/NotTeach' },
    { key: 5, name: 'การจัดการรายวิชา', path: '/Teacher/Timetable' },
    { key: 6, name: 'การจัดการรายวิชา(เจ้าหน้าที่)', path: '/Staff/Timetable' },
    { key: 7, name: 'การจัดการวันลา', path: '/Teacher/LeaveTeach' },
    { key: 8, name: 'การจัดการสอนแทน', path: '/Teacher/ReplaceTeach' },
    { key: 9, name: 'เข้าสู่ระบบ', path: '/SignIn' },
    { key: 10, name: 'สมัครสมาชิก', path: '/Singup' },
];

const pagesTeacher = [
    { key: 1, name: 'การจัดการรายวิชาที่จะเปิดสอน', path: '/Teacher/SelectSubject' },
    { key: 2, name: 'การจัดการวันเวลาที่ไม่ขอสอน', path: '/Teacher/NotTeach' },
    { key: 3, name: 'การจัดการรายวิชา', path: '/Teacher/Timetable' },
    { key: 4, name: 'การจัดการวันลา', path: '/Teacher/LeaveTeach' },
    { key: 5, name: 'การจัดการสอนแทน', path: '/Teacher/ReplaceTeach' },

];

const pagesStaff = [
    { key: 1, name: 'การจัดการรายวิชาที่จะเปิดสอน(เจ้าหน้าที่)', path: '/Staff/SelectSubject' },
    { key: 2, name: 'การจัดการวันเวลาที่ไม่ขอสอน(เจ้าหน้าที่)', path: '/Staff/NotTeach' },
    { key: 3, name: 'การจัดการรายวิชา(เจ้าหน้าที่)', path: '/Staff/Timetable' },
];

const userMenu = [
    { key: 1, name: 'ออกจากระบบ', path: '/SignIn' },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const showByRole = () => {

        const role = JSON.parse(localStorage.getItem('role'));

        if (role === 1) {
            return pagesTeacher.map((page) => (
                <Button
                    key={page.key}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Link style={{ textDecoration: "none", color: "white" }} to={page.path} >{page.name}</Link>
                </Button>
            ))
        } else if (role === 2) {
            return pagesStaff.map((page) => (
                <Button
                    key={page.key}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Link style={{ textDecoration: "none", color: "white" }} to={page.path} >{page.name}</Link>
                </Button>
            ))
        } else {
            return pages.map((page) => (
                <Button
                    key={page.key}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Link style={{ textDecoration: "none", color: "white" }} to={page.path} >{page.name}</Link>
                </Button>
            ))
        }


    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Link style={{ textDecoration: "none", color: "white" }} to='/' ><HomeIcon href="/" /></Link>

                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/*pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))*/}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {showByRole()}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userMenu.map((page) => (
                                <Button key={page.key} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link style={{ textDecoration: "none", color: "white" }} to={page.path} >
                                        {page.name}
                                        {
                                            localStorage.removeItem("mytime");
                                        localStorage.removeItem("mytime");
                                        localStorage.removeItem("mytime");
                                        localStorage.removeItem("mytime");
                                    }
                                    </Link>
                                </Button>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;