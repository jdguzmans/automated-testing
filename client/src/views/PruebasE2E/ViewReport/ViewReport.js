import React, { Component } from 'react'

class ViewReport extends Component {
  render () {
    return (
      <iframe src={`${process.env.REACT_APP_FS_URL}/e2e/report/${this.props.match.params.id}.html`} width='100%' height='600px' frameborder='0' allowfullscreen='true' mozallowfullscreen='true' webkitallowfullscreen='true' />
    )
  }
}

export default ViewReport
