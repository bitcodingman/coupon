import React from 'react';
import Button from 'components/common/Button';
import './MakeStampBox.scss';
import MakeStampCard from 'components/store/MakeStampCard';
import ItemImgList from 'components/store/ItemImgList';

const MakeStampBox = ({
  itemImgList,
  itemImgView,
  makeStamp,
  onChange,
  onCheck,
  onClose,
}) => {
  const optionArr = () => {
    const options = [];
    for (let i = 10; i <= 30; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const stampMaximumSelect = optionArr();

  return (
    <div className="MakeStampBox">
      {itemImgView ? (
        <ItemImgList itemImgList={itemImgList} onClose={onClose} />
      ) : null}

      {/* 스탬프 적립 기준 입력 */}
      <input
        type="text"
        id="stampTerm"
        name="stampTerm"
        placeholder="스탬프 적립 기준 ex) 음료 1잔당 적립"
        onChange={onChange}
      />

      {/* 스탬프 최대 개수 선택 */}
      <select name="stampMaximum" onChange={onChange}>
        {stampMaximumSelect}
      </select>

      <MakeStampCard onCheck={onCheck} stampMaximum={makeStamp.stampMaximum} />

      <div>
        <h3>5개 적립시 발행할 쿠폰 설정</h3>
        <input
          type="text"
          name="couponItemName"
          placeholder="쿠폰 상품명을 입력하세요."
        />
      </div>
      <div>
        <h3>최대(10개) 적립시 발행할 쿠폰 설정</h3>
        <input
          type="text"
          name="couponItemName"
          placeholder="쿠폰 상품명을 입력하세요."
        />
      </div>
      <Button theme="highlight w100">스탬프카드 만들기</Button>
    </div>
  );
};

export default MakeStampBox;
