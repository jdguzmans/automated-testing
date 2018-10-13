import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Pagination, PaginationItem, PaginationLink,Table
} from 'reactstrap';
import axios from "axios/index";

class ViewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {serverports: [],listTests: []};
    const urlReport = 'http://localhost:8000/'+this.props.match.params.id;
  }1

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount(){
    axios.get('http://localhost:8000/api/testingE2E')
      .then(response => {
        this.setState({ listTests: response.data.testingsE2E });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:8000/api/reportsE2E')
      .then(response => {
        this.setState({ serverports: response.data.reportsE2E });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  listTestings(){
    let tests = new Array();
    this.state.listTests.map(function(object, i){
      tests[object._id] = object.name;
    });
    return tests;
  }

  tabRow(){
    const tests = this.listTestings();

    return this.state.serverports.map(function(object, i){
      return (
        <tr>
          <td>{tests[object.idTest] }</td>
          <td>{object.navegador}</td>
          <td>{object.pantalla}</td>
          <td>{object.date}</td>
          <td>
            <a href={'/#/testingE2E/viewreport/'+ object._id}>
              <i className="icon-note icons d-block mt-1"></i>
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <iframe src={'http://localhost:8000/'+this.props.match.params.id+'.html'} width='100%' height='600px' frameborder="0"/>
    );
  }
}

export default ViewReport;
