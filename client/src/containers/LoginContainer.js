import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LoginBox from '../components/LoginBox';
import { AuthActions } from '../store/actionCreator';

class LoginContainer extends Component {
  handleLogin = (email, password) => {
    axios({
      method: 'post',
      url: '/api/account/signin',
      data: {
        email,
        password,
      },
    })
      .then(res => {
        const { data } = res;
        const { history } = this.props;
        if (data.is_err === true) {
          alert(data.msg);
          return false;
        }
        const userInfo = {
          userType: data.data.user_type,
          email: data.data.email,
        };
        AuthActions.authSuccess(userInfo);
        history.push('/');
        return true;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <LoginBox onSubmit={this.handleLogin} />;
  }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect()(LoginContainer);
