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
      snapshots: []
    }
  }

  async componentDidMount () {
    const { data: snapshots } = await axios.get('http://localhost:4000/visualRegression')
    this.setState({
      snapshots
    })
  }

  render () {
    const { snapshots } = this.state

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='2' md='3' />
          <Col xs='10' md='6'>
            <Card>
              <CardHeader>
                <strong>Reportes</strong>
              </CardHeader>
              <CardBody>
                {snapshots.map((snapshot, index) => {
                  const { name, snapshots, _id } = snapshot
                  return snapshots.map((s, index) => {
                    if (index !== 0) {
                      return (
                        <div key={index}>
                          <h2>{new Date(s).toDateString()}</h2>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <h3>Estado</h3>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/electron.png`} style={{width: '150px', height: '150px'}} />
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/phantom.png`} style={{width: '150px', height: '150px'}} />
                            </div>
                            <div className='col-sm-6'>
                              <h3>Cambios</h3>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/executions/${s}/electron.jpeg`} style={{width: '150px', height: '150px'}} />
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/executions/${s}/phantom.jpeg`} style={{width: '150px', height: '150px'}} />
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={index}>
                          <h1>{name}</h1>
                          <h2>{new Date(s).toDateString()}</h2>
                          <h3>Estado Inicial</h3>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/electron.png`} style={{width: '180px', height: '180px'}} />
                            </div>
                            <div className='col-sm-6'>
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/phantom.png`} style={{width: '180px', height: '180px'}} />
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
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
