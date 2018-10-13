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
} from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name        : '',
      url         : '',
      type        : '',
      description : '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { name, url, type, description } = this.state;

    axios.post('http://localhost:8000/api/application', {
      name,
      url,
      type,
      description
    });
    alert('Datos guardados');
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { name, url, type, description } = this.state;

    return (
      <div className="animated fadeIn">
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
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
