import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { NoteType, clearSelectNote } from '../store/reducers/notesReducer';
import { sendNote, redactNote } from '../action/notesAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { RootStateType } from '../store/store';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DropzoneArea } from 'material-ui-dropzone'; // загрузка файлов
import {
  Container,
  makeStyles,
  TextField,
  Typography,
  MenuItem,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';

//типизация-----------------------------
//select
type PositionType = {
  value: string;
  title: string;
};
//props
type MapStateToPropsType = {
  isFetchError: boolean;
  selectNote: NoteType;
};
type MapDispathPropsType = {
  sendNote: (data: any) => void;
  clearSelectNote: () => void;
  redactNote: (id: number | undefined, data: any) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;

//--------------------------------------

const position: Array<PositionType> = [
  { value: 'Итальянская кухня', title: 'Итальянская кухня' },
  { value: 'Французская кухня', title: 'Французская кухня' },
  { value: 'Китайская кухня', title: 'Китайская кухня' },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  dropzone: {
    minHeight: 50,
    // marginTop: 15,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { color: '#3f51b5', fontSize: '1.00rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#3f51b5' },
  },
}));
//схема валидации---------------------
const schema = yup.object().shape({
  title: yup.string().required('Поле обязательное для заполнения'),
  detalis: yup.string().required('Поле обязательное для заполнения'),
  category: yup.string().required('Пожалуйста, выберите категорию'),
});
//-----------------------------------------

const NodeAddContainer: React.FC<PropsType> = ({
  sendNote,
  selectNote,
  redactNote,
}) => {
  // console.log(selectNote);
  const { title, detalis, category } = selectNote;
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NoteType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  //console.log(errors);
  //создаём объект записки. 2 условия:1.если посылаем файл, то в объект включаем поле picture;
  //2.если редактируем, запускаем функцию redactNote если новую записку-sendNote
  const onSubmit: SubmitHandler<NoteType> = (data: NoteType): void => {
    //console.log('Отправлено:', data);
    // console.log('Отправлено:', selectNote._id);
    //console.log(data.picture);
    const newData: any =
      data.picture.length !== 0
        ? {
            title: data.title,
            detalis: data.detalis,
            category: data.category,
            picture: data.picture[0],
          }
        : {
            title: data.title,
            detalis: data.detalis,
            category: data.category,
          };
    console.log(newData);
    let key: any;
    const formData = new FormData();
    for (key in newData) {
      formData.append(key, newData[key]);
    }
    /*  for (let pair of formData.entries()) {
      console.log(pair[0] + ',' + pair[1]);
    }  */

    if (selectNote._id) {
      redactNote(selectNote._id, formData);
      history.push('/notes');
    } else {
      sendNote(formData);
      history.push('/notes');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Создать новую запись
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <Controller
            name="title"
            control={control}
            defaultValue={title}
            render={({ field }) => (
              <TextField
                {...field}
                label="Заголовок"
                variant="outlined"
                fullWidth
                margin="normal"
                size="medium"
                type="text"
                autoFocus
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : null}
              />
            )}
          />
          <Controller
            name="detalis"
            control={control}
            defaultValue={detalis}
            render={({ field }) => (
              <TextField
                {...field}
                label="Детали"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                margin="normal"
                size="medium"
                type="email"
                error={!!errors.detalis}
                helperText={errors.detalis ? errors.detalis?.message : null}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            defaultValue={category}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ color: '#1a237e' }}
                fullWidth
                error={!!errors.category}
                select
                margin="normal"
                label="Категория"
                variant="outlined"
                helperText={errors.category ? errors.category?.message : null}
              >
                {position.map((item, index) => {
                  return (
                    <MenuItem value={item.value} key={index}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <DropzoneArea
                {...field}
                dropzoneText="Перетащите сюда файл или щелкните"
                dropzoneClass={classes.dropzone}
              />
            )}
          />

          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            // disabled={!isValid || !isDirty}
          >
            Отправить
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    selectNote: state.notes.selectNote, // выбранная ошибка
    isFetchError: state.notes.isFetchError, //ошибка
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  sendNote, // добавить новую записку
  redactNote, //редактировать записку
  clearSelectNote, //очистить выбранную записку
})(NodeAddContainer);
