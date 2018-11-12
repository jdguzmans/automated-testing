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
  Table,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import axios from "axios/index";

class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameTable     : '',
      numRegister   : '',
      application   : '',
      fileTest      : '',
      description   : '',
      messageSelect : '',
      nameDB        : '',
      listSelect    : [],
      listRow       : [],
      serverports   : [],
      lisDataUpload : [],
      dataUpload    : [],
      modal         : false
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.configDataUpload = this.configDataUpload.bind(this);
    this.toggle = this.toggle.bind(this);

    this.configDataUpload();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleSubmit(){
    const { nameTable, application, numRegister, dataUpload } = this.state;
    const dataJson = JSON.stringify(dataUpload);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadData/save`, {
      nameTable,
      application,
      numRegister,
      dataJson
    } ).then(response => {
      this.setState({ message: 'Registro guardado con exito' });

      this.setState({
        modal: !this.state.modal,
      });
    }).catch(function (error) {
      alert(error);
    })
  }

  /* Metodos para cargar la lista de aplicaciones */
  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/application`)
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
  handleChangeField(key, event, keyRegister=null) {
    if(key == 'application'){
      if(event.target.value != ''){
        this.setState({ messageSelect: 'Cargando tablas de la DB ...' })
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadData/getTablesDb`, {
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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadData/getRowTable`, {
          idApplication : this.state.application,
          nameTableDb   : event.target.value
        }).then(response => {
          this.setState({ listRow : response.data.message.name })
        }).catch(function (error) {
          alert('Error al consultar las columnas de a tabla seleccionada');
        })
      }
    }

    if(keyRegister == null){
      this.setState({
        [key]: event.target.value,
      });
    } else {
      this.state.dataUpload.push({
        [keyRegister] : event.target.value
      });

    }
  }

  listOptionTables () {
    let nameDB = this.state.nameDB;
    return this.state.listSelect.map(function (object, i) {
      return (
        <option value={object['Tables_in_'+nameDB]}>{object['Tables_in_'+nameDB]}</option>
      )
    })
  }

  configDataUpload(){
    axios.get(`https://api.mockaroo.com/api/types.json?key=${process.env.REACT_APP_KEY_MOCKAROO}`)
      .then(response => {
        this.setState({ lisDataUpload: response.data.types });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  tabRow () {
    //alert(JSON.stringify(configDataUpload.dataUpload));
    let optionType = this.state.lisDataUpload.map((object, i) => {
      return <option value={object.name}>{object.name} {object.type}</option>
    })

    let optionTypeString = this.state.lisDataUpload.map((object, i) => {
      if(object.type == 'string' ){
        return <option value={object.name}>{object.name}</option>
      }
    })

    let optionTypeInteger = this.state.lisDataUpload.map((object, i) => {
      if(object.type == 'integer' || object.type == 'boolean'){
        return <option value={object.name}>{object.name}</option>
      }
    })

    let optionTypeBoolean = this.state.lisDataUpload.map((object, i) => {
      if(object.type == 'boolean' ){
        return <option value={object.name}>{object.name} {object.type}</option>
      }
    })

    let optionTypeFloat = this.state.lisDataUpload.map((object, i) => {
      if(object.type == 'float' ){
        return <option value={object.name}>{object.name} {object.type}</option>
      }
    })

    let optionTypeDatetime = this.state.lisDataUpload.map((object, i) => {
      if(object.type == 'datetime' ){
        return <option value={object.name}>{object.name}</option>
      }
    })

    return this.state.listRow.map((object, i) => {
      let selectTypeData = ''
      let options = '';

      if(object.Key != 'PRI'){
        switch(object.Type.split("(")[0]){
          case 'varchar':
          case 'text':
            options = optionTypeString
            break;
          case 'int':
          case 'smallint':
          case 'tinyint':
            options = optionTypeInteger
            break;
          case 'timestamp':
          case 'date':
          case 'datetime':
            options = optionTypeDatetime
            break
          case 'float':
            options = optionTypeFloat
            break
          default:
            options = optionType
            break;
        }

        selectTypeData =  <Input
                            onChange = {(ev) => this.handleChangeField('dataUpload', ev, object.Field)}
                            value    = {this.state.dataUpload[object.Field]}
                            type     = "select"
                          >
                            <option value="">Seleccione</option>
                            {options}
                          </Input>
      }

      return (
        <tr>
          <td>{object.Field}</td>
          <td>{object.Type}</td>
          <td>{object.Null}</td>
          <td>{object.Key}</td>
          <td>{object.Default}</td>
          <td>
            {selectTypeData}
          </td>
        </tr>
      )
    })
  }

  render() {
    const { nameTable, application, messageSelect, numRegister } = this.state;

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
                    <Col md="3">
                      <Label htmlFor="text-input">Numero registros</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange = {(ev) => this.handleChangeField('numRegister', ev)}
                        value    = {numRegister}
                        type     = "number"
                        min      = '1'
                      >
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
                <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;
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
