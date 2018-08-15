import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';

class Header extends Component {
  render() {
    const { isLoggedIn, onLogout } = this.props;
    const loginButton = (
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    );
    const logoutButton = (
      <li>
        <Button type="button" onClick={() => onLogout()}>
          Logout
        </Button>
      </li>
    );
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          {isLoggedIn ? logoutButton : loginButton}
        </ul>
        <hr />
      </div>
    );
  }
}

export default Header;
