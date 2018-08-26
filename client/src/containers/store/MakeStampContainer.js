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
    const input = {
      name,
      value,
    };
    StoreActions.changeInput(input);
  };

  handleCheck = () => {
    const { StoreActions, itemImgView } = this.props;
    if (itemImgView) {
      return StoreActions.hideItemImg();
    }
    return StoreActions.showItemImg();
  };

  handleClose = () => {
    const { StoreActions } = this.props;
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
          onChange={this.handleChange}
          onCheck={this.handleCheck}
          onClose={this.handleClose}
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
