import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap'
import axios from 'axios/index'

class CreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      snapshots: []
    }

    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { name, application, fileTest, description } = this.state

    axios.post('http://localhost:8000/api/testingE2E', {
      name,
      application,
      fileTest,
      description
    })
    alert('Datos guardados')
  }

  handleChangeField (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  async handleExecute (snapshotId) {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/visualRegression/execute`, {
      _id: snapshotId
    })
    alert('listo')
  }

  async componentDidMount () {
    const { data: snapshots } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/visualRegression`)
    this.setState({
      snapshots
    })
  }

  render () {
    const { handleExecute } = this
    const { snapshots } = this.state

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='2' md='3' />
          <Col xs='10' md='6'>
            <Card>
              <CardHeader>
                <strong>Ejecutar snapshot</strong>
              </CardHeader>
              <CardBody>
                {snapshots.map((snapshot, index) => {
                  const { name, _id } = snapshot
                  return (
                    <div key={index}>
                      <h1>{name}</h1> <button onClick={() => { handleExecute(_id) }}>Ejecutar</button>
                    </div>)
                })}
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateForm
