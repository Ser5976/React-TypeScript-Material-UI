import React, { useState } from 'react';
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
import { connect } from 'react-redux';

//типизация--------------------------------
type MapDispathPropsType = {
  clearSelectNote: () => void;
};
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

const NavBar: React.FC<MapDispathPropsType> = ({ clearSelectNote }) => {
  const classes = useStyles();
  const history = useHistory();
  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

          <Button color="inherit" onClick={() => history.push('/auth')}>
            Войти
          </Button>
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
        <MenuItem onClick={handleClose}>
          <Link to="/users" className={classes.link}>
            Users
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default connect<
  unknown,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(null, {
  clearSelectNote, //очистить выбранный список записок(очистка форма после выбранного списка)
})(NavBar);
