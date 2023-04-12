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
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import Dropdown from "muicss/lib/react/dropdown";
import DropdownItem from "muicss/lib/react/dropdown-item";
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
            component={Link}
            to="/homepages"
          >
            หน้าแรก
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
            // onClick={handleClick}
            // component={Link}
            // to="/"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            ตารางสอน
          </Typography>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/Teacher/SelectSubject"
            >
              การจัดการรายวิชาที่จะเปิดสอน
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/Teacher/NotTeach"
            >
              การจัดการวันเวลาที่ไม่ขอสอน
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/Teacher/Timetable"
            >
              การจัดการรายวิชา
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/Teacher/LeaveTeach"
            >
              การจัดการวันลา
            </MenuItem>
          </Menu>
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
            to="/view-replace"
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
            to="/home1"
          >
            ออกจากระบบ
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
