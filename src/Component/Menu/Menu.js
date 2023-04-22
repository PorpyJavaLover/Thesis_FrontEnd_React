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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
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
  { key: 1, name: "เข้าสู่ระบบ", path: "/login" },
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
  { key: 4, name: "การจัดการวันงดสอน", path: "/Teacher/LeaveTeach" },
  { key: 5, name: "การจัดการสอนแทน", path: "/Teacher/ReplaceTeach" },
  // { key: 6, name: "การจัดการสอนแทน", path: "/Teacher/view-replace" },
];

const pagesStaff = [
  {
    key: 1,
    name: "การจัดการรายวิชาที่จะเปิดสอน",
    path: "/Staff/SelectSubject",
  },
  { key: 2, name: "การจัดการวันเวลาที่ไม่ขอสอน", path: "/Staff/NotTeach" },
  { key: 3, name: "การจัดการรายวิชา", path: "/Staff/Timetable" },
];

const userMenu = [{ key: 1, name: "ออกจากระบบ", path: "/login" }];

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
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
          <Typography
            disableGutters
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
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
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <ListItemText primary={"หน้าหลัก"} sx={{ color: "#4D4D4D" }} />
            </Link>
          </ListItemButton>
        </ListItem>
        {pagesTeacher.map((page) => (
          <ListItem key={page.key} disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={page.path}>
                <ListItemText primary={page.name} sx={{ color: "#4D4D4D" }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const role = () => {
    if (localStorage.getItem("role") === "Teacher") {
      return "(อาจารย์)";
    } else if (localStorage.getItem("role") === "Staff") {
      return "(เจ้าหน้าที่)";
    } else {
      return " ";
    }
  };

  const sideList2 = (side) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={SignOutEf}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Link style={{ textDecoration: "none" }} to={"/SignIn"}>
              <ListItemText primary={"ออกจากระบบ"} sx={{ color: "#4D4D4D" }} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar position="static">
      <Container maxWidth="sx">
        <Toolbar disableGutters>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 3, marginTop: 1 }}
          />
          <Typography
            variant="h7"
            // noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 2 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
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
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                color="inherit"
                sx={{ my: 2, color: "white", display: "block", height: "50px" }}
              >
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  {" "}
                  <HomeIcon />
                </Link>
              </Button>
              {pagesTeacher.map((page) => (
                <Button
                  color="inherit"
                  key={page.key}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    height: "50px",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                color="inherit"
                sx={{ color: "white", alignItems: "center" }}
                onClick={toggleDrawer("left", true)}
              >
                {" "}
                <MenuIcon />{" "}
              </Button>
            </Stack>
            <Drawer
              anchor="left"
              open={state.left}
              onClose={toggleDrawer("left", false)}
            >
              {sideList("left")}
            </Drawer>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {/* <UserMenu /> */}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>{localStorage.getItem("name")}</Typography>
              <Typography>{role()}</Typography>
              <Button
                color="inherit"
                sx={{ color: "white", alignItems: "center", height: "50px" }}
                onClick={toggleDrawer("right", true)}
              >
                {" "}
                <SettingsIcon />{" "}
              </Button>
            </Stack>
            <Drawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList2("right")}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function MenuStaff() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <ListItemText primary={"หน้าหลัก"} sx={{ color: "#4D4D4D" }} />
            </Link>
          </ListItemButton>
        </ListItem>
        {pagesStaff.map((page) => (
          <ListItem key={page.key} disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={page.path}>
                <ListItemText primary={page.name} sx={{ color: "#4D4D4D" }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.href = "/SignIn";
  };

  const role = () => {
    if (localStorage.getItem("role") === "Teacher") {
      return "(อาจารย์)";
    } else if (localStorage.getItem("role") === "Staff") {
      return "(เจ้าหน้าที่)";
    } else {
      return " ";
    }
  };

  const sideList2 = (side) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={SignOutEf}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Link style={{ textDecoration: "none" }} to={"/SignIn"}>
              <ListItemText primary={"ออกจากระบบ"} sx={{ color: "#4D4D4D" }} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar position="static">
      <Container maxWidth="sx">
        <Toolbar disableGutters>
          <Avatar
            src={car}
            style={{ width: "90px", height: "90px" }}
            sx={{ mr: 3, marginTop: 1 }}
          />
          <Typography
            variant="h7"
            // noWrap
            component="div"
            sx={{ flexGrow: 1, marginTop: 2 }}
          >
            <p>ระบบจัดตารางสอนและสอนแทน</p>
            <p>Scheduling Teach And Replacement Teacher System</p>
          </Typography>
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
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                color="inherit"
                sx={{ my: 2, color: "white", display: "block", height: "50px" }}
              >
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  <HomeIcon />
                </Link>
              </Button>
              {pagesStaff.map((page) => (
                <Button
                  color="inherit"
                  key={page.key}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    height: "50px",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                color="inherit"
                sx={{ color: "white", alignItems: "center" }}
                onClick={toggleDrawer("left", true)}
              >
                {" "}
                <MenuIcon />{" "}
              </Button>
            </Stack>
            <Drawer
              anchor="left"
              open={state.left}
              onClose={toggleDrawer("left", false)}
            >
              {sideList("left")}
            </Drawer>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {/* <UserMenu /> */}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>{localStorage.getItem("name")}</Typography>
              <Typography>{role()}</Typography>
              <Button
                color="inherit"
                sx={{ color: "white", alignItems: "center", height: "50px" }}
                onClick={toggleDrawer("right", true)}
              >
                {" "}
                <SettingsIcon />{" "}
              </Button>
            </Stack>
            <Drawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList2("right")}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function UserMenu() {
  const SignOutEf = () => {
    localStorage.removeItem("member_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const role = () => {
    if (localStorage.getItem("role") === "Teacher") {
      return "(อาจารย์)";
    } else if (localStorage.getItem("role") === "Staff") {
      return "(เจ้าหน้าที่)";
    } else {
      return " ";
    }
  };

  const sideList = (side) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={SignOutEf}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Link style={{ textDecoration: "none" }} to={"/SignIn"}>
              <ListItemText primary={"ออกจากระบบ"} sx={{ color: "#4D4D4D" }} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar></StyledToolbar>
      </AppBar>
    </Box>
  );
}
