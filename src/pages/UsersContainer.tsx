import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { UserType } from '../store/reducers/userReducer';
import { getUsers } from '../action/userAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import User from '../components/User';
import { connect } from 'react-redux';

// типизация пропсов
type MapStateToPropsType = {
  users: UserType[];
  loading: boolean;
  errorMessage: string | null;
};
type MapDispathPropsType = {
  getUsers: () => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  error: { color: theme.palette.secondary.main },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    width: '100%',
    height: 400,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    paddingRight: 25,
  },
}));

const UsersContainer: React.FC<PropsType> = ({
  users,
  loading,
  getUsers,
  errorMessage,
}) => {
  const classes = useStyles();
  // 'Токен не валиден'
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar src="/broken-image.jpg" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Пользователи
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={getUsers}
          >
            Получить
          </Button>

          {errorMessage ? (
            <Grid container>
              <Grid item md={12}>
                <Typography
                  component="h1"
                  variant="h6"
                  className={classes.error}
                >
                  Токен не валиден. Авторизируйтесь повторно!
                </Typography>
              </Grid>
            </Grid>
          ) : loading ? (
            <Grid container>
              <Grid item md={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  // style={{ height: window.innerHeight - 65.6 }}
                >
                  <CircularProgress disableShrink />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box className={classes.box}>
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
            </Box>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    users: state.users.users, //массив пользователей
    loading: state.users.loading, //крутилка
    errorMessage: state.users.errorMessage,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getUsers })(UsersContainer);
