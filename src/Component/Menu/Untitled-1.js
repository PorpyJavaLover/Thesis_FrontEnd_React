import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";

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
export default function ProminentAppBar() {
  const users = localStorage.getItem("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = localStorage.getItem("");
  const teacher = [
    getItem("ตารางสอน", "subject"),
    getItem("สอนแทน", "replace"),
  ];
  const staff = [
    getItem("ตารางสอน", "subject"),
    getItem("สอนแทน", "replace"),
    getItem("อนุมัติอาจารย์", "approve-teacher"),
  ];
  const admin = [
    getItem("ตารางสอน", "subject"),
    getItem("สอนแทน", "replace"),
    getItem("อนุมัติอาจารย์", "approve-teacher"),
    getItem("อนุมัติเจ้าหน้าที่สาขา", "approve-staff"),
  ];
  if (users === "user") {
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

            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                marginRight: 3,
                textDecoration: "none",
                color: "white",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              component={Link}
              to="/"
            >
              ตารางสอน
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu> */}
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/"
            >
              สอนแทน
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginLeft: 3,
                marginTop: 5,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/"
            >
              อนุมัติอาจารย์
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                marginLeft: 3,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/home"
            >
              ออกจากระบบ
            </Typography>
          </StyledToolbar>
        </AppBar>
      </Box>
    );
  } else if (users === "teacher") {
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

            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                marginRight: 3,
                textDecoration: "none",
                color: "white",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              component={Link}
              to="/"
            >
              ตารางสอน
              {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/"
            >
              สอนแทน
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginLeft: 3,
                marginTop: 5,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/"
            >
              อนุมัติอาจารย์
            </Typography>
            <Typography
              variant="h7"
              noWrap
              // component="div"
              sx={{
                float: "right",
                marginTop: 5,
                marginLeft: 3,
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/home"
            >
              ออกจากระบบ
            </Typography>
          </StyledToolbar>
        </AppBar>
      </Box>
    );
  } else {
    return <></>;
  }
}
