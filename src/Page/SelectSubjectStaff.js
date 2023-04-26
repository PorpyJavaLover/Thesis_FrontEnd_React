import React, { Component } from 'react'
import { Container, Segment, Table, Button, Grid, Checkbox } from 'semantic-ui-react'
import APIService from '../Service/APIService'

export default class SelectSubjectStaff extends Component {

    state = {
        plans: [],
        members: [],
        timetables: [],
        "key": "value"
    }

    componentDidMount() {
        APIService.getAllPlan().then((resA) => {
            this.setState({ plans: resA.data });
            APIService.getMemberOption().then((resB) => {
                this.setState({ members: resB.data });
                APIService.getAllTimetable().then((resC) => {
                    this.setState({ timetables: resC.data });
                    this.memberMapping();
                });

            });
        });
    }

    deletTimetable(yId, sId, cId, gId, mid) {
        APIService.deletTimetableStaff(yId, sId, cId, gId, mid);
    }

    createTimetable(yId, sId, cId, gId, mid) {
        return APIService.createTimetableStaff(yId, sId, cId, gId, mid);
    }

    convert(plan, id) {

        var index = id - 1;

        if (plan.memberColum !== undefined) {
            if (plan.memberColum[index] !== undefined) {
                if (plan.memberColum[index].selected !== undefined) {
                    return plan.memberColum[index].selected;
                }
            }
        }
        return false;
    }

    gtc() {

        let table_row;

        var row_id = 1;

        table_row = this.state.plans.map((plan) => {
            row_id++;
            return (
                <Table.Row key={row_id}>
                    <Table.Cell>{plan.years}</Table.Cell>
                    <Table.Cell>{plan.semester}</Table.Cell>
                    <Table.Cell>{plan.groupId.group_name}</Table.Cell>
                    <Table.Cell>{plan.courseId.course_code}</Table.Cell>
                    <Table.Cell>{plan.courseId.course_title}</Table.Cell>
                    {this.gt(plan)}
                </Table.Row>
            )
        })

        return table_row;

    }

    gt(plan) {
        if (plan.memberColum !== undefined) {
            {
                let ccheckbox;

                var row_id = 1;

                ccheckbox = plan.memberColum.map((member) => {
                    row_id++;
                    return <Table.Cell key={row_id} ><Checkbox toggle checked={this.convert(plan, member.memberId)} onChange={(e, data) => this.onItemCheck(e, data, plan, member.memberId)} /></Table.Cell>
                })

                return ccheckbox;
            }
        }
    }


    ght() {

        let hcheckbox;

        if (this.state.members !== undefined) {
            var tempMember = this.state.members;
        }

        var row_id = 1;

        hcheckbox = tempMember.map((member) => {
            row_id++;
            return <Table.HeaderCell key={row_id}>{member.thFirstName}</Table.HeaderCell>
        })

        return hcheckbox;
    }


    memberMapping() {

        let tempPlans = this.state.plans;
        var tempMember = this.state.members;

        tempPlans.map((plan) => {
            this.setState(plan.memberColum = []);
            for (var i = 0; i < tempMember.length; i++) {
                plan.memberColum.push({ selected: false });
                plan.memberColum[i].memberId = tempMember[i].memberId;
                plan.memberColum[i].thFirstName = tempMember[i].thFirstName;
                plan.memberColum[i].thLastName = tempMember[i].thLastName;
            };
            return plan;
        });

        this.setState({
            plans: tempPlans
        });

        this.tableMapping();

    }

    tableMapping() {

        let tempPlans = this.state.plans;
        let tempTimetables = this.state.timetables;

        tempPlans.map((plan) => {
            tempTimetables.map((timetable) => {
                if (plan.years + plan.semester + plan.courseId.courseId + plan.groupId.groupId === timetable.years + timetable.semester + timetable.courseId.courseId + timetable.groupId.groupId) {
                    plan.memberColum.map((member) => {
                        if (member.memberId === timetable.memberId.memberId) {
                            member.selected = timetable.memberId.selected;
                        }
                    });
                }
            });
        });

        this.setState({
            plans: tempPlans
        });
    }

    onItemCheck(e, data, item, id) {
        let tempPlans = this.state.plans;

        if (tempPlans.find(element => element.years + element.semester + element.courseId.courseId + element.groupId.groupId === item.years + item.semester + item.courseId.courseId + item.groupId.groupId).memberColum.find(element => element.memberId === id).selected === true) {
            this.deletTimetable(item.years, item.semester, item.courseId.courseId, item.groupId.groupId, id);
            tempPlans.find(element => element.years + element.semester + element.courseId.courseId + element.groupId.groupId === item.years + item.semester + item.courseId.courseId + item.groupId.groupId).memberColum.find(element => element.memberId === id).selected = false;
        }
        else {
            this.createTimetable(item.years, item.semester, item.courseId.courseId, item.groupId.groupId, id);
            tempPlans.find(element => element.years + element.semester + element.courseId.courseId + element.groupId.groupId === item.years + item.semester + item.courseId.courseId + item.groupId.groupId).memberColum.find(element => element.memberId === id).selected = true;
        }

        this.setState({
            plans: tempPlans,
        });
    }



    render() {

        return (
            <div className='selectsubject' >
                <Container fluid>
                    <Segment >
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Year</Table.HeaderCell>
                                    <Table.HeaderCell>Semester</Table.HeaderCell>
                                    <Table.HeaderCell>Group Name</Table.HeaderCell>
                                    <Table.HeaderCell>Course Code</Table.HeaderCell>
                                    <Table.HeaderCell>Course Title</Table.HeaderCell>
                                    {this.ght()}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.gtc()}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Container>
            </div>
        )
    }
}