import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../store/store';
import {
  setUsers,
  setToken,
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
  return async (dispatch, getState) => {
    const token = getState().users.token;
    try {
      dispatch(setLoading());
      const response = await axios.get(ModelUrls.USERS, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjE2YzJjNmFmMzBlMmYyNDEwMTg2MCIsInVzZXJuYW1lIjoidXNlcjExIiwiaWF0IjoxNjI5ODMxMTI4LCJleHAiOjE2Mjk5MTc1Mjh9.YG8NwcjMioiz37D6Dnr4XF_n-3N0L80hhFdxXHKsxhU`,
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
