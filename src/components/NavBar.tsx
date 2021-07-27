import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  menu: {
    marginTop: '50px',
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
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
          <Typography variant="h6" className={classes.title}>
            React-TypeScript-Material-UI
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
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
          <Link to="/photosList" className={classes.link}>
            JSONPlaceholder/photos
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/muiForm" className={classes.link}>
            Create a new note
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/notes" className={classes.link}>
            Notes
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavBar;
