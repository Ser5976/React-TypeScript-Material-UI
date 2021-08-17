const SET_POSTS = 'SET_POSTS';
const IS_FETCHING = 'IS_FETCHING';
const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

//типизация--------------------------------
//----------стейта-------------------------
export type PostsType = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

export type PostsStateType = {
  posts: PostsType[];
  isFetching: boolean;
  isFetchError: boolean;
};
//------- action---------------------------
export type setPostsActionType = {
  type: typeof SET_POSTS;
  payload: PostsType[];
};
export type setIsFetchingActionType = {
  type: typeof IS_FETCHING;
  payload: boolean;
};
export type setFetchErrorActionType = {
  type: typeof SET_FETCH_ERROR;
  payload: boolean;
};
export type PostsAtionType =
  | setPostsActionType
  | setIsFetchingActionType
  | setFetchErrorActionType;

//-----------------------------------------

const initialState: PostsStateType = {
  posts: [],
  isFetching: true,
  isFetchError: false,
};

export const postsReducer = (state = initialState, action: PostsAtionType) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
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
// записывает посты в стейт
export const setPosts = (data: PostsType[]): setPostsActionType => ({
  type: SET_POSTS,
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
