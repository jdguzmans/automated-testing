import React, { Component } from 'react'

class ViewReport extends Component {
  render () {
    return (
      <iframe src={`${process.env.REACT_APP_BACKEND_URL}/${this.props.match.params.id}.html`} width='100%' height='600px' frameborder='0' />
    )
  }
}

export default ViewReport
