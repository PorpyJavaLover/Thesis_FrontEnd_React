import React, { Component } from 'react'
import { Container, Segment, Table, Button, Grid, Checkbox, Label , Header } from 'semantic-ui-react'
import APIService from '../Service/APIService'

const tempMember = [

]

export default class SelectSubjectTeacher extends Component {

    state = {
        plans: [],
        timetables: []
    }

    componentDidMount() {
        APIService.getPlan().then((res) => {
            this.setState({ plans: res.data });
            APIService.getTimetable().then((res2) => {
                this.setState({ timetables: res2.data })
                this.tableMapping();
            });
        });
    }

    deletTimetable(yId, sId, cId, gId) {
        APIService.deletTimetable(yId, sId, cId, gId);
    }

    createTimetable(yId, sId, cId, gId) {
        return APIService.createTimetable(yId, sId, cId, gId);
    }

    convert(plan) {
        if (plan.memberId !== null) {
            return true;
        }
        else {
            return false;
        }
    }

    tableMapping() {

        let tempPlans = this.state.plans;
        let tempTimetables = this.state.timetables

        tempPlans.map((plan) => {
            tempTimetables.map((timetable) => {
                if (plan.years + plan.semester + plan.courseId.courseId + plan.groupId.groupId + JSON.parse(localStorage.getItem('user')).principal === timetable.years + timetable.semester + timetable.courseId.courseId + timetable.groupId.groupId + timetable.memberId.memberId) {
                    this.setState(plan.memberId = timetable.memberId);
                }
                return null;
            });
            return plan;
        });

        this.setState({
            plans: tempPlans
        });
    }

    onItemCheck(e, data, item) {

        let tempPlans = this.state.plans;

        tempPlans.map((plan) => {
            if (plan.years + plan.semester + plan.courseId.courseId + plan.groupId.groupId === item.years + item.semester + item.courseId.courseId + item.groupId.groupId) {

                if (plan.memberId !== null) {
                    this.deletTimetable(item.years, item.semester, item.courseId.courseId, item.groupId.groupId);
                    plan.memberId = null;
                }
                else {
                    this.createTimetable(item.years, item.semester, item.courseId.courseId, item.groupId.groupId).then((res) => {
                        this.setState(plan.memberId = res.data);
                    });
                }
            }
            return plan;
        });

        this.setState({
            plans: tempPlans,
        });
    }



    render() {

        return (
            <div style={{ padding: '10px' }} >
                <div style={{ padding: '5px' , paddingLeft:'10px' ,paddingRight:'10px'}}>
                    <Header as='h1' >การจัดการรายวิชาที่จะเปิดสอน</Header>
                </div>
                <div style={{ padding: '5px' , paddingLeft:'10px' ,paddingRight:'10px' }}>
                    <Container fluid>
                        <Segment >
                            <Label as='a' ribbon color='orange' >เมนูจัดการรายการ</Label>
                            <Table celled style={{ padding: '10px' }}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>ปีการศึกษา</Table.HeaderCell>
                                        <Table.HeaderCell>เทอม</Table.HeaderCell>
                                        <Table.HeaderCell>ชื่อกลุ่มเรียน</Table.HeaderCell>
                                        <Table.HeaderCell>รหัสวิชา</Table.HeaderCell>
                                        <Table.HeaderCell>ชื่อวิชา</Table.HeaderCell>
                                        <Table.HeaderCell>ตัวเลือก</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {

                                        this.state.plans.map((plan) => {

                                            let teacherName;

                                            if (plan.memberId !== null) {
                                                teacherName = plan.memberId.thFirstName;
                                            }

                                            return (
                                                <Table.Row key={plan.years + plan.semester + plan.courseId.courseId + plan.groupId.groupId}>
                                                    <Table.Cell>{plan.years}</Table.Cell>
                                                    <Table.Cell>{plan.semester}</Table.Cell>
                                                    <Table.Cell>{plan.groupId.group_name}</Table.Cell>
                                                    <Table.Cell>{plan.courseId.course_code}</Table.Cell>
                                                    <Table.Cell>{plan.courseId.course_title}</Table.Cell>
                                                    <Table.Cell><Checkbox toggle checked={this.convert(plan)} onChange={(e, data) => this.onItemCheck(e, data, plan)} /></Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Container>
                </div>
            </div>
        )
    }
}