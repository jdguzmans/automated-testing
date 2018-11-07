import React, { Component } from 'react'

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from 'reactstrap'
import axios from 'axios/index'

class StartUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {serverports: [], listApplication: [], listData: []}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.tabRow = this.tabRow.bind(this)
  }

  handleSubmit () {
    // DATOS API MOOCKAROO
    axios.post('https://api.mockaroo.com/api/generate.json?key=825fa840', { schema: 'Libros' })
      .then(response => {
        this.setState({ listData: response.data })

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadData/startUpload`, { schema: this.state.listData })
          .then(() => {
            alert('Datos cargados con exito')
          })
          .catch((e) => {
            console.log('error')
            console.log(e)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
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

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/testingE2E`)
      .then(response => {
        this.setState({ serverports: response.data.testingsE2E })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  lisApplications () {
    let applications = new Array()
    this.state.listApplication.map(function (object, i) {
      applications[object._id] = object.name
    })
    return applications
  }

  tabRow () {
    const applications = this.lisApplications()

    return this.state.serverports.map((object, i) => {
      return (
        <tr>
          <td>Cargue Libros</td>
          <td>Otros</td>
          <td>Cargue de datos para la tabla Libros</td>
          <td><i className='icon-pencil icons d-block mt-1' /></td>
          <td>
            <Button onClick={this.handleSubmit} type='submit' size='sm' color='success'>
              <i className='icon-control-play icons d-block mt-0' />
            </Button>
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
                <i className='fa fa-align-justify' /> Lista para Generacion Automatica de Datos
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nombre Cargue</th>
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

    )
  }
}

export default StartUpload
