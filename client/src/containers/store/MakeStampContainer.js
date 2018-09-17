import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as storeActions from 'store/modules/store';
import MakeStampBox from 'components/store/MakeStampBox';
import { HideTab } from 'containers';
import { isEmpty } from 'validator';

class MakeStampContainer extends Component {
  componentDidMount() {
    this.getItemImgList();
    const { modify, stampList, StoreActions } = this.props;
    const stampModify = stampList.find(
      stamp => stamp.stampId === parseInt(modify.stampId, 10)
    );

    if (stampModify) {
      StoreActions.setStampModify(stampModify);
    }
  }

  // 컴포넌트가 사라지기 전에 상태 초기화 할것
  componentWillUnmount() {
    const { StoreActions } = this.props;
    StoreActions.couponConfigInit();
  }

  getItemImgList = async () => {
    const { StoreActions } = this.props;
    try {
      const itemImgList = await StoreActions.getItemImg();

      if (itemImgList.data.isErr) {
        alert(itemImgList.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { StoreActions, makeStampForm } = this.props;
    if (name === 'couponItemName') {
      return StoreActions.couponItemName(value);
    }

    let nextValue = value;

    if (
      name === 'stampMaximum' &&
      Number(nextValue) < makeStampForm.stampMaximum
    ) {
      const min = Number(nextValue) + 1;
      const max = makeStampForm.stampMaximum;

      for (let i = min; i <= max; i++) {
        const couponArr = makeStampForm.couponConfig.toJS();
        const couponObj = couponArr.find(
          coupon => coupon.couponPublishTerm === i
        );
        if (couponObj) {
          const couponIndex = obj => obj.couponPublishTerm === i;
          const couponId = makeStampForm.couponConfig.findIndex(couponIndex);
          StoreActions.delCouponItem(couponId);
        }
      }
    }

    if (name === 'stampMaximum') {
      nextValue = Number(value);
    }

    const input = {
      name,
      value: nextValue,
    };
    return StoreActions.changeInput(input);
  };

  handleSelect = id => {
    const { StoreActions, makeStampForm } = this.props;
    StoreActions.couponSelect(id);

    const couponConfig = makeStampForm.couponConfig.find(
      coupon => coupon.couponPublishTerm === id
    );

    if (couponConfig) {
      StoreActions.couponItemName(couponConfig.couponItemName);
      const imgObj = {
        itemImgId: couponConfig.itemImgId,
        itemImg: couponConfig.itemImg,
      };
      StoreActions.imgSelect(imgObj);
    }

    return StoreActions.showItemImg();
  };

  handleClose = () => {
    const { StoreActions } = this.props;
    StoreActions.currentCouponInit();
    return StoreActions.hideItemImg();
  };

  handleImgSelect = (id, img) => {
    const { StoreActions } = this.props;
    const imgObj = {
      itemImgId: id,
      itemImg: img,
    };
    return StoreActions.imgSelect(imgObj);
  };

  handleSetCoupon = async () => {
    try {
      const { StoreActions } = this.props;

      const couponArr = this.props.makeStampForm.couponConfig.toJS();
      const couponIndex = obj =>
        obj.couponPublishTerm ===
        this.props.makeStampForm.currentCoupon.couponPublishTerm;

      const couponConfig = {
        couponIndex: couponArr.findIndex(couponIndex),
        couponPublishTerm: this.props.makeStampForm.currentCoupon
          .couponPublishTerm,
        couponItemName: this.props.makeStampForm.currentCoupon.couponItemName,
        itemImgId: this.props.makeStampForm.currentCoupon.itemImgId,
        itemImg: this.props.makeStampForm.currentCoupon.itemImg,
      };

      if (
        !couponConfig.itemImgId ||
        isEmpty(couponConfig.itemImg, { ignore_whitespace: true })
      ) {
        alert('상품 이미지를 선택하세요.');
        return false;
      }

      if (isEmpty(couponConfig.couponItemName, { ignore_whitespace: true })) {
        alert('쿠폰의 상품이름을 입력하세요.');
        return false;
      }

      const couponObj = couponArr.find(
        coupon => coupon.couponPublishTerm === couponConfig.couponPublishTerm
      );

      if (couponObj) {
        await StoreActions.updateCouponItem(couponConfig);
      } else {
        await StoreActions.setCouponItem(couponConfig);
        if (!this.props.makeStampForm.couponConfig.isEmpty()) {
          const sortArr = await this.props.makeStampForm.couponConfig.sort(
            (a, b) => {
              if (a.couponPublishTerm > b.couponPublishTerm) {
                return 1;
              }
              if (a.couponPublishTerm < b.couponPublishTerm) {
                return -1;
              }
              return 0;
            }
          );
          StoreActions.sortCouponItem(sortArr);
        }
      }

      StoreActions.currentCouponInit();
      return StoreActions.hideItemImg();
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSetCoupon();
    }
  };

  handleDelete = id => {
    const { StoreActions } = this.props;
    StoreActions.delCouponItem(id);
  };

  handleSubmit = async id => {
    try {
      const { StoreActions, history } = this.props;
      const {
        stampName,
        stampTerm,
        stampMaximum,
        couponConfig,
      } = this.props.makeStampForm;

      if (isEmpty(stampName, { ignore_whitespace: true })) {
        alert('스탬프 이름을 입력하세요.');
        return false;
      }

      if (isEmpty(stampTerm, { ignore_whitespace: true })) {
        alert('스탬프 적립 기준을 입력하세요.');
        return false;
      }

      const lastCooupon = couponConfig.find(
        coupon => coupon.couponPublishTerm === stampMaximum
      );

      if (!lastCooupon) {
        alert(`스탬프 최대 적립 (${stampMaximum} 개) 쿠폰상품을 설정하세요.`);
        return false;
      }

      const couponArr = this.props.makeStampForm.couponConfig.map(coupon => ({
        couponPublishTerm: coupon.couponPublishTerm,
        couponItemName: coupon.couponItemName,
        itemImgId: coupon.itemImgId,
      }));

      if (id) {
        console.log('update');
        const stampInfo = {
          stampId: id,
          storeId: this.props.storeId,
          stampName: this.props.makeStampForm.stampName,
          stampTerm: this.props.makeStampForm.stampTerm,
          stampMaximum: this.props.makeStampForm.stampMaximum,
          couponConfig: couponArr,
        };
        await StoreActions.updateStamp(stampInfo);
      } else {
        console.log('set');
        const stampInfo = {
          storeId: this.props.storeId,
          stampName: this.props.makeStampForm.stampName,
          stampTerm: this.props.makeStampForm.stampTerm,
          stampMaximum: this.props.makeStampForm.stampMaximum,
          couponConfig: couponArr,
        };
        await StoreActions.setStamp(stampInfo);
      }

      history.push('/');
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  render() {
    const { itemImgList, makeStampForm, itemImgView, modify } = this.props;
    return (
      <div>
        <MakeStampBox
          itemImgView={itemImgView}
          itemImgList={itemImgList}
          makeStamp={makeStampForm}
          imgSelect={this.handleImgSelect}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onClose={this.handleClose}
          onKeyPress={this.handleKeyPress}
          onSubmit={this.handleSubmit}
          setCoupon={this.handleSetCoupon}
          delCoupon={this.handleDelete}
          modify={modify.stampId}
        />
        <HideTab />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ store, base }) => ({
      itemImgList: store.itemImgList,
      makeStampForm: store.makeStampForm,
      itemImgView: store.makeStampForm.itemImgView,
      storeId: base.storeInfo.storeId,
      stampList: store.stampList,
    }),
    dispatch => ({
      StoreActions: bindActionCreators(storeActions, dispatch),
    })
  )
)(MakeStampContainer);
