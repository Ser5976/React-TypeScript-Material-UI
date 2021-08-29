import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RootStateType } from '../store/store';
import { clearSelectNote } from '../store/reducers/notesReducer';
import {
  setAuth,
  SetAuthActionType,
  setPathName,
  AuthReducerType,
  SetPathNameActionType,
} from '../store/reducers/userReducer';
import MenuAuthNavBar from './MenuAuthNavBar';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = { auth: AuthReducerType };
type MapDispathPropsType = {
  clearSelectNote: () => void;
  setAuth: (value: AuthReducerType) => SetAuthActionType;
  setPathName: (value: string) => SetPathNameActionType;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    marginLeft: 50,
  },
  menu: {
    marginTop: '50px',
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
}));

const NavBar: React.FC<PropsType> = ({
  clearSelectNote,
  auth,
  setAuth,
  setPathName,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const authorizationData: AuthReducerType = {
      token: sessionStorage.getItem('token'),
      username: sessionStorage.getItem('username'),
    };
    setAuth(authorizationData);
    // eslint-disable-next-line
  }, []);
  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Запомнить последний клик
  const rememberLastEvent = (e: any) => {
    let pathname = e.target.pathname;
    console.log(pathname);

    setPathName(pathname);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#1a237e' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React-TypeScript-Material-UI
          </Typography>
          {auth.token ? (
            <>
              <Button color="inherit">{auth.username}</Button>
              <MenuAuthNavBar setAuth={setAuth} />
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => history.push('/auth')}>
                Войти
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push('/registration')}
              >
                Зарегистрироваться
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>
          {' '}
          <Link to="/" className={classes.link}>
            To do list
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/posts" className={classes.link}>
            Posts
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            clearSelectNote();
          }}
        >
          <Link to="/muiForm" className={classes.link}>
            Create a new note
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/notes" className={classes.link}>
            Notes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/movies" className={classes.link}>
            Movies
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            rememberLastEvent(e);
          }}
        >
          <Link to="/users" className={classes.link}>
            Users
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    auth: state.users.auth, //авторизация
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  clearSelectNote, //очистить выбранный список записок(очистка форма после выбранного списка)
  setAuth, //запись токена в стейт
  setPathName, //запись последнего клика
})(NavBar);
