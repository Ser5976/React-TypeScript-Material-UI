import axios from 'axios';
//import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import {
  setPhotosList, // записывает список фоток в стейт
  setFetchError, // изменяет булевое значение ошибок
  setIsFetching, //крутилка
  PhotosAtionType, // общая типизация экшенов
} from '../store/reducers/photosListReducer';
// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  PhotosAtionType
>;
// запрос для получения photos
export const fetchPhotos = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/photos?_limit=5&_page=1'
      );
      console.log(response.data);
      dispatch(setPhotosList(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};
// Другой способ типизации санки: просто типизировать dispatch ...async (dispatch:Dispatch<PhotosAtionType>).....
