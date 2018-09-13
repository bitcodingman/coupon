import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Title from 'components/store/Title';
import StampList from 'components/store/StampList';
import Button from 'components/common/Button';
import Background from 'components/common/Background';
import './StampContainer.scss';
import * as storeActions from 'store/modules/store';

class StampContainer extends Component {
  componentDidMount() {
    const { StoreActions, storeInfo } = this.props;
    StoreActions.getStampList(storeInfo.storeId);
    StoreActions.getSaveHistory(storeInfo.storeId);
  }

  shouldComponentUpdate(nextProps) {
    const { stampList } = this.props;
    return stampList !== nextProps.stampList;
  }

  handleLocation = () => {
    const { history } = this.props;
    history.push('/makestamp');
  };

  render() {
    const { storeInfo, stampList } = this.props;

    return (
      <div className="StampContainer">
        <Background color="#6c5cce" />
        <Title>{storeInfo.storeName}</Title>
        <StampList stampList={stampList} />
        <Button theme="highlight w80" onClick={this.handleLocation}>
          스탬프카드 만들기
        </Button>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ base, store }) => ({
      storeInfo: base.storeInfo,
      stampList: store.stampList,
    }),
    dispatch => ({
      StoreActions: bindActionCreators(storeActions, dispatch),
    })
  )
)(StampContainer);
