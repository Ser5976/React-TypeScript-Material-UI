import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import {
  setUsers,
  setLoading,
  SetActionType,
} from '../store/reducers/userReducer';
import { ModelUrls } from '../constant/urls';

// типизация санки
type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  SetActionType
>;
// запрос для получения пользователей
export const getUsers = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(ModelUrls.USERS, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      // уберём password из пользователей
      response.data.map((user: any) => {
        delete user.password;
        return user;
      });

      dispatch(setUsers(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
