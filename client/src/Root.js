import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import { AuthActions } from './store/actionCreator';
import Spinner from './components/Spinner';

class Root extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/account/getsession',
    })
      .then(res => {
        const { data } = res;
        if (data.is_err === true) {
          console.log('유저정보가 없습니다.');
          AuthActions.authFailure();
          return false;
        }
        const userInfo = {
          userType: data.data.userType,
          email: data.data.email,
        };
        AuthActions.authSuccess(userInfo);
        return true;
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        AuthActions.authFailure();
      });
  }

  handleLogout = () => {
    AuthActions.authFailure();
    axios({
      method: 'post',
      url: '/api/account/logout',
    })
      .then(res => {
        const { data } = res;
        if (data.is_err === true) {
          console.log('로그아웃 실패');
          AuthActions.authFailure();
          return false;
        }
        return true;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { loading } = this.state;
    const { isLoggedIn, currentUser } = this.props;
    return (
      <BrowserRouter>
        {!loading ? (
          <App
            onLogout={this.handleLogout}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        ) : (
          <Spinner />
        )}
      </BrowserRouter>
    );
  }
}

export default connect(({ auth }) => ({
  isLoggedIn: auth.getIn(['status', 'isLoggedIn']),
  currentUser: auth.getIn(['status', 'currentUser']),
}))(Root);

// export default Root;
