const SET_TODO_LIST = 'SET_TODO_LIST';
const SET_TITLE = 'SET_TITLE';
const IS_FETCHING_TODO_LIST = 'IS_FETCHING_TODO_LIST';
const SET_FETCH_ERROR_TODO_LIST = 'SET_FETCH_ERROR_TODO_LIST';
// типизация--------------------------------
export type TodoListType = {
  title: string;
  id: number;
  made: boolean;
};

export type TodoListStateType = {
  todoList: TodoListType[];
  title: string;
  isFetching: boolean;
  isFetchError: boolean;
};

export type SetTodoListActionType = {
  type: typeof SET_TODO_LIST;
  payload: TodoListType[];
};
export type SetTitleActionType = {
  type: typeof SET_TITLE;
  payload: string;
};
export type setIsFetchingTodoListActionType = {
  type: typeof IS_FETCHING_TODO_LIST;
  payload: boolean;
};
export type setFetchErrorTodoListActionType = {
  type: typeof SET_FETCH_ERROR_TODO_LIST;
  payload: boolean;
};
export type ListActionType =
  | SetTodoListActionType
  | SetTitleActionType
  | setIsFetchingTodoListActionType
  | setFetchErrorTodoListActionType;

//-------------------------------------------

const initialState: TodoListStateType = {
  todoList: [], //массив список дел
  title: '', //заголовок списка дел
  isFetching: true, // крутилка
  isFetchError: false, // ошибка
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
        isFetching: false,
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case IS_FETCHING_TODO_LIST:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_FETCH_ERROR_TODO_LIST:
      return {
        ...state,
        isFetchError: action.payload,
      };

    default:
      return state;
  }
};
// запись массива списка дел
export const setTodoList = (data: TodoListType[]): SetTodoListActionType => ({
  type: SET_TODO_LIST,
  payload: data,
});
//запись значения инпута в стейт(title)
export const setTitle = (value: string): SetTitleActionType => ({
  type: SET_TITLE,
  payload: value,
});
// крутилка
export const setIsFetchingTodoList = (
  bul: boolean
): setIsFetchingTodoListActionType => ({
  type: IS_FETCHING_TODO_LIST,
  payload: bul,
});
// изменяет булевое значение ошибок
export const setFetchErrorTodoList = (
  bul: boolean
): setFetchErrorTodoListActionType => ({
  type: SET_FETCH_ERROR_TODO_LIST,
  payload: bul,
});
