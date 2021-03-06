/* global alert */

import React, { Component } from 'react'
import axios from 'axios'
import chrome from '../../../../src/assets/img/navegador/chrome.png'
import firefox from '../../../../src/assets/img/navegador/firefox.png'
import opera from '../../../../src/assets/img/navegador/opera.png'
import explorer from '../../../../src/assets/img/navegador/explorer.png'

import {
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Input,
  Row,
  Table,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap'

class MatrizTest extends Component {
  constructor (props) {
    super(props)

    this.state = {
      idTest: this.props.match.params.idTest,
      idApplication: this.props.match.params.idApplication,
      idAppliRandom: this.props.match.params.idApplicationRandom,
      navegador: 'chrome',
      pantalla: '414x736',
      mode: 'true',
      event: '',
      message: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  async handleSubmit () {
    const { idTest, idApplication, navegador, pantalla, mode, idAppliRandom, event } = this.state

    if (idAppliRandom !== undefined) {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/randomTesting/matrizTest`, {
        idAppliRandom,
        navegador,
        pantalla,
        mode,
        event
      })
    } else {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/testingE2E/matrizTest`, {
        idTest,
        idApplication,
        navegador,
        pantalla,
        mode
      })
    }
    alert('Muy bien')
  }

  handleChangeField (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  render () {
    const { idAppliRandom } = this.state

    let newRow = ''
    if (idAppliRandom !== undefined) {
      newRow = <tr>
        <th>Numero de eventos</th>
        <th colSpan={2}>
          <Input
            onChange={(ev) => this.handleChangeField('event', ev)}
            className='inputNum'
            type='number'
            name='event'
            min='1'
          />
        </th>
        <th colSpan={2} />
      </tr>
    }

    return (
      <div className='animated fadeIn'>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mensaje</ModalHeader>
          <ModalBody>
            {this.state.message}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs='12' lg='12'>
            <Card>
              <CardHeader>
                <i className='fa fa-align-justify' /> Matriz de Pruebas
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th colSpan='5'>MATRIZ DE PRUEBAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Navegador</th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('navegador', ev)}
                          type='radio'
                          name='navegador'
                          value='chrome'
                        />
                        <img src={chrome} width='80px' />
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('navegador', ev)}
                          type='radio'
                          name='navegador'
                          value='firefox'
                        />
                        <img src={firefox} width='80px' />
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('navegador', ev)}
                          type='radio'
                          name='navegador'
                          value='opera'
                        />
                        <img src={opera} width='80px' />
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('navegador', ev)}
                          type='radio'
                          name='navegador'
                          value='ie'
                        />
                        <img src={explorer} width='80px' />
                      </th>
                    </tr>
                    <tr>
                      <th>Tamaño Pantalla</th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('pantalla', ev)}
                          type='radio'
                          name='pantalla'
                          value='414x736'
                        />
                          414 x 736
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('pantalla', ev)}
                          type='radio'
                          name='pantalla'
                          value='800x1280'
                        />
                          800 x 1280
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('pantalla', ev)}
                          type='radio'
                          name='pantalla'
                          value='1024x600'
                        />
                          1024 x 600
                      </th>
                      <th>
                        <Input
                          onChange={(ev) => this.handleChangeField('pantalla', ev)}
                          type='radio'
                          name='pantalla'
                          value='1280x800'
                        />
                          1280 x 800
                      </th>
                    </tr>
                    <tr>
                      <th>Modo</th>
                      <th colSpan={2}>
                        <Input
                          onChange={(ev) => this.handleChangeField('mode', ev)}
                          type='radio'
                          name='mode'
                          value='true'
                        />
                        Headless
                      </th>
                      <th colSpan={2}>
                        <Input
                          onChange={(ev) => this.handleChangeField('mode', ev)}
                          type='radio'
                          name='mode'
                          value='false'
                        />
                        Sin headless
                      </th>
                    </tr>
                    {newRow}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type='submit' size='sm' color='primary' >
                  <i className='fa fa-dot-circle-o' /> Ejecutar
                </Button>&nbsp;
                <a href='/#/testingE2E/start'>
                  <Button type='reset' size='sm' color='danger'>
                    <i className='fa fa-ban' /> Regresar
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default MatrizTest
