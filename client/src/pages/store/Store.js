import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Tab from 'components/common/Tab';
import { StampContainer, GuestContainer, MakeStampContainer } from 'containers';

class Store extends Component {
  render() {
    const { stampList } = this.props;
    return (
      <div>
        <Tab stampList={stampList} />
        <Switch>
          <Route path="/store/stamp" component={StampContainer} />
          <Route path="/store/guest" component={GuestContainer} />
          <Route path="/store/makestamp" component={MakeStampContainer} />
        </Switch>
      </div>
    );
  }
}

export default connect(({ store }) => ({
  stampList: store.stampList,
}))(Store);
