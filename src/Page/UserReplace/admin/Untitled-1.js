// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Avatar,
//   Link,
//   Menu,
//   MenuItem,
//   Fade,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@material-ui/core";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import { styled, useTheme } from "@material-ui/core/styles";
// import {
//   Home as HomeIcon,
//   Person as PersonIcon,
//   Menu as MenuIcon,
//   ExitToApp as ExitToAppIcon,
// } from "@material-ui/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { userSelector } from "react-redux";
// import { logout } from "../../../redux/actions";
// import { getUser } from "../../../redux/selectors";
// import car from "../../../assets/logo.png";
// import {
//   getItem,
//   getLink,
//   getLinkName,
//   getLinkIcon,
//   getLinkMenu,
//   getLinkMenuName,
//   getLinkMenuIcon,
// } from "./MenuItems";

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   alignItems: "flex-start",
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(2),
//   // Override media queries injected by theme.mixins.toolbar
//   "@media all": {
//     minHeight: 80,
//   },
// }));

// function MenuBar() {
//   const { pathname } = useLocation();
//   const theme = useTheme();
//   const user = useSelector(userSelector);
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const { user } = userSelector((state) => ({ ...state }));

//   const teacher = [
//     getItem("ตารางสอน", "subject"),
//     getItem("สอนแทน", "replace"),
//   ];

//   const staff = [
//     getItem("ตารางสอน", "subject"),
//     getItem("สอนแทน", "replace"),
//     getItem("อนุมัติอาจารย์", "approve-teacher"),
//   ];

//   const admin = [
//     getItem("ตารางสอน", "subject"),
//     getItem("สอนแทน", "replace"),
//     getItem("อนุมัติอาจารย์", "approve-teacher"),
//     getItem("อนุมัติเจ้าหน้าที่สาขา", "approve-staff"),
//   ];

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <StyledToolbar>
//         <Avatar src={car} style={{ width: "90px", height: "90px" }} />

//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//          