import React from 'react';
import './NoContent.scss';

const NoContent = ({ children }) => (
  <div className="NoContent">
    <div className="NoContentBox">{children}</div>
  </div>
);

export default NoContent;
