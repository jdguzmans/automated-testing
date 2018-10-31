
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
      snapshots: null,
      testId: null
    }
  }

  async componentDidMount () {
    const { match: { params: { idTest, id } } } = this.props
    const { data: { snapshots, testId } } = await axios.get(`http://localhost:4000/visualRegression/byIds/${idTest}/${id}`)
    this.setState({
      snapshots,
      testId
    })
  }

  render () {
    const { snapshots, testId } = this.state

    if (!snapshots && !testId) return <div><h1>Cargando...</h1></div>
    else if (!snapshots.sn2) return <div><h1>Sobre esto no hay Regresión</h1></div>
    else {
      const { sn1: { pictures: pics1, report: r1, time: t1 }, sn2: { pictures: pics2, report: r2, time: t2 } } = snapshots

      const pics = pics2.length > pics1.length ? pics2 : pics1

      return (
        <div className='animated fadeIn'>
          <Row>
            <Col xs='2' md='1' />
            <Col xs='10' md='10'>
              <Card>
                <CardHeader>
                  <strong>Reportes de Regresión Visual</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs='4' md='4'>
                      <h1>Estado anterior</h1>
                      <h2>{new Date(t2).toDateString()}</h2>
                    </Col>
                    <Col xs='4' md='4'>
                      <h1>Estado actual</h1>
                      <h2>{new Date(t1).toDateString()}</h2>
                    </Col>
                    <Col xs='4' md='4'>
                      <h1>Cambios</h1>
                    </Col>
                  </Row>
                  { pics.map((p, i) => {
                    return (
                      <div>
                        <Row>
                          <Col xs='4' md='4' />
                          <Col xs='8' md='8'>
                            <h1>Screenshot {i}</h1>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs='4' md='4'>
                            <img key={`1${i}`} src={`http://localhost:4000/static/vr/e2e/${testId}/snapshots/${r2}/${pics2[i]}`} style={{width: '220px', height: '220px'}} />
                          </Col>
                          <Col xs='4' md='4'>
                            <img key={`2${i}`} src={`http://localhost:4000/static/vr/e2e/${testId}/snapshots/${r1}/${pics1[i]}`} style={{width: '220px', height: '220px'}} />
                          </Col>
                          <Col xs='4' md='4'>
                            <img key={`3${i}`} src={`http://localhost:4000/static/vr/e2e/${testId}/executions/${r1}/${pics2[i]}`} style={{width: '220px', height: '220px'}} />
                          </Col>
                        </Row>
                      </div>
                    )
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
}

export default CreateForm
