import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TabContainer, StampContainer, GuestContainer } from 'containers';

class StoreContainer extends Component {
  render() {
    const { stampList, tabSelected } = this.props;
    let el;
    if (tabSelected === 'stamp') {
      el = <StampContainer />;
    } else if (tabSelected === 'guest') {
      el = <GuestContainer />;
    }

    return (
      <Fragment>
        <TabContainer stampList={stampList} selected={tabSelected} />
        {el}
      </Fragment>
    );
  }
}

export default connect(({ store }) => ({
  tabSelected: store.tabSelected,
  stampList: store.stampList,
}))(StoreContainer);
