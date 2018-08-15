import React from 'react';
import { connect } from 'react-redux';
import {
  HomeContainer,
  CustomerContainer,
  StoreContainer,
} from '../../containers';

const Home = ({ isLoggedIn, currentUser }) => (
  <div>
    {isLoggedIn ? (
      <h2>
        Hello, {currentUser.email}!
        {currentUser.userType === 0 ? (
          <CustomerContainer />
        ) : (
          <StoreContainer />
        )}
      </h2>
    ) : (
      <HomeContainer />
    )}
  </div>
);

export default connect(({ session }) => ({
  isLoggedIn: session.status.isLoggedIn,
  currentUser: session.status.currentUser,
}))(Home);
