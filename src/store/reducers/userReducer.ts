const SET_USERS = 'SET_USERS';
const SET_AUTH = 'SET_AUTH';
//const SET_USER_NAME='SET_USER_NAME'
const SET_LOADING = 'SET_LOADING';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

// типизация--------------------------------
export type UserType = {
  username: string;
  _id: string;
};
export type AuthReducerType = {
  username: string | null;
  token: string | null;
};

export type InitialStateType = {
  users: UserType[];
  auth: AuthReducerType;
  //token: string | null;
  // username: string | null;
  loading: boolean;
  errorMessage: string | null;
};

export type SetUsersActionType = {
  type: typeof SET_USERS;
  payload: UserType[];
};
export type SetAuthActionType = {
  type: typeof SET_AUTH;
  payload: AuthReducerType;
};
/* export type SetUserNameActionType = {
    type: typeof SET_USER_NAME;
    payload: string | null;
  }; */
export type SetLoadingActionType = {
  type: typeof SET_LOADING;
};
export type SetErrorMessageActionType = {
  type: typeof SET_ERROR_MESSAGE;
  payload: string;
};

export type SetActionType =
  | SetUsersActionType
  | SetAuthActionType
  | SetLoadingActionType
  | SetErrorMessageActionType;

//-------------------------------------------

const initialState: InitialStateType = {
  users: [], //массив пользователей
  auth: { username: null, token: null },
  //token: null, //токен
  // username:null,// пользователь
  loading: false, //крутилка
  errorMessage: null, // ошибка авторизации
};

export const userReducer = (
  state = initialState,
  action: SetActionType
): InitialStateType => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
        errorMessage: null,
      };
    /* case SET_USER_NAME:
      return {
        ...state,
        username: action.payload,
        errorMessage: null,
      }; */
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
// запись массива пользователей
export const setUsers = (data: UserType[]): SetUsersActionType => ({
  type: SET_USERS,
  payload: data,
});
//запись токена
export const setAuth = (value: AuthReducerType): SetAuthActionType => ({
  type: SET_AUTH,
  payload: value,
});
// крутилка
export const setLoading = (): SetLoadingActionType => ({
  type: SET_LOADING,
});
export const setErrorMessage = (data: string): SetErrorMessageActionType => ({
  type: SET_ERROR_MESSAGE,
  payload: data,
});
