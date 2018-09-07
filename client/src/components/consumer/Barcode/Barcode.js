import React from 'react';
import classNames from 'classnames';
import './Barcode.scss';

const Barcode = ({ barcode, barcodeView }) => {
  console.log('barcode');
  return (
    <div
      className={classNames('Barcode transitionSlow', {
        active: barcodeView,
      })}
    >
      <div className="barcodeBox">{barcode}</div>
    </div>
  );
};

export default Barcode;
