import React from 'react';
import './StampInfo.scss';

const StampInfo = ({ stamp }) => {
  const configArr = stamp.couponConfig.map(coupon => (
    <li key={coupon.couponId}>
      스탬프 적립 {coupon.couponPublishTerm}개 - {coupon.couponItemName}
    </li>
  ));
  return (
    <ul className="StampInfo">
      <li>적립기준 - {stamp.stampTerm}</li>
      {configArr}
    </ul>
  );
};

export default StampInfo;
