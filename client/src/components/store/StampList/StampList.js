import React from 'react';
import format from 'date-fns/format';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';
import NoStamp from 'components/store/NoStamp';
import SwipeableViews from 'react-swipeable-views';
import './StampList.scss';

const StampList = ({ stampList, userType }) => {
  if (!stampList || stampList.length <= 0) {
    return <NoStamp />;
  }

  const newStampList = stampList.map(stampInfo => {
    let saveSum = 0;
    if (userType === 0 && stampInfo.saveHistory) {
      stampInfo.saveHistory.map(save => {
        saveSum += save.stampSaveNo;
        return saveSum;
      });
    }
    return (
      <div key={stampInfo.stampId}>
        {userType === 0 && (
          <div className="storeInfo">
            <h3>{stampInfo.storeName}</h3>
            <div className="stampSave">
              {`${saveSum} / ${stampInfo.stampMaximum}`}
            </div>
            <div className="date">
              유효기간 : {format(stampInfo.stampPublishDate, 'YYYY-MM-DD')} ~{' '}
              {format(stampInfo.stampFinishDate, 'YYYY-MM-DD')}
            </div>
          </div>
        )}
        <div className="stampWrap">
          <StampCard
            stampMaximum={stampInfo.stampMaximum}
            couponConfig={stampInfo.couponConfig}
          />
          <StampInfo stampInfo={stampInfo} />
        </div>
      </div>
    );
  });
  return (
    <SwipeableViews
      resistance
      enableMouseEvents
      className="StampList"
      slideClassName="swipe"
    >
      {newStampList}
    </SwipeableViews>
  );
};

export default StampList;
