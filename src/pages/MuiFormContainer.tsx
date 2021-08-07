import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { NoteType, clearSelectNote } from '../store/reducers/notesReducer';
import { sendNote, redactNote } from '../action/notesAction';
import { RootStateType } from '../store/store';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DropzoneArea } from 'material-ui-dropzone'; // загрузка файлов
import {
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Icon,
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
  container: {
    marginTop: 25,
    padding: '25px 25px',
    '& .MuiTextField-root': {
      marginBottom: 20,
      '& fieldset': {
        borderColor: '#1a237e',
      },
      '& label': {
        color: '#1a237e',
      },
    },
    '& .MuiIconButton-label': {
      color: '#1a237e',
    },
  },

  paper: {
    padding: '15px',
  },
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginBottom: 20,
  },
  dropzone: {
    minHeight: 100,
    marginTop: 30,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { color: '#1a237e', fontSize: '1.15rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#1a237e' },
  },
}));
//схема валидации---------------------
const schema = yup.object().shape({
  title: yup.string().required('Поле обязательное для заполнения'),
  detalis: yup.string().required('Поле обязательное для заполнения'),
  category: yup.string().required('Пожалуйста, выберите категорию'),
});
//-----------------------------------------

const MuiFormContainer: React.FC<PropsType> = ({
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
    formState: { errors, isValid, isDirty },
  } = useForm<NoteType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  //console.log(errors);
  //создаём объект записки. 2 условия:1.если посылаем файл, то в объект включаем поле picture;
  //2.если редактируем, запускаем функцию redactNote если новую записку-sendNote
  const onSubmit: SubmitHandler<NoteType> = (data: NoteType): void => {
    console.log('Отправлено:', data);
    console.log('Отправлено:', selectNote._id);
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
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.textTitle}>
          Создать новую запись
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                size="medium"
                type="text"
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
                rows={5}
                fullWidth
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
            style={{ backgroundColor: '#9a0036', marginTop: '25px' }}
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<Icon>send</Icon>}
            type="submit"
            disabled={!isValid || !isDirty}
          >
            Send
          </Button>
        </form>
      </Paper>
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
})(MuiFormContainer);
