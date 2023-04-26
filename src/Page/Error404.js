import React, { Component } from "react";
// import { Divider, Form, Label, Button } from 'semantic-ui-react'
import { FormLabel } from "@mui/material";
import APIService from "../Service/APIService";

export default class Error404 extends Component {
  render() {
    return (
      <FormLabel>
        <h1>Error 404</h1>
      </FormLabel>
    );
  }
}
