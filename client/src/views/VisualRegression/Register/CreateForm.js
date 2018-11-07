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
  Row
} from 'reactstrap'
import axios from 'axios/index'

class CreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      url: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit () {
    const { name, url } = this.state

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/visualRegression/createSnapshot`, {
        name,
        url
      })
      alert('Datos guardados')
    } catch (e) {
      alert('Error')
    }
  }

  handleChangeField (key, event) {
    this.setState({
      [key]: event.target.value
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
    const { name, url } = this.state

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='2' md='3' />
          <Col xs='10' md='6'>
            <Card>
              <CardHeader>
                <strong>Registrar estado</strong>
              </CardHeader>
              <CardBody>
                <Form action='' method='post' encType='multipart/form-data' className='form-horizontal'>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Nombre del estado</Label>
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
                      <Label htmlFor='select'>URL</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input
                        onChange={(ev) => this.handleChangeField('url', ev)}
                        value={url}
                        type='text'
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type='submit' size='sm' color='primary'><i className='fa fa-dot-circle-o' /> Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateForm
