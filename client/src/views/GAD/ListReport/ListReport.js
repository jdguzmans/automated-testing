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
    this.state = {
      listTable: [],
      listApplication: [],
      listReport: []
    }
  }

  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/application`)
      .then(response => {
        this.setState({ listApplication: response.data.applications })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/uploadData`)
      .then(response => {
        this.setState({ listTable: response.data.uploadDatas })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/uploadData/report`)
      .then(response => {
        this.setState({ listReport: response.data.reportsGad })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  listApplicationTest () {
    let aplication = []
    this.state.listApplication.map(function (object, i) {
      aplication[object._id] = object.name
    })
    return aplication
  }

  listTableTest () {
    let table = []
    let listTableVsAppl = []
    this.state.listTable.map(function (object, i) {
      table[object._id] = object.nameTable
      listTableVsAppl[object._id] = object.application
    })
    return table
  }

  listTableVsAppl () {
    let tableVsAppl = []
    this.state.listTable.map(function (object, i) {
      tableVsAppl[object._id] = object.application
    })
    return tableVsAppl
  }

  tabRow () {
    const applications = this.listApplicationTest()
    const tables = this.listTableTest()
    const idApllication = this.listTableVsAppl()

    return this.state.listReport.map(function (object, i) {
      console.log(object)
      return (
        <tr>
          <td>{object.date }</td>
          <td>{tables[object.idTable] }</td>
          <td>{applications[idApllication[object.idTable]] }</td>
          <td>{object.configRegister}</td>
          <td>{object.registered}</td>
          <td>{object.configRegister - object.registered}</td>
          <td>
            <a href={`${process.env.REACT_APP_FS_URL}/gad/${object._id}.csv`}>
              <i className='cui-cloud-download icons d-block mt-1' />
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
                <i className='fa fa-align-justify' /> Lista Reportes Cargue Datos
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre Tabla</th>
                      <th>Aplicacion</th>
                      <th>Registros configurados</th>
                      <th>Registros cargados</th>
                      <th>Error registros</th>
                      <th>Reporte</th>
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
