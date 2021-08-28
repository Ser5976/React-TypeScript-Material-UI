import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Copyright from '../components/Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormLogin from '../components/FormLogin';
import { makeStyles } from '@material-ui/core/styles';
import { authorization } from '../action/authAction';
import { RootStateType } from '../store/store';
import { AuthType } from '../components/FormLogin';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
// типизация пропсов
type MapStateToPropsType = {
  errorMessage: string | null;
};
type MapDispathPropsType = {
  authorization: (value: AuthType) => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;

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
}));

const AuthContainer: React.FC<PropsType> = ({
  authorization,
  errorMessage,
}) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          {errorMessage ? (
            errorMessage === 'Request failed with status code 400' ? (
              <Typography
                component="h1"
                variant="body1"
                className={classes.error}
              >
                Неверный логин и пароль
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="body1"
                className={classes.error}
              >
                Что то пошло не так
              </Typography>
            )
          ) : null}

          <FormLogin authorization={authorization} />

          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    errorMessage: state.users.errorMessage, //ошибка авторизации
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { authorization })(AuthContainer);
