import React from 'react';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';
import NoStamp from 'components/store/NoStamp';
import SwipeableViews from 'react-swipeable-views';
import './StampList.scss';

const StampList = ({ stampList }) => {
  if (stampList.length > 0) {
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
  }
  return <NoStamp />;
};

export default StampList;
