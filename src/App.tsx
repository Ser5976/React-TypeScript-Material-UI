import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import NotesContainer from './pages/NotesContainer';
import TodoListContainer from './pages/TodoListContainer';
import PostsCotainer from './pages/PostsContainer';
import MuiFormContainer from './pages/MuiFormContainer';
import MoviesContainer from './pages/MoviesContainer';
import ProfileContainer from './pages/ProfileContainer';
import UserContainer from './pages/UserContainer';
import AuthContainer from './pages/AuthContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route component={TodoListContainer} path="/" exact />
        <Route component={PostsCotainer} path="/posts" />
        <Route component={MuiFormContainer} path="/muiForm" />
        <Route component={NotesContainer} path="/notes" />
        <Route component={MoviesContainer} path="/movies" />
        <Route component={ProfileContainer} path="/profile/:imdbID" />
        <Route component={UserContainer} path="/users" />
        <Route component={AuthContainer} path="/auth" />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
