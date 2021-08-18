import axios from 'axios';
//import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import {
  setPosts, // записывает посты в стейт
  setFetchError, // изменяет булевое значение ошибок
  setIsFetching, //крутилка
  PostsAtionType, // общая типизация экшенов
  setTotalCount, // общее количество постов
} from '../store/reducers/postsReducer';
import { POSTS_API_URL } from '../constant/urls';

// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  PostsAtionType
>;
// запрос для получения photos
export const fetchPosts = (pageNumber: number): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(
        `${POSTS_API_URL.POSTS}/?_page=${pageNumber}&_limit=10`
      );
      console.log(response);
      dispatch(setTotalCount(response.headers['x-total-count']));
      dispatch(setPosts(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};
// Другой способ типизации санки: просто типизировать dispatch ...async (dispatch:Dispatch<PhotosAtionType>).....
