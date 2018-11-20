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
} from 'reactstrap';

class EmulatorAndroid extends Component {
  render () {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Emulador Android</strong>
              </CardHeader>
              <CardBody>
                <iframe src='http://localhost:6080/' width='100%' height='850px' frameborder='0' allowfullscreen='true' mozallowfullscreen='true' webkitallowfullscreen='true' scrolling="no" />
              </CardBody>
            </Card>
            </Col>
        </Row>
      </div>
    )
  }
}

export default EmulatorAndroid
