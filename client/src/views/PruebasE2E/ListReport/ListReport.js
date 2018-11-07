import React, { Component } from 'react'

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap'
import axios from 'axios/index'

class ListReport extends Component {
  constructor (props) {
    super(props)
    this.state = {serverports: [], listTests: []}
  }

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/testingE2E`)
      .then(response => {
        this.setState({ listTests: response.data.testingsE2E })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/reportsE2E`)
      .then(response => {
        this.setState({ serverports: response.data.reportsE2E })
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
      console.log(object)
      return (
        <tr>
          <td>{tests[object.idTest] }</td>
          <td>{object.navegador}</td>
          <td>{object.pantalla}</td>
          <td>{object.date}</td>
          <td>
            <a href={'/#/viewreport/' + object._id}>
              <i className='icon-note icons d-block mt-1' />
            </a>
          </td>
          <td>
            <a href={'/#/viewscreenshots/' + object._id}>
              <i className='icon-picture icons d-block mt-1' />
            </a>
          </td>
          <td>
            <a href={`/#/viewE2EVR/${object.idTest}/${object._id}`}>
              <i className='icon-picture icons d-block mt-1' />
            </a>
          </td>
          <td>
            <a href={`/#/viewE2EMutation/${object.idTest}/${object._id}`}>
              <i className='icon-picture icons d-block mt-1' />
            </a>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' lg='12'>
            <Card>
              <CardHeader>
                <i className='fa fa-align-justify' /> Lista Reportes Pruebas E2E
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
                      <th>VR</th>
                      <th>Mutaciones</th>
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

    )
  }
}

export default ListReport
