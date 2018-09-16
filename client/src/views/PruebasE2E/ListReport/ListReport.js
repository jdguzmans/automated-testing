import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Pagination, PaginationItem, PaginationLink,Table
} from 'reactstrap';

class ListReport extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Lista Reportes Pruebas E2E
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Reporte</th>
                    <th>Aplicacion</th>
                    <th>Fecha</th>
                    <th>Link</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Test1</td>
                    <td>Chiper</td>
                    <td>14/09/2018</td>
                    <td><i className="icon-docs icons d-block mt-1"></i></td>
                  </tr>
                  <tr>
                    <td>Test2</td>
                    <td>Chiper</td>
                    <td>14/09/2018</td>
                    <td><i className="icon-docs icons d-block mt-1"></i></td>
                  </tr>
                  <tr>
                    <td>Test3</td>
                    <td>Chiper</td>
                    <td>14/09/2018</td>
                    <td><i className="icon-docs icons d-block mt-1"></i></td>
                  </tr>
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

export default ListReport;
