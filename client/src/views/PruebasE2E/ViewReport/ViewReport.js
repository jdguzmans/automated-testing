import React, { Component } from 'react';

class ViewReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe src={'http://localhost:4000/'+this.props.match.params.id+'.html'} width='100%' height='600px' frameborder="0"/>
    );
  }
}

export default ViewReport;
