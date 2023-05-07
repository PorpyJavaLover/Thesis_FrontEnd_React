import React, { Component, useState, useEffect } from "react";
import MemberAPIService, { MemberAPIServiceTeacher, MemberAPIServiceStaff } from '../../Service/MemberAPIService';
import { TimetableAPIServiceStaff } from '../../Service/TimetableAPIService';
import { Grid, Box, CardHeader, Typography, Card, Container, Table } from "@mui/material";
import CardSelect from '../../Component/CardSelect'

import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {

    border-spacing: 0;
    border: 1px solid black;

    tr {
        lineHeight: 20px;
        :last-child {
            td {
                border-bottom: 0;
            }
        }
    }

    th {
        margin: 0;
        padding: 0.5rem;
        border: 1px solid black;
    }

    td {
        margin: 0;
        padding: 0.5rem;
        border: 1px solid black;
    }
  }
`;

export default class ShowTimeTable_staff extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.setMemberSelected = this.setMemberSelected.bind(this);
        this.state = {
            member: [],
            memberSelected: null,
            yearSelected: null,
            semesterSelected: null,
            disableState: true,
        }
    }

    componentDidMount() {
        MemberAPIServiceStaff.getMemberOption().then((res) => {
            this.setState({ member: res.data });
        });
    }

    updateState = () => {

    }

    setMemberSelected = (item) => {
        this.setState({
            memberSelected: item,
        })
    }

    setYearSelected = (item) => {
        this.setState({
            yearSelected: item,
        })
    }

    setSemesterSelected = (item) => {
        this.setState({
            semesterSelected: item,
        })
    }

    setDisable = () => {
        this.updateState();
        this.setState({
            disableState: false
        })
    }

    render() {
        return (
            <div>

                <HeaderBox title={"การแสดงตารางสอน"} />

                <SelectionBox title={"เมนูตัวเลือกรายการ"} setMemberSelected={this.setMemberSelected.bind(this)}
                    member={this.state.member} setYearSelected={this.setYearSelected.bind(this)}
                    setSemesterSelected={this.setSemesterSelected.bind(this)} setDisable={this.setDisable.bind(this)} />

                <ShoweTable title={"แสดงตารางสอน"} updateState={this.updateState.bind(this)}
                    disableState={this.state.disableState} memberSelected={this.state.memberSelected}
                    yearSelected={this.state.yearSelected} semesterSelected={this.state.semesterSelected} />

            </div>
        )
    }
}

function HeaderBox(props) {
    return (
        <Box sx={{ pt: 2, pl: 3, pr: 2 }}>
            <Typography variant="h3" component="h3" fontWeight="bold" > {props.title} </Typography>
        </Box>
    )
}

function SelectionBox(props) {

    const currentYear = new Date().getFullYear();

    const yearOptions = [
        { key: '1', value: currentYear, text: currentYear + 543 },
        { key: '2', value: currentYear - 1, text: currentYear + 543 - 1 },
        { key: '3', value: currentYear - 2, text: currentYear + 543 - 2 },
        { key: '4', value: currentYear - 3, text: currentYear + 543 - 3 },
    ];

    const semesterOptions = [
        { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
        { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
        { key: '3', value: '3', text: 'ภาคการศึกษาฤดูร้อน' }
    ]

    const [yearsSelected, setYearsSelected] = useState(null);
    const [semesterSelected, setSemesterSelected] = useState(null);
    const [member, setMember] = useState(props.member);
    const [memberSelected, setMemberSelected] = useState(null);

    const handleChangeMember = (event) => {
        props.setMemberSelected(event.target.value);
        setMemberSelected(event.target.value);
        localStorage.setItem('holderMember', event.target.value);
    };

    const handleChangeYear = (event) => {
        props.setYearSelected(event.target.value);
        setYearsSelected(event.target.value);
        localStorage.setItem('holderYear', event.target.value);
    };

    const handleChangeSemester = (event) => {
        props.setSemesterSelected(event.target.value);
        setSemesterSelected(event.target.value);
        localStorage.setItem('holderSemester', event.target.value);
    };

    useEffect(() => {
        props.setMemberSelected(localStorage.getItem('holderMember'));
        setMemberSelected(localStorage.getItem('holderMember'));
        props.setYearSelected(localStorage.getItem('holderYear'));
        setYearsSelected(localStorage.getItem('holderYear'));
        props.setSemesterSelected(localStorage.getItem('holderSemester'));
        setSemesterSelected(localStorage.getItem('holderSemester'));
    }, [])

    useEffect(() => {
        if (yearsSelected != null && semesterSelected != null && memberSelected != null) {
            props.setDisable();
        }
    }, [yearsSelected, semesterSelected, memberSelected])

    useEffect(() => {
        setMember(props.member);
    }, [props.member])

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
                    <Grid item sm={6} xs={6}>
                        <CardSelect labelPara="เลือกปีการศึกษา" menuItemPara={yearOptions} onChangePara={handleChangeYear} valuePara={yearsSelected} />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <CardSelect labelPara="เลือกภาคการศึกษา" menuItemPara={semesterOptions} onChangePara={handleChangeSemester} valuePara={semesterSelected} />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <CardSelect labelPara="เลือกอาจารย์ผู้สอน" menuItemPara={member} onChangePara={handleChangeMember} valuePara={memberSelected} />
                    </Grid>
                </Grid>
            </Card>
        </Container >
    )
}

function ShoweTable(props) {

    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [thursday, setThursday] = useState([]);
    const [friday, setFriday] = useState([]);
    const [saturday, setSaturday] = useState([]);
    const [sunday, setSunday] = useState([]);

    useEffect(() => {
        if (props.yearSelected !== null && props.semesterSelected !== null && props.memberSelected !== null) {
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 1).then((res) => {
                setMonday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 2).then((res) => {
                setTuesday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 3).then((res) => {
                setWednesday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 4).then((res) => {
                setThursday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 5).then((res) => {
                setFriday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 6).then((res) => {
                setSaturday(res.data);
            });
            TimetableAPIServiceStaff.getTable(props.yearSelected, props.semesterSelected, props.memberSelected, 7).then((res) => {
                setSunday(res.data);
            });
        }
    }, [props.yearSelected, props.semesterSelected, props.memberSelected])


    const CreateTable = (item) => {

        if (item.activeStatus === 1) {
            return <td key={item.index} colSpan={item.timeLect + item.timePerf} >
                <div> [{item.course_code}]</div>
                <div> [{item.course_title}]</div>
                <div>[{item.group_name}]</div>
                <div>[{item.room_name}]</div>
                <div>[{item.member_name}]</div>
                <div>[{item.courseLect === 0 ? null : `ท.(${item.courseLect})`}&nbsp;{item.coursePerf === 0 ? null : `ป.(${item.coursePerf})`}]</div>
            </td>
        } else if (item.activeStatus === 3) {
            return <td key={item.index} colSpan={item.timeLect + item.timePerf} >
            </td>;
        }

        return null;

    };

    return (

        <Container maxWidth='false' sx={{ pt: 2, pb: 2, display: props.disableState ? 'none' : 'block' }} >
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                <Grid container spacing={2} sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }} >
                    <Grid item sm={12} xs={12}>
                        <Styles>
                            <Table >
                                <thead >
                                    <tr >
                                        <th key={1} rowSpan="2" ></th>
                                        <th key={2} >&nbsp;1&nbsp;</th>
                                        <th key={3} >&nbsp;2&nbsp;</th>
                                        <th key={4} >&nbsp;3&nbsp;</th>
                                        <th key={5} >&nbsp;4&nbsp;</th>
                                        <th key={6} >&nbsp;5&nbsp;</th>
                                        <th key={7} >&nbsp;6&nbsp;</th>
                                        <th key={8} >&nbsp;7&nbsp;</th>
                                        <th key={9} >&nbsp;8&nbsp;</th>
                                        <th key={10} >&nbsp;9&nbsp;</th>
                                        <th key={11} >&nbsp;10&nbsp;</th>
                                        <th key={12} >&nbsp;11&nbsp;</th>
                                        <th key={13} >&nbsp;12&nbsp;</th>
                                        <th key={14} >&nbsp;13&nbsp;</th>
                                        <th key={15} >&nbsp;14&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th align="center">
                                            <span>08:00 - 09:00</span>
                                        </th>
                                        <th align="center">
                                            <span>09:00 - 10:00</span>
                                        </th>
                                        <th align="center">
                                            <span>10:00 - 11:00</span>
                                        </th>
                                        <th align="center">
                                            <span>11:00 - 12:00</span>
                                        </th>
                                        <th align="center">
                                            <span>12:00 - 13:00</span>
                                        </th>
                                        <th align="center">
                                            <span>13:00 - 14:00</span>
                                        </th>
                                        <th align="center">
                                            <span>14:00 - 15:00</span>
                                        </th>
                                        <th align="center">
                                            <span>15:00 - 16:00</span>
                                        </th>
                                        <th align="center">
                                            <span>16:00 - 17:00</span>
                                        </th>
                                        <th align="center">
                                            <span>17:00 - 18:00</span>
                                        </th>
                                        <th align="center">
                                            <span>18:00 - 19:00</span>
                                        </th>
                                        <th align="center">
                                            <span>19:00 - 20:00</span>
                                        </th>
                                        <th align="center">
                                            <span>20:00 - 21:00</span>
                                        </th>
                                        <th align="center">
                                            <span>21:00 - 22:00</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td key={16} >&nbsp;จันทร์&nbsp;</td>
                                        {monday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={17} >&nbsp;อังคาร&nbsp;</td>
                                        {tuesday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={18} >&nbsp;พุธ&nbsp;</td>
                                        {wednesday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={19} >&nbsp;พฤหัสบดี&nbsp;</td>
                                        {thursday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={20} >&nbsp;ศุกร์&nbsp;</td>
                                        {friday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={21} >&nbsp;เสาร์&nbsp;</td>
                                        {saturday.map((item) => (CreateTable(item)))}
                                    </tr>
                                    <tr>
                                        <td key={22} >&nbsp;อาทิตย์&nbsp;</td>
                                        {sunday.map((item) => (CreateTable(item)))}
                                    </tr>
                                </tbody>
                            </Table>
                        </Styles>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}