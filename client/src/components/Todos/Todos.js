import React from 'react';

const TodoItem = ({ id, text, checked, onToggle, onRemove }) => (
  <li>
    <div
      role="button"
      tabIndex="0"
      style={{
        textDecoration: checked ? 'line-through' : 'none',
      }}
      onClick={() => onToggle(id)}
      onDoubleClick={() => onRemove(id)}
    >
      {text}
    </div>
  </li>
);

const Todos = ({ todos, input, onInsert, onToggle, onRemove, onChange }) => {
  const todoItems = todos.map(todo => {
    const { id, checked, text } = todo.toJS();
    return (
      <TodoItem
        id={id}
        checked={checked}
        text={text}
        onToggle={onToggle}
        onRemove={onRemove}
        key={id}
      />
    );
  });
  return (
    <div>
      <h2>오늘 할 일</h2>
      <input type="text" value={input} onChange={onChange} />
      <button type="button" onClick={onInsert}>
        추가
      </button>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default Todos;
