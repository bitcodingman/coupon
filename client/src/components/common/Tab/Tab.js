import React from 'react';
import './Tab.scss';

const TabItem = ({ children, tab, count, selected, onSelect }) => (
  <div
    className={`TabItem ${tab === selected ? 'active' : ''}`}
    onClick={() => onSelect(tab)}
  >
    <p>{children}</p>
    <h3>
      {count}
      <span>{tab === 'consumer' ? '명' : '개'}</span>
    </h3>
  </div>
);

const Tab = ({
  stampListNo,
  couponListNo,
  selected,
  onSelect,
  userType,
  saveUserNo,
}) => {
  if (userType === 0) {
    return (
      <div className="Tab">
        <TabItem
          tab="stamp"
          selected={selected}
          count={stampListNo}
          onSelect={onSelect}
        >
          적립중인 스탬프
        </TabItem>
        <TabItem
          tab="coupon"
          selected={selected}
          count={couponListNo}
          onSelect={onSelect}
        >
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
        count={stampListNo}
        onSelect={onSelect}
      >
        우리매장 스탬프
      </TabItem>
      <TabItem
        tab="consumer"
        selected={selected}
        count={saveUserNo}
        onSelect={onSelect}
      >
        적립중인 회원
      </TabItem>
    </div>
  );
};

export default Tab;
