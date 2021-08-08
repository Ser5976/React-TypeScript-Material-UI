import axios from 'axios';
//import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import { MOVIE_API_URL } from '../constant/urls';
import {
  setMoviesRequest,
  setMoviesSuccess,
  setMoviesFailure,
  setSelectedMovie,
  MoviesActionType,
} from '../store/reducers/moviesReducer';
// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  MoviesActionType
>;
// запрос для получения фильмов(по запросу old)
export const getMovies = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setMoviesRequest());
      const response = await axios.get(
        `${MOVIE_API_URL.ROOT_URL}?s=old&apikey=${MOVIE_API_URL.KEY}`
      );
      console.log(response.data);
      dispatch(setMoviesSuccess(response.data.Search));
    } catch (e) {
      console.log(e);
    }
  };
};
// поиск по запросу
export const getSearchMovies = (): ThunkType => {
  return async (dispatch, getState) => {
    const searchValue = getState().movies.searchValue;
    try {
      dispatch(setMoviesRequest());
      const response = await axios.get(
        `${MOVIE_API_URL.ROOT_URL}?s=${searchValue}&apikey=${MOVIE_API_URL.KEY}`
      );
      console.log(response.data);
      if (response.data.Response === 'True') {
        dispatch(setMoviesSuccess(response.data.Search));
      } else {
        dispatch(setMoviesFailure(response.data.Error));
      }
    } catch (e) {
      console.log(e);
    }
  };
};
// запрос выбранного фильма
export const getSelectedMovies = (imdbID: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setMoviesRequest());
      const response = await axios.get(
        `${MOVIE_API_URL.ROOT_URL}?i=${imdbID}&apikey=${MOVIE_API_URL.KEY}`
      );
      console.log(response.data);
      dispatch(setSelectedMovie(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
// Другой способ типизации санки: просто типизировать dispatch ...async (dispatch:Dispatch<PhotosAtionType>).....
