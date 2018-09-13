import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContainer, SaveContainer, CouponContainer } from 'containers';
import * as consumerActions from 'store/modules/consumer';

class ConsumerContainer extends Component {
  componentDidMount() {
    const { ConsumerActions, userId } = this.props;
    ConsumerActions.getSavingStampList(userId);
    ConsumerActions.getCouponList(userId);
  }

  render() {
    const {
      tabSelected,
      stampList,
      stampListNo,
      couponList,
      couponListNo,
      userType,
    } = this.props;
    let el;
    if (tabSelected === 'stamp') {
      el = <SaveContainer stampList={stampList} userType={userType} />;
    } else if (tabSelected === 'coupon') {
      el = <CouponContainer couponList={couponList} />;
    }

    return (
      <Fragment>
        <TabContainer
          selected={tabSelected}
          stampListNo={stampListNo}
          couponListNo={couponListNo}
        />
        {el}
      </Fragment>
    );
  }
}

export default connect(
  ({ base, consumer }) => ({
    userId: base.data.userId,
    userType: base.data.userType,
    tabSelected: base.tabSelected,
    stampList: consumer.stampList,
    stampListNo: consumer.stampListNo,
    couponList: consumer.couponList,
    couponListNo: consumer.couponListNo,
  }),
  dispatch => ({
    ConsumerActions: bindActionCreators(consumerActions, dispatch),
  })
)(ConsumerContainer);
