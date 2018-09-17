import React, { Component } from 'react';
import classNames from 'classnames';
import './StampCard.scss';

class StampCard extends Component {
  handleTooltip = e => {
    const tooltip = e.currentTarget.querySelector('.tooltip');

    if (tooltip.classList.contains('active')) {
      tooltip.classList.remove('active');
    } else {
      const all = document.querySelectorAll('.tooltip');
      for (let i = 0; i < all.length; i++) {
        all[i].classList.remove('active');
      }
      tooltip.classList.add('active');
    }
  };

  render() {
    const { stampMaximum, couponConfig, saveSum } = this.props;

    const stampArr = () => {
      const rows = [];

      for (let i = 1; i <= stampMaximum; i++) {
        rows.push(i);
      }

      return rows;
    };

    const stampList = stampArr();

    const newStampList = stampList.map(stamp => {
      const coupon = couponConfig.find(
        coupon => coupon.couponPublishTerm === stamp
      );

      let el = <span>{stamp}</span>;

      if (stamp <= saveSum) {
        el = <span className="save" />;
      }

      if (coupon && stamp <= saveSum) {
        el = (
          <span className="saveCoupon" onClick={this.handleTooltip}>
            <i className={`icon-${coupon.itemImg}`} />
            <div className="transition tooltip">{coupon.couponItemName}</div>
          </span>
        );
      }

      if (coupon && stamp > saveSum) {
        el = (
          <span onClick={this.handleTooltip}>
            <i className={`icon-${coupon.itemImg}`} />
            <div className="transition tooltip">{coupon.couponItemName}</div>
          </span>
        );
      }

      return (
        <div
          key={stamp}
          className={classNames('Stamp', {
            small: stampList.length >= 16,
          })}
        >
          {el}
        </div>
      );
    });

    return <div className="StampCard">{newStampList}</div>;
  }
}

export default StampCard;
