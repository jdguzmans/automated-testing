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

class ListReport extends Component {
  constructor(props) {
    super(props);
    this.state = {serverports: [],listTests: []};
  }

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount(){
    axios.get('http://localhost:4000/application')
      .then(response => {
        this.setState({ listTests: response.data.applications });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:4000/randomTesting')
      .then(response => {
        this.setState({ serverports: response.data.randomTestings });
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
          <td>{tests[object.idAppliRandom] }</td>
          <td>{object.navegador}</td>
          <td>{object.pantalla}</td>
          <td>{object.date}</td>
          <td>
            <a href={'/#/viewreport/'+ object._id}>
              <i className="icon-note icons d-block mt-1"></i>
            </a>
          </td>
          <td>
            <a href={'/#/viewscreenshots/'+ object._id}>
              <i className="icon-picture icons d-block mt-1"></i>
            </a>
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
                <i className="fa fa-align-justify"></i> Lista Reportes Pruebas E2E
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Caso Prueba</th>
                    <th>Navegador</th>
                    <th>Tamaño Pantalla</th>
                    <th>Fecha Ejecucion</th>
                    <th>Reporte</th>
                    <th>Screenshots</th>
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

export default ListReport;
