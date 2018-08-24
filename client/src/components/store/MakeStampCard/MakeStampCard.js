import React, { Component } from 'react';
import './MakeStampCard.scss';

class MakeStampCard extends Component {
  render() {
    const { stampMaximum } = this.props;

    const stampArr = () => {
      const rows = [];

      for (let i = 1; i <= stampMaximum; i++) {
        rows.push(i);
      }

      return rows;
    };

    const stampList = stampArr();

    const newStampList = stampList.map(stamp => (
      <div key={stamp} className={`Stamp ${stampList.length >= 16 && 'small'}`}>
        <label htmlFor={stamp}>
          {stamp}
          <input type="checkbox" name={stamp} id={stamp} />
        </label>
      </div>
    ));

    return <div className="MakeStampCard">{newStampList}</div>;
  }
}

export default MakeStampCard;
