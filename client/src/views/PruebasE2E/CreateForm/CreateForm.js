import React, { Component } from 'react'
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
} from 'reactstrap'
import axios from 'axios/index'

class CreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      application: '',
      description: '',
      message: '',
      serverports: []
    }

    this.idRegister = this.props.match.params.id

    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearField = this.clearField.bind(this)
    this.toggle = this.toggle.bind(this)
    this.getData = this.getData.bind(this)

    if (this.idRegister !== undefined) {
      this.getData()
    }
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  getData () {
    const register = {
      name: this.idRegister
    }

    axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/testingE2E/${this.idRegister}`
    ).then(response => {
      this.setState({
        name: response.data.testingsE2E.name,
        application: response.data.testingsE2E.application,
        description: response.data.testingsE2E.description
      })
    }).catch(function (error) {
      alert('Error al cargar la informaciom')
    })
  }

  clearField () {
    this.setState({
      name: '',
      application: '',
      description: ''
    })
  }

  handleSubmit () {
    const { name, application, description } = this.state

    if (this.idRegister !== undefined) {
      axios.patch(`${process.env.REACT_APP_BACKEND_URL}/testingE2E/${this.idRegister}`, {
        name,
        application,
        description
      }).then(response => {
        this.setState({ message: 'Actualizacion realizada con exito' })

        this.setState({
          modal: !this.state.modal
        })
      }).catch(function (error) {
        alert(error)
      })
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/testingE2E`, {
        name,
        application,
        description
      }).then(response => {
        this.setState({ message: 'Registro guardado con exito' })

        this.setState({
          modal: !this.state.modal
        })
      }).catch(function (error) {
        alert(error)
      })
    }
  }

  handleChangeField (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

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

  render () {
    const { name, application, description } = this.state

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
          <Col xs='2' md='3' />
          <Col xs='10' md='6'>
            <Card>
              <CardHeader>
                <strong>Crear Pruebas E2E</strong>
              </CardHeader>
              <CardBody>
                <Form action='' method='post' encType='multipart/form-data' className='form-horizontal'>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Nombre Prueba</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input
                        onChange={(ev) => this.handleChangeField('name', ev)}
                        value={name}
                        type='text'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='select'>Aplicacion</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input
                        onChange={(ev) => this.handleChangeField('application', ev)}
                        value={application}
                        type='select'
                      >
                        <option value=''>Seleccione</option>
                        {this.listOption()}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='textarea-input'>Descripcion</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input
                        onChange={(ev) => this.handleChangeField('description', ev)}
                        value={description}
                        type='textarea'
                        rows='9'
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type='submit' size='sm' color='primary'><i className='fa fa-dot-circle-o' /> Submit</Button>{' '}
                <Button onClick={this.clearField} type='reset' size='sm' color='danger'><i className='fa fa-ban' /> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateForm
