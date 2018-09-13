import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TabContainer, StampContainer, HistoryContainer } from 'containers';

class StoreContainer extends Component {
  render() {
    const { stampListNo, tabSelected, saveUserNo } = this.props;
    let el;
    if (tabSelected === 'stamp') {
      el = <StampContainer />;
    } else if (tabSelected === 'consumer') {
      el = <HistoryContainer />;
    }

    return (
      <Fragment>
        <TabContainer
          stampListNo={stampListNo}
          saveUserNo={saveUserNo}
          selected={tabSelected}
        />
        {el}
      </Fragment>
    );
  }
}

export default connect(({ store, base }) => ({
  tabSelected: base.tabSelected,
  stampListNo: store.stampListNo,
  saveUserNo: store.saveUserNo,
}))(StoreContainer);
