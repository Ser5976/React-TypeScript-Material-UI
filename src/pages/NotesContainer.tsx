import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import NoteCard from '../components/NoteCard';
import { getNotes, removeNote, getSelectNote } from '../action/notesAction';
import { NoteType } from '../store/reducers/notesReducer';
import { RootStateType } from '../store/store'; // тип всего стейта( для типизации state)
import { connect } from 'react-redux';

//типизация пропсов---------------------------------------------------------------------
type MapStateToPropsType = {
  notes: NoteType[];
  isFetching: boolean;
  isFetchError: boolean;
};
type MapDispathPropsType = {
  getNotes: () => void;
  removeNote: (id: number | undefined) => void;
  getSelectNote: (id: number | undefined) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
// -----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginTop: '25px',
  },
}));
const NotesContainer: React.FC<PropsType> = ({
  notes,
  isFetching,
  isFetchError,
  getNotes,
  removeNote,
  getSelectNote,
}) => {
  const classes = useStyles();
  // запрос на сервак, список дел
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  //редактирование выбранной записки
  const editNote = (id: number | undefined): void => {
    getSelectNote(id);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
  return (
    <Container>
      {isFetchError ? (
        <Grid container>
          <Grid item md={12}>
            <Typography align="center" className={classes.textTitle}>
              Что-то пошло не так!
            </Typography>
          </Grid>
        </Grid>
      ) : isFetching ? (
        <Grid container>
          <Grid item md={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: window.innerHeight - 65.6 }}
            >
              <CircularProgress disableShrink />
            </Box>
          </Grid>
        </Grid>
      ) : notes.length === 0 ? (
        <Typography align="center" className={classes.textTitle}>
          Пока записок нет!
        </Typography>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <NoteCard
                  note={note}
                  removeNote={removeNote}
                  editNote={editNote}
                />
              </div>
            );
          })}
        </Masonry>
      )}
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    notes: state.notes.notes, // массив записок
    isFetching: state.notes.isFetching, //крутилка
    isFetchError: state.notes.isFetchError, //ошибка
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  getNotes, //запрос для получения записок
  removeNote, // удаление записки
  getSelectNote, // запрос для получения выбранной записки
})(NotesContainer);
