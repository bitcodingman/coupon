import React from 'react';
import './StampCard.scss';

const StampCard = ({ stampInfo }) => {
  const stampArr = () => {
    const rows = [];

    for (let i = 1; i <= stampInfo.stampMaximum; i++) {
      rows.push(i);
    }

    return rows;
  };

  const stampList = stampArr();

  const newStampList = stampList.map(stamp => {
    const coupon = stampInfo.couponConfig.find(
      coupon => coupon.couponPublishTerm === stamp
    );

    let el = stamp;

    if (coupon) {
      el = coupon.couponItemName;
    }

    return (
      <div key={stamp} className={`Stamp ${stampList.length >= 16 && 'small'}`}>
        <span>{el}</span>
      </div>
    );
  });

  return <div className="StampCard">{newStampList}</div>;
};

export default StampCard;
