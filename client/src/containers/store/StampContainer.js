import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Title from 'components/store/Title';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';

class StampContainer extends Component {
  state = {
    storeInfo: {},
    stampCardList: [
      {
        stampId: 0,
        stampMaximum: 10,
        stampTerm: '음료1잔당 적립 1개',
        couponConfig: [
          {
            couponId: 0,
            couponPublishTerm: 5,
            couponItemName: '아메리카노 1잔',
            itemImg: 'img01',
          },
          {
            couponId: 1,
            couponPublishTerm: 10,
            couponItemName: '카페라떼 1잔',
            itemImg: 'img02',
          },
        ],
      },
      {
        stampId: 1,
        stampMaximum: 20,
        stampTerm: '식사 1개당 적립 1개',
        couponConfig: [
          {
            couponId: 0,
            couponPublishTerm: 10,
            couponItemName: '군만두',
            itemImg: 'img01',
          },
          {
            couponId: 1,
            couponPublishTerm: 20,
            couponItemName: '탕수육',
            itemImg: 'img02',
          },
        ],
      },
    ],
  };

  componentDidMount() {
    const { userId } = this.props;
    axios({
      method: 'post',
      url: '/api/store/getinfo',
      data: {
        userId,
      },
    })
      .then(res => {
        console.log('스토어정보를 찾았습니다');
        this.setState({
          storeInfo: res.data.data,
        });
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { storeInfo, stampCardList } = this.state;
    const newStampCardList = stampCardList.map(stampCard => (
      <div key={stampCard.stampId}>
        <StampCard stampCard={stampCard} />
        <StampInfo stampCard={stampCard} />
      </div>
    ));
    return (
      <div className="container">
        <Title>{storeInfo.store_name}</Title>
        {newStampCardList}
      </div>
    );
  }
}

export default connect(({ session }) => ({
  userId: session.status.currentUser.userId,
}))(StampContainer);
