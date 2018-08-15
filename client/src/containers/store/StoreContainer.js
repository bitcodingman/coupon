import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class StoreContainer extends Component {
  state = {
    storeInfo: {},
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
    const { storeInfo } = this.state;
    return (
      <div>
        <h2>매장회원페이지 입니다!</h2>
        <ul>
          <li>매장 이름: {storeInfo.store_name}</li>
          <li>매장 연락처: {storeInfo.store_phone}</li>
          <li>사업자 등록번호: {storeInfo.store_regist_no}</li>
          <li>
            주소:
            {` ${storeInfo.address_si} 
						${storeInfo.address_gu} 
						${storeInfo.address_dong} 
						${storeInfo.address_detail}`}
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(({ session }) => ({
  userId: session.status.currentUser.userId,
}))(StoreContainer);
