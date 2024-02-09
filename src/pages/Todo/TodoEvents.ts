import { ITodo } from './TodosPage';

type Props = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  todosRemoveId: number[];
  setTodosRemoveId: (todosRemoveId: number[]) => void;
};

const getNullTodoData = (todoId: number): ITodo => {
  return {
    id: todoId,
    name: '',
    description: '',
    chacked: false,
  };
};

export default class TodoEvents {
  constructor(props: Props) {
    this.props = props;
  }

  private props: Props;

  addNullTodo(indCallTodo: number): void {
    const RemoveId = this.props.todosRemoveId.shift();
    if (RemoveId) this.props.setTodosRemoveId([...this.props.todosRemoveId]);

    const newId = RemoveId ?? this.props.todos.length + 1;
    const nullTodo: ITodo = getNullTodoData(newId);
    const newTodos: ITodo[] = [...this.props.todos];
    newTodos.splice(indCallTodo + 1, 0, nullTodo);
    this.props.setTodos(newTodos);
  }

  // editTodo(newTodoData: ITodo, indEditTodo: number): void {
  //   const newTodos = [...this.props.todos];
  //   newTodos[indEditTodo] = newTodoData;
  //   this.props.setTodos(newTodos);
  // }

  editTodo(newTodoData: ITodo, indEditTodo: number): void {
    const newTodos = [...this.props.todos];
    newTodos[indEditTodo] = newTodoData;
    this.props.setTodos(newTodos);
  }

  removeTodo(indRemoveTodo: number, idRemoveTodo: number): void {
    this.props.setTodosRemoveId([...this.props.todosRemoveId, idRemoveTodo]);

    const newTodos = [...this.props.todos];
    newTodos.splice(indRemoveTodo, 1);
    this.props.setTodos(newTodos);
  }
}
