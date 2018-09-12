import React, { Component } from 'react';
import { MakeStampContainer } from 'containers';

class MakeStamp extends Component {
  render() {
    const { match } = this.props;
    return <MakeStampContainer modify={match.params} />;
  }
}

export default MakeStamp;
