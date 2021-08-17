import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todoListReducer } from './reducers/todoListReducer';
import { postsReducer } from './reducers/postsReducer';
import { notesReducer } from './reducers/notesReducer';
import { moviesReducer } from './reducers/moviesReducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  posts: postsReducer,
  notes: notesReducer,
  movies: moviesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export type RootStateType = ReturnType<typeof rootReducer>; //типизация стейта
