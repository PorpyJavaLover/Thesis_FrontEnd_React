import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

export default class Navbar extends Component {

  state = {}

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {

    const { activeItem } = this.state

    if (activeItem === 'Home') {
      console.log('You clicked Home.');
    }
    else if (activeItem === 'การจัดการรายวิชาที่จะเปิดสอน') {
      console.log('You clicked Select Subject Teacher.');
    }
    else if (activeItem === 'Select Subject Staff') {
      console.log('You clicked Select Subject Staff.');
    }
    else if (activeItem === 'การจัดการวันเวลาที่ไม่ขอสอน') {
      console.log('You clicked Select NotTeach Teacher');
    }
    else if (activeItem === 'การจัดการการสอนแทน') {
      console.log('You clicked Select NotTeach Teacher');
    }
    else if (activeItem === 'Singin') {
      console.log('You clicked Singin.');
    }
    else if (activeItem === 'Singup') {
      console.log('You clicked Singup.');
    }

    return (
      <div className='navbar'>
        <Menu pointing secondary >
          <Menu.Item
            color='orange'
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
            as={Link} to='/Home'
          >
            <Icon name='home' />
          </Menu.Item>
          <Menu.Item
            color='orange'
            name='การจัดการรายวิชาที่จะเปิดสอน'
            active={activeItem === 'การจัดการรายวิชาที่จะเปิดสอน'}
            onClick={this.handleItemClick}
            as={Link} to='/SelectSubject/Teacher'
          />
          <Menu.Item
            color='orange'
            name='การจัดการวันเวลาที่ไม่ขอสอน'
            onClick={this.handleItemClick}
            active={activeItem === 'การจัดการวันเวลาที่ไม่ขอสอน'}
            as={Link} to='/NotTeach/Teacher'
          />
          <Menu.Item
            color='orange'
            name='การจัดการการสอนแทน'
            onClick={this.handleItemClick}
            active={activeItem === 'การจัดการการสอนแทน'}
            as={Link} to='/LeaveTeach/Teacher'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              color='orange'
              name='Singin'
              active={activeItem === 'Singin'}
              onClick={this.handleItemClick}
              as={Link} to='/Singin'
            />
            <Menu.Item
              color='orange'
              name='Singup'
              active={activeItem === 'Singup'}
              onClick={this.handleItemClick}
              as={Link} to='/Singup'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}