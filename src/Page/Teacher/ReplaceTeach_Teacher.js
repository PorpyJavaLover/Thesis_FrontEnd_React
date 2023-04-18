// import React, { Component, useState, useEffect } from "react";
// import APIService from "../../Service/FernAPIService";
// import {
//   CardHeader,
//   Box,
//   Card,
//   Button,
//   Grid,
//   Container,
//   Typography,
// } from "@mui/material";
// import {
//   ReplaceTeachAPIServiceTeacher,
//   ReplaceTeachAPIServiceStaff,
// } from "../../Service/ReplaceTeachAPIService";
// import SendIcon from "@mui/icons-material/Send";
// import { format } from "date-fns";
// import CardDatePicker from "../../Component/Card/CardDatePicker";
// import CardSelect from "../../Component/Card/CardSelect";
// import CardTextField from "../../Component/Card/CardTextField";
// import FullFeaturedCrudGrid from "../../Component/Card/CardDataGrid";
// import Moment from "react-moment";
// import SearchIcon from "@mui/icons-material/Search";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import TextField from "@mui/material/TextField";
// import PropTypes from "prop-types";
// import { visuallyHidden } from "@mui/utils";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import SaveIcon from "@mui/icons-material/Save";
// import Stack from "@mui/material/Stack";

// export default class ReplaceTeach extends Component {
//   constructor(props) {
//     super(props);
//     this.updateState = this.updateState.bind(this);
//     this.state = {
//       dataReplaceTeach: [],
//     };
//   }

//   componentDidMount() {
//     this.updateState();
//   }

//   updateState = () => {
//     ReplaceTeachAPIServiceTeacher.getAll().then((res) => {
//       this.setState({ dataReplaceTeach: res.data });
//       console.log(res.data);
//     });
//   };

//   render() {
//     return (
//       <div>
//         <HeaderBox title={"การจัดการวันงดสอน"} />
//         <MenagementBox
//           title={"เมนูจัดการรายการ"}
//           updateState={this.updateState.bind(this)}
//           dataReplaceTeach={this.state.dataReplaceTeach}
//         />
//       </div>
//     );
//   }
// }

// function HeaderBox(props) {
//   return (
//     <Box sx={{ pt: 2, pl: 3, pr: 2 }}>
//       <Typography variant="h3" component="h3" fontWeight="bold">
//         {" "}
//         {props.title}{" "}
//       </Typography>
//     </Box>
//   );
// }

// function MenagementBox(props) {
//   const currentYear = new Date().getFullYear();

//   const yearOptions = [
//     { key: "1", value: currentYear, text: currentYear + 543 },
//     { key: "2", value: currentYear - 1, text: currentYear + 543 - 1 },
//     { key: "3", value: currentYear - 2, text: currentYear + 543 - 2 },
//     { key: "3", value: currentYear - 3, text: currentYear + 543 - 3 },
//   ];

//   const semester = [
//     { key: "1", value: "1", text: "ภาคการศึกษาที่ 1" },
//     { key: "2", value: "2", text: "ภาคการศึกษาที่ 2" },
//     { key: "3", value: "3", text: "ภาคการศึกษาฤดูร้อน" },
//   ];

//   //state

//   const [submitButtonState, setSubmitButtonState] = useState(true);
//   const [memberReplace, setMemberReplace] = useState(null);
//   const [editTemp, setEditTemp] = useState(null);

//   //function

  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [memberReplaceSelected, setMemberReplace] = useState(null);
  const [editTemp, setEditTemp] = useState(null);

//   const handleChangNote = (event) => {
//     setMemberReplace(event.target.value);
//   };

  useEffect(() => {
    confirmTiggleUseEffect();
  }, [memberReplaceSelected]);

  const handleChangMemberReplace = (event) => {
    setMemberReplace(event.target.value);
  };

  const handleCancel = () => {
    setMemberReplace(null);
    setEditTemp(null);
  };
  const handleEdit = (dataInside) => () => {
    setEditTemp(dataInside.replaceTeachId);
    setMemberReplace(dataInside.note);
  }

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   function EnhancedTableHead(props) {
//     const { order, orderBy, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };
//     return (
//       <TableHead>
//         <TableRow>
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align={headCell.numeric ? "left" : "center"}
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : "asc"}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === "desc"
//                       ? "sorted descending"
//                       : "sorted ascending"}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }

  const confirmTiggleUseEffect = () => {
    if (memberReplaceSelected !== null) {
      setSubmitButtonState(true)
    } else {
      setSubmitButtonState(true)
    }
  }

//   useEffect(() => {
//     setFilteredData(props.dataReplaceTeach);
//   }, [props.dataReplaceTeach]);

//   useEffect(() => {
//     const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
//     setFilteredData(
//       searchValue === ""
//         ? props.dataReplaceTeach
//         : props.dataReplaceTeach.filter((data) => {
//             return Object.keys(data).some((field) => {
//               return searchRegex.test(data[field].toString());
//             });
//           })
//     );
//   }, [searchValue]);

//   function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }

//   function getComparator(order, orderBy) {
//     return order === "desc"
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
//   }

//   function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) {
//         return order;
//       }
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }

//   EnhancedTableHead.propTypes = {
//     onRequestSort: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
//   };

//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("");

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   //render

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }



  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //render

  return (
    <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
      <Card sx={{ boxShadow: 5, }}>
        <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
        <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
          <Grid item sm={12} xs={12}>
            <TableContainer >
              <Box dir="rtl" sx={{ pb: 3, display: 'flex', alignItems: 'flex-end', }}>
                <TextField
                  dir="ltr"
                  sx={{ width: 300, }}
                  fullWidth
                  id="filled-flexible"
                  label="ค้นหา"
                  value={searchValue || ''}
                  onChange={handleChange}
                  variant="standard"
                />
                <SearchIcon />
              </Box>
              <Table sx={{ minWidth: 650, }} aria-label="simple table">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredData.length}
                />
                <TableBody>
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .map((row, index) => {
                      const labelId = index;
                      if (editTemp !== row.replaceTeachId) {
                        return (
                          <TableRow key={row.replaceTeachId} >
                            <TableCell id={labelId} scope="row" width="8%" align="left" >{row.leaveTeachId}</TableCell>
                            <TableCell width="10%" align="left">{row.course_code}</TableCell>
                            <TableCell width="10%" align="left">{row.course_title}</TableCell>
                            <TableCell width="8%" align="left">{row.group_name}</TableCell>
                            <TableCell width="8%" align="left">{row.date}</TableCell>
                            <TableCell width="20%" align="left">{row.memberTechingName}</TableCell>
                            <TableCell width="20%" align="left">{row.memberReplaceName}</TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 75 }} color="inherit" onClick={handleEdit(row)} variant="contained" >แก้ไข</Button>
                                <Button sx={{ width: 75 }} color="error" endIcon={<DeleteForeverIcon />} onClick={handleDelete(row)} variant="contained"  >ลบ</Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={row.replaceTeachId} >
                            <TableCell id={labelId} scope="row" align="left">
                              {row.leaveTeachId}
                            </TableCell>
                            <TableCell align="left">
                              {row.course_code}
                            </TableCell>
                            <TableCell align="left">
                              {row.course_title}
                            </TableCell>
                            <TableCell align="left">
                              {row.group_name}
                            </TableCell>
                            <TableCell align="left">
                              {row.date}
                            </TableCell>
                            <TableCell align="left">
                              {row.memberTechingName}
                            </TableCell>
                            <TableCell align="left">
                              <CardSelect labelPara="เลือกอาจารย์สอนแทน" menuItemPara={semester} onChangePara={handleChangMemberReplace} valuePara={memberReplaceSelected} />
                            </TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                <Button sx={{ width: 75 }} color="success" endIcon={<SaveIcon />} disabled={submitButtonState} onClick={handleConfirm(row)} variant="contained" >ยืนยัน</Button>
                                <Button sx={{ width: 75 }} color="inherit" onClick={handleCancel} variant="contained" >ยกเลิก</Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}
