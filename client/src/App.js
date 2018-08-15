import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Store, Customer } from './pages';
import Header from './components/common/Header';

class App extends Component {
  render() {
    const { onLogout, isLoggedIn } = this.props;
    return (
      <div>
        <Header onLogout={onLogout} isLoggedIn={isLoggedIn} />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/customer" component={Customer} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

export default App;
