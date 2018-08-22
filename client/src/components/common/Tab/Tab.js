import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tab.scss';

const TabItem = ({ children, tab, count }) => (
  <NavLink to={`/store/${tab}`} className="TabItem">
    <p>{children}</p>
    <h3>
      {!count ? '0' : count.length}
      <span>{tab === 'stamp' ? '개' : '명'}</span>
    </h3>
  </NavLink>
);

const Tab = ({ stampList }) => (
  <div className="Tab">
    <TabItem tab="stamp" count={stampList}>
      우리매장 스탬프
    </TabItem>
    <TabItem tab="guest">적립중인 회원</TabItem>
  </div>
);

export default Tab;
