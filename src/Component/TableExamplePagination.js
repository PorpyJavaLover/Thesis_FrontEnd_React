import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const TableExamplePagination = () => (
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
        this.state.members.map(
          member =>
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
                  <button style={{ marginLeft: "10px" }} onClick={() => this.deleteMember(member.id)} className="btn btn-danger">Delete </button>
                  </Table.Cell>
            </Table.Row>
        )
      }
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableExamplePagination
