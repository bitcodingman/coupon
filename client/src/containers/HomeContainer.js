import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Store, Customer } from '.';

class Home extends Component {
  render() {
    const { isLoggedIn, currentUser } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <h2>
            Hello, {currentUser.toJS().email}!
            {currentUser.toJS().userType === 0 ? <Customer /> : <Store />}
          </h2>
        ) : (
          <h2>로그인하세요!</h2>
        )}
      </div>
    );
  }
}

export default connect(({ auth }) => ({
  isLoggedIn: auth.getIn(['status', 'isLoggedIn']),
  currentUser: auth.getIn(['status', 'currentUser']),
}))(Home);
