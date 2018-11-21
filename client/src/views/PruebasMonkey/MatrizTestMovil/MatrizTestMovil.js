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
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

class MatrizTestMovil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idAppliRandom : this.props.match.params.idApplicationRandom,
      event         : '',
      device        : '',
      typeAndroid   : '',
      emulator      : false,
      modalEmulador : false,
      modal         : false,
      message       : ''
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.emulatorStart     = this.emulatorStart.bind(this);
    this.buttonBack        = this.buttonBack.bind(this);
    this.buttonReload      = this.buttonReload.bind(this);
    this.buttonUpload      = this.buttonUpload.bind(this);
    this.buttonStart       = this.buttonStart.bind(this);
    this.toggleEmulador    = this.toggleEmulador.bind(this);
    this.toggle            = this.toggle.bind(this);
    
  }

  toggleEmulador() {
    this.setState({
      modalEmulador: !this.state.modalEmulador,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  emulatorStart(){
    const { event, device, typeAndroid} = this.state

    if(event == '' || device == '' || typeAndroid == ''){
      this.setState({
        message: 'Debe llenar todos los campos de configuracion para iniciar el emulador de Android',
        modal: !this.state.modal
      });
    } else {
      this.setState({
        emulator: true
      });
    }
  }

  buttonBack(){
    this.setState({
      emulator: false
    });
  }

  buttonReload(){
    alert('recargar emulador');
  }

  buttonUpload(){
    alert('cargar emulador');
  }

  buttonStart(){
    this.setState({
      modalEmulador: !this.state.modalEmulador,
    });
  }

  handleChangeField(key, event) {
    this.setState({
        [key]: event.target.value,
    });
  }

  emulatorAndroid(){
    const { event, device, typeAndroid, emulator} = this.state

    if(emulator === true){
      return <Row>
              <Col xs="12" md="12">
                <Card>
                  <CardHeader>
                    <strong>Emulador Android</strong>
                  </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col xs="2" md="2">
                        <Button type='reset' size='sm' color='danger' onClick={this.buttonReload}>
                          <i className='fa fa-refresh' /> Reiniciar Emulador
                        </Button>
                      </Col>
                      <Col xs="2" md="2">
                        <Button type='reset' size='sm' color='primary' onClick={this.buttonUpload}>
                          <i className='fa fa-cloud-upload' /> Cargar APK
                        </Button>
                      </Col>
                      <Col xs="2" md="2">
                        <Button type='reset' size='sm' color='success' onClick={this.buttonStart}>
                          <i className='fa fa-play-circle' /> Iniciar prueba
                        </Button>
                      </Col>
                      <Col xs="2" md="2">
                        <Button type='reset' size='sm' color='secondary' onClick={this.buttonBack}>
                          <i className='fa fa-chevron-left' /> Regresar
                        </Button>
                      </Col>
                    </FormGroup>
                    <iframe 
                        src='http://localhost:6080/' 
                        width='100%' 
                        height='850px' 
                        frameborder='0' 
                        allowfullscreen='true' 
                        mozallowfullscreen='true' 
                        webkitallowfullscreen='true' 
                        scrolling="no" 
                      />
                  </CardBody>
                </Card>
                </Col>
            </Row>
    } else {
      return <Row>
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
                    <Button type="submit" size="sm" color="primary" onClick={this.emulatorStart}>
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
    }
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modalEmulador} toggle={this.toggleEmulador} className={this.props.className}>
          <ModalHeader toggle={this.toggleEmulador}>Ubicacion del App</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="select">Carpeta</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                    onChange={(ev) => this.handleChangeField('typeAndroid', ev)}
                    value=''
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleEmulador}>Iniciar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mensaje</ModalHeader>
          <ModalBody>
            {this.state.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
        {this.emulatorAndroid()}
      </div>
    );
  }
}

export default MatrizTestMovil
