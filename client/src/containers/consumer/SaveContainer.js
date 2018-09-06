import React, { Component } from 'react';
import StampList from 'components/store/StampList';
import Background from 'components/common/Background';

class SaveContainer extends Component {
  render() {
    const { stampList, userType } = this.props;
    return (
      <div>
        <Background color="#6c5cce" />
        <StampList stampList={stampList} userType={userType} />
        <div>{JSON.stringify(stampList)}</div>
      </div>
    );
  }
}

export default SaveContainer;
