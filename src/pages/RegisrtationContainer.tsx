import React from 'react';
import Copyright from '../components/Copyright';
import FormRegistration from '../components/FormRegistration';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthType } from '../components/FormRegistration';
import { RootStateType } from '../store/store';
import { connect } from 'react-redux';
import { registration } from '../action/authAction';

//типизация---------------------------------------------------------------------
// типизация пропсов
type MapStateToPropsType = { errorMessage: string | null };
type MapDispathPropsType = {
  registration: (value: AuthType, history: any) => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const RistrationContainer: React.FC<PropsType> = ({
  registration,
  errorMessage,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        {errorMessage ? (
          errorMessage === 'Request failed with status code 400' ? (
            <Typography
              component="h1"
              variant="body1"
              className={classes.error}
            >
              Пользователь с таким именем уже существует
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
        <FormRegistration registration={registration} />
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    errorMessage: state.users.errorMessage, //ошибка регистрация
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { registration })(RistrationContainer);
