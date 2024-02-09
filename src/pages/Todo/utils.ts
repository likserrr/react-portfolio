import { TodoField } from './Todo';
import { ITodo } from './TodosPage';

const getNewTodoData = (
  todoData: ITodo,
  changeElem: HTMLInputElement,
): ITodo => {
  const todoChangeField = changeElem.dataset.todo_field;
  switch (todoChangeField) {
    case TodoField.name:
      todoData.name = changeElem.value;
      break;
    case TodoField.description:
      todoData.description = changeElem.value;
      break;
    case TodoField.checkbox:
      todoData.chacked = changeElem.checked;
      break;
    default:
      break;
  }
  return todoData;
};

export { getNewTodoData };
