import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';
import axios from "axios/index";

class StartTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {serverports: [],listApplication: []};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.tabRow = this.tabRow.bind(this)
  }

  handleSubmit(){
    axios.post('http://localhost:8000/api/testingMonkey/testMonkey')
    .then(() =>{
      alert('Prueba Generada');
    })
      .catch((e) => {
        console.log('error')
        console.log(e)
      })

  }

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount(){
    axios.get('http://localhost:8000/api/application')
      .then(response => {
        this.setState({ listApplication: response.data.applications });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:8000/api/testingMonkey')
      .then(response => {
        this.setState({ serverports: response.data.testingsMonkey });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  lisApplications(){
    let applications = new Array();
    this.state.listApplication.map(function(object, i){
      applications[object._id] = object.name;
    });
    return applications;
  }

  tabRow(){
    const applications = this.lisApplications();

    return this.state.serverports.map((object, i) => {
      return (
        <tr>
          <td>{object.name}</td>
          <td>{applications[object.application] }</td>
          <td>{object.description}</td>
          <td><i className="icon-pencil icons d-block mt-1"></i></td>
          <td>
              <button onClick={this.handleSubmit}><i className="icon-control-play icons d-block mt-1"></i></button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Lista Pruebas E2E
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Nombre Prueba</th>
                    <th>Aplicacion</th>
                    <th>Descripcion</th>
                    <th>Editar</th>
                    <th>Ejecutar</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.tabRow()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default StartTesting;
