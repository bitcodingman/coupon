import React, { Component } from 'react';
import Coupon from 'components/common/Coupon';

class CouponContainer extends Component {
  render() {
    const { couponList } = this.props;
    const nextCouponList = couponList.map(coupon => (
      <Coupon key={coupon.couponListId} coupon={coupon} />
    ));
    return <div>{nextCouponList}</div>;
  }
}

export default CouponContainer;
