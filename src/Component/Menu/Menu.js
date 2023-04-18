import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
// import Dropdown from "muicss/lib/react/dropdown";
// import DropdownItem from "muicss/lib/react/dropdown-item";
import car from "../../assets/logo.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 80,
  },
}));
function getItem(label, key, icon, children, type) {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
}

const pagesAnonymous = [
  { key: 1, name: "เข้าสู่ระบบ", path: "/Login" },
  { key: 2, name: "สมัครสมาชิก", path: "/Singup" },
];

const pagesTeacher = [
  {
    key: 1,
    name: "การจัดการรายวิชาที่จะเปิดสอน",
    path: "/Teacher/SelectSubject",
  },
  { key: 2, name: "การจัดการวันเวลาที่ไม่ขอสอน", path: "/Teacher/NotTeach" },
  { key: 3, name: "การจัดการรายวิชา", path: "/Teacher/Timetable" },
  { key: 4, name: "การจัดการวันลา", path: "/Teacher/LeaveTeach" },
  { key: 5, name: "การจัดการสอนแทน", path: "/Teacher/view-replace" },
];

const pagesStaff = [
  {
    key: 1,
    name: "การจัดการรายวิชาที่จะเปิดสอน(เจ้าหน้าที่)",
    path: "/Staff/SelectSubject",
  },
  {
    key: 2,
    name: "การจัดการวันเวลาที่ไม่ขอสอน(เจ้าหน้าที่)",
    path: "/Staff/NotTeach",
  },
  { key: 3, name: "การจัดการรายวิชา(เจ้าหน้าที่)", path: "/Staff/Timetable" },
];

const userMenu = [{ key: 1, name: "ออกจากระบบ", path: "/SignIn" }];

export default function Norbar() {
  const isExpired = Date.now() / 1000 > JSON.parse(localStorage.getItem("exp"));
  const role = localStorage.getItem("role");

  const roleSelecction = () => {
    if (!isExpired) {
      if (role === "Teacher") {
        return <MenuTeacher />;
      } else if (role === "Staff") {
        return <MenuStaff />;
      }
    } else {
      return <MenuAnonymous />;
    }
  };

  return <div>{roleSelecction()}</div>;
}

function MenuAnonymous() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 4, marginTop: 1 }}
          />

          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
          <Typography disableGutters>
            <Box
              sx={{
                float: "right",
                marginTop: 1,
                marginRight: 3,
                textDecoration: "none",
                color: "white",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pagesAnonymous.map((page) => (
                <Button
                  key={page.key}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
function MenuTeacher() {
  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 4, marginTop: 1 }}
          />

          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <HomeIcon href="/" />
              </Link>
            </IconButton>

            {pagesTeacher.map((page) => (
              <Button
                key={page.key}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.path}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
            <Box
              sx={{
                flexGrow: 1,
                alignItems: "center",
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse",
              }}
            >
              <Box>
                {userMenu.map((page) => (
                  <Button
                    key={page.key}
                    sx={{ color: "white", display: "block" }}
                    onClick={SignOutEf}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={page.path}
                    >
                      {page.name}
                    </Link>
                  </Button>
                ))}
              </Box>
              <Box>{localStorage.getItem("name")}</Box>
              <Tooltip title="Open settings">
                <IconButton>
                  <Avatar alt="Teacher" src="/static/images/avatar/3.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

function MenuStaff() {
  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 4, marginTop: 1 }}
          />
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <HomeIcon />
              </Link>
            </IconButton>
            {pagesStaff.map((page) => (
              <Button
                key={page.key}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.path}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            <Box>
              {userMenu.map((page) => (
                <Button
                  key={page.key}
                  sx={{ color: "white", display: "block" }}
                  onClick={SignOutEf}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box>{localStorage.getItem("name")}</Box>
            <Tooltip title="Open settings">
              <IconButton>
                <Avatar alt="Staff" src="/static/images/avatar/3.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

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

  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  const showByRole = () => {
    const role = JSON.parse(localStorage.getItem("role"));

    const isExpired =
      Date.now() / 1000 > JSON.parse(localStorage.getItem("exp"));

    if (!isExpired) {
      if (role === 1) {
        return pagesTeacher.map((page) => (
          <Button
            key={page.key}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={page.path}
            >
              {page.name}
            </Link>
          </Button>
        ));
      } else if (role === 2) {
        return pagesStaff.map((page) => (
          <Button
            key={page.key}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={page.path}
            >
              {page.name}
            </Link>
          </Button>
        ));
      }
    } else {
      return pagesAnonymous.map((page) => (
        <Button key={page.key} sx={{ my: 2, color: "white", display: "block" }}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={page.path}
          >
            {page.name}
          </Link>
        </Button>
      ));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 4, marginTop: 1 }}
          />
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <HomeIcon href="/" />
            </Link>
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/*pages.map((page) => (
                              <MenuItem key={page} onClick={handleCloseNavMenu}>
                                  <Typography textAlign="center">{page}</Typography>
                              </MenuItem>
                          ))*/}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {showByRole()}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenu.map((page) => (
                <Button
                  key={page.key}
                  sx={{ my: 2, color: "black", display: "block" }}
                  onClick={SignOutEf}
                >
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Menu>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
