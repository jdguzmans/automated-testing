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

class StartTesting extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Lista Pruebas E2E
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
                    <th>Nombre Prueba</th>
                    <th>Aplicacion</th>
                    <th>Editar</th>
                    <th>Ejecutar</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Crear Usuario</td>
                    <td>Chiper</td>
                    <td><i className="icon-pencil icons d-block mt-1"></i></td>
                    <td><i className="icon-control-play icons d-block mt-1"></i></td>
                  </tr>
                  <tr>
                    <td>Iniciar sesion</td>
                    <td>Chiper</td>
                    <td><i className="icon-pencil icons d-block mt-1"></i></td>
                    <td><i className="icon-control-play icons d-block mt-1"></i></td>
                  </tr>
                  <tr>
                    <td>Lista Productos</td>
                    <td>Chiper</td>
                    <td><i className="icon-pencil icons d-block mt-1"></i></td>
                    <td><i className="icon-control-play icons d-block mt-1"></i></td>
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

export default StartTesting;
