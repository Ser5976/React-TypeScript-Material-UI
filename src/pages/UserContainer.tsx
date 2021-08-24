import React from 'react';
import { makeStyles } from '@material-ui/core';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { UserType } from '../store/reducers/userReducer';
import { getUsers } from '../action/userAction';
import User from '../components/User';
import CustomizedButtons from '../components/CustomizedButtons';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
// типизация пропсов
type MapStateToPropsType = {
  users: UserType[];
  loading: boolean;
};
type MapDispathPropsType = {
  getUsers: () => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
//-----------------------------------------------------------------
const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
  },

  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginBottom: '25px',
    marginTop: '25px',
    cursor: 'pointer',
  },
}));

const UserCotainer: React.FC<PropsType> = ({ users, loading, getUsers }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomizedButtons getUsers={getUsers} />

      {users.map((item, index) => {
        return (
          <User
            key={item._id}
            username={item.username}
            index={index}
            id={item._id}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    users: state.users.users, //массив пользователей
    loading: state.users.loading, //крутилка
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getUsers })(UserCotainer);
