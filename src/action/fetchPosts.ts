import axios from 'axios';
//import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import {
  setPosts, // записывает посты в стейт
  setFetchError, // изменяет булевое значение ошибок
  setIsFetching, //крутилка
  PostsAtionType, // общая типизация экшенов
} from '../store/reducers/postsReducer';
// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  PostsAtionType
>;
// запрос для получения photos
export const fetchPosts = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      console.log(response.data);
      dispatch(setPosts(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};
// Другой способ типизации санки: просто типизировать dispatch ...async (dispatch:Dispatch<PhotosAtionType>).....
