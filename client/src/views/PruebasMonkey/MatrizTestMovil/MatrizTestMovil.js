/* global alert */

import React, { Component } from 'react'
import axios from 'axios'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

class MatrizTestMovil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idAppliRandom : this.props.match.params.idApplicationRandom,
      event         : '',
      device        : '',
      typeAndroid   : ''
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { aplicacion, url, tipo, descripcion } = this.state;
    console.log(this.state);
  }

  handleChangeField(key, event) {
    this.setState({
        [key]: event.target.value,
    });
  }

  render() {
    const { event, device, typeAndroid} = this.state
    return (
      <div className="animated fadeIn">
      <Form action="/#/EmulatorAndroid" method="post" encType="multipart/form-data" className="form-horizontal">
        <Row>
          <Col xs="2" md="3"></Col>
          <Col xs="10" md="6">
            <Card>
              <CardHeader>
                <strong>Matriz de pruebas moviles</strong>
              </CardHeader>
              <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Numero de eventos</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input
                      onChange={(ev) => this.handleChangeField('event', ev)}
                      value={event}
                      className='inputNum'
                      type='number'
                      name='event'
                      min='1'
                    />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Dispositivo</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input
                          onChange={(ev) => this.handleChangeField('device', ev)}
                          value={device}
                          name='device'
                          type='select'
                        >
                          <option value=''>Seleccionar</option>
                          <option value='Samsung Galaxy S6'>Samsung Galaxy S6</option>
                          <option value='Nexus 4'>Nexus 4</option>
                          <option value='Nexus 5'>Nexus 5</option>
                          <option value='Nexus One'>Nexus One</option>
                          <option value='Nexus One'>Nexus S</option>
                          <option value='Nexus One'>Nexus 7</option>
                        </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Tipo Aplicacion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          onChange={(ev) => this.handleChangeField('typeAndroid', ev)}
                          value={typeAndroid}
                          type='select'
                          name='typeAndroid'
                        >
                          <option value=''>Seleccionar</option>
                          <option value='butomo1989/docker-android-x86-5.1.1'>Android 5.1.1</option>
                          <option value='butomo1989/docker-android-x86-6.0'>Android 6.0</option>
                          <option value='butomo1989/docker-android-x86-7.1.1'>Android 7.1.1</option>
                          <option value='butomo1989/docker-android-x86-8.1'>Android 8.1</option>
                          <option value='butomo1989/docker-android-x86-9.0'>Android 9.0</option>
                        </Input>
                    </Col>
                  </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}>
                    <i className="fa fa-dot-circle-o"></i> Ejecutar
                </Button>&nbsp;
                <a href='/#/testingMonkey/start'>
                  <Button type='reset' size='sm' color='danger'>
                    <i className='fa fa-ban' /> Regresar
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        </Form>
      </div>
    );
  }
}

export default MatrizTestMovil
