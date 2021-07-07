const SET_TODO_LIST = 'SET_TODO_LIST';
const DELETE_TODO_LIST = 'DELETE_LIST';
const SET_MADE = 'SET_MADE';
const SET_TITLE = 'SET_TITLE';
// типизация
//-------------------------------
export type TodoListType = {
  title: string;
  id: number;
  made: boolean;
};

export type TodoListStateType = {
  todoList: TodoListType[];
  title: string;
};

export type SetTodoListActionType = {
  type: typeof SET_TODO_LIST;
  payload: TodoListType[];
};
export type DeleteTodoListActionType = {
  type: typeof DELETE_TODO_LIST;
  payload: number;
};
export type SetMadeActionType = {
  type: typeof SET_MADE;
  payload: number;
};
export type SetTitleActionType = {
  type: typeof SET_TITLE;
  payload: string;
};
type ListActionType =
  | SetTodoListActionType
  | DeleteTodoListActionType
  | SetMadeActionType
  | SetTitleActionType;

//-------------------------------------------

const initialState: TodoListStateType = {
  todoList: [],
  title: '',
};

export const todoListReducer = (
  state = initialState,
  action: ListActionType
): TodoListStateType => {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        todoList: action.payload,
      };
    case DELETE_TODO_LIST:
      return {
        ...state,
        todoList: [
          ...state.todoList.filter((item) => item.id !== action.payload),
        ],
      };

    case SET_MADE:
      return {
        ...state,
        todoList: [
          ...state.todoList.map((item) => {
            if (item.id === action.payload) {
              item.made = !item.made;
            }
            return item;
          }),
        ],
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    default:
      return state;
  }
};

export const setTodoList = (data: TodoListType[]): SetTodoListActionType => ({
  type: SET_TODO_LIST,
  payload: data,
});
export const deleteTodoList = (id: number): DeleteTodoListActionType => ({
  type: DELETE_TODO_LIST,
  payload: id,
});
export const setMade = (id: number): SetMadeActionType => ({
  type: SET_MADE,
  payload: id,
});
export const setTitle = (value: string): SetTitleActionType => ({
  type: SET_TITLE,
  payload: value,
});
