import React, { Component } from 'react';

import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
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
                <FormGroup row>
                  <Col md="6">
                    <InputGroup>
                      <Input type="email" id="input2-group2" name="input2-group2" placeholder="Aplicacion" />
                      <InputGroupAddon addonType="append">
                        <Button type="button" color="primary">Submit</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
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
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default ListReport;
