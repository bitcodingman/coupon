import React, { Component } from 'react';
import Coupon from 'components/common/Coupon';
import NoContent from 'components/common/NoContent';

class CouponContainer extends Component {
  render() {
    const { couponList } = this.props;

    if (!couponList) {
      return <NoContent>적립중인 쿠폰이 없습니다.</NoContent>;
    }

    const nextCouponList = couponList.map(coupon => (
      <Coupon key={coupon.couponListId} coupon={coupon} />
    ));
    return <div>{nextCouponList}</div>;
  }
}

export default CouponContainer;
