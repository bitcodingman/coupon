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

  initialize = async () => {
    const { StoreActions, storeInfo } = this.props;
    try {
      console.log(JSON.stringify(storeInfo));
      const stampList = await StoreActions.getStampInfo();
      console.log(stampList);
      return stampList;
    } catch (err) {
      return console.log(err);
    }
  };

  render() {
    const { storeInfo, userId } = this.props;
    // const newStampCardList = stampCardList.map(stampCard => (
    // 	<div key={stampCard.stampId}>
    // 		<StampCard stampCard={stampCard} />
    // 		<StampInfo stampCard={stampCard} />
    // 	</div>
    // ));
    return (
      <div className="container">
        <Title>{storeInfo.storeName}</Title>
        <div>{userId}</div>
      </div>
    );
  }
}

export default connect(
  ({ base }) => ({
    data: base.data,
    logged: base.logged,
    userId: base.data.userId,
    storeInfo: base.storeInfo,
  }),
  dispatch => ({
    StoreActions: bindActionCreators(storeActions, dispatch),
  })
)(StampContainer);
