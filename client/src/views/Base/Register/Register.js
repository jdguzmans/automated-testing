import React, { Component } from 'react';
import axios from 'axios';

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name        : '',
      url         : '',
      type        : '',
      description : '',
      host        : '',
      nameDb      : '',
      userDb      : '',
      passwordDB  : '',
      modal       : false,
      message     : '',
    }

    this.idRegister = this.props.match.params.id;

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.clearField = this.clearField.bind(this);
    this.getData = this.getData.bind(this);

    if(this.idRegister !== undefined) {
      this.getData();
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  clearField() {
    this.setState({
      name        : '',
      url         : '',
      type        : '',
      description : '',
      host        : '',
      nameDb      : '',
      userDb      : '',
      passwordDB  : ''
    });
  }

  getData(){
    const register = {
      name: this.idRegister
    };

    axios.get(
      'http://localhost:4000/application/'+this.idRegister
    ).then(response => {

      this.setState({
        name        : response.data.application.name,
        url         : response.data.application.url,
        type        : response.data.application.type,
        description : response.data.application.description,
        host        : response.data.application.host,
        nameDb      : response.data.application.nameDb,
        userDb      : response.data.application.userDb,
        passwordDB  : response.data.application.passwordDB
      });
    }).catch(function (error) {
      alert('Error al cargar la informaciom');
    })
  }

  handleSubmit(){
    const { name, url, type, description, host, nameDb, userDb, passwordDB } = this.state;

    if(this.idRegister !== undefined){
      axios.patch(
        'http://localhost:4000/application/'+this.idRegister,
        {
          name,
          url,
          type,
          description,
          host,
          nameDb,
          userDb,
          passwordDB
        }
      ).then(response => {
        this.setState({ message: 'Actualizacion realizada con exito' });

        this.setState({
          modal: !this.state.modal,
        });
      }).catch(function (error) {
        alert(error);
      })
    } else {
      axios.post(
        'http://localhost:4000/application',
        {
          name,
          url,
          type,
          description,
          host,
          nameDb,
          userDb,
          passwordDB
        }
      ).then(response => {
        this.setState({ message: 'Registro guardado con exito' });

        this.setState({
          modal: !this.state.modal,
        });
      }).catch(function (error) {
        alert(error);
      })
    }


  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { name, url, type, description, host, nameDb, userDb, passwordDB} = this.state;

    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mensaje</ModalHeader>
          <ModalBody>
            {this.state.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs="2" md="3"></Col>
          <Col xs="10" md="6">
            <Card>
              <CardHeader>
                <strong>Registro Aplicacion</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nombre Aplicacion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          onChange = {(ev) => this.handleChangeField('name', ev)}
                          value    = {name}
                          type     = "text"
                          name     = 'nameApplication'
                          id       = 'nameApplication'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          onChange = {(ev) => this.handleChangeField('url', ev)}
                          value    = {url}
                          type     = "text"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Tipo Aplicacion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          onChange = {(ev) => this.handleChangeField('type', ev)}
                          value    = {type}
                          type="select"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Web">Web</option>
                        <option value="Movil">Movil</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Descripcion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          onChange = {(ev) => this.handleChangeField('description', ev)}
                          value    = {description}
                          type     = "textarea"
                          rows="9"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12">
                      <strong>Datos de conexion a la Base de Datos</strong><hr/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Host</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('host', ev)}
                        value    = {host}
                        type     = "text"
                        name     = 'hostDb'
                        id       = 'hostDb'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Base de datos</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('nameDb', ev)}
                        value    = {nameDb}
                        type     = "text"
                        name     = 'nameDb'
                        id       = 'nameDb'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Usuario</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('userDb', ev)}
                        value    = {userDb}
                        type     = "text"
                        name     = 'userDb'
                        id       = 'userDb'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Contraseña</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('passwordDB', ev)}
                        value    = {passwordDB}
                        type     = "password"
                        name     = 'passDb'
                        id       = 'passDb'
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>{' '}
                <Button onClick={this.clearField} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
