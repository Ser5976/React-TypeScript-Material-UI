import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constant/urls';
import {
  ListActionType, // типизация всего экшена в todoListReducer
  setTodoList, // запись списка дел в стейт
  setIsFetchingTodoList, // крутилка
  setFetchErrorTodoList, // ошибка
  TodoListType, //типизация объекта в массиве списка дел(todoList)
} from '../store/reducers/todoListReducer';

// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  ListActionType
>;
// запрос для получения списка дел
export const getTodoList = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetchingTodoList(true));
      const response = await axios.get(ModelUrls.TODOLIST);
      console.log(response);
      dispatch(setTodoList(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorTodoList(true));
      dispatch(setIsFetchingTodoList(false));
    }
  };
};
// добавление дела в список дел
export const sendTodoList = (data: TodoListType): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.TODOLIST, data);
      console.log(response.data);
      dispatch(getTodoList());
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorTodoList(true));
    }
  };
};
// удалить дело(объект в списке дел)
export const deleteTodo = (id: number | undefined): ThunkType => {
  return async (dispatch) => {
    try {
      await axios.delete(ModelUrls.TODOLIST + id);
      dispatch(getTodoList());
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorTodoList(true));
    }
  };
};
// изменяет  объек, в котором изменился  made, на серваке
export const setMade = (
  id: number | undefined,
  todo: TodoListType
): ThunkType => {
  return async (dispatch) => {
    try {
      await axios.put(ModelUrls.TODOLIST + id, todo);
      dispatch(getTodoList());
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorTodoList(true));
    }
  };
};
