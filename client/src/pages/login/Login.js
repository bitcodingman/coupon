import React, { Component } from 'react';
import { LoginContainer } from 'containers';

class Login extends Component {
  handleRedirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return <LoginContainer handleRedirect={this.handleRedirect} />;
  }
}

export default Login;
