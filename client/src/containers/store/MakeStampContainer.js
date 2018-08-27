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

  handleCouponSet = () => {
    const { StoreActions, makeStampForm } = this.props;
    const couponConfig = {
      couponPublishTerm: makeStampForm.currentCoupon.couponPublishTerm,
      couponItemName: makeStampForm.currentCoupon.couponItemName,
      itemImgId: makeStampForm.currentCoupon.itemImgId,
      itemImg: makeStampForm.currentCoupon.itemImg,
    };
    StoreActions.setCouponItem(couponConfig);
    StoreActions.currentCouponInit();
    return StoreActions.hideItemImg();
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
          setCoupon={this.handleCouponSet}
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
