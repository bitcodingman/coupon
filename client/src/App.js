import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Store, Customer } from 'pages';
import Header from 'components/common/Header';
import AppTemplate from 'components/common/AppTemplate';
import { SessionActions } from 'store/actionCreator';

class App extends Component {
  handleLogout = () => {
    SessionActions.logout();
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <AppTemplate
        header={<Header onLogout={this.handleLogout} isLoggedIn={isLoggedIn} />}
      >
        <Route exact path="/" component={Home} />
        <Route path="/store" component={Store} />
        <Route path="/customer" component={Customer} />
        <Route path="/login" component={Login} />
      </AppTemplate>
    );
  }
}

export default App;
