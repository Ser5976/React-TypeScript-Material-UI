import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import NotesContainer from './pages/NotesContainer';
import TodoListContainer from './pages/TodoListContainer';
import PhotosListCotainer from './pages/PhotosListContainer';
import MuiFormContainer from './pages/MuiFormContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route component={TodoListContainer} path="/" exact />
        <Route component={PhotosListCotainer} path="/photosList" />
        <Route component={MuiFormContainer} path="/muiForm" />
        <Route component={NotesContainer} path="/notes" />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
