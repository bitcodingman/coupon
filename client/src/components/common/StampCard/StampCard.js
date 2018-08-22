import React from 'react';
import './StampCard.scss';

const StampCard = ({ stamp }) => {
  const stampArr = () => {
    const rows = [];

    for (let i = 1; i <= stamp.stampMaximum; i++) {
      rows.push(i);
    }

    return rows;
  };

  const stampList = stampArr();

  const newStampList = stampList.map(stamp => (
    <div key={stamp} className={`Stamp ${stampList.length >= 16 && 'small'}`}>
      <span>{stamp}</span>
    </div>
  ));

  return <div className="StampCard">{newStampList}</div>;
};

export default StampCard;
