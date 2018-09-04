import React, { Component } from 'react';

class SaveContainer extends Component {
  render() {
    const { stampList } = this.props;
    return (
      <div>
        <h2>적립중인 스탬프</h2>
        <div>{JSON.stringify(stampList)}</div>
      </div>
    );
  }
}

export default SaveContainer;
