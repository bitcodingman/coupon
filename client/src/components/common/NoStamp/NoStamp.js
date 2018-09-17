import React from 'react';
import classNames from 'classnames';
import './NoStamp.scss';

const NoStamp = ({ userType }) => {
  const arr = () => {
    const el = [];
    for (let i = 0; i < 10; i++) {
      el.push(
        <div key={i} className="Stamp">
          <span />
        </div>
      );
    }
    return el;
  };
  const NoStamp = arr();
  return (
    <div
      className={classNames('NoStamp', {
        margin: userType === 0,
      })}
    >
      <div className="NoStampCard">{NoStamp}</div>
      <h2>
        {userType === 0 && '적립중인 '}
        스탬프가 없습니다
      </h2>
    </div>
  );
};

export default NoStamp;
