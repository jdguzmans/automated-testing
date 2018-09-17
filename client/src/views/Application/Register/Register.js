import React, { Component } from 'react';
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
      aplicacion  : '',
      url         : '',
      tipo        : '',
      descripcion : ''
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
                      <Input type="text" id="text-input" name="text-input"  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('title', ev)}
                        type     = "text"
                        id       = "text-input"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Tipo Aplicacion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select">
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
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}>
                    <i className="fa fa-dot-circle-o"></i> Guardar
                </Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Lista Aplicaciones</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
