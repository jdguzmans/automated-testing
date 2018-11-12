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

class ListReport extends Component {
  constructor(props) {
    super(props);
    this.state = {serverports: [],listTests: []};
  }

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/application`)
      .then(response => {
        this.setState({ listTests: response.data.applications })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/uploadData`)
      .then(response => {
        this.setState({ serverports: response.data.randomTestings })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  listTestings () {
    let tests = []
    this.state.listTests.map(function (object, i) {
      tests[object._id] = object.name
    })
    return tests
  }

  tabRow () {
    const tests = this.listTestings()

    return this.state.serverports.map(function (object, i) {
      return (
        <tr>
          <td>{object.nameTable}</td>
          <td>{tests[object.idAppliRandom] }</td>
          <td>{object.numRegister}</td>
          <td>
            <a href={'/#/viewreport/' + object._id}>
              <i className='icon-note icons d-block mt-1' />
            </a>
          </td>
        </tr>
      )
    })
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
                    <th>Nombre Tabla</th>
                    <th>Aplicacion</th>
                    <th>Numero registros</th>
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

export default ListReport;
