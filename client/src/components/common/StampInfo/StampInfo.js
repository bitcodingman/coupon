import React from 'react';
import { Link } from 'react-router-dom';
import './StampInfo.scss';
import { FiSettings } from 'react-icons/fi';

const StampInfo = ({ stampInfo, userType }) => {
  if (userType === 0) {
    return (
      <div className="StampInfo consumer">
        <ul className="StampInfoList">
          <li>
            <p>매장 연락처</p>
            <span>{stampInfo.storePhone}</span>
          </li>
          <li>
            <p>매장 주소</p>
            <span>
              {`${stampInfo.addressSi} 
							${stampInfo.addressGu} 
							${stampInfo.addressDong} 
							${stampInfo.addressDetail}`}
            </span>
          </li>
          <li>
            <p>적립기준</p>
            <span>{stampInfo.stampTerm}</span>
          </li>
        </ul>
      </div>
    );
  }

  const configArr = stampInfo.couponConfig.map(coupon => (
    <div key={coupon.couponId}>
      {coupon.couponPublishTerm}개 - {coupon.couponItemName}
    </div>
  ));

  return (
    <div className="StampInfo">
      <ul className="StampInfoList">
        <li>
          <p>적립기준</p>
          <span>{stampInfo.stampTerm}</span>
        </li>
        <li>
          <p>쿠폰 설정</p>
          {configArr}
        </li>
      </ul>
      <Link to={`/makestamp/${stampInfo.stampId}`} className="StampModify">
        <FiSettings />
      </Link>
    </div>
  );
};

export default StampInfo;
