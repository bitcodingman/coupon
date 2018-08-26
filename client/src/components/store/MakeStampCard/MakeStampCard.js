import React, { Component } from 'react';
import './MakeStampCard.scss';

class MakeStampCard extends Component {
  render() {
    const { stampMaximum, onCheck } = this.props;

    const stampArr = () => {
      const rows = [];

      for (let i = 1; i <= stampMaximum; i++) {
        rows.push(i);
      }

      return rows;
    };

    const stampList = stampArr();

    const newStampList = stampList.map(stamp => (
      <div
        key={stamp}
        onClick={onCheck}
        className={`Stamp ${stampList.length >= 16 &&
          'small'} ${stampList.length === stamp && 'active'}`}
      >
        <span>{stamp}</span>
      </div>
    ));

    return <div className="MakeStampCard">{newStampList}</div>;
  }
}

export default MakeStampCard;
