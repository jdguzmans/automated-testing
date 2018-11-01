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
  Table
} from 'reactstrap';
import axios from "axios/index";

class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameTable     : '',
      application   : '',
      fileTest      : '',
      description   : '',
      messageSelect : '',
      nameDB        : '',
      listSelect    : [],
      listRow       : [],
      serverports   : []
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

  /* Metodos para cargar la lista de aplicaciones */
  componentDidMount () {
    axios.get('http://localhost:4000/application')
      .then(response => {
        this.setState({ serverports: response.data.applications })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  listOption () {
    return this.state.serverports.map(function (object, i) {
      return (
        <option value={object._id}>{object.name}</option>
      )
    })
  }

  /* Metodos para cargar la lista de la tablas de la DB seleccionada */
  handleChangeField(key, event) {
    if(key == 'application'){
      if(event.target.value != ''){
        this.setState({ messageSelect: 'Cargando tablas de la DB ...' })
        axios.post('http://localhost:4000/uploadData/getTablesDb', {
          idApplication : event.target.value
        }).then(response => {
          this.setState({ messageSelect : 'Seleccione' })
          this.setState({ nameDB        : response.data.message.name.nameDb })
          this.setState({ listSelect    : response.data.message.name.listTable })
        }).catch(function (error) {
          alert('Esta aplicacion no tiene datos de conexion a la DB validos');
        })
      }
    } else if(key == 'nameTable'){
      if(event.target.value != ''){
        //this.setState({ messageSelect: 'Cargando tablas de la DB ...' })
        axios.post('http://localhost:4000/uploadData/getRowTable', {
          idApplication : this.state.application,
          nameTableDb   : event.target.value
        }).then(response => {
          this.setState({ listRow : response.data.message.name })
        }).catch(function (error) {
          alert('Error al consultar las columnas de a tabla seleccionada');
        })
      }
    }

    this.setState({
      [key]: event.target.value,
    });
  }

  listOptionTables () {
    let nameDB = this.state.nameDB;
    return this.state.listSelect.map(function (object, i) {
      return (
        <option value={object['Tables_in_'+nameDB]}>{object['Tables_in_'+nameDB]}</option>
      )
    })
  }

  tabRow () {
    return this.state.listRow.map(function (object, i) {
      return (
        <tr>
          <td>{object.Field}</td>
          <td>{object.Type}</td>
          <td>{object.Null}</td>
          <td>{object.Key}</td>
          <td>{object.Default}</td>
          <td>
            Espacio campo seleccion dato
          </td>
        </tr>
      )
    })
  }

  render() {
    const { nameTable, application, fileTest, description, messageSelect } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="2" md="2"></Col>
          <Col xs="10" md="8">
            <Card>
              <CardHeader>
                <strong>Crear Cargue de Datos</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
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
                      <Label htmlFor="text-input">Tabla DB</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('nameTable', ev)}
                        value    = {nameTable}
                        type     = "select"
                      >
                        <option value="">{messageSelect}</option>
                        {this.listOptionTables()}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12">
                      <strong>Relacion Columnas</strong><hr/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12">
                      <Table responsive striped>
                        <thead>
                        <tr>
                          <th>Campo</th>
                          <th>Tipo</th>
                          <th>Null</th>
                          <th>Llave</th>
                          <th>Valor por defecto</th>
                          <th>Asignacion dato</th>
                        </tr>
                        </thead>
                        <tbody>
                          {this.tabRow()}
                        </tbody>
                      </Table>
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

export default CreateForm;
