import React from 'react';
import './Tab.scss';

const TabItem = ({ children, tab, count, selected, onSelect }) => (
  <div
    className={`TabItem ${tab === selected ? 'active' : ''}`}
    onClick={() => onSelect(tab)}
  >
    <p>{children}</p>
    <h3>
      {!count ? '0' : count.length}
      <span>{tab === 'consumer' ? '명' : '개'}</span>
    </h3>
  </div>
);

const Tab = ({ stampList, selected, onSelect, userType }) => {
  if (userType === 0) {
    return (
      <div className="Tab">
        <TabItem
          tab="stamp"
          selected={selected}
          count={stampList}
          onSelect={onSelect}
        >
          적립중인 스탬프
        </TabItem>
        <TabItem tab="coupon" selected={selected} onSelect={onSelect}>
          사용가능한 쿠폰
        </TabItem>
      </div>
    );
  }
  return (
    <div className="Tab">
      <TabItem
        tab="stamp"
        selected={selected}
        count={stampList}
        onSelect={onSelect}
      >
        우리매장 스탬프
      </TabItem>
      <TabItem tab="consumer" selected={selected} onSelect={onSelect}>
        적립중인 회원
      </TabItem>
    </div>
  );
};

export default Tab;
