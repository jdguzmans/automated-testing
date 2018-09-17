import React, { Component } from 'react';
import axios from 'axios';
import chrome from '../../../../src/assets/img/navegador/chrome.png';
import firefox from '../../../../src/assets/img/navegador/firefox.png';
import opera from '../../../../src/assets/img/navegador/opera.png';
import explorer from '../../../../src/assets/img/navegador/explorer.png';

import {
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Input,
  Row,
  Table
} from 'reactstrap';

class MatrizTest extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Matriz de Pruebas
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th colspan='5'>MATRIZ DE PRUEBAS</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <th>Navegador</th>
                        <th>
                            <Input type="radio" name="navegador" value='chrome'/>
                            <img src={chrome} width='80px'/>
                        </th>
                        <th>
                          <Input type="radio" name="navegador" value='firefox'/>
                          <img src={firefox} width='80px'/>
                        </th>
                        <th>
                          <Input type="radio" name="navegador" value='opera'/>
                          <img src={opera} width='80px'/>
                        </th>
                        <th>
                          <Input type="radio" name="navegador" value='explorer'/>
                          <img src={explorer} width='80px'/>
                        </th>
                    </tr>
                    <tr>
                        <th>Tamaño Pantalla</th>
                        <th>
                          <Input type="radio" name="pantalla" value='414x736 '/>
                          414 x 736
                        </th>
                        <th>
                          <Input type="radio" name="pantalla" value='800x1280'/>
                          800 x 1280
                        </th>
                        <th>
                          <Input type="radio" name="pantalla" value='1024x600'/>
                          1024 x 600
                        </th>
                        <th>
                          <Input type="radio" name="pantalla" value='1280x800'/>
                          1280 x 800
                        </th>
                    </tr>

                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                  <Button type="submit" size="sm" color="primary" >
                    <i className="fa fa-dot-circle-o"></i> Ejecutar
                  </Button>&nbsp;
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Regresar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default MatrizTest;
