import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TodoActions } from '../store/actionCreator';
import Todos from '../components/Todos';

class TodoContainer extends Component {
  handleChange = e => {
    // 인풋 값 변경
    TodoActions.changeInput(e.target.value);
  };

  handleInsert = () => {
    // 아이템 추가
    const { input } = this.props;
    TodoActions.insert(input); // 추가하고
    TodoActions.changeInput(''); // 기존 인풋값 비우기
  };

  handleToggle = id => {
    // 삭제선 켜고 끄기
    TodoActions.toggle(id);
  };

  handleRemove = id => {
    // 아이템 제거
    TodoActions.remove(id);
  };

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.props;

    return (
      <Todos
        input={input}
        todos={todos}
        onChange={handleChange}
        onInsert={handleInsert}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}

export default connect(
  // state 를 비구조화 할당 해주었습니다
  ({ todo }) => ({
    // immutable 을 사용하니, 값을 조회 할 때엔느 .get 을 사용해주어야하죠.
    input: todo.get('input'),
    todos: todo.get('todos'),
  })
)(TodoContainer);
