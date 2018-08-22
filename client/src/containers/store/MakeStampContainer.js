import React, { Component } from 'react';
import Button from 'components/common/Button';

class MakeStampContainer extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          name="stampTerm"
          placeholder="스탬프 적립 기준 ex) 음료 1잔당 적립"
        />
        <input
          type="text"
          name="stampMaximum"
          placeholder="스탬프 최대적립 개수 : 10개 ~ 최대 30개"
        />
        <div>
          <h3>5개 적립시 발행할 쿠폰 설정</h3>
          <input
            type="text"
            name="couponItemName"
            placeholder="쿠폰 상품명을 입력하세요."
          />
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <h3>최대(10개) 적립시 발행할 쿠폰 설정</h3>
          <input
            type="text"
            name="couponItemName"
            placeholder="쿠폰 상품명을 입력하세요."
          />
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <Button>스탬프카드 만들기</Button>
      </div>
    );
  }
}

export default MakeStampContainer;
