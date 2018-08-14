import React, { Component } from 'react';
import Button from '../Button';
import './LoginBox.scss';

class LoginBox extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit(email, password);
  };

  render() {
    return (
      <div className="LoginBox">
        <div className="LoginForm">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="아이디를 입력하세요."
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              onChange={this.handleChange}
            />
            <Button theme="login" type="submit">
              login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginBox;
