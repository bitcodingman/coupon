import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Counter, Todos, Store, Customer } from './containers';
import Header from './components/Header';

class App extends Component {
  render() {
    const { onLogout, isLoggedIn } = this.props;
    return (
      <div>
        <Header onLogout={onLogout} isLoggedIn={isLoggedIn} />
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/customer" component={Customer} />
        <Route path="/login" component={Login} />
        <Route path="/counter" component={Counter} />
        <Route path="/todos" component={Todos} />
      </div>
    );
  }
}

export default App;
