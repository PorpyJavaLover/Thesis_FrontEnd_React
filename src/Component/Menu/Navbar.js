import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

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
          {/* <Typography
            items={user === "admin" ? teacher : staff : admin }
            onClick={({ key }) => {
              Navigate(key);
            }}
          > */}
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
            component={Link}
            to="/logup"
          >
            สมัครสมาชิก
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
            component={Link}
            to="/login"
          >
            เข้าสู่ระบบ
          </Typography>
          {/* </Typography> */}
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
