import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tab from 'components/common/Tab';
import { StampContainer, GuestContainer } from 'containers';
 

const Store = () => (
  <div>
    <Tab />
    <Switch> 
      <Route path="/store/stamp" component={StampContainer} />
      <Route path="/store/guest" component={GuestContainer} />
    </Switch>
  </div>
);

export default Store;
