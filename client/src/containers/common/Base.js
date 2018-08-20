import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class Base extends Component {
  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    const { BaseActions } = this.props;
    try {
      if (localStorage.logged === 'true') {
        BaseActions.tempLogin();
      }
      const auth = await BaseActions.checkLogin();
      if (auth.data.isErr) {
        localStorage.logged = 'false';
        return false;
      }
      const sessionData = JSON.parse(JSON.stringify(auth.data));
      console.log(sessionData);
      return BaseActions.setUser(sessionData);
    } catch (err) {
      return console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h2>
          전역적으로 사용하는 컴포넌트는 이곳에 렌더링 합니다.
          containers/common/Base.js
        </h2>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Base);
