import React, { Component } from 'react'
import axios from 'axios'

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap'

class ListApplication extends Component {
  constructor (props) {
    super(props)
    this.state = { serverports: [] }
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
          <td>{object.url}</td>
          <td>{object.type}</td>
          <td>{object.description}</td>
          <td>
            <a href={'/#/registerApplication/' + object._id}>
              <i className='icon-note icons d-block mt-1' />
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
                <i className='fa fa-align-justify' /> Lista de Aplicaciones
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Aplicaciones</th>
                      <th>URL</th>
                      <th>Tipo</th>
                      <th>Descripcion</th>
                      <th>Editar</th>
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

export default ListApplication
