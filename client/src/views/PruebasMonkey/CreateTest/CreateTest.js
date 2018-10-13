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
import axios from "axios/index";

class CreateTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name        : '',
      application : '',
      fileTest    : '',
      description : '',
      serverports : []
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { name, application, fileTest, description } = this.state;

    axios.post('http://localhost:8000/api/testingE2E', {
      name,
      application,
      fileTest,
      description
    });
    alert('Datos guardados');
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/application')
      .then(response => {
        this.setState({ serverports: response.data.applications });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  listOption(){
    return this.state.serverports.map(function(object, i){
      return (
          <option value={object._id}>{object.name}</option>
      );
    });
  }

  render() {
    const { name, application, fileTest, description } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="2" md="3"></Col>
          <Col xs="10" md="6">
            <Card>
              <CardHeader>
                <strong>Crear Pruebas Monkey</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nombre Prueba</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('name', ev)}
                        value    = {name}
                        type     = "text"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Aplicacion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('application', ev)}
                        value    = {application}
                        type     = "select"
                      >
                        <option value="">Seleccione</option>
                        {this.listOption()}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Archivo pruebas</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('fileTest', ev)}
                        value    = {fileTest}
                        type     = "text"
                      />
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

export default CreateTest;
