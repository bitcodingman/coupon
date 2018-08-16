import React from 'react';
import './StampInfo.scss';

const StampInfo = ({ stampCard }) => (
  <div className="StampInfo">
    <div>{JSON.stringify(stampCard)}</div>
  </div>
);

export default StampInfo;
