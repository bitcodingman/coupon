import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginBox from '../../components/login/LoginBox';
import { SessionActions } from '../../store/actionCreator';

class LoginContainer extends Component {
  redirect = () => {
    const { handleRedirect } = this.props;
    handleRedirect();
  };

  handleLogin = (email, password, redirect) => {
    SessionActions.login(email, password, redirect);
  };

  render() {
    return <LoginBox onSubmit={this.handleLogin} redirect={this.redirect} />;
  }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect()(LoginContainer);
