import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login, Store, Customer } from 'pages';
import AppTemplate from 'components/common/AppTemplate';
import { Base, HeaderContainer } from 'containers';

class App extends Component {
  render() {
    return (
      <AppTemplate header={<HeaderContainer />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/customer" component={Customer} />
          <Route path="/login" component={Login} />
        </Switch>
        <Base />
      </AppTemplate>
    );
  }
}

export default App;
