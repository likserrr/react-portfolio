import React, { FC } from 'react';
import { ITodo } from './TodosPage';
import styles from './css/todo.module.css';
import TodoEvents from './TodoEvents';
import { getNewTodoData } from './utils';

export enum TodoField {
  name = 'todo_name',
  description = 'todo_desctiption',
  checkbox = 'todo_checkbox',
}

export interface ITodoProps {
  todo: ITodo;
  ind: number;
  helper: TodoEvents;
}

const Todo: FC<ITodoProps> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = getNewTodoData(props.todo, e.target);
    props.helper.editTodo(newTodo, props.ind);
  };

  return (
    <div className={styles.todo}>
      <input
        data-todo_field={TodoField.name}
        value={props.todo.name}
        placeholder={
          props.todo.name === '' ? 'Typing Any Name...' : props.todo.name
        }
        onChange={changeHandler}
        type="text"
      />
      <input
        data-todo_field={TodoField.description}
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
        data-todo_field={TodoField.checkbox}
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
