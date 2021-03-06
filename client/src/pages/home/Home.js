import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomeContainer, StoreContainer, ConsumerContainer } from 'containers';

class Home extends Component {
  render() {
    const { logged, userType } = this.props;
    let container = <HomeContainer />;
    if (logged && userType === 0) {
      container = <ConsumerContainer />;
    } else if (logged && userType === 1) {
      container = <StoreContainer />;
    }
    return container;
  }
}

export default connect(({ base }) => ({
  logged: base.logged,
  userType: base.data.userType,
}))(Home);
