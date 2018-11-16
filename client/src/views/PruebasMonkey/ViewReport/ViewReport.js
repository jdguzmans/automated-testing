import React, { Component } from 'react'
import axios from 'axios'

class ViewReport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      s: []
    }
  }

  async componentDidMount () {
    const { data: { testingsE2E: { screenshotsLength } } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/randomTesting/${this.props.match.params.id}`)

    const s = []
    for (let i = 0; i < screenshotsLength; i++) {
      s.push(`${process.env.REACT_APP_FS_URL}/random/screenshot/${this.props.match.params.id}/${i + 1}.png`)
    }

    this.setState({
      s
    })
  }

  render () {
    return (
      <div>
        <iframe src={`${process.env.REACT_APP_FS_URL}/random/report/${this.props.match.params.id}.html`} width='100%' height='600px' frameborder='0' allowfullscreen='true' mozallowfullscreen='true' webkitallowfullscreen='true' />

        { this.state.s.map(url => {
          return (
            <div className='row'>
              <img src={url} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default ViewReport
