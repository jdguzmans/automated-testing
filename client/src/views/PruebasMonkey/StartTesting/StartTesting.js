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

class StartTesting extends Component {
  constructor (props) {
    super(props)
    this.state = {serverports: [], listApplication: []}

    this.tabRow = this.tabRow.bind(this)
  }

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/application`)
      .then(response => {
        this.setState({ serverports: response.data.applications })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  tabRow () {
    return this.state.serverports.map(function (object, i) {
      return (
        <tr>
          <td>{object.name}</td>
          <td>{object.description}</td>
          <td>{object.type}</td>
          <td>
            <a href={'/#/matrizTest/' + object._id}>
              <i className='icon-control-play icons d-block mt-1' />
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
                <i className='fa fa-align-justify' /> Lista Pruebas E2E
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Aplicacion</th>
                      <th>Descripcion</th>
                      <th>Tipo</th>
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

export default StartTesting
