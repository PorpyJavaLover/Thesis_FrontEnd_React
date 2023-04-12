import React, { useState, useEffect } from "react";
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
  Switch,
  Modal,
  ListItem,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment-with-locales-es6";
import Dropdown from "muicss/lib/react/dropdown";
import DropdownItem from "muicss/lib/react/dropdown-item";
import car from "../../../assets/logo.png";
import { resetWarningCache } from "prop-types";
import { localeData } from "moment/moment";
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../../Component/functions/users";

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

export default function Manuadmin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({ ...values, id: id });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.values });
  };
  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log("data", data);
  useEffect(() => {
    //code
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
      .then((res) => {
        //code
        setData(res.data);
      })
      .catch((err) => {
        //err
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changeRole(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const roleData = ["admin", "user"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const text = {
    color: "green",
  };
  const text2 = {
    color: "red",
  };
  //   const user = localStorage.getItem("");
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

  return (
    <div>
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">{/* <MenubarAdmin /> */}</div>

          <div className="col">
            <h1>ManageAdmin Page</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">username</th>
                  <th scope="col">role</th>
                  <th scope="col">status</th>
                  <th scope="col">created</th>
                  <th scope="col">updated</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr>
                    <th scope="row">{item.username}</th>
                    <td>
                      <Select
                        style={{ width: "100%" }}
                        value={item.role}
                        onChange={(e) => handleChangeRole(e, item._id)}
                      >
                        {roleData.map((item, index) => (
                          <Select.Option value={item} key={index}>
                            {item == "admin" ? (
                              <ListItem style={text}>{item}</ListItem>
                            ) : (
                              <ListItem style={text2}>{item}</ListItem>
                            )}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Switch
                        checked={item.enabled}
                        onChange={(e) => handleOnchange(e, item._id)}
                      />
                    </td>
                    <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                    <td>
                      {moment(item.updatedAt)
                        .locale("th")
                        .startOf(item.updatedAt)
                        .fromNow()}
                    </td>
                    <td>
                      <DeleteOutlined onClick={() => handleRemove(item._id)} />
                      <EditOutlined onClick={() => showModal(item._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>New Password :</p>
              <input
                onChange={handleChangePassword}
                type="text"
                name="password"
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
