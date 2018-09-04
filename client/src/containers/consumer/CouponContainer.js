import React, { Component } from 'react';

class CouponContainer extends Component {
  render() {
    const { couponList } = this.props;
    return (
      <div>
        <h2>사용가능한 쿠폰</h2>
        <div>{JSON.stringify(couponList)}</div>
      </div>
    );
  }
}

export default CouponContainer;
