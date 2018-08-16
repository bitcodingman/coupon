import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HomeContainer } from '../../containers';

const Home = ({ isLoggedIn, currentUser }) => (
  <div>
    {isLoggedIn ? (
      <div>
        {currentUser.userType === 0 ? (
          <Redirect to="/Customer" />
        ) : (
          <Redirect to="/store" />
        )}
      </div>
    ) : (
      <HomeContainer />
    )}
  </div>
);

export default connect(({ session }) => ({
  isLoggedIn: session.status.isLoggedIn,
  currentUser: session.status.currentUser,
}))(Home);
