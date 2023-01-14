import React, { Component } from 'react'
import { Container, Segment, Table, Button, Grid } from 'semantic-ui-react'
import APIService from '../Service/APIService'

export default class TestPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            members: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteMember.bind(this);
    }

    deleteMember(id) {
        APIService.deleteMember(id).then(() => {
            this.setState({ members: this.state.members.filter(member => member.id !== id) });
        });
    }
    
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        APIService.getMembers().then((res) => {
            this.setState({ members: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }



    render() {
        return (
            <div className='selectsubject' >
                <Container fluid>
                    <Segment >
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Member ID</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>TH First-Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>EN First Name </Table.HeaderCell>
                                    <Table.HeaderCell>EN Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Password</Table.HeaderCell>
                                    <Table.HeaderCell>Organization</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.state.members.map(member =>
                                        <Table.Row key={member.member_id}>
                                            <Table.Cell>{member.member_id}</Table.Cell>
                                            <Table.Cell>{member.title_id}</Table.Cell>
                                            <Table.Cell>
                                                <Grid>
                                                    <Grid.Row columns={1} only='tablet computer'>
                                                        <Grid.Column>
                                                            <Grid.Row>
                                                                {member.th_first_name}
                                                            </Grid.Row>
                                                            <Grid.Row>
                                                                {member.th_last_name}
                                                            </Grid.Row>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row columns={2} only='mobile'>
                                                        <Grid.Column>
                                                            {member.th_first_name}
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            {member.th_last_name}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Table.Cell>
                                            <Table.Cell>{member.en_first_name}</Table.Cell>
                                            <Table.Cell>{member.en_last_name}</Table.Cell>
                                            <Table.Cell>{member.username}</Table.Cell>
                                            <Table.Cell>{member.password}</Table.Cell>
                                            <Table.Cell>{member.s_organization_id}</Table.Cell>
                                            <Table.Cell>
                                                <button onClick={() => {
                                                    this.deleteMember(member.id)
                                                }} > Delete</button>
                                            </Table.Cell>
                                        </Table.Row>)
                                }
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='10'>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
                </Container>
            </div>
        )
    }
}