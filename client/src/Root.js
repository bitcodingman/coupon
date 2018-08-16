import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SessionActions } from './store/actionCreator';
import Spinner from './components/common/Spinner';

class Root extends Component {
  componentDidMount() {
    SessionActions.getSession();
  }

  handleLogout = () => {
    SessionActions.logout();
  };

  render() {
    const { loading, isLoggedIn, currentUser } = this.props;
    return (
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <App
            onLogout={this.handleLogout}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
      </BrowserRouter>
    );
  }
}

export default connect(({ session }) => ({
  loading: session.loading,
  isLoggedIn: session.status.isLoggedIn,
  currentUser: session.status.currentUser,
}))(Root);

// export default Root;
