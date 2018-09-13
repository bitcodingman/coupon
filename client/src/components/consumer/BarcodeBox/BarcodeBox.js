import React from 'react';
import Barcode from 'react-barcode';
import classNames from 'classnames';
import './BarcodeBox.scss';

const BarcodeBox = ({ user, barcodeView }) => (
  <div
    className={classNames('Barcode transitionSlow', {
      active: barcodeView,
    })}
  >
    <div className="barcodeBox">
      <h2>{user.name} 님의 바코드</h2>
      <Barcode value={user.barcode} width={1.5} height={80} font="Roboto" />
    </div>
  </div>
);

export default BarcodeBox;
