import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
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

class EditCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code : '',
    }

    this.handleSubmit      = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  }

  handleSubmit(){
    const { code } = this.state;
    alert(code);
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
                  mode="javascript"
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
