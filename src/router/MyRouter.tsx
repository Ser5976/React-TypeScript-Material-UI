import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotesContainer from '../pages/NotesContainer';
import TodoListContainer from '../pages/TodoListContainer';
import PostsCotainer from '../pages/PostsContainer';
import MoviesContainer from '../pages/MoviesContainer';
import ProfileContainer from '../pages/ProfileContainer';
import AuthContainer from '../pages/AuthContainer';
import RistrationContainer from '../pages/RegisrtationContainer';
import PrivateRoute from './PrivateRouters';
import UsersContainer from '../pages/UsersContainer';
import NodeAddContainer from '../pages/NodeAddContainer';

const MyRouter: React.FC = () => {
  return (
    <Switch>
      <Route component={TodoListContainer} path="/" exact />
      <Route component={PostsCotainer} path="/posts" />
      <Route component={NotesContainer} path="/notes" />
      <Route component={MoviesContainer} path="/movies" />
      <Route component={ProfileContainer} path="/profile/:imdbID" />
      <Route component={AuthContainer} path="/auth" />
      <Route component={RistrationContainer} path="/registration" />
      <Route component={NodeAddContainer} path="/nodeadd" />
      <PrivateRoute path="/users" component={UsersContainer} />

      <Redirect to="/" />
    </Switch>
  );
};

export default MyRouter;
