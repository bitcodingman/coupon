import React from 'react';
import './ItemImgList.scss';
import Button from 'components/common/Button';
import { FiX } from 'react-icons/fi';

const ItemImgList = ({ itemImgList, onClose }) => {
  const ItemImgArr = itemImgList.map(item => {
    const itemList = item.imgList.map(img => (
      <div key={img.itemImgId} className="img">
        <i className={`icon-${img.itemImg}`} />
      </div>
    ));
    return (
      <div key={item.imgCategory} className="category">
        <h3>{item.imgCategory}</h3>
        <div className="imgList">{itemList}</div>
      </div>
    );
  });
  return (
    <div className="ItemImgList">
      <h3>쿠폰 상품 이미지를 선택하세요.</h3>
      <div className="list">{ItemImgArr}</div>
      <h3>쿠폰 상품 이름을 입력하세요.</h3>
      <input type="text" />
      <Button>확인</Button>
      <Button theme="close" onClick={onClose}>
        <FiX />
      </Button>
    </div>
  );
};

export default ItemImgList;
