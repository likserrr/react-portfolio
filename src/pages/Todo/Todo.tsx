import React, { FC, useState } from 'react';
import { ITodo } from './TodosPage';
import styles from './css/todo.module.css';
import TodoEvents from './TodoEvents';

enum todoField {
  name = 'todo_name',
  description = 'todo_desctiption',
  checkbox = 'todo_checkbox',
}

interface ITodoProps {
  todo: ITodo;
  ind: number;
  helper: TodoEvents;
}

const setNewTodoData = (
  todoData: ITodo,
  changeElem: HTMLInputElement,
): ITodo => {
  const todoChangeField = changeElem.dataset.todo_field;
  switch (todoChangeField) {
    case todoField.name:
      todoData.name = changeElem.value;
      break;
    case todoField.description:
      todoData.description = changeElem.value;
      break;
    case todoField.checkbox:
      todoData.chacked = changeElem.checked;
      break;
    default:
      break;
  }
  return todoData;
};

const Todo: FC<ITodoProps> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = setNewTodoData(props.todo, e.target);
    props.helper.editTodo(newTodo, props.ind);
  };

  return (
    <div className={styles.todo}>
      <input
        data-todo_field={todoField.name}
        value={props.todo.name}
        placeholder={
          props.todo.name === '' ? 'Typing Any Name...' : props.todo.name
        }
        onChange={changeHandler}
        type="text"
      />
      <input
        data-todo_field={todoField.description}
        value={props.todo.description}
        placeholder={
          props.todo.description === ''
            ? 'Typing Any Description...'
            : props.todo.description
        }
        onChange={changeHandler}
        type="text"
      />
      <input
        data-todo_field={todoField.checkbox}
        type="checkbox"
        checked={props.todo.chacked}
        onChange={changeHandler}
      />
      <button onClick={() => props.helper.removeTodo(props.ind, props.todo.id)}>
        Del
      </button>
      <button onClick={() => props.helper.addNullTodo(props.ind)}>Add</button>
    </div>
  );
};

export default Todo;
