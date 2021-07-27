import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todoListReducer } from './reducers/todoListReducer';
import { photosListReducer } from './reducers/photosListReducer';
import { notesReducer } from './reducers/notesReducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  photosList: photosListReducer,
  notes: notesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export type RootStateType = ReturnType<typeof rootReducer>; //типизация стейта
