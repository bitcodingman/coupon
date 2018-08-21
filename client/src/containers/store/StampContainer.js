import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from 'store/modules/store';
import Title from 'components/store/Title';
// import StampCard from 'components/common/StampCard';
// import StampInfo from 'components/common/StampInfo';

class StampContainer extends Component {
  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    const { storeInfo } = this.props;
    if (storeInfo !== prevProps.storeInfo) {
      this.initialize();
      console.log('stampinfo');
    }
  }

  initialize = async () => {
    const { StoreActions, storeInfo } = this.props;
    if (!storeInfo) return false;
    try {
      const stampList = await StoreActions.getStampInfo(storeInfo.storeId);
      return stampList;
    } catch (err) {
      return console.log(err);
    }
  };

  render() {
    const { storeInfo, stampList } = this.props;
    console.log(stampList);
    // const newStampList = stampList.map(stampCard => (
    //   <div key={stampCard.stampId}>
    //     <StampCard stampCard={stampCard} />
    //     <StampInfo stampCard={stampCard} />
    //   </div>
    // ));
    return (
      <div className="container">
        <Title>{storeInfo.storeName}</Title>
        {JSON.stringify(stampList)}
        {/* {newStampList} */}
      </div>
    );
  }
}

export default connect(
  ({ base, store }) => ({
    storeInfo: base.storeInfo,
    stampList: store.stampList,
  }),
  dispatch => ({
    StoreActions: bindActionCreators(storeActions, dispatch),
  })
)(StampContainer);
