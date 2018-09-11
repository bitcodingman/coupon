import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as baseActions from 'store/modules/base';
import * as consumerActions from 'store/modules/consumer';
import BarcodeBox from 'components/consumer/BarcodeBox';
import Button from 'components/common/Button';

class Base extends Component {
  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    const { BaseActions, history } = this.props;
    try {
      if (localStorage.logged === 'true') {
        BaseActions.tempLogin();
      }
      const auth = await BaseActions.checkLogin();
      if (auth.data.isErr) {
        localStorage.logged = 'false';
        history.push('/');
        return false;
      }
      const sessionData = JSON.parse(JSON.stringify(auth.data));
      return await BaseActions.setUser(sessionData);
    } catch (err) {
      return console.log(err);
    }
  };

  handleToggle = () => {
    const { ConsumerActions } = this.props;
    ConsumerActions.barcodeVisibility();
  };

  render() {
    const { userType, logged, user, barcodeView } = this.props;

    if (logged && userType === 0) {
      return (
        <div>
          <Button theme="barcode" onClick={this.handleToggle}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </Button>
          <BarcodeBox user={user} barcodeView={barcodeView} />
        </div>
      );
    }
    return null;
  }
}

export default compose(
  withRouter,
  connect(
    ({ base, consumer }) => ({
      logged: base.logged,
      userType: base.data.userType,
      storeInfo: base.storeInfo,
      user: base.data,
      barcodeView: consumer.barcodeView,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      ConsumerActions: bindActionCreators(consumerActions, dispatch),
    })
  )
)(Base);
