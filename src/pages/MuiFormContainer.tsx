import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { NoteType, clearSelectNote } from '../store/reducers/notesReducer';
import { sendNote } from '../action/notesAction';
import { RootStateType } from '../store/store';
import { useHistory } from 'react-router-dom';
//import { DropzoneArea } from 'material-ui-dropzone';// загрузка файлов
import {
  Container,
  FormControl,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
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
  sendNote: (data: NoteType) => void;
  clearSelectNote: (data: NoteType) => void;
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
    marginTop: 75,
    padding: '50px 25px',
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
  /* dropzone: {
    minHeight: 100,
    marginTop: 30,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { color: '#1a237e', fontSize: '1.15rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#1a237e' },
  }, */
}));

const MuiFormContainer: React.FC<PropsType> = ({
  sendNote,
  selectNote,
  clearSelectNote,
}) => {
  // console.log(selectNote);
  const { title, detalis, category } = selectNote;
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, control } = useForm<NoteType>();

  const onSubmit: SubmitHandler<NoteType> = (data: NoteType): void => {
    console.log('Отправлено:', data);
    sendNote(data);
    const selectNote = {
      title: '',
      detalis: '',
      category: '',
    };
    clearSelectNote(selectNote);
    history.push('/notes');
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.textTitle}>
          Создать новую запись
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            defaultValue={category}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel style={{ color: '#1a237e' }}>Категория</InputLabel>
                <Select {...field} style={{ color: '#1a237e' }}>
                  {position.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
          {/* <Controller
            name="picture"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <DropzoneArea
                {...field}
                dropzoneText="Перетащите сюда файл или щелкните"
                dropzoneClass={classes.dropzone}
              />
            )}
            />  к сожалению json-server не работает с файлами*/}

          <Button
            style={{ backgroundColor: '#9a0036', marginTop: '50px' }}
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<Icon>send</Icon>}
            type="submit"
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
  clearSelectNote, //очистить выбранную записку
})(MuiFormContainer);
