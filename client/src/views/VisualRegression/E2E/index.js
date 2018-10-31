
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
    console.log(props)
    this.state = {
      snapshots: []
    }
  }

  async componentDidMount () {
    const { match: { params: { id } } } = this.props
    const { data: snapshots } = await axios.get(`http://localhost:4000/visualRegression/e2e/${id}`)
    this.setState({
      snapshots
    })
  }

  render () {
    const { snapshots } = this.state

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='2' md='1' />
          <Col xs='10' md='10'>
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

                          <h3>Estado</h3>
                          <div className='row'>
                            <div className='col-sm-4'>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/electron.png`} style={{width: '220px', height: '220px'}} />
                            </div>
                            <div className='col-sm-4'>
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/phantom.png`} style={{width: '220px', height: '220px'}} />
                            </div>
                            <div className='col-sm-4'>
                              <h5>Cambios en navegador</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/browserDifferences.jpeg`} style={{width: '220px', height: '220px'}} />
                            </div>
                          </div>
                          <h3>Cambios en estado</h3>
                          <div className='row'>
                            <div className='col-sm-4'>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/executions/${s}/electron.jpeg`} style={{width: '220px', height: '220px'}} />
                            </div>
                            <div className='col-sm-4'>
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/phantom.png`} style={{width: '220px', height: '220px'}} />
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
                            <div className='col-sm-4'>
                              <h5>Electron</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/electron.png`} style={{width: '220px', height: '220px'}} />
                            </div>
                            <div className='col-sm-4'>
                              <h5>PhantomJS</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/phantom.png`} style={{width: '220px', height: '220px'}} />
                            </div>
                            <div className='col-sm-4'>
                              <h5>Cambios en navegador</h5>
                              <img src={`http://localhost:4000/static/${_id}/snapshots/${s}/browserDifferences.jpeg`} style={{width: '220px', height: '220px'}} />
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
