import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import { SessionActions } from 'store/actionCreator';
import Spinner from 'components/common/Spinner';

class Root extends Component {
  componentDidMount() {
    SessionActions.getSession();
  }

  render() {
    const { loading, isLoggedIn } = this.props;
    return (
      <BrowserRouter>
        {loading ? <Spinner /> : <App isLoggedIn={isLoggedIn} />}
      </BrowserRouter>
    );
  }
} 

export default connect(({ session }) => ({
  loading: session.loading,
  isLoggedIn: session.status.isLoggedIn,
}))(Root);
