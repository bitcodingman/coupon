import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from 'store/modules/store';
import MakeStampBox from 'components/store/MakeStampBox';
import { HideTab } from 'containers';

class MakeStampContainer extends Component {
  componentDidMount() {
    this.getItemImgList();
  }

  // 컴포넌트가 사라지기 전에 상태 초기화 할것
  componentWillUnmount() {
    const { StoreActions } = this.props;
    StoreActions.currentCouponInit();
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
    const { StoreActions } = this.props;
    if (name === 'couponItemName') {
      return StoreActions.couponItemName(value);
    }
    const input = {
      name,
      value,
    };
    return StoreActions.changeInput(input);
  };

  handleSelect = id => {
    const { StoreActions } = this.props;
    StoreActions.couponSelect(id);
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

    const couponObj = couponArr.find(
      coupon => coupon.couponPublishTerm === couponConfig.couponPublishTerm
    );

    try {
      if (!couponObj) {
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
          await StoreActions.sortCouponItem(sortArr);
        }
      } else {
        await StoreActions.updateCouponItem(couponConfig);
      }

      await StoreActions.currentCouponInit();
      await StoreActions.hideItemImg();
    } catch (err) {
      console.log(err);
    }
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSetCoupon();
    }
  };

  render() {
    const { itemImgList, makeStampForm, itemImgView } = this.props;
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
          setCoupon={this.handleSetCoupon}
        />
        <HideTab />
      </div>
    );
  }
}

export default connect(
  ({ store }) => ({
    itemImgList: store.itemImgList,
    makeStampForm: store.makeStampForm,
    itemImgView: store.makeStampForm.itemImgView,
  }),
  dispatch => ({
    StoreActions: bindActionCreators(storeActions, dispatch),
  })
)(MakeStampContainer);
