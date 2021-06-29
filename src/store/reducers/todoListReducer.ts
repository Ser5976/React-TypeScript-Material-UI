const SET_TODO_LIST = 'SET_TODO_LIST';
// типизация
//-------------------------------
export type TodoListType = {
  title: string;
  id: number;
  made: boolean;
};

export type TodoListStateType = {
  todoList: TodoListType[];
};

export type SetTodoListActionType = {
  type: typeof SET_TODO_LIST;
  payload: TodoListType;
};
//-------------------------------------------

const initialState: TodoListStateType = {
  todoList: [],
};

export const todoListReducer = (
  state = initialState,
  action: SetTodoListActionType
): TodoListStateType => {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };

    default:
      return state;
  }
};

export const setTodoList = (data: TodoListType): SetTodoListActionType => ({
  type: SET_TODO_LIST,
  payload: data,
});
