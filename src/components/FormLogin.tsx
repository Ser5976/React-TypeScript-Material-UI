import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

//схема валидации---------------------
const schema = yup.object().shape({
  username: yup.string().required('Поле обязательное для заполнения'),
  password: yup.string().required('Поле обязательное для заполнения'),
});
//-----------------------------------------

//типизация-------------------------------
export type AuthType = {
  username: string;
  password: string;
};
// типизация пропсов
type PropsType = {
  authorization: (value: AuthType, history: any) => void;
};
//--------------------------------------------

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormLogin: React.FC<PropsType> = ({ authorization }) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  // получение данных из форма и отправка на сервак
  const onSubmit: SubmitHandler<AuthType> = (data: AuthType): void => {
    console.log('Отправлено:', data);
    authorization(data, history); //передача данных из формы авторизации на сервак(data),history нужно для того, чтобы вернуться на страницу, по последнему клику
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            autoComplete="text"
            autoFocus
            error={!!errors.username}
            helperText={errors.username ? errors.username?.message : null}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : null}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Войти
      </Button>
      <Grid container>
        <Grid item>
          <Link
            href="#"
            variant="body2"
            onClick={() => history.push('/registration')}
          >
            {'Нет учетной записи? Зарегистрироваться'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
export default FormLogin;
