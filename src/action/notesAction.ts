import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constant/urls';

import {
  NotesActionType, // типизация всего экшена в notesReducer
  NoteType, //типизация записки
  setNotes, //запись массива записок в стейт
  setSelectNote, //запись выбранной записки
  setIsFetchingNotes, // крутилка
  setFetchErrorNotes, // ошибка
  // NoteType, //типизация объекта в массиве записок(notes)
} from '../store/reducers/notesReducer';

// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  NotesActionType
>;
// запрос для получения записок
export const getNotes = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetchingNotes(true));
      const response = await axios.get(ModelUrls.NOTES);
      console.log(response);
      dispatch(setNotes(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorNotes(true));
      dispatch(setIsFetchingNotes(false));
    }
  };
};
// добавить новую записку
export const sendNote = (data: NoteType): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.NOTES, data);
      console.log(response);
      dispatch(getNotes());
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorNotes(true));
    }
  };
};
// запрос для получения выбранной записки
export const getSelectNote = (id: number | undefined): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ModelUrls.NOTES + id);
      console.log(response);
      dispatch(setSelectNote(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setIsFetchingNotes(false));
    }
  };
};
// удаление записки
export const removeNote = (id: number | undefined): ThunkType => {
  return async (dispatch) => {
    try {
      await axios.delete(ModelUrls.NOTES + id);
      dispatch(getNotes());
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorNotes(true));
    }
  };
};