import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { HomeContainer } from 'containers';

const Home = ({ logged, userType, history }) => (
  <div>
    {logged ? (
      <div>
        {userType === 0
          ? history.push('/customer')
          : history.push('/store/stamp')}
      </div>
    ) : (
      <HomeContainer />
    )}
  </div>
);

export default compose(
  withRouter,
  connect(({ base }) => ({
    logged: base.logged,
    userType: base.data.userType,
  }))
)(Home);
