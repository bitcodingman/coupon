import React, { Component } from 'react';
import MakeStampBox from 'components/store/MakeStampBox';

class MakeStampContainer extends Component {
  state = {
    stampMaximum: 10,
    couponConfig: [],
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return <MakeStampBox makeStamp={this.state} onChange={this.handleChange} />;
  }
}

export default MakeStampContainer;
