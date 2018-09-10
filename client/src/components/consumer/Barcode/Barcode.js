import React from 'react';
import classNames from 'classnames';
import './Barcode.scss';

const Barcode = ({ user, barcodeView }) => (
  <div
    className={classNames('Barcode transitionSlow', {
      active: barcodeView,
    })}
  >
    <div className="barcodeBox">
      <h2>{user.name} 님의 바코드</h2>
      <p>
        {/* {user.barcode} */}
        7650 4710 0513
      </p>
    </div>
  </div>
);

export default Barcode;
