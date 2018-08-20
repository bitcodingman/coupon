import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class HomeContainer extends Component {
  render() {
    const { logged, userType, history } = this.props;
    return (
      <div>
        {logged ? (
          <div>
            {userType === 0
              ? history.push('/customer')
              : history.push('/store/stamp')}
          </div>
        ) : (
          <h2>로그인하세요.</h2>
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(({ base }) => ({
    logged: base.logged,
    userType: base.data.userType,
  }))
)(HomeContainer);
