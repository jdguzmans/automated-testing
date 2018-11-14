import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import axios from "axios/index";

class StartUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {serverports: [],listApplication: [], modal : false, message : ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleSubmit(idRegister){
    let stateModal = this.state.modal;
    this.setState(
      { message: 'Se inicia el cargue de la informacion a la DB. Por favor espere' }
    );

    this.setState({
      modal: !stateModal,
    });

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadData/start`, {
      idRegister : idRegister
    })
      .then(response => {
        this.setState(
          { message: 'Cargue de la informacion finalizada' }
        );

        this.setState({
          modal: !stateModal,
        });

      })
      .catch( (error) => {
        this.setState(
          { message: 'Se presento un error al realizar el cargue de la informacion' }
        );

        this.setState({
          modal: !stateModal,
        });

      });
  }
  // LISTA DE PRUEBAS REGISTRADAS
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/application`)
      .then(response => {
        this.setState({ listApplication: response.data.applications });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/uploadData`)
      .then(response => {
        this.setState({ serverports: response.data.uploadDatas })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  lisApplications(){
    let applications = new Array();
    this.state.listApplication.map(function(object, i){
      applications[object._id] = object.name;
    });
    return applications;
  }

  tabRow(){
    const applications = this.lisApplications();

    return this.state.serverports.map((object, i) => {
      return (
        <tr>
          <td>{object.nameTable}</td>
          <td>{applications[object.application] }</td>
          <td>{object.numRegister}</td>
          <td>
            <Button onClick={() => this.handleSubmit(object._id)} type="submit" color="primary">
              <i className="icon-control-play icons d-block mt-1"></i>
            </Button>
          </td>
        </tr>
      );
    });
  }
  render() {
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
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Lista Pruebas E2E
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Nombre Tabla</th>
                    <th>Aplicacion</th>
                    <th>Numero registros</th>
                    <th>Ejecutar</th>
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

    );
  }
}

export default StartUpload;
