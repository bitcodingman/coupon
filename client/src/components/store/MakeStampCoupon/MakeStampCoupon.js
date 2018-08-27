import React from 'react';

const MakeStampCoupon = ({ coupon }) => (
  <div>
    <h3>{coupon.couponPublishTerm} 적립 시</h3>
    <div>
      <i className={`icon-${coupon.itemImg}`} />
      <p>{coupon.couponItemName} 쿠폰</p>
    </div>
  </div>
);

export default MakeStampCoupon;
