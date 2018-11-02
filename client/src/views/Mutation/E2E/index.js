
import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap'
import axios from 'axios/index'
import AceEditor from 'react-ace'

class CreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mutants: null,
      mutode: null
    }
  }

  async componentDidMount () {
    const { match: { params: { idTest, id } } } = this.props
    const { data: mutants } = await axios.get(`http://localhost:4000/static/mutation/e2e/${idTest}/${id}/mutants.log`)
    const { data: mutode } = await axios.get(`http://localhost:4000/static/mutation/e2e/${idTest}/${id}/mutode.log`)

    const mutodeMap = mutode.split('\n').filter(line => {
      return !line.startsWith('Mutode') && !line.startsWith('Creating') && !line.startsWith('Loading mutators...') &&
      !line.startsWith('Verifying') && !line.startsWith('Took') && !line.startsWith('Running mutants for') &&
      !line.startsWith('Deleting copies..')
    }).join('\n')

    this.setState({
      mutants,
      mutode: mutodeMap
    })
  }

  render () {
    const { mutants, mutode } = this.state

    if (!mutants || !mutode) return <div><h1>Cargando...</h1></div>
    else {
      return (
        <div className='animated fadeIn'>
          <Row>
            <Col xs='12' lg='12'>
              <Card>
                <CardHeader>
                  <i className='fa fa-align-justify' /> Editor Codigo Pruebas E2E
              </CardHeader>
                <CardBody>
                  <h1>Mutantes</h1>
                  <AceEditor
                    mode='typescript'
                    theme='monokai'
                    name='blah2'
                    width='100%'
                    height='550px'
                    onLoad={this.onLoad}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter
                    highlightActiveLine={false}
                    value={mutants}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2
                    }} />
                  <h1>Resultados</h1>
                  <AceEditor
                    mode='typescript'
                    theme='terminal'
                    name='blah2'
                    width='100%'
                    height='550px'
                    onLoad={this.onLoad}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter
                    highlightActiveLine={false}
                    value={mutode}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2
                    }} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

      )
    }
  }
}

export default CreateForm
