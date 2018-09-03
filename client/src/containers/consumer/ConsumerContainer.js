import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TabContainer, SaveContainer, CouponContainer } from 'containers';

class ConsumerContainer extends Component {
  render() {
    const { tabSelected } = this.props;
    let el;
    if (tabSelected === 'stamp') {
      el = <SaveContainer />;
    } else if (tabSelected === 'coupon') {
      el = <CouponContainer />;
    }

    return (
      <Fragment>
        <TabContainer selected={tabSelected} />
        {el}
      </Fragment>
    );
  }
}

export default connect(({ base }) => ({
  tabSelected: base.tabSelected,
}))(ConsumerContainer);
