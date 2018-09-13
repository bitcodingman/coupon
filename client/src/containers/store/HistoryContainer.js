import React, { Component } from 'react';
import { connect } from 'react-redux';

class HistoryContainer extends Component {
  render() {
    const { saveHistory } = this.props;
    const historyArr = saveHistory.map(save => (
      <div key={save.historyId}>
        <div>{save.name} 님의</div>
        <div>{save.stampName} 에</div>
        <div>{save.stampSaveNo} 개를 적립하였습니다.</div>
        <div>{save.stampSaveDate}</div>
      </div>
    ));
    return <div>{historyArr}</div>;
  }
}

export default connect(({ store }) => ({
  saveHistory: store.saveHistory,
}))(HistoryContainer);
