import React from 'react';
import differenceInDays from 'date-fns/difference_in_days';
import './Coupon.scss';

const Coupon = ({ coupon }) => (
  <div className="Coupon">
    <div className="couponImg">
      <i className={`icon-${coupon.itemImg}`} />
    </div>
    <div className="couponItem">
      <p>{coupon.storeName}</p>
      <span className="date">
        쿠폰 사용기간이 {differenceInDays(coupon.couponFinishDate, new Date())}{' '}
        일 남았습니다.
      </span>
      <span className="marker">{coupon.couponItemName}</span>
    </div>
  </div>
);

export default Coupon;
