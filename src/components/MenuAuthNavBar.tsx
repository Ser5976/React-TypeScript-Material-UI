import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
  SetAuthActionType,
  AuthReducerType,
} from '../store/reducers/userReducer';
import { useHistory } from 'react-router-dom';

//типизация--------------------------------
type PropsType = {
  setAuth: (value: AuthReducerType) => SetAuthActionType;
};
//-----------------------------------------

const MenuAuthNavBar: React.FC<PropsType> = ({ setAuth }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //Очистить стейт авторизации(auth)
  const clearAuthorization = (): void => {
    const authorizationData: AuthReducerType = {
      token: null,
      username: null,
    };
    setAuth(authorizationData);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose(); //закрываем меню
            sessionStorage.removeItem('token'); //удаляем токен из sessionStorage
            sessionStorage.removeItem('username'); //удаляем username из sessionStorage
            clearAuthorization();
            history.push('/');
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};
export default MenuAuthNavBar;
