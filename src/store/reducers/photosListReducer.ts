const SET_PHOTOS_LIST = 'SET_PHOTOS_LIST';
const IS_FETCHING = 'IS_FETCHING';
const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

//типизация--------------------------------
//----------стейта-------------------------
export type PhotosListType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type PhotosListStateType = {
  photosList: PhotosListType[];
  isFetching: boolean;
  isFetchError: boolean;
};
//------- action---------------------------
export type setPhotosListActionType = {
  type: typeof SET_PHOTOS_LIST;
  payload: PhotosListType[];
};
export type setIsFetchingActionType = {
  type: typeof IS_FETCHING;
  payload: boolean;
};
export type setFetchErrorActionType = {
  type: typeof SET_FETCH_ERROR;
  payload: boolean;
};
export type PhotosAtionType =
  | setPhotosListActionType
  | setIsFetchingActionType
  | setFetchErrorActionType;

//-----------------------------------------

const initialState: PhotosListStateType = {
  photosList: [],
  isFetching: true,
  isFetchError: false,
};

export const photosListReducer = (
  state = initialState,
  action: PhotosAtionType
) => {
  switch (action.type) {
    case SET_PHOTOS_LIST:
      return {
        ...state,
        photosList: action.payload, //.filter((item) => item.id! < 11),  из 5000 записываем только 10(метод  filter(крутяк)),это если не установили лимит
        isFetching: false,
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };

    default:
      return state;
  }
};
// записывает список фоток в стейт
export const setPhotosList = (
  data: PhotosListType[]
): setPhotosListActionType => ({
  type: SET_PHOTOS_LIST,
  payload: data,
});
// крутилка
export const setIsFetching = (bul: boolean): setIsFetchingActionType => ({
  type: IS_FETCHING,
  payload: bul,
});
// изменяет булевое значение ошибок
export const setFetchError = (bul: boolean): setFetchErrorActionType => ({
  type: SET_FETCH_ERROR,
  payload: bul,
});
