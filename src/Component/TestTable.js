import React,{Component} from 'react';
import { Button, Table } from 'semantic-ui-react'
import APIService from '../Service/APIService'


export default class TestTable extends Component {

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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member ID</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>TH First Name</Table.HeaderCell>
                        <Table.HeaderCell>TH Last Name</Table.HeaderCell>
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
                            <Table.Row key={member.id}>
                                <Table.Cell>{member.id}</Table.Cell>
                                <Table.Cell>{member.title_id}</Table.Cell>
                                <Table.Cell>{member.th_first_name}</Table.Cell>
                                <Table.Cell>{member.th_last_name}</Table.Cell>
                                <Table.Cell>{member.en_first_name}</Table.Cell>
                                <Table.Cell>{member.en_last_name}</Table.Cell>
                                <Table.Cell>{member.username}</Table.Cell>
                                <Table.Cell>{member.password}</Table.Cell>
                                <Table.Cell>{member.s_organization_id}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => {
                                        this.deleteMember(member.id)
                                    }} > Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='10'>
                            <TestTable></TestTable>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

