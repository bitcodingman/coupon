import React from 'react';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';

const StampList = ({ stampList }) => {
  if (stampList.length > 0) {
    const newStampList = stampList.map(stamp => (
      <div key={stamp.stampId}>
        <StampCard stamp={stamp} />
        <StampInfo stamp={stamp} />
      </div>
    ));
    return newStampList;
  }
  return (
    <div>
      <h2>스탬프카드가 없습니다.</h2>
    </div>
  );
};

export default StampList;
