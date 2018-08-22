import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from 'components/store/Title';
import StampList from 'components/store/StampList';
import './StampContainer.scss';

class StampContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { stampList } = this.props;
    return stampList !== nextProps.stampList;
  }

  render() {
    const { storeInfo, stampList } = this.props;

    return (
      <div className="StampContainer">
        <Title>{storeInfo.storeName}</Title>
        <StampList stampList={stampList} />
      </div>
    );
  }
}

export default connect(({ base, store }) => ({
  storeInfo: base.storeInfo,
  stampList: store.stampList,
}))(StampContainer);
