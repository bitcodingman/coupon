import React, { Component } from 'react';
import classNames from 'classnames';
import './MakeStampCard.scss';

class MakeStampCard extends Component {
  render() {
    const { makeStamp, onSelect } = this.props;

    const stampArr = () => {
      const rows = [];

      for (let i = 1; i <= makeStamp.stampMaximum; i++) {
        rows.push(i);
      }

      return rows;
    };

    const stampList = stampArr();

    const newStampList = stampList.map(stamp => {
      let itemImg;
      const couponArr = makeStamp.couponConfig.toJS();
      const couponConfig = couponArr.find(
        coupon => coupon.couponPublishTerm === stamp
      );
      if (stampList.length === stamp || couponConfig) {
        itemImg = true;
      }
      return (
        <div
          key={stamp}
          onClick={() => onSelect(stamp)}
          className={classNames(
            'Stamp',
            {
              small: stampList.length >= 16,
            },
            {
              active: itemImg,
            }
          )}
        >
          {!couponConfig ? (
            <span>{stamp}</span>
          ) : (
            <span>
              <i className={`icon-${couponConfig.itemImg}`} />
            </span>
          )}
        </div>
      );
    });

    return <div className="MakeStampCard">{newStampList}</div>;
  }
}

export default MakeStampCard;
