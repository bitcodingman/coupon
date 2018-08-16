import React from 'react';
import './StampCard.scss';

const StampCard = ({ stampCard }) => {
  const stampArr = () => {
    const rows = [];

    for (let i = 1; i <= stampCard.stampMaximum; i++) {
      rows.push(i);
    }

    return rows;
  };

  const stampList = stampArr();

  const newStampList = stampList.map(stamp => (
    <div key={stamp} className="Stamp">
      <span>{stamp}</span>
    </div>
  ));

  return <div className="StampCard">{newStampList}</div>;
};

export default StampCard;
