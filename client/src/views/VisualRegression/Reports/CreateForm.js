import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap'
import axios from 'axios/index'
import Autocomplete from 'react-autocomplete'

class CreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      snapshots: [],
      value: '',
      snapshot: null
    }

    this.onSnapshotSelected = this.onSnapshotSelected.bind(this)
  }

  onSnapshotSelected () {
    const { state: { value, snapshots } } = this
    let snapshot
    snapshots.forEach(s => {
      const { name } = s
      if (name === value) snapshot = s
    })
    this.setState({ snapshot })
  }

  async componentDidMount () {
    const { data: snapshots } = await axios.get('http://localhost:4000/visualRegression')
    this.setState({
      snapshots
    })
  }

  render () {
    const { state: { snapshots, snapshot, value }, onSnapshotSelected } = this

    const selectValues = snapshots.map((s) => {
      const { name } = s
      return { label: name }
    })

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
                { !snapshots ? <h1>Cargando</h1> : <div>
                  <Autocomplete
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={(item) => item.label}
                    items={selectValues}
                    renderItem={(item, isHighlighted) =>
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                      </div>
                    }
                    value={value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={value => this.setState({ value })}
                  />
                  <Button onClick={onSnapshotSelected}>Ir</Button>
                </div>
              }
                { snapshot && snapshot.snapshots.map((s, index) => {
                  console.log(snapshot)
                  if (index !== 0) {
                    return (
                      <div key={index}>
                        <h2>{new Date(s).toDateString()}</h2>

                        <h3>Estado</h3>
                        <div className='row'>
                          <div className='col-sm-4'>
                            <h5>Electron</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/electron.png`} style={{width: '220px', height: '220px'}} />
                          </div>
                          <div className='col-sm-4'>
                            <h5>PhantomJS</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/phantom.png`} style={{width: '220px', height: '220px'}} />
                          </div>
                          <div className='col-sm-4'>
                            <h5>Cambios en navegador</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/browserDifferences.jpeg`} style={{width: '220px', height: '220px'}} />
                          </div>
                        </div>
                        <h3>Cambios en estado</h3>
                        <div className='row'>
                          <div className='col-sm-4'>
                            <h5>Electron</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/executions/${s}/electron.jpeg`} style={{width: '220px', height: '220px'}} />
                          </div>
                          <div className='col-sm-4'>
                            <h5>PhantomJS</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/executions/${s}/phantom.jpeg`} style={{width: '220px', height: '220px'}} />
                          </div>

                        </div>

                      </div>
                    )
                  } else {
                    return (
                      <div key={index}>
                        <h1>{snapshot.name}</h1>
                        <h2>{new Date(s).toDateString()}</h2>
                        <h3>Estado Inicial</h3>
                        <div className='row'>
                          <div className='col-sm-4'>
                            <h5>Electron</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/electron.png`} style={{width: '220px', height: '220px'}} />
                          </div>
                          <div className='col-sm-4'>
                            <h5>PhantomJS</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/phantom.png`} style={{width: '220px', height: '220px'}} />
                          </div>
                          <div className='col-sm-4'>
                            <h5>Cambios en navegador</h5>
                            <img src={`http://localhost:4000/static/vr_simple/${snapshot._id}/snapshots/${s}/browserDifferences.jpeg`} style={{width: '220px', height: '220px'}} />
                          </div>
                        </div>
                      </div>
                    )
                  }
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
