import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from 'components/common/Tab';

class TabContainer extends Component {
  render() {
    const { stampList, visible } = this.props;
    if (!visible) return null;
    return <Tab stampList={stampList} />;
  }
}

export default connect(({ base }) => ({
  visible: base.tab,
}))(TabContainer);
