import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class HomeContainer extends Component {
  componentWillMount() {
    const { logged, userType, history } = this.props;
    if (logged && userType === 0) {
      history.push('/customer');
    } else if (logged && userType === 1) {
      history.push('/store/stamp');
    }
  }

  render() {
    return (
      <div>
        <h2>로그인하세요.</h2>
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
