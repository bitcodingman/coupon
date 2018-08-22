import React from 'react';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';
import NoStamp from 'components/store/NoStamp';
import SwipeableViews from 'react-swipeable-views';
import './StampList.scss';

const StampList = ({ stampList }) => {
  if (!stampList || stampList.length <= 0) {
    return <NoStamp />;
  }

  const newStampList = stampList.map(stamp => (
    <div key={stamp.stampId} className="StampWrap">
      <StampCard stamp={stamp} />
      <StampInfo stamp={stamp} />
    </div>
  ));
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
