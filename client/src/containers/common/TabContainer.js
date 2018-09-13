import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import Tab from 'components/common/Tab';

class TabContainer extends Component {
  handleSelect = tab => {
    const { BaseActions } = this.props;
    BaseActions.tabSelect(tab);
  };

  render() {
    const {
      stampListNo,
      couponListNo,
      visible,
      selected,
      userType,
      saveUserNo,
    } = this.props;
    if (!visible) return null;
    return (
      <Tab
        userType={userType}
        selected={selected}
        stampListNo={stampListNo}
        saveUserNo={saveUserNo}
        couponListNo={couponListNo}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default connect(
  ({ base }) => ({
    visible: base.tab,
    userType: base.data.userType,
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(TabContainer);
