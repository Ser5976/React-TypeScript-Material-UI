const SET_USERS = 'SET_USERS';
const SET_TOKEN = 'SET_TOKEN';
const SET_LOADING = 'SET_LOADING';

// типизация--------------------------------
export type UserType = {
  username: string;
  _id: string;
};

export type InitialStateType = {
  users: UserType[];
  token: string;
  loading: boolean;
};

export type SetUsersActionType = {
  type: typeof SET_USERS;
  payload: UserType[];
};
export type SetTokenActionType = {
  type: typeof SET_TOKEN;
  payload: string;
};
export type SetLoadingActionType = {
  type: typeof SET_LOADING;
};

export type SetActionType =
  | SetUsersActionType
  | SetTokenActionType
  | SetLoadingActionType;
//-------------------------------------------

const initialState: InitialStateType = {
  users: [], //массив список дел
  token: '', //заголовок списка дел
  loading: false, //крутилка
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
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
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
export const setToken = (value: string): SetTokenActionType => ({
  type: SET_TOKEN,
  payload: value,
});
// крутилка
export const setLoading = (): SetLoadingActionType => ({
  type: SET_LOADING,
});
