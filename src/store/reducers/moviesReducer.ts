const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST';
const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
const SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE';
const SEARCH_SELECTED_MOVIE = 'SEARCH_SELECTED_MOVIE';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

// типизация--------------------------------
//стейта
/* export type MovieType = {
  title: string;
  poster: string;
  year: string;
  imdbID: string;
};
export type SelectedMovieType = {
  actors: string;
  awards: string;
  boxOffice: string;
  country: string;
  director: string;
  genre: string;
  plot: string;
  poster: string;
  production: string;
  retings: Array<RetingsType>;
  title: string;
  year: string;
  writer: string;
  imdbRating: string;
};
type RetingsType = {
  source: string;
  value: string;
}; */

export type MoviesStateType = {
  movies: any[];
  selectedMovie: any;
  loading: boolean;
  errorMessage: string | null;
  searchValue: string;
};
// экшенов
export type SetMoviesRequestActionType = {
  type: typeof SEARCH_MOVIES_REQUEST;
};
export type SetMoviesSuccessActionType = {
  type: typeof SEARCH_MOVIES_SUCCESS;
  payload: any[];
};
export type SetMoviesFailureActionType = {
  type: typeof SEARCH_MOVIES_FAILURE;
  payload: string;
};
export type SetSelectedMovieActionType = {
  type: typeof SEARCH_SELECTED_MOVIE;
  payload: any;
};
export type SetSearchValueActionType = {
  type: typeof SET_SEARCH_VALUE;
  payload: string;
};

export type MoviesActionType =
  | SetMoviesRequestActionType
  | SetMoviesSuccessActionType
  | SetMoviesFailureActionType
  | SetSelectedMovieActionType
  | SetSearchValueActionType;
//-------------------------------------------

const initialState: MoviesStateType = {
  movies: [], //список фильмов
  searchValue: '', //запрос для получения фильмов
  selectedMovie: {}, //описание выбранного фильма
  loading: true, //крутилка
  errorMessage: null, //ошибка,при отсутствии запроса
};

export const moviesReducer = (
  state = initialState,
  action: MoviesActionType
): MoviesStateType => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };

    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SEARCH_SELECTED_MOVIE:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};
//  запуск крутилки
export const setMoviesRequest = (): SetMoviesRequestActionType => ({
  type: SEARCH_MOVIES_REQUEST,
});
// запись фильмов в стейт
export const setMoviesSuccess = (data: any[]): SetMoviesSuccessActionType => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: data,
});
// записть ошибки
export const setMoviesFailure = (data: string): SetMoviesFailureActionType => ({
  type: SEARCH_MOVIES_FAILURE,
  payload: data,
});

// запись выбранного фильма
export const setSelectedMovie = (data: any): SetSelectedMovieActionType => ({
  type: SEARCH_SELECTED_MOVIE,
  payload: data,
});
// запись самого запроса
export const SetSearchValue = (data: string): SetSearchValueActionType => ({
  type: SET_SEARCH_VALUE,
  payload: data,
});
