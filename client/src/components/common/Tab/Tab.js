import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tab.scss';

const TabItem = ({ children, tab }) => (
  <NavLink to={`/store/${tab}`} className="TabItem">
    <p>{children}</p>
    <h3>
      3<span>개</span>
    </h3>
  </NavLink>
);

const Tab = () => (
  <div className="Tab">
    <TabItem tab="stamp">우리매장 스탬프</TabItem>
    <TabItem tab="guest">적립중인 회원</TabItem>
  </div>
);

export default Tab;
