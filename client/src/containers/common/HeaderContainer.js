import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as baseActions from 'store/modules/base';
import * as consumerActions from 'store/modules/consumer';
import * as storeActions from 'store/modules/store';
import Header from 'components/common/Header';

class HeaderContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { base } = this.props;
    return nextProps.base !== base;
  }

  handleLogout = async () => {
    const {
      BaseActions,
      ConsumerActions,
      StoreActions,
      userType,
      history,
    } = this.props;
    try {
      if (userType === 0) {
        await ConsumerActions.init();
      } else {
        await StoreActions.init();
      }
      await BaseActions.logout();
      localStorage.logged = 'false';
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { logged } = this.props;
    return <Header logged={logged} onLogout={this.handleLogout} />;
  }
}

export default compose(
  withRouter,
  connect(
    ({ base }) => ({
      base,
      userType: base.data.userType,
      logged: base.logged,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      ConsumerActions: bindActionCreators(consumerActions, dispatch),
      StoreActions: bindActionCreators(storeActions, dispatch),
    })
  )
)(HeaderContainer);
