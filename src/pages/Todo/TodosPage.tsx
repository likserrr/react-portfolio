import React, { FC, useEffect, useRef, useState } from 'react';
import Todo from './Todo';
import styles from './css/todo.module.css';
import TodoEvents from './TodoEvents';
import TodosInfoPage from './TodosInfoPage';
import CardFlip from '../../components/CardFlip/CardFlip';

export interface ITodo {
  id: number;
  name: string;
  description: string;
  chacked: boolean;
}

const saveTodo: ITodo[] = [
  {
    id: 1,
    name: 'Test name 1',
    description: 'Test description',
    chacked: false,
  },
  {
    id: 2,
    name: 'Test name 2',
    description: 'Test description',
    chacked: true,
  },
  {
    id: 3,
    name: 'Test name 3',
    description: 'Test description',
    chacked: true,
  },
  {
    id: 4,
    name: 'Test name 4',
    description: 'Test description',
    chacked: true,
  },
];

const TodosPage: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(saveTodo);
  const [todosRemoveId, setTodosRemoveId] = useState<number[]>([]);

  const todoEventHelper = new TodoEvents({
    todos,
    setTodos,
    todosRemoveId,
    setTodosRemoveId,
  });

  useEffect(() => {
    const JSONtodos = localStorage.getItem('todos');
    const JSONtodosRemoveId = localStorage.getItem('todosRemoveId');

    if (JSONtodos) {
      const todos: ITodo[] = JSON.parse(JSONtodos);
      setTodos(todos);
    }

    if (JSONtodosRemoveId) {
      const RemoveId: number[] = JSON.parse(JSONtodosRemoveId);
      setTodosRemoveId(RemoveId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosRemoveId', JSON.stringify(todosRemoveId));
  }, [todos, todosRemoveId]);

  function resetTodos(): void {
    setTodos(saveTodo);
    setTodosRemoveId([]);
  }

  return (
    <div className={styles.widget}>
      <h1>TodoList</h1>
      <div className={styles.todo_wrap}>
        {todos.length ? (
          todos.map((todo, ind) => (
            <Todo
              key={todo.id}
              todo={todo}
              ind={ind}
              helper={todoEventHelper}></Todo>
          ))
        ) : (
          <>{todoEventHelper.addNullTodo(0)}</>
        )}
      </div>
      <p onClick={resetTodos} className={styles.clickable}>
        Reset Values...
      </p>
    </div>
  );
};

export default TodosPage;
