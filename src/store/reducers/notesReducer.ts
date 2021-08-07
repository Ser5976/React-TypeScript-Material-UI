const SET_NOTES = 'SET_NOTES';
const IS_FETCHING_NOTES = 'IS_FETCHING_NOTES';
const SET_FETCH_ERROR_NOTES = 'SET_FETCH_ERROR_NOTES';
const SET_SELECT_NOTE = 'SET_SELECT_NOTE';
const CLEAR_SELECT_NOTE = 'CLEAR_SELECT_NOTE';

// типизация--------------------------------
export type NoteType = {
  title: string;
  detalis: string;
  category: string;
  _id?: number;
  picture?: any;
};

export type NotesStateType = {
  notes: NoteType[];
  isFetching: boolean;
  isFetchError: boolean;
  selectNote: NoteType;
};

export type SetNotesActionType = {
  type: typeof SET_NOTES;
  payload: NoteType[];
};
export type SetSelectNoteActionType = {
  type: typeof SET_SELECT_NOTE;
  payload: NoteType;
};
export type ClearSelectNoteActionType = {
  type: typeof CLEAR_SELECT_NOTE;
  payload: NoteType;
};
export type SetIsFetchingNotesActionType = {
  type: typeof IS_FETCHING_NOTES;
  payload: boolean;
};
export type SetFetchErrorNotesActionType = {
  type: typeof SET_FETCH_ERROR_NOTES;
  payload: boolean;
};
export type NotesActionType =
  | SetNotesActionType
  | SetSelectNoteActionType
  | SetIsFetchingNotesActionType
  | SetFetchErrorNotesActionType
  | ClearSelectNoteActionType;

//-------------------------------------------

const initialState: NotesStateType = {
  notes: [], //массив записок
  selectNote: {
    title: '',
    detalis: '',
    category: '',
    _id: undefined,
    picture: '',
  }, // выбранный список
  isFetching: true, // крутилка
  isFetchError: false, // ошибка
};

export const notesReducer = (
  state = initialState,
  action: NotesActionType
): NotesStateType => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
        isFetching: false,
      };

    case SET_SELECT_NOTE:
      return {
        ...state,
        selectNote: action.payload,
      };

    case CLEAR_SELECT_NOTE:
      return {
        ...state,
        selectNote: action.payload,
      };
    case IS_FETCHING_NOTES:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_FETCH_ERROR_NOTES:
      return {
        ...state,
        isFetchError: action.payload,
      };

    default:
      return state;
  }
};
// запись массива записок в стейт
export const setNotes = (data: NoteType[]): SetNotesActionType => ({
  type: SET_NOTES,
  payload: data,
});
// запись выбранной записки
export const setSelectNote = (data: NoteType): SetSelectNoteActionType => ({
  type: SET_SELECT_NOTE,
  payload: data,
});
// очистить выбранный список
export const clearSelectNote = (): ClearSelectNoteActionType => ({
  type: CLEAR_SELECT_NOTE,
  payload: {
    title: '',
    detalis: '',
    category: '',
    picture: '',
  },
});

// крутилка
export const setIsFetchingNotes = (
  bul: boolean
): SetIsFetchingNotesActionType => ({
  type: IS_FETCHING_NOTES,
  payload: bul,
});
// изменяет булевое значение ошибок
export const setFetchErrorNotes = (
  bul: boolean
): SetFetchErrorNotesActionType => ({
  type: SET_FETCH_ERROR_NOTES,
  payload: bul,
});
