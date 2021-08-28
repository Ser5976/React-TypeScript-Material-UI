import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constant/urls';
import {
  setErrorMessage, // запись ошибки аторизации и регистрации в стейт
  SetActionType, // тип экшенов userReducer
  setAuth, // запись авторизации  в стейт
  AuthReducerType, // тип авторизации
} from '../store/reducers/userReducer';
import { AuthType } from '../components/FormLogin';

// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  SetActionType
>;
// авторизация
export const authorization = (value: AuthType): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ModelUrls.LOGIN, value);
      console.log(data);
      dispatch(setAuth(data));
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.username);
    } catch (e) {
      console.log(e.message);
      dispatch(setErrorMessage(e.message));
    }
  };
};
//регистрация
export const registration = (value: AuthType): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ModelUrls.REGISTRATION, value);
      const authorizationData: AuthReducerType = {
        token: data.token,
        username: data.user.username,
      };
      console.log(authorizationData);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.user.username);
      dispatch(setAuth(authorizationData));
    } catch (e) {
      console.log(e.message);
      dispatch(setErrorMessage(e.message));
    }
  };
};
