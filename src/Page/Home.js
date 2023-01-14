import React, { Component } from 'react'
import { Divider, Form, Label, Button } from 'semantic-ui-react'
import APIService from '../Service/APIService'



export default class Home extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            username: "",
            password: "",
        };
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleLogin = (event) => {
        APIService.login(this.state.username, this.state.password);
    }



    render() {
        return (

            <Form>
                <Form.Field inline>
                    <input
                        type='text'
                        placeholder='Username'
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <Label pointing='left'>
                        That name is taken!
                    </Label>
                </Form.Field>

                <Form.Field inline>
                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <Label pointing='left'>
                        Your password must be 6 characters or more
                    </Label>

                </Form.Field>

                <button
                    onClick={this.handleLogin}
                >Submit</button>

            </Form >

        )
    }
}