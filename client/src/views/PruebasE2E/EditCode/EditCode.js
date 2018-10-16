import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/typescript';
import 'brace/theme/terminal';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button
} from 'reactstrap';
import axios from "axios/index";

class EditCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code : 'import { Selector } from \'testcafe\';\n' +
      'import config from \'../config\';\n' +
      '\n' +
      'fixture `My Fixture`\n' +
      '    .beforeEach( async t => {\n' +
      '        await t.resizeWindow(\n' +
      '            config.resizeWindow.width,\n' +
      '            config.resizeWindow.height\n' +
      '        );\n' +
      '    })\n' +
      '    .page (config.baseUrl);\n' +
      '\n' +
      '// Espacio para digitar el caso de prueba',
    }

    this.idRegister = this.props.match.params.id;

    this.handleSubmit      = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.getData = this.getData.bind(this);

    if(this.idRegister !== undefined) {
      this.getData();
    }
  }

  getData(){
    axios.get(
      'http://localhost:4000/testingE2E/dataCode/'+this.idRegister
    ).then(response => {
      if(response.data.result !== undefined){
        this.setState({
          code : response.data.result
        });
      }
    }).catch(function (error) {
      alert('Error al cargar la informacion');
    })
  }

  handleSubmit(){
    const { code } = this.state;

    axios.patch(
      'http://localhost:4000/testingE2E/dataCode/'+this.idRegister, {code}
    ).then(response => {
      alert('Codigo guardado con exito');
      /*this.setState({ message: 'Codigo guardado con exito' });

      this.setState({
        modal: !this.state.modal,
      });*/
    }).catch(function (error) {
      alert('Error al guardar el codigo');
    })
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event,
    });
  }

  render() {
    const { code } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Editor Codigo Pruebas E2E
              </CardHeader>
              <CardBody>
                <AceEditor
                  onChange = {(ev) => this.handleChangeField('code', ev)}
                  mode="typescript"
                  theme="terminal"
                  name="blah2"
                  width = '100%'
                  height = '550px'
                  onLoad={this.onLoad}
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={false}
                  value={code}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}/>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>{' '}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default EditCode;
